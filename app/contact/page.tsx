import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { companyContact } from "@/lib/site";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  const contact = companyContact();
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Contact</div>
        <span className="eyebrow">Get in touch</span>
        <h1>Let’s have a thoughtful conversation.</h1>
        <p>Have a question about our work, research, or educational content? Send us a note and our team will be in touch.</p>
      </div></section>
      <section className="section"><div className="container contact-layout">
        <aside className="contact-aside">
          <h2>We’d be glad to hear from you.</h2>
          <p>Use the enquiry form and provide only the information needed to respond. Please do not send account credentials, payment details, or sensitive financial information.</p>
          <div className="contact-detail"><Mail size={17} /><div><small>Email</small><strong>{contact.email}</strong></div></div>
          <div className="contact-detail"><Phone size={17} /><div><small>Phone</small><strong>{contact.phone}</strong></div></div>
          <div className="contact-detail"><MapPin size={17} /><div><small>Location</small><strong>{contact.address}</strong></div></div>
        </aside>
        <ContactForm />
      </div></section>
    </>
  );
}
