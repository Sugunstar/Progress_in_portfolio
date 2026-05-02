import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useState, useEffect, RefObject } from 'react'

export function useScrollStage(containerHeight: number, scrollPos: number) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const offsetMV = useMotionValue(0)
  
  useEffect(() => {
    if (containerHeight === 0) return
    const max = containerHeight * 2.2
    const clamped = Math.max(0, Math.min(max, scrollPos))
    offsetMV.set(clamped)
    
    if (clamped > 0 && !hasScrolled) {
      setHasScrolled(true)
    }
  }, [scrollPos, containerHeight, hasScrolled, offsetMV])

  const smoothOffsetMV = useSpring(offsetMV, { stiffness: 120, damping: 22 })

  const [offsetState, setOffsetState] = useState(0)
  useEffect(() => {
    return smoothOffsetMV.on("change", (v) => {
      setOffsetState(v)
    })
  }, [smoothOffsetMV])

  const stage = 
    containerHeight === 0 ? 0 
    : offsetState < containerHeight * 0.6 ? 0
    : offsetState < containerHeight * 1.5 ? 1
    : 2

  const contentY = useTransform(
    smoothOffsetMV,
    [0, containerHeight * 1.2, containerHeight * 2.2],
    [0, 0, -containerHeight]
  )

  return { offsetMV, smoothOffsetMV, offsetState, stage, hasScrolled, contentY }
}
