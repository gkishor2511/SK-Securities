import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Terms</div><span className="eyebrow">Using this website</span><h1>Terms of use.</h1><p>These starter terms describe the basic conditions for using the SK Securities website.</p></div></section>
      <section className="section"><div className="container body-copy">
        <h2>Website use</h2><p>Use this website lawfully and do not attempt to interfere with its operation, security, or availability. You are responsible for verifying that use of the website is lawful in your jurisdiction.</p>
        <h2>Content and third-party information</h2><p>Website content is informational and educational, may change without notice, and is subject to the website disclaimer. Third-party data and links may be governed by separate terms and licensing restrictions. Do not reproduce licensed data without permission.</p>
        <h2>No professional relationship</h2><p>Using this website or sending an enquiry does not create an advisory, brokerage, research, fiduciary, or other professional relationship.</p>
        <h2>Availability and liability</h2><p>The website and its content are provided on an “as available” basis. To the extent permitted by applicable law, the company disclaims warranties and liability for reliance on incomplete, delayed, inaccurate, or unavailable information. Nothing in these terms excludes liability that cannot lawfully be excluded.</p>
        <h2>Changes and governing requirements</h2><p>These terms should be updated with the company’s verified legal identity, registered address, complaint/contact process, and advice from qualified Indian counsel before launch. Applicable law and jurisdiction should be confirmed by counsel.</p>
        <p className="legal-updated">Last reviewed: October 2026. These starter terms are not legal advice.</p>
      </div></section>
    </>
  );
}
