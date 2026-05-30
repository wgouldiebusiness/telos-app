import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://telosai.co.uk'
  const now = new Date()

  return [
    { url: base,             lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/process`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/results`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
