"use client";

import { useState, type FormEvent } from "react";

type FormState = { kind: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setState({ kind: "sending", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We couldn’t send your message. Please try again.");
      form.reset();
      setState({ kind: "success", message: result.message || "Your enquiry was sent." });
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "We couldn’t send your message. Please try again.",
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
        <span>I agree that SK Securities may use these details to respond to my enquiry. See the <a href="/privacy">Privacy Notice</a>.</span>
      </label>
      <button className="button button-primary" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send enquiry"}
        {state.kind !== "sending" ? <span aria-hidden="true">↗</span> : null}
      </button>
      {state.message ? <p className={`form-message ${state.kind}`} role={state.kind === "error" ? "alert" : "status"}>{state.message}</p> : null}
    </form>
  );
}
