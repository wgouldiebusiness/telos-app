'use client'
import { useState } from 'react'
import styles from './demos.module.css'

/* ── Social Media Post mockup ── */
function SocialPost() {
  const [liked, setLiked] = useState(false)

  return (
    <div className={styles.socialCard}>
      <div className={styles.socialHeader}>
        <div className={styles.socialAvatar} />
        <div>
          <div className={styles.socialName}>your_brand</div>
          <div className={styles.socialMeta}>Sponsored</div>
        </div>
        <span className={styles.socialMore}>···</span>
      </div>

      {/* Post image */}
      <div className={styles.socialImg}>
        <div className={styles.socialImgInner}>
          <span className={styles.socialImgText}>Your Brand Creative</span>
          <span className={styles.socialImgSub}>crafted by Telos Media</span>
        </div>
      </div>

      <div className={styles.socialActions}>
        <button
          className={`${styles.socialBtn} ${liked ? styles.socialBtnLiked : ''}`}
          onClick={() => setLiked(l => !l)}
          aria-label="Like"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? '#E8352A' : 'none'} stroke={liked ? '#E8352A' : 'currentColor'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button className={styles.socialBtn} aria-label="Comment">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button className={styles.socialBtn} aria-label="Share">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div className={styles.socialLikes}>{liked ? '1,248' : '1,247'} likes</div>
      <div className={styles.socialCaption}>
        <span className={styles.socialCaptionUser}>your_brand</span>{' '}
        On-brand content, every week. Written in your voice. Published on your behalf. ✨
      </div>
    </div>
  )
}

/* ── AI Video thumbnail mockup ── */
function VideoThumbnail() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={styles.videoCard} onClick={() => setPlaying(p => !p)}>
      <div className={styles.videoBg}>
        <div className={styles.videoOverlay} style={{ opacity: playing ? 0 : 1 }}>
          <div className={styles.videoPlayBtn}>
            <svg width="20" height="22" viewBox="0 0 20 22" fill="white">
              <path d="M2 2l16 9-16 9V2z"/>
            </svg>
          </div>
          <div className={styles.videoDuration}>0:45</div>
        </div>
        {playing && (
          <div className={styles.videoPlaying}>
            <div className={styles.videoBar}>
              <div className={styles.videoBarFill} />
            </div>
            <span className={styles.videoPlayingLabel}>AI Brand Film — playing</span>
          </div>
        )}
        <div className={styles.videoBadge}>AI Brand Video</div>
      </div>
      <div className={styles.videoMeta}>
        <span className={styles.videoTitle}>Your 60-second brand film</span>
        <span className={styles.videoSub}>Cinematic quality · AI production · 5-day turnaround</span>
      </div>
    </div>
  )
}

/* ── Ad Creative mockup ── */
function AdCreative() {
  const [variant, setVariant] = useState(0)

  const variants = [
    { headline: 'The smartest move your brand makes this year.', cta: 'Learn More',    bg: 'rgba(120,104,230,.18)' },
    { headline: 'More clients. Less effort. Starting this month.', cta: 'Get Started', bg: 'rgba(0,180,150,.18)'   },
    { headline: 'Your competitors are already doing this.',        cta: 'Find Out How', bg: 'rgba(220,80,60,.18)'   },
  ]

  const v = variants[variant]

  return (
    <div className={styles.adCard}>
      <div className={styles.adPlatform}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span>Sponsored</span>
      </div>

      <div className={styles.adImgWrap} style={{ background: v.bg }}>
        <div className={styles.adImgText}>{v.headline}</div>
      </div>

      <div className={styles.adMeta}>
        <div>
          <div className={styles.adBrand}>Your Brand Name</div>
          <div className={styles.adHeadline}>{v.headline}</div>
        </div>
        <button className={styles.adCta}>{v.cta}</button>
      </div>

      <div className={styles.adVariants}>
        {variants.map((_, i) => (
          <button
            key={i}
            className={`${styles.adVariantDot} ${variant === i ? styles.adVariantActive : ''}`}
            onClick={() => setVariant(i)}
            aria-label={`Variant ${i + 1}`}
          />
        ))}
        <span className={styles.adVariantLabel}>A/B variant {variant + 1} of {variants.length}</span>
      </div>
    </div>
  )
}

/* ── Reel phone mockup ── */
function ReelPhone() {
  const reels = [
    { title: 'Behind the brand', views: '142K', tags: ['#branding', '#creative'] },
    { title: '3 things we changed', views: '89K',  tags: ['#growth', '#tips'] },
    { title: 'How it started vs now', views: '210K', tags: ['#story', '#brand'] },
  ]
  const [active, setActive] = useState(0)
  const r = reels[active]

  return (
    <div className={styles.reelPhone}>
      <div className={styles.reelScreen}>
        <div className={styles.reelIsland} />
        <div className={styles.reelContent}>
          <div className={styles.reelMeta}>
            <span className={styles.reelTitle}>{r.title}</span>
            <div className={styles.reelTags}>
              {r.tags.map(t => <span key={t} className={styles.reelTag}>{t}</span>)}
            </div>
          </div>
          <div className={styles.reelSide}>
            <div className={styles.reelAction}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>24K</span>
            </div>
            <div className={styles.reelAction}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>831</span>
            </div>
            <div className={styles.reelViews}>
              <span className={styles.reelViewCount}>{r.views}</span>
              <span>views</span>
            </div>
          </div>
        </div>

        {/* Reel nav dots */}
        <div className={styles.reelDots}>
          {reels.map((_, i) => (
            <button
              key={i}
              className={`${styles.reelDot} ${active === i ? styles.reelDotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Reel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main export ── */
export default function MediaDemos() {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Social Media Content</div>
        <SocialPost />
      </div>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Paid Ad Creative</div>
        <AdCreative />
      </div>
    </div>
  )
}
