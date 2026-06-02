// Email template for the monthly performance report. Dark, on-brand,
// Telos AI styling. Inline styles only (email clients ignore <style>).

export function monthlyReportEmail(businessName: string, body: string, monthLabel: string): string {
  const paragraphs = body
    .split('\n')
    .filter(Boolean)
    .map(p => `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3A3A3C;">${escapeHtml(p)}</p>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="en-GB"><body style="margin:0;padding:0;background:#0A0510;font-family:Inter,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0510;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#0A0510;padding:28px 32px;">
          <div style="display:inline-block;width:18px;height:5px;background:#7868E6;border-radius:2px;"></div>
          <div style="font-size:18px;font-weight:800;letter-spacing:-0.03em;color:#ffffff;margin-top:8px;">Telos AI</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7868E6;">${escapeHtml(monthLabel)} report</p>
          <h1 style="margin:0 0 24px;font-size:24px;font-weight:800;letter-spacing:-0.04em;color:#1D1D1F;">${escapeHtml(businessName)}</h1>
          ${paragraphs}
          <a href="https://telosai.co.uk/portal" style="display:inline-block;margin-top:16px;background:#7868E6;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 28px;border-radius:980px;">View your dashboard</a>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #F0F0F2;">
          <p style="margin:0;font-size:12px;color:#6B6B6F;">Telos AI. AI systems built for service businesses.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
