'use client'

import { useState } from 'react'
import type { SocialPost } from './types'
import styles from './SocialContentPage.module.css'

const ALL_PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'X']

export default function SocialContentPage() {
  const [topic, setTopic] = useState('')
  const [platforms, setPlatforms] = useState<string[]>(['Instagram', 'Facebook'])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [approved, setApproved] = useState<Record<number, boolean>>({})

  function togglePlatform(p: string) {
    setPlatforms(prev => (prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]))
  }

  async function generate() {
    if (!topic.trim() || loading) return
    setLoading(true)
    setError('')
    setPosts([])
    setApproved({})

    try {
      const res = await fetch('/api/social-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: 'Your business',
          industry: 'service business',
          tone: 'friendly and professional',
          topic: topic.trim(),
          platforms,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Could not generate posts.')
      } else {
        setPosts(data.posts || [])
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Content studio</h1>
      <p className={styles.sub}>
        Enter a topic or service to promote. We will write a week of posts in your voice.
        Review, edit, and approve the ones you want.
      </p>

      <div className={styles.form}>
        <input
          className={styles.input}
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="e.g. our new Tuesday evening clinic slots"
          aria-label="Topic"
        />
        <div className={styles.platforms}>
          {ALL_PLATFORMS.map(p => (
            <button
              key={p}
              type="button"
              className={`${styles.chip} ${platforms.includes(p) ? styles.chipOn : ''}`}
              onClick={() => togglePlatform(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <button className={styles.generate} onClick={generate} disabled={loading || !topic.trim()}>
          {loading ? 'Writing your week of posts...' : 'Generate posts'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.posts}>
        {posts.map((post, i) => (
          <div key={i} className={`${styles.card} ${approved[i] ? styles.cardApproved : ''}`}>
            <div className={styles.cardHead}>
              <span className={styles.day}>{post.day}</span>
              <span className={styles.time}>{post.bestTime}</span>
            </div>
            <textarea
              className={styles.caption}
              value={post.caption}
              onChange={e => {
                const next = [...posts]
                next[i] = { ...post, caption: e.target.value }
                setPosts(next)
              }}
              rows={4}
            />
            <div className={styles.hashtags}>
              {post.hashtags.map((h, j) => (
                <span key={j} className={styles.hashtag}>#{h}</span>
              ))}
            </div>
            <button
              className={styles.approve}
              onClick={() => setApproved(a => ({ ...a, [i]: !a[i] }))}
            >
              {approved[i] ? 'Approved' : 'Approve'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
