import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://telosai.co.uk'
  const updated = new Date('2026-05-31')

  return [
    { url: base,                  lastModified: updated, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/solutions`,   lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`,     lastModified: updated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,     lastModified: updated, changeFrequency: 'yearly',  priority: 0.95 },
    { url: `${base}/process`,     lastModified: updated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,       lastModified: updated, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/results`,     lastModified: updated, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
