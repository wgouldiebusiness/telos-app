import type { Metadata } from 'next'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What cookies Telos AI uses and how to control them.',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>Cookie Policy</h1>
        <p className={styles.meta}>Last updated: 30 June 2026</p>

        <h2 className={styles.h2}>What are cookies?</h2>
        <p>Cookies are small text files that a website places on your device when you visit. They are widely used to make websites work correctly, to remember your preferences, and to give us information about how the site is being used.</p>

        <h2 className={styles.h2}>What cookies we use</h2>
        <p>We use as few cookies as possible. Essential cookies are always on because the site cannot work without them. Optional cookies &mdash; analytics, and advertising cookies when we run ad campaigns &mdash; are only set if you accept them through our cookie banner. You can decline these and the site will still work normally.</p>

        <h3 className={styles.h3}>Essential cookies</h3>
        <p>These are required for the website and portal to function. They cannot be switched off. They do not store any personally identifiable information.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>sb-[ref]-auth-token</td>
                <td>Supabase</td>
                <td>Keeps you logged in to the client portal securely. Without this cookie, the portal cannot function.</td>
                <td>Session or up to 1 week</td>
              </tr>
              <tr>
                <td>__vercel_live_token</td>
                <td>Vercel</td>
                <td>Used by Vercel&rsquo;s infrastructure during preview deployments. Not present on the live site.</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.h3}>Analytics cookies</h3>
        <p>These help us understand how visitors use our website so we can improve it. They are only set if you give your consent via the cookie banner when you first visit the site.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Google Analytics</td>
                <td>Distinguishes unique visitors. No personally identifiable data is stored.</td>
                <td>2 years</td>
              </tr>
              <tr>
                <td>_ga_[ID]</td>
                <td>Google Analytics</td>
                <td>Maintains session state for Google Analytics 4.</td>
                <td>2 years</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>We configure Google Analytics with IP anonymisation enabled. No full IP addresses are sent to Google.</p>

        <h3 className={styles.h3}>Advertising and marketing cookies</h3>
        <p>When we run advertising campaigns, we may set advertising cookies from platforms such as Meta (Facebook/Instagram) and Google Ads. These help us measure how well our ads perform and may involve those providers tracking activity across other websites. They are only ever set after you accept them through our cookie banner, and they are not set if you decline. If we are not currently running campaigns, these cookies will not be present.</p>

        <h3 className={styles.h3}>Functional cookies</h3>
        <p>These remember your preferences to improve your experience. They are only set when you use a specific feature.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Cookie name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>telos-cookie-consent</td>
                <td>Telos AI</td>
                <td>Remembers whether you have accepted or declined optional analytics and advertising cookies.</td>
                <td>12 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={styles.h2}>How to control cookies</h2>
        <p><strong>Browser settings:</strong> You can block or delete cookies through your browser settings at any time. This may affect how some parts of the website work. For guidance, visit aboutcookies.org.</p>
        <p><strong>Our cookie banner:</strong> When you first visit our website, you will be shown a cookie consent banner. You can accept or decline analytics cookies at that point, and you can change your preference at any time by clearing your cookies and revisiting the site.</p>
        <p><strong>Opting out of Google Analytics:</strong> You can install the Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout to prevent your data from being used by Google Analytics across all websites.</p>

        <h2 className={styles.h2}>Changes to this policy</h2>
        <p>We will update this policy if we add or remove cookies or change how we use them. The date at the top of the page reflects the most recent update.</p>

        <h2 className={styles.h2}>Contact us</h2>
        <p>If you have questions about our use of cookies, email us at william.gouldsmith@telosai.co.uk.</p>
      </div>
    </div>
  )
}
