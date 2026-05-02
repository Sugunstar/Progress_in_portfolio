'use client'

import { motion, MotionValue } from 'framer-motion'
import { config } from '@/lib/config'

interface CursorHintProps {
  stage: number
  hasScrolled: boolean
  hasOpenedMenu: boolean
  isPointerInside: boolean
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
}

export function CursorHint({
  stage,
  hasScrolled,
  hasOpenedMenu,
  isPointerInside,
  smoothX,
  smoothY
}: CursorHintProps) {
  if (!isPointerInside) return null

  // Stage 0 hint
  if (stage === 0 && !hasScrolled) {
    return (
      <motion.div
        style={{
          position: 'absolute',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-160%',
          pointerEvents: 'none',
          zIndex: 999,
          color: config.cursorHintTextColor,
          background: config.cursorHintBackgroundColor,
          padding: '8px 14px',
          borderRadius: 999,
          border: `1px solid ${config.cursorHintBorderColor}`,
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          ...config.fonts.cursorHintFont,
        }}
      >
        {config.cursorHintStage0Text}
      </motion.div>
    )
  }

  // Stage 2 hint
  if (stage === 2 && !hasOpenedMenu) {
    return (
      <motion.div
        style={{
          position: 'absolute',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-160%',
          pointerEvents: 'none',
          zIndex: 999,
          color: config.cursorHintTextColor,
          background: config.cursorHintBackgroundColor,
          padding: '8px 14px',
          borderRadius: 999,
          border: `1px solid ${config.cursorHintBorderColor}`,
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          ...config.fonts.cursorHintFont,
        }}
      >
        {config.cursorHintStage2Text}
      </motion.div>
    )
  }

  return null
}
