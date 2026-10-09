import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("yes"),
  website: z.string().max(0).optional().default(""),
});

const submissions = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;
const maxSubmissions = 5;

type DeliveryStatus = "sent" | "failed" | "not_configured";

function originIsValid(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function sendEmail(data: z.infer<typeof schema>): Promise<DeliveryStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_COMPANY_EMAIL || "reddykishor555@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return "not_configured";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Website enquiry: ${data.subject}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "Not provided"}`,
          `Subject: ${data.subject}`,
          "",
          data.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

async function sendWhatsApp(data: z.infer<typeof schema>): Promise<DeliveryStatus> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const recipient = (process.env.CONTACT_WHATSAPP_TO || "9676914932").replace(/\D/g, "");
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";
  if (!token || !phoneNumberId || !templateName || !recipient) return "not_configured";

  try {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${encodeURIComponent(phoneNumberId)}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipient,
          type: "template",
          template: {
            name: templateName,
            language: { code: language },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: data.name },
                  { type: "text", text: data.email },
                  { type: "text", text: data.phone || "Not provided" },
                  { type: "text", text: data.subject },
                  { type: "text", text: data.message.slice(0, 1000) },
                ],
              },
            ],
          },
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

export async function POST(request: NextRequest) {
  if (!originIsValid(request)) {
    return NextResponse.json({ message: "Request could not be verified." }, { status: 403 });
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ message: "The submitted message is too large." }, { status: 413 });
  }

  const clientId =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim();
  if (!clientId) {
    return NextResponse.json({ message: "We couldn’t verify this request. Please try again." }, { status: 400 });
  }
  const now = Date.now();
  const recent = (submissions.get(clientId) || []).filter((time) => now - time < windowMs);
  if (recent.length >= maxSubmissions) {
    return NextResponse.json({ message: "Please wait a few minutes before sending another enquiry." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid enquiry." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ message: "Your enquiry could not be accepted." }, { status: 400 });
  }
  submissions.set(clientId, [...recent, now]);

  const [email, whatsapp] = await Promise.all([
    sendEmail(parsed.data),
    sendWhatsApp(parsed.data),
  ]);
  const deliveries = { email, whatsapp };
  if (email === "sent" || whatsapp === "sent") {
    return NextResponse.json({
      message: "Your enquiry was received. Check the delivery status for each contact method.",
      deliveries,
    });
  }

  return NextResponse.json(
    {
      message: "Your enquiry could not be delivered automatically. Please use the WhatsApp option below or try again later.",
      deliveries,
    },
    { status: 502 },
  );
}
