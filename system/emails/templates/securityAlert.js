/**
 * SECURITY ALERT EMAIL — dynamically describes any security event.
 * Always includes timestamp, IP, device, and a "wasn't me" revoke button.
 */

const eventLabels = {
  failed_login:      'Failed login attempt',
  account_locked:    'Account locked',
  new_device_login:  'New device sign-in',
  password_changed:  'Password changed',
  email_changed:     'Email address changed',
  account_suspended: 'Account suspended',
  suspicious_activity: 'Suspicious activity detected',
}

export function securityAlert(vars, branding) {
  const { event, reason, timestamp, ip, userAgent } = vars
  const label = eventLabels[event] ?? 'Security event'
  const subject = `Security alert: ${label}`

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:#dc2626;padding:28px;text-align:center}
.header img{height:36px}
.body{padding:40px}
h1{color:#111;font-size:22px;font-weight:700;margin:0 0 8px}
.event-label{display:inline-block;background:#fee2e2;color:#dc2626;font-weight:700;font-size:13px;padding:4px 10px;border-radius:4px;margin-bottom:16px}
p{color:#555;font-size:15px;line-height:1.6;margin:0 0 14px}
.details{background:#f8f8f8;border-radius:6px;padding:16px 20px;margin:20px 0}
.details p{color:#666;font-size:13px;margin:0 0 6px}
.security-btn{display:inline-block;background:#dc2626;color:#fff;font-weight:600;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none;margin-top:8px}
.footer{padding:20px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">
  <h1>Security alert</h1>
  <span class="event-label">${label}</span>
  <p>${reason ? `Reason: ${reason}` : 'We detected activity on your account that you should be aware of.'}</p>
  <div class="details">
    <p><strong>Event:</strong> ${label}</p>
    <p><strong>Time:</strong> ${timestamp ?? new Date().toISOString()}</p>
    <p><strong>IP address:</strong> ${ip ?? 'Not available'}</p>
    <p><strong>Device:</strong> ${userAgent ?? 'Not available'}</p>
  </div>
  <p>If this was you, no action is needed. If it wasn't, click below to immediately revoke all active sessions and secure your account.</p>
  <a href="https://portal.telosai.co.uk/security/revoke" class="security-btn">This wasn't me — secure my account</a>
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `Security alert: ${label}\nTime: ${timestamp}\nIP: ${ip}\nIf this wasn't you, visit https://portal.telosai.co.uk/security/revoke`
  return { subject, html, text }
}
