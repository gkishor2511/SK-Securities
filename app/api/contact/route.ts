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

function originIsValid(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
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

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const remoteAddress = request.headers.get("x-real-ip")?.trim();
  const clientId = forwardedFor || remoteAddress;
  if (!clientId) {
    return NextResponse.json({ message: "We couldn’t verify this request. Please try again." }, { status: 400 });
  }
  const now = Date.now();
  const recent = (submissions.get(clientId) || []).filter((time) => now - time < windowMs);
  if (recent.length >= maxSubmissions) {
    return NextResponse.json({ message: "Please wait a few minutes before sending another enquiry." }, { status: 429 });
  }
  submissions.set(clientId, [...recent, now]);

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { message: "Enquiry delivery is not configured yet. Please contact the company using its published contact details." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.email,
        subject: `Website enquiry: ${parsed.data.subject}`,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone || "Not provided"}`,
          "",
          parsed.data.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return NextResponse.json({ message: "We couldn’t deliver your enquiry. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ message: "Thank you. Your enquiry has been sent successfully." });
  } catch {
    return NextResponse.json({ message: "We couldn’t reach the email service. Please try again later." }, { status: 502 });
  }
}
