import type { Metadata } from 'next'
import LegalShell from '../LegalShell'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Telos AI collects, uses, and protects your personal data.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="23 July 2026">
        <h2 className={styles.h2}>Who we are</h2>
        <p>Telos AI is the trading name of William Robert Gouldsmith, a sole trader based in Bristol, England.</p>
        <ul className={styles.defList}>
          <li><strong>Data controller:</strong> William Robert Gouldsmith, trading as Telos AI</li>
          <li><strong>Address:</strong> Bristol, United Kingdom (full postal address available on request)</li>
          <li><strong>Email:</strong> william.gouldsmith@telosai.co.uk</li>
          <li><strong>Website:</strong> telosai.co.uk</li>
        </ul>
        <p>For questions about this policy or your personal data, contact us at the email above.</p>

        <h2 className={styles.h2}>What personal information we collect</h2>
        <h3 className={styles.h3}>Information you give us directly</h3>
        <ul className={styles.list}>
          <li>Your name and business name</li>
          <li>Your email address and phone number</li>
          <li>Your job title or role</li>
          <li>The content of any message, enquiry, or form submission</li>
          <li>Any information you provide when creating a portal account (business name, contact name, email, and password)</li>
          <li>Information provided during onboarding (business details, operational challenges, and service preferences)</li>
        </ul>
        <h3 className={styles.h3}>Information collected automatically when you visit our website</h3>
        <ul className={styles.list}>
          <li>Your IP address</li>
          <li>Browser type, version, and device type</li>
          <li>Pages visited, time spent, and navigation path</li>
          <li>Referring website or search term</li>
          <li>General location at country and region level, derived from your IP address</li>
        </ul>
        <h3 className={styles.h3}>Information collected through the client portal</h3>
        <ul className={styles.list}>
          <li>Login credentials (email and encrypted password, managed via Supabase Auth)</li>
          <li>Business performance data, leads, and metrics you or we enter on your behalf</li>
          <li>Communications and change requests submitted through the portal</li>
          <li>Billing and payment records</li>
        </ul>
        <p>We do not collect special category data (health, financial, biometric, or similar sensitive information) through this website or portal.</p>

        <h2 className={styles.h2}>How we use your information and our lawful basis</h2>
        <p>Under UK GDPR, we rely on the following lawful bases:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Purpose</th><th>Data used</th><th>Lawful basis</th></tr>
            </thead>
            <tbody>
              <tr><td>Responding to enquiries and contact form submissions</td><td>Name, email, message content</td><td>Legitimate interests</td></tr>
              <tr><td>Assessing whether our services suit your needs</td><td>All enquiry data</td><td>Legitimate interests</td></tr>
              <tr><td>Delivering the services you have engaged us for</td><td>All client and portal data</td><td>Contract performance</td></tr>
              <tr><td>Managing billing and payments</td><td>Business details, payment records</td><td>Contract performance</td></tr>
              <tr><td>Maintaining the security and integrity of the portal</td><td>Auth and login data</td><td>Legitimate interests</td></tr>
              <tr><td>Improving the website and understanding how it is used</td><td>Analytics data</td><td>Legitimate interests</td></tr>
              <tr><td>Complying with legal obligations (tax records, etc.)</td><td>Financial records</td><td>Legal obligation</td></tr>
              <tr><td>Sending marketing communications</td><td>Email address</td><td>Consent only</td></tr>
            </tbody>
          </table>
        </div>
        <p>We will never send you marketing emails unless you have explicitly opted in. You can withdraw consent at any time by emailing us.</p>

        <h2 className={styles.h2}>Third parties who process your data</h2>
        <p>To deliver our services and operate our website, we use the following third-party processors. Each has been assessed for UK GDPR compliance:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Provider</th><th>Purpose</th><th>Privacy information</th></tr>
            </thead>
            <tbody>
              <tr><td>Supabase</td><td>Secure database, authentication, and portal infrastructure</td><td>supabase.com/privacy</td></tr>
              <tr><td>Resend</td><td>Sending transactional emails (such as enquiry and report notifications)</td><td>resend.com/legal/privacy-policy</td></tr>
              <tr><td>Stripe</td><td>Processing payments and managing billing</td><td>stripe.com/gb/privacy</td></tr>
              <tr><td>Vercel</td><td>Hosting this website and portal</td><td>vercel.com/legal/privacy-policy</td></tr>
              <tr><td>Google (Workspace and Analytics)</td><td>Business email, calendar, and optional website analytics</td><td>policies.google.com/privacy</td></tr>
              <tr><td>Anthropic / OpenAI / third-party AI providers</td><td>Providing AI-powered automations to clients (data shared only as necessary to deliver agreed services)</td><td>anthropic.com/legal/privacy</td></tr>
              <tr><td>Cal.com or Google Calendar</td><td>Managing consultation and client meeting bookings</td><td>cal.com/privacy</td></tr>
            </tbody>
          </table>
        </div>
        <p>We do not sell, rent, or share your personal data with any third party for their own marketing purposes. We only share data with processors as necessary to deliver the services you have engaged us for.</p>
        <p>Where processors are based outside the UK, we ensure adequate safeguards are in place, including UK adequacy decisions or Standard Contractual Clauses.</p>

        <h2 className={styles.h2}>How long we keep your information</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Data</th><th>Retention period</th></tr>
            </thead>
            <tbody>
              <tr><td>Website enquiries that did not become engagements</td><td>12 months from the enquiry date</td></tr>
              <tr><td>Client portal and service delivery data</td><td>6 years from the end of the engagement</td></tr>
              <tr><td>Financial records and invoices</td><td>6 years (HMRC requirement)</td></tr>
              <tr><td>Marketing consent records</td><td>Until consent is withdrawn, plus 12 months</td></tr>
              <tr><td>Website analytics data</td><td>As configured in the analytics platform (typically 26 months)</td></tr>
            </tbody>
          </table>
        </div>
        <p>After the applicable period, data is securely deleted or anonymised.</p>

        <h2 className={styles.h2}>Your rights under UK GDPR</h2>
        <p>You have the right to:</p>
        <ul className={styles.list}>
          <li>Access the personal data we hold about you</li>
          <li>Rectify inaccurate or incomplete data</li>
          <li>Erasure (the right to be forgotten) in certain circumstances</li>
          <li>Restrict how we process your data in certain circumstances</li>
          <li>Data portability, where technically feasible</li>
          <li>Object to processing based on legitimate interests</li>
          <li>Withdraw consent at any time where we rely on consent</li>
        </ul>
        <p>To exercise any right, email us at william.gouldsmith@telosai.co.uk. We will respond within one calendar month.</p>
        <p>If you are not satisfied with how we handle your data, you have the right to complain to the ICO at ico.org.uk/make-a-complaint or by telephone on 0303 123 1113.</p>

        <h2 className={styles.h2}>Cookies</h2>
        <p>We use cookies on this website. For full details of which cookies we use and how to control them, see our <a href="/cookies">Cookie Policy</a>.</p>

        <h2 className={styles.h2}>Changes to this policy</h2>
        <p>We update this policy when our practices change. The date at the top of this page reflects the most recent update. Material changes will be noted on the website.</p>

        <h2 className={styles.h2}>Contact us</h2>
        <p>William Robert Gouldsmith, trading as Telos AI</p>
        <p>Email: william.gouldsmith@telosai.co.uk</p>
        <p>Address: Bristol, United Kingdom (full postal address available on request)</p>
    </LegalShell>
  )
}
