'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './demos.module.css'

/* ─────────────────────────────────────────
   Instagram-style post
   Image: Aura Kin luxury salon website screenshot
───────────────────────────────────────── */
function InstagramPost() {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className={styles.igCard}>
      {/* Header */}
      <div className={styles.igHeader}>
        <div className={styles.igAvatarWrap}>
          <div className={styles.igAvatar} />
          <div className={styles.igOnline} />
        </div>
        <div className={styles.igHeaderText}>
          <div className={styles.igHandle}>aura.kin</div>
          <div className={styles.igLocation}>London, UK</div>
        </div>
        <button className={styles.igMore} aria-label="More options">
          <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor">
            <circle cx="2" cy="2" r="2"/><circle cx="9" cy="2" r="2"/><circle cx="16" cy="2" r="2"/>
          </svg>
        </button>
      </div>

      {/* Photo — Aura Kin salon screenshot */}
      <div className={styles.igImgWrap}>
        <Image
          src="/demos/coffee/stitch_aura_kin_logo/13b59a3a81cd189add1801293066ab26.jpg/screen.png"
          alt="Aura Kin luxury salon"
          fill
          className={styles.igImg}
          sizes="(max-width: 600px) 100vw, 380px"
        />
        <div className={styles.igImgOverlay} />
      </div>

      {/* Actions */}
      <div className={styles.igActions}>
        <div className={styles.igLeft}>
          <button
            className={`${styles.igBtn} ${liked ? styles.igBtnLiked : ''}`}
            onClick={() => setLiked(l => !l)}
            aria-label="Like"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? '#e0245e' : 'none'} stroke={liked ? '#e0245e' : 'currentColor'} strokeWidth="1.7">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className={styles.igBtn} aria-label="Comment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className={styles.igBtn} aria-label="Share">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <button
          className={`${styles.igBtn} ${saved ? styles.igBtnSaved : ''}`}
          onClick={() => setSaved(s => !s)}
          aria-label="Save"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      {/* Likes */}
      <div className={styles.igLikes}>{liked ? '2,419' : '2,418'} likes</div>

      {/* Caption */}
      <div className={styles.igCaption}>
        <span className={styles.igCaptionHandle}>aura.kin</span>{' '}
        Luxury you can feel from the first scroll. New season treatments now booking.
        Book your appointment via the link in bio. ✨
        <span className={styles.igTags}> #luxurysalon #skincare #London #selfcare #beautytreatments</span>
      </div>

      {/* Comments teaser */}
      <button className={styles.igViewComments}>View all 47 comments</button>
      <div className={styles.igTimestamp}>2 hours ago</div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Facebook-style ad
   Image: Lavisha Cleaning website screenshot
───────────────────────────────────────── */
function FacebookAd() {
  const [reacted, setReacted] = useState(false)

  return (
    <div className={styles.fbCard}>
      {/* Ad header */}
      <div className={styles.fbHeader}>
        <div className={styles.fbPageAvatar} />
        <div className={styles.fbHeaderText}>
          <div className={styles.fbPageName}>Lavisha Cleaning</div>
          <div className={styles.fbMeta}>
            Sponsored ·{' '}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        </div>
        <button className={styles.fbMore} aria-label="More options">
          <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor">
            <circle cx="2" cy="2" r="2"/><circle cx="9" cy="2" r="2"/><circle cx="16" cy="2" r="2"/>
          </svg>
        </button>
      </div>

      {/* Ad copy */}
      <p className={styles.fbBody}>
        Tired of unreliable cleaners? Lavisha delivers a premium, fully managed cleaning service for homes and businesses across London. Book your first clean today.
      </p>

      {/* Ad image — Lavisha Cleaning screenshot */}
      <div className={styles.fbImgWrap}>
        <Image
          src="/demos/pizza/stitch_transparent_service_hub/6ec0ab32f3013e68b9688c55368ceb2a.jpg/screen.png"
          alt="Lavisha Cleaning website"
          fill
          className={styles.fbImg}
          sizes="(max-width: 600px) 100vw, 380px"
        />
      </div>

      {/* Link preview strip */}
      <div className={styles.fbLinkStrip}>
        <div>
          <div className={styles.fbLinkDomain}>lavishacleaning.co.uk</div>
          <div className={styles.fbLinkHeadline}>Luxury Cleaning Made Simple</div>
          <div className={styles.fbLinkSub}>Professional cleaning for homes and businesses across London.</div>
        </div>
        <a href="#booking" className={styles.fbCta}>Get a Quote</a>
      </div>

      {/* Reactions */}
      <div className={styles.fbReactionBar}>
        <div className={styles.fbReactionIcons}>
          <span>👍</span><span>❤️</span><span>😮</span>
          <span className={styles.fbReactionCount}>1,847</span>
        </div>
        <div className={styles.fbCommentCount}>214 comments · 89 shares</div>
      </div>

      {/* Action buttons */}
      <div className={styles.fbActions}>
        <button
          className={`${styles.fbActionBtn} ${reacted ? styles.fbActionBtnActive : ''}`}
          onClick={() => setReacted(r => !r)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={reacted ? '#1877F2' : 'none'} stroke={reacted ? '#1877F2' : 'currentColor'} strokeWidth="1.6">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          {reacted ? 'Liked' : 'Like'}
        </button>
        <button className={styles.fbActionBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Comment
        </button>
        <button className={styles.fbActionBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>
      </div>
    </div>
  )
}

/* ── Main export ── */
export default function MediaDemos() {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Instagram Post</div>
        <InstagramPost />
      </div>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Facebook Ad</div>
        <FacebookAd />
      </div>
    </div>
  )
}
