import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://telosai.co.uk'
  const now  = new Date()

  return [
    { url: base,                  lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/solutions`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.95 },
    { url: `${base}/process`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/results`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
