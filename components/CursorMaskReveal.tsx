'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCursorTrack } from '@/hooks/useCursorTrack'
import { useMaskSize } from '@/hooks/useMaskSize'
import { MaskLayer } from './MaskLayer'
import { CrazyNavigation } from './CrazyNavigation'
import { CursorHint } from './CursorHint'

export function CursorMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false)

  // Track window size
  useEffect(() => {
    if (!containerRef.current) return
    const updateSize = () => {
      const rect = containerRef.current!.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Custom Scroll State
  const offsetMV = useMotionValue(0)
  const [offsetState, setOffsetState] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasReachedPage2, setHasReachedPage2] = useState(false)
  const touchLastYRef = useRef<number | null>(null)

  useEffect(() => {
    offsetMV.set(offsetState)
  }, [offsetState, offsetMV])

  const smoothOffsetMV = useSpring(offsetMV, { stiffness: 120, damping: 22 })

  const stage = 
    containerSize.height === 0 ? 0 
    : offsetState < containerSize.height * 1.0 ? 0
    : offsetState < containerSize.height * 2.2 ? 1
    : 2

  useEffect(() => {
    if (stage === 2) {
      setHasReachedPage2(true)
    }
  }, [stage])

  useEffect(() => {
    if (!containerRef.current) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (!containerSize.height) return
      const max = containerSize.height * 2.2
      setOffsetState((v) => Math.max(0, Math.min(max, v + e.deltaY)))
      setHasScrolled(true)
    }
    const el = containerRef.current
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [containerSize.height])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return
    touchLastYRef.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerSize.height || !e.touches[0]) return
    const currentY = e.touches[0].clientY
    const lastY = touchLastYRef.current ?? currentY
    const deltaY = lastY - currentY
    touchLastYRef.current = currentY
    const max = containerSize.height * 2.2
    setOffsetState((v) => Math.max(0, Math.min(max, v + deltaY)))
    setHasScrolled(true)
  }

  const contentY = useTransform(
    smoothOffsetMV,
    [0, containerSize.height * 1.2, containerSize.height * 2.2],
    [0, 0, -containerSize.height]
  )

  const {
    mouseX, mouseY,
    smoothX, smoothY,
    pointerPresence,
    isPointerInside,
    showMask,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  } = useCursorTrack(containerRef)

  const { maskSizeMV, maskClipPathMV } = useMaskSize(
    smoothOffsetMV,
    containerSize,
    pointerPresence,
    smoothX,
    smoothY
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          height: '200%',
          y: contentY,
        }}
      >
        <MaskLayer
          stage={stage}
          maskSizeMV={maskSizeMV}
          maskClipPathMV={maskClipPathMV}
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
        />

        <div style={{ height: '50%', position: 'relative' }}>
          <CrazyNavigation onMenuOpen={() => setHasOpenedMenu(true)} />
        </div>
      </motion.div>

      <CursorHint
        stage={stage}
        hasScrolled={hasScrolled}
        hasReachedPage2={hasReachedPage2}
        hasOpenedMenu={hasOpenedMenu}
        isPointerInside={isPointerInside}
        smoothX={smoothX}
        smoothY={smoothY}
      />
    </div>
  )
}
