/**
 * WELCOME EMAIL — differs by tier.
 * Master: full capability overview.
 * Owner: setup checklist with invite link.
 * Client: branded with owner's business name/logo.
 */

function base(content, branding) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:${branding.primaryColour};padding:32px;text-align:center}
.header img{height:40px}
.body{padding:40px}
h1{color:#111;font-size:24px;font-weight:700;margin:0 0 16px}
p{color:#555;font-size:16px;line-height:1.6;margin:0 0 16px}
.btn{display:inline-block;background:${branding.primaryColour};color:#fff;font-weight:600;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none;margin:8px 0}
.checklist{background:#f8f8f8;border-radius:6px;padding:20px 24px;margin:20px 0}
.checklist li{color:#444;font-size:15px;line-height:1.8;margin:0}
.footer{padding:24px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">${content}</div>
<div class="footer"><p>${branding.footerText}</p><p style="margin-top:8px">${branding.unsubscribeText}</p></div>
</div></body></html>`
}

/**
 * @param {{ tier: string, name: string, businessName?: string, setupLink?: string, portalLink?: string }} vars
 * @param {Object} branding
 * @returns {{ subject: string, html: string, text: string }}
 */
export function welcome(vars, branding) {
  const { tier, name, businessName, setupLink, portalLink } = vars

  if (tier === 'master') {
    const html = base(`
      <h1>Your Telos master account is ready.</h1>
      <p>Hi ${name},</p>
      <p>You now have full visibility and control over your Telos platform. Here's what you can do:</p>
      <ul class="checklist">
        <li>✓ Create and manage business owner accounts</li>
        <li>✓ Monitor all agent connections and system health</li>
        <li>✓ View billing across all accounts</li>
        <li>✓ Impersonate owner accounts for support</li>
        <li>✓ Suspend or reinstate accounts instantly</li>
      </ul>
      <a href="https://master.telosai.co.uk" class="btn">Open Master Dashboard</a>
    `, branding)
    return { subject: 'Your Telos master account is ready', html, text: `Hi ${name}, your Telos master account is active.` }
  }

  if (tier === 'owner') {
    const html = base(`
      <h1>Welcome to Telos, ${name}.</h1>
      <p>Your portal for <strong>${businessName}</strong> is ready. Let's get set up.</p>
      <div class="checklist">
        <p style="font-weight:600;color:#111;margin-bottom:8px">Getting started checklist:</p>
        <ul>
          <li>☐ Set your password using the link below</li>
          <li>☐ Connect your Stripe account (for payments)</li>
          <li>☐ Connect your calendar (for bookings)</li>
          <li>☐ Invite your first client</li>
        </ul>
      </div>
      <a href="${setupLink}" class="btn">Set up my account</a>
      <p style="font-size:13px;color:#999;margin-top:16px">This link expires in 48 hours. If you didn't expect this, contact hello@telosai.co.uk.</p>
    `, branding)
    return { subject: `Welcome to Telos — set up ${businessName}`, html, text: `Welcome ${name}. Set up your account: ${setupLink}` }
  }

  // client tier
  const html = base(`
    <h1>Welcome to ${businessName}.</h1>
    <p>Hi ${name},</p>
    <p>Your personal portal is ready. You can now see your appointments, invoices, and messages — all in one place.</p>
    <a href="${portalLink}" class="btn">Open my portal</a>
    <p style="font-size:13px;color:#999;margin-top:16px">This link is valid for 15 minutes. You can always request a new one from the login page.</p>
  `, { ...branding })
  return { subject: `Welcome to ${businessName} — your portal is ready`, html, text: `Hi ${name}, access your portal: ${portalLink}` }
}
