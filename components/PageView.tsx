'use client'

import { motion } from 'framer-motion'
import { config } from '@/lib/config'

interface PageViewProps {
  index: number
  isLeaving: boolean
  onClose: () => void
}

export function PageView({ index, isLeaving, onClose }: PageViewProps) {
  const getPageBackground = (idx: number) => {
    if (idx === 0) return '/images/page_1.png'
    if (idx === 1) return '/images/page_2.png'
    return undefined
  }

  const pageBg = getPageBackground(index)
  if (!pageBg) return null // Page 3 handles external link, no view rendered

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={isLeaving ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: config.colors.mainBg,
        backgroundImage: `url('${pageBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 32px 32px',
        boxSizing: 'border-box',
        zIndex: 50,
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: 'none',
          color: config.colors.closeBtn,
          cursor: 'pointer',
          padding: '8px 0',
          zIndex: 20,
          position: 'relative',
          ...config.fonts.menuButtonFont
        }}
      >
        × {config.closeButtonLabel}
      </button>
    </motion.div>
  )
}
