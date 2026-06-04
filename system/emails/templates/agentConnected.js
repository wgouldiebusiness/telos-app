/**
 * AGENT CONNECTED — sent when an integration is connected or disconnected.
 */

export function agentConnected(vars, branding) {
  const { event, agentId, connectedBy, reason, timestamp } = vars
  const isDisconnect = event === 'agent_disconnected_by_telos' || event === 'agent_disconnected'
  const subject = isDisconnect ? `Integration disconnected: ${agentId}` : `Integration connected: ${agentId}`

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:${isDisconnect ? '#dc2626' : branding.primaryColour};padding:28px;text-align:center}
.header img{height:36px}
.body{padding:40px}
h1{color:#111;font-size:22px;font-weight:700;margin:0 0 14px}
p{color:#555;font-size:15px;line-height:1.6;margin:0 0 14px}
.status{display:inline-block;background:${isDisconnect ? '#fee2e2' : '#dcfce7'};color:${isDisconnect ? '#dc2626' : '#16a34a'};font-weight:700;font-size:13px;padding:4px 12px;border-radius:20px;margin-bottom:16px}
.details{background:#f8f8f8;border-radius:6px;padding:16px 20px;margin:20px 0}
.details p{color:#666;font-size:13px;margin:0 0 6px}
.btn{display:inline-block;background:${branding.primaryColour};color:#fff;font-weight:600;font-size:14px;padding:11px 22px;border-radius:6px;text-decoration:none}
.footer{padding:20px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">
  <h1>${isDisconnect ? 'Integration disconnected' : 'Integration connected'}</h1>
  <span class="status">${isDisconnect ? '⚠ Disconnected' : '✓ Connected'}</span>
  <p><strong>${agentId}</strong> has been ${isDisconnect ? 'disconnected from' : 'connected to'} your account${connectedBy ? ` by ${connectedBy}` : ''}.</p>
  ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
  ${!isDisconnect ? `<p>This integration will now run automatically as configured. You can disconnect it at any time from your dashboard.</p>` : ''}
  <div class="details">
    <p><strong>Integration:</strong> ${agentId}</p>
    <p><strong>Action:</strong> ${isDisconnect ? 'Disconnected' : 'Connected'}</p>
    <p><strong>Time:</strong> ${timestamp ?? new Date().toISOString()}</p>
  </div>
  ${!isDisconnect ? `<a href="https://portal.telosai.co.uk/integrations" class="btn">Manage integrations</a>` : ''}
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `${subject}\nIntegration: ${agentId}\nTime: ${timestamp}`
  return { subject, html, text }
}
