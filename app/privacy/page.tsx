import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy notice" };

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Privacy</div><span className="eyebrow">Your information</span><h1>Privacy notice.</h1><p>A plain-language summary of how this website handles information submitted through its contact form.</p></div></section>
      <section className="section"><div className="container body-copy">
        <h2>Information you provide</h2><p>If you submit an enquiry, the website collects your name, email address, optional phone number, subject, message, and consent response so the company can respond. Do not include passwords, payment information, or sensitive personal or financial details.</p>
        <h2>How information is used</h2><p>Enquiry information is used to respond to your request and for related follow-up. When email delivery is configured, the enquiry is sent to the company’s designated recipient through its email provider. The form also prepares a WhatsApp message addressed to the company’s published number; it opens WhatsApp for you to review and send, and is not delivered through WhatsApp unless you tap Send. If automatic WhatsApp delivery is configured, the enquiry is sent through Meta’s WhatsApp Business service. The website does not store contact form submissions in an application database.</p>
        <h2>Service providers and retention</h2><p>Third-party infrastructure providers may process information to deliver hosting, security, email, or WhatsApp services. Their handling is subject to their terms. The company should establish and publish its retention, access, deletion, and data-subject request procedures before launch.</p>
        <h2>Cookies and analytics</h2><p>This starter website does not intentionally set analytics or advertising cookies. Hosting providers may use strictly necessary technical logs. If analytics, tracking, or other optional cookies are added, update this notice and implement appropriate consent controls before activation.</p>
        <h2>Your requests and contact</h2><p>The contact details shown on this website were supplied for publication. Before launch, confirm they are monitored and provide a privacy contact and a process for handling applicable data rights requests.</p>
        <h2>Security and changes</h2><p>Reasonable technical measures should be used to protect information, but no internet transmission is perfectly secure. This notice must be reviewed against the actual services, processing, and applicable Indian privacy requirements before launch.</p>
        <p className="legal-updated">Last reviewed: October 2026. This starter notice is not legal advice.</p>
      </div></section>
    </>
  );
}
