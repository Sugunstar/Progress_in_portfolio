'use client'

import { motion } from 'framer-motion'
import { config } from '@/lib/config'

interface MainPanelProps {
  isOpen: boolean
  onOpenMenu: () => void
}

export function MainPanel({ isOpen, onOpenMenu }: MainPanelProps) {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: {
          x: 0, y: 0, scale: 1, rotate: 0,
          borderRadius: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        },
        open: {
          x: '28%', y: '8%', scale: 0.65, rotate: -14,
          borderRadius: 32,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        },
      }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: config.colors.mainBg,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
        overflow: 'hidden',
        willChange: 'transform'
      }}
    >
      <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={onOpenMenu}
          style={{
            background: 'none',
            border: 'none',
            color: config.colors.mainText,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 0',
            ...config.fonts.menuButtonFont
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '18px' }}>
            <div style={{ height: '2px', background: 'currentColor', width: '100%' }} />
            <div style={{ height: '2px', background: 'currentColor', width: '100%' }} />
          </div>
          {config.menuButtonLabel}
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 40px 40px' }}>
        <h1 style={{ color: config.colors.mainText, margin: 0, textAlign: 'center', ...config.fonts.mainHeadingFont }}>
          {config.mainHeadingLines[0]}
          <br />
          {config.mainHeadingLines[1]}
        </h1>
        <p style={{ color: config.colors.mainText, marginTop: '40px', textAlign: 'center', ...config.fonts.mainDescriptionFont }}>
          {config.mainDescription}
        </p>
      </div>
    </motion.div>
  )
}
