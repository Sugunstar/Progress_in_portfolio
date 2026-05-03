'use client'

import { motion } from 'framer-motion'
import { config } from '@/lib/config'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (index: number) => void
}

export function MenuOverlay({ isOpen, onClose, onSelect }: MenuOverlayProps) {

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: { opacity: 0 },
        open: { opacity: 1 },
      }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: config.colors.menuBg,
        padding: '32px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
      }} />

      <style>{`
        .menu-item-hover span {
          background-size: 0% 3px !important;
          transition: background-size 0.25s cubic-bezier(0.22, 0.61, 0.36, 1) !important;
        }
        .menu-item-hover:hover span {
          background-size: 100% 3px !important;
        }
      `}</style>

      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: 'none',
          color: config.colors.menuText,
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: '60px',
          zIndex: 20,
          position: 'relative',
          ...config.fonts.menuButtonFont
        }}
      >
        × {config.closeButtonLabel}
      </button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, marginTop: '-15vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ maxWidth: '48%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: config.colors.menuText, marginBottom: '40px', marginTop: 0, ...config.fonts.introTitleFont }}>
              {config.introTitle}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {config.menuItems.map((item, index) => (
                <button
                  key={index}
                  className="menu-item-hover"
                  onClick={() => onSelect(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: config.colors.menuText,
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                    ...config.fonts.menuItemsFont
                  }}
                >
                  <span
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      backgroundImage: 'linear-gradient(currentColor, currentColor)',
                      backgroundPosition: '0 100%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }} />
        </div>
      </div>
    </motion.div>
  )
}
