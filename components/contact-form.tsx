"use client";

import { useState, type FormEvent } from "react";

type DeliveryStatus = "sent" | "failed" | "not_configured";
type FormState = {
  kind: "idle" | "sending" | "success" | "error";
  message: string;
  deliveries?: { email: DeliveryStatus; whatsapp: DeliveryStatus };
  whatsappUrl?: string;
};

function makeWhatsAppUrl(payload: Record<string, FormDataEntryValue>) {
  const phone = "919676914932";
  const text = [
    "SK Securities website enquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Subject: ${payload.subject}`,
    "",
    `Message: ${payload.message}`,
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function deliveryLabel(status: DeliveryStatus) {
  if (status === "sent") return "Sent";
  if (status === "failed") return "Not delivered — please use the WhatsApp fallback or retry.";
  return "Not configured";
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setState({ kind: "sending", message: "" });
    const whatsappUrl = makeWhatsAppUrl(payload);
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        deliveries?: { email: DeliveryStatus; whatsapp: DeliveryStatus };
      };
      if (!response.ok) {
        setState({
          kind: "error",
          message: "Your WhatsApp draft is prepared. Open it below and tap Send in WhatsApp. Email delivery status is shown below.",
          deliveries: result.deliveries,
          whatsappUrl,
        });
        return;
      }
      form.reset();
      setState({
        kind: "success",
        message: result.deliveries?.whatsapp !== "sent"
          ? "Your WhatsApp draft is prepared. Open it below and tap Send in WhatsApp."
          : result.message || "Your enquiry was received.",
        deliveries: result.deliveries,
        whatsappUrl: result.deliveries?.whatsapp === "sent" ? undefined : whatsappUrl,
      });
    } catch (error) {
      setState({
        kind: "error",
        message: "Your WhatsApp draft is prepared. Open it below and tap Send in WhatsApp. Email status could not be verified.",
        whatsappUrl,
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Full name<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
        <label>Subject<input name="subject" minLength={3} maxLength={150} required /></label>
      </div>
      <label>How can we help?<textarea name="message" rows={5} minLength={10} maxLength={5000} required /></label>
      <label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent-check">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree that SK Securities may use these details to respond by email and WhatsApp, including through its service providers. See the <a href="/privacy">Privacy Notice</a>.</span>
      </label>
      <button className="button button-primary" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send enquiry"}
        {state.kind !== "sending" ? <span aria-hidden="true">↗</span> : null}
      </button>
      {state.message ? <p className={`form-message ${state.kind}`} role={state.kind === "error" ? "alert" : "status"}>{state.message}</p> : null}
      {state.deliveries ? (
        <ul className="delivery-status" aria-label="Enquiry delivery status">
          <li><strong>Email:</strong> {deliveryLabel(state.deliveries.email)}</li>
          <li>
            <strong>WhatsApp:</strong>{" "}
            {state.deliveries.whatsapp === "sent"
              ? "Sent automatically."
              : state.whatsappUrl
                ? "Draft prepared. Open the WhatsApp draft below and tap Send; it has not been sent yet."
                : deliveryLabel(state.deliveries.whatsapp)}
          </li>
        </ul>
      ) : null}
      {state.whatsappUrl ? (
        <a className="button whatsapp-fallback" href={state.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Open WhatsApp draft
        </a>
      ) : null}
    </form>
  );
}
