/**
 * ACCOUNT INVITE — sent when master invites an owner, or owner invites a client.
 */

export function accountInvite(vars, branding) {
  const { invitedBy, tier, businessName, setupLink } = vars
  const tierLabel = { owner: 'Business Owner', client: 'Client' }[tier] ?? tier
  const subject   = `You've been invited to ${businessName ?? 'Telos'}`

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden}
.header{background:${branding.primaryColour};padding:28px;text-align:center}
.header img{height:36px}
.body{padding:40px}
h1{color:#111;font-size:22px;font-weight:700;margin:0 0 16px}
p{color:#555;font-size:15px;line-height:1.6;margin:0 0 14px}
.tier-badge{display:inline-block;background:#e0e7ff;color:#4338ca;font-weight:600;font-size:13px;padding:4px 12px;border-radius:20px;margin-bottom:16px}
.btn{display:inline-block;background:${branding.primaryColour};color:#fff;font-weight:600;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none}
.footer{padding:20px 40px;background:#f5f5f5;text-align:center}
.footer p{color:#999;font-size:12px;margin:0}
</style></head><body>
<div class="wrap">
<div class="header"><img src="${branding.logoUrl}" alt="Logo"></div>
<div class="body">
  <h1>You've been invited</h1>
  <span class="tier-badge">${tierLabel}</span>
  <p><strong>${invitedBy}</strong> has invited you to ${businessName ? `join <strong>${businessName}</strong>` : 'create your account'}.</p>
  <p>As a <strong>${tierLabel}</strong>, you'll have access to ${tier === 'owner' ? 'your full business portal, agent configuration, and client management.' : 'your appointments, invoices, and documents in one place.'}</p>
  <a href="${setupLink}" class="btn">Accept invitation</a>
  <p style="font-size:13px;color:#999;margin-top:20px">This invitation expires in 48 hours. If you weren't expecting this, you can safely ignore it.</p>
</div>
<div class="footer"><p>${branding.footerText}</p></div>
</div></body></html>`

  const text = `${invitedBy} has invited you to ${businessName}. Accept: ${setupLink} (expires in 48 hours)`
  return { subject, html, text }
}
