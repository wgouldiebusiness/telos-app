/**
 * PASSWORD RESET EMAIL — includes reset link, expiry warning,
 * device details, and "wasn't me" security note.
 */

export function passwordReset(vars, branding) {
  const { resetLink, ip, userAgent, timestamp } = vars
  const subject = 'Reset your password'

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:${branding.primaryColour};padding:28px;text-align:center}
.header img{height:36px}
.body{padding:40px}
h1{color:#111;font-size:22px;font-weight:700;margin:0 0 16px}
p{color:#555;font-size:15px;line-height:1.6;margin:0 0 14px}
.btn{display:inline-block;background:${branding.primaryColour};color:#fff;font-weight:600;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none}
.warn{background:#fff8e1;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:0 6px 6px 0;margin:20px 0}
.warn p{color:#92400e;font-size:14px;margin:0}
.device{background:#f8f8f8;border-radius:6px;padding:16px 20px;margin:20px 0}
.device p{color:#666;font-size:13px;margin:0 0 4px}
.security-btn{display:inline-block;background:#ef4444;color:#fff;font-weight:600;font-size:14px;padding:11px 22px;border-radius:6px;text-decoration:none;margin-top:12px}
.footer{padding:24px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">
  <h1>Reset your password</h1>
  <p>We received a request to reset the password for your account. Click the button below to set a new one.</p>
  <a href="${resetLink}" class="btn">Reset my password</a>
  <div class="warn">
    <p><strong>⚠️ This link expires in 1 hour.</strong> If you don't use it within that time, you'll need to request another.</p>
  </div>
  <div class="device">
    <p><strong>Request details:</strong></p>
    <p>Time: ${timestamp}</p>
    <p>IP address: ${ip ?? 'Unknown'}</p>
    <p>Device: ${userAgent ?? 'Unknown'}</p>
  </div>
  <p>If you didn't request this, your account may be at risk.</p>
  <a href="https://portal.telosai.co.uk/security/revoke" class="security-btn">This wasn't me — secure my account</a>
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `Reset your password: ${resetLink}\n\nExpires in 1 hour.\nRequested from IP: ${ip}\nIf this wasn't you, contact support immediately.`
  return { subject, html, text }
}
