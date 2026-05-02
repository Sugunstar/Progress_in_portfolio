'use client'

import { motion, MotionValue } from 'framer-motion'

interface MaskLayerProps {
  stage: number
  maskSizeMV: MotionValue<number>
  maskClipPathMV: MotionValue<string>
  containerWidth: number
  containerHeight: number
}

export function MaskLayer({
  stage,
  maskSizeMV,
  maskClipPathMV,
  containerWidth,
  containerHeight
}: MaskLayerProps) {
  const bgSrc = '/images/canva_edit.png'
  const fgSrc = '/images/me.jpg'

  return (
    <div style={{ height: '50%', position: 'relative' }}>
      {/* Layer 1: Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Layer 2: Foreground Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${fgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
        }}
      />

      {/* Layer 3: Mask Window */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: maskClipPathMV,
          pointerEvents: 'none',
          zIndex: 4,
          willChange: 'clip-path'
        }}
      />
    </div>
  )
}
