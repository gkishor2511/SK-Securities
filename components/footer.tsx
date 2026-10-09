import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "@/components/brand";
import { companyContact } from "@/lib/site";

export function Footer() {
  const contact = companyContact();
  const hasEmail = contact.email.includes("@");
  const hasPhone = !contact.phone.startsWith("Contact");
  const hasAddress = !contact.address.startsWith("Registered");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>Independent thinking. Clearer financial understanding.</p>
            <a className="footer-contact-link" href="/contact">Start a conversation <ArrowUpRight size={15} /></a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/about">About us</Link>
            <Link href="/services">Our services</Link>
            <Link href="/insights">Market insights</Link>
            <Link href="/markets">Market dashboard</Link>
            <Link href="/ipo">IPO research</Link>
          </div>
          <div className="footer-column">
            <h2>Contact</h2>
            <p><Mail size={15} />{hasEmail ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : contact.email}</p>
            <p><Phone size={15} />{hasPhone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : contact.phone}</p>
            <p><MapPin size={15} />{hasAddress ? contact.address : contact.address}</p>
            {contact.linkedin ? <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a> : null}
          </div>
        </div>
        <div className="footer-disclaimer">
          <strong>Important information</strong>
          <p>
            Content on this website is for general informational and educational purposes only. It is not
            personalized investment advice, a solicitation, or a recommendation to buy or sell securities.
            Securities markets are subject to risk. Please review all relevant documents and consult an
            appropriately qualified professional for advice suited to your circumstances. No returns are
            assured. Regulatory registrations and authorizations have not been verified for this website.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SK Securities Private Limited</span>
          <div>
            <Link href="/disclaimer">Disclaimers</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <span className="footer-india">Made for informed India <span aria-hidden="true">·</span></span>
        </div>
      </div>
    </footer>
  );
}
