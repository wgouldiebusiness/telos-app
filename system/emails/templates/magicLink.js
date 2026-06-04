/**
 * MAGIC LINK EMAIL — passwordless login. Single-use, 15-minute expiry.
 */

export function magicLink(vars, branding) {
  const { loginLink, userAgent, ip } = vars
  const subject = 'Your login link'

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:${branding.primaryColour};padding:28px;text-align:center}
.header img{height:36px}
.body{padding:40px;text-align:center}
h1{color:#111;font-size:22px;font-weight:700;margin:0 0 12px}
p{color:#555;font-size:15px;line-height:1.6;margin:0 0 20px}
.btn{display:inline-block;background:${branding.primaryColour};color:#fff;font-weight:700;font-size:17px;padding:18px 40px;border-radius:8px;text-decoration:none}
.note{background:#f0f9ff;border-radius:6px;padding:16px;margin:24px 0;text-align:left}
.note p{color:#0369a1;font-size:13px;margin:0}
.security-btn{display:inline-block;background:#ef4444;color:#fff;font-size:13px;font-weight:600;padding:9px 18px;border-radius:6px;text-decoration:none}
.footer{padding:20px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">
  <h1>Your login link</h1>
  <p>Click the button below to sign in. This link expires in 15 minutes and can only be used once.</p>
  <a href="${loginLink}" class="btn">Log in now</a>
  <div class="note">
    <p><strong>Security note:</strong> Requested from ${userAgent ?? 'unknown device'} · IP: ${ip ?? 'unknown'}.</p>
    <p style="margin-top:8px">If you didn't request this, someone may have entered your email. No action needed unless you click the link above.</p>
  </div>
  <a href="https://portal.telosai.co.uk/security/revoke" class="security-btn">This wasn't me</a>
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `Your login link (valid 15 min, one use): ${loginLink}`
  return { subject, html, text }
}
