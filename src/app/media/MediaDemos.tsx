'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './demos.module.css'

interface IgPostProps {
  handle:      string
  location:    string
  image:       string
  imageAlt:    string
  /** object-position override for the photo crop */
  imagePos?:   string
  caption:     string
  tags:        string
  likes:       number
  comments:    number
  timeAgo:     string
}

/* ─────────────────────────────────────────
   Instagram-style post (real photo content)
───────────────────────────────────────── */
function InstagramPost({
  handle, location, image, imageAlt, imagePos,
  caption, tags, likes, comments, timeAgo,
}: IgPostProps) {
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
          <div className={styles.igHandle}>{handle}</div>
          <div className={styles.igLocation}>{location}</div>
        </div>
        <button className={styles.igMore} aria-label="More options">
          <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor">
            <circle cx="2" cy="2" r="2"/><circle cx="9" cy="2" r="2"/><circle cx="16" cy="2" r="2"/>
          </svg>
        </button>
      </div>

      {/* Photo */}
      <div className={styles.igImgWrap}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={styles.igImg}
          sizes="(max-width: 600px) 100vw, 380px"
          style={imagePos ? { objectPosition: imagePos } : undefined}
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
      <div className={styles.igLikes}>{(liked ? likes + 1 : likes).toLocaleString()} likes</div>

      {/* Caption */}
      <div className={styles.igCaption}>
        <span className={styles.igCaptionHandle}>{handle}</span>{' '}
        {caption}
        <span className={styles.igTags}> {tags}</span>
      </div>

      {/* Comments teaser */}
      <button className={styles.igViewComments}>View all {comments} comments</button>
      <div className={styles.igTimestamp}>{timeAgo}</div>
    </div>
  )
}

/* ── Main export ── */
export default function MediaDemos() {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Instagram Post · Pizzeria</div>
        <InstagramPost
          handle="pizzaco.uk"
          location="Bristol, UK"
          image="/demos/stitch-pizza/stitch_modern_authentic_pizza_co/e529550c4e8ddddc059b8159edb862c7.jpg/screen.png"
          imageAlt="Wood-fired Margherita pizza with a fresh mozzarella pull"
          imagePos="left center"
          caption="48-hour dough, San Marzano D.O.P, mozzarella di bufala. 🍕 The Margherita that started it all. Order online, link in bio."
          tags="#pizzaco #woodfired #neapolitanpizza #bristoleats #margherita"
          likes={3127}
          comments={64}
          timeAgo="3 hours ago"
        />
      </div>
      <div className={styles.cell}>
        <div className={styles.cellLabel}>Instagram Post · Coffee</div>
        <InstagramPost
          handle="slowcup.coffee"
          location="Shoreditch, London"
          image="/demos/stitch-coffee/stitch_coffee_co_website_design/8d361a5c9690863189b7ef14919ae243.jpg/screen.png"
          imageAlt="Hands holding Slow Cup takeaway coffees"
          imagePos="center"
          caption="Cups for the whole table ☕ Single-origin, slow-poured, made for lingering. New autumn blend landed this week, link in bio."
          tags="#slowcup #specialtycoffee #flatwhite #londoncoffee #slowmornings"
          likes={962}
          comments={27}
          timeAgo="2 hours ago"
        />
      </div>
    </div>
  )
}
