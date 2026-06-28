'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from '@/components/motion/HoverSlider'
import styles from './demos.module.css'

interface IgPostProps {
  handle:      string
  location:    string
  image:       string
  imageAlt:    string
  /** object-position override for the photo crop */
  imagePos?:   string
  /** scale applied to the photo (screenshots zoom in; finished posters use 1) */
  imageScale?: number
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
  handle, location, image, imageAlt, imagePos, imageScale = 1,
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
          <div className={styles.igHandle}>
            {handle}
            <span className={styles.igDemoTag}>DEMO</span>
          </div>
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
          style={{
            objectPosition: imagePos ?? 'center',
            transform: `scale(${imageScale})`,
            transformOrigin: imagePos ?? 'center',
          }}
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

/* ── The four demo posts, in order: burger, clothing, coffee, run club ── */
const POSTS: (IgPostProps & { id: string; brand: string })[] = [
  {
    id: 'burger',
    brand: 'Rebel Burgers',
    handle: 'rebelburgers.demo',
    location: 'Bristol, UK',
    image: '/media/burger-ig-post.jpg',
    imageAlt: 'Double smash burger with melted cheese on a toasted brioche bun',
    caption: 'A delicious, perfect burger. 🍔 Double smash, double cheese, our house sauce. Stacked fresh to order — dine in or order online, link in bio.',
    tags: '#smashburger #burgersofinstagram #bristoleats #foodie #cheeseburger',
    likes: 4218,
    comments: 87,
    timeAgo: '2 hours ago',
  },
  {
    id: 'clothing',
    brand: 'NISB Apparel',
    handle: 'nisb.demo',
    location: 'London, UK',
    image: '/media/clothing-ig-post.jpg',
    imageAlt: 'NISB clothing rail with denim, knitwear and a hoodie, blurred crowd passing',
    caption: 'Bored State; — the new drop. 🧥 Considered staples in washed denim, heavyweight knit and brushed fleece. Online now, link in bio.',
    tags: '#nisb #streetwear #newdrop #ootd #londonfashion',
    likes: 2764,
    comments: 53,
    timeAgo: '5 hours ago',
  },
  {
    id: 'coffee',
    brand: 'Slow Cup',
    handle: 'slowcup.demo',
    location: 'Shoreditch, London',
    image: '/demos/stitch-coffee/stitch_coffee_co_website_design/8d361a5c9690863189b7ef14919ae243.jpg/screen.png',
    imageAlt: 'Hands holding Slow Cup takeaway coffees',
    imagePos: 'center',
    imageScale: 1.15,
    caption: 'Cups for the whole table ☕ Single-origin, slow-poured, made for lingering. New autumn blend landed this week, link in bio.',
    tags: '#slowcup #specialtycoffee #flatwhite #londoncoffee #slowmornings',
    likes: 962,
    comments: 27,
    timeAgo: '3 hours ago',
  },
  {
    id: 'runclub',
    brand: 'Frames Run Club',
    handle: 'framesrunclub.demo',
    location: 'London, UK',
    image: '/media/runclub-ig-post.jpg',
    imageAlt: 'Frames Run Club members gathered outside a shopfront before a run',
    caption: 'Frames on, games on. 🏃 Thursday social run done — 5k through the city, coffee after. Everyone welcome, all paces. Next one in bio.',
    tags: '#runclub #runningcommunity #londonrunners #runners #frames',
    likes: 1843,
    comments: 41,
    timeAgo: '1 day ago',
  },
]

/* ── Main export — animated slideshow of the four posts ── */
export default function MediaDemos() {
  return (
    <HoverSlider className={styles.slider} count={POSTS.length} autoplayInterval={3400}>
      <div className={styles.sliderTitles}>
        <span className={styles.sliderKicker}>Demo brands</span>
        {POSTS.map((p, i) => (
          <TextStaggerHover
            key={p.id}
            index={i}
            text={p.brand}
            className={styles.sliderTitle}
          />
        ))}
        <span className={styles.sliderHint}>Hover a brand to preview its post</span>
      </div>

      <HoverSliderImageWrap className={styles.sliderStage}>
        {POSTS.map((p, i) => (
          <HoverSliderImage key={p.id} index={i}>
            <InstagramPost {...p} />
          </HoverSliderImage>
        ))}
      </HoverSliderImageWrap>
    </HoverSlider>
  )
}
