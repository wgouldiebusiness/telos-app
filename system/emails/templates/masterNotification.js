/**
 * MASTER NOTIFICATION — structured summary emails to the Telos master account.
 * Covers: new owner created, suspension, billing failure, system error, agent connected.
 */

const eventDescriptions = {
  new_owner_created:        'A new business owner account has been created.',
  owner_suspended:          'A business owner account has been suspended.',
  billing_failure:          'A payment failure has been detected.',
  system_error:             'A system error occurred.',
  owner_connected_agent:    'A business owner has connected a new integration.',
  account_reinstated:       'An account has been reinstated.',
}

export function masterNotification(vars, branding) {
  const { event, ownerName, ownerEmail, details, timestamp } = vars
  const description = eventDescriptions[event] ?? event
  const subject     = `Telos Alert: ${description}`

  const detailRows = details
    ? Object.entries(details)
        .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;font-size:13px;font-weight:600;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#333;font-size:13px">${v}</td></tr>`)
        .join('')
    : ''

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:#111;padding:20px 28px;display:flex;align-items:center;justify-content:space-between}
.header img{height:28px}
.header span{color:rgba(255,255,255,.5);font-size:12px}
.body{padding:32px 28px}
h1{color:#111;font-size:18px;font-weight:700;margin:0 0 8px}
.event-badge{display:inline-block;background:#e0e7ff;color:#3730a3;font-weight:600;font-size:11px;padding:3px 9px;border-radius:4px;letter-spacing:.03em;text-transform:uppercase;margin-bottom:14px}
p{color:#555;font-size:14px;line-height:1.6;margin:0 0 12px}
table{width:100%;border-collapse:collapse;background:#f8f8f8;border-radius:6px;margin:16px 0;overflow:hidden}
.footer{padding:16px 28px;background:#f5f5f5;text-align:center}
.footer p{color:#bbb;font-size:11px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Telos"><span>${timestamp ?? new Date().toISOString()}</span></div>
<div class="body">
  <span class="event-badge">${event}</span>
  <h1>${description}</h1>
  ${ownerName ? `<p><strong>Account:</strong> ${ownerName}${ownerEmail ? ` (${ownerEmail})` : ''}</p>` : ''}
  ${detailRows ? `<table>${detailRows}</table>` : ''}
  <p style="margin-top:16px"><a href="https://master.telosai.co.uk" style="color:${branding.primaryColour}">Open master dashboard →</a></p>
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `Telos Alert: ${description}\n${ownerName ? `Account: ${ownerName} (${ownerEmail})\n` : ''}Time: ${timestamp}`
  return { subject, html, text }
}
