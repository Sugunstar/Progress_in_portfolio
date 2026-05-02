import { useMotionValue, useSpring } from 'framer-motion'
import { useState, useCallback, RefObject, useEffect, useRef } from 'react'

export function useCursorTrack(containerRef: RefObject<HTMLElement | null>, followSpeed: number = 0.5) {
  const [isPointerInside, setIsPointerInside] = useState(false)
  const [showMask, setShowMask] = useState(false)
  
  const mouseX = useMotionValue(300)
  const mouseY = useMotionValue(200)

  // Use 380 for snappier feel as requested in prompt
  const smoothX = useSpring(mouseX, { stiffness: 380, damping: 18 })
  const smoothY = useSpring(mouseY, { stiffness: 380, damping: 18 })

  const pointerPresence = useSpring(0, { stiffness: 200, damping: 30 })

  useEffect(() => {
    pointerPresence.set(isPointerInside ? 1 : 0)
  }, [isPointerInside, pointerPresence])

  const updatePointerFromClient = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    mouseX.set(clientX - r.left)
    mouseY.set(clientY - r.top)
  }, [containerRef, mouseX, mouseY])

  const isInsideRef = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isInsideRef.current && containerRef.current) {
       const r = containerRef.current.getBoundingClientRect()
       const x = e.clientX - r.left
       const y = e.clientY - r.top
       mouseX.set(x)
       mouseY.set(y)
       if (smoothX.jump) smoothX.jump(x)
       if (smoothY.jump) smoothY.jump(y)
    }
    isInsideRef.current = true
    setIsPointerInside(true)
    setShowMask(true)
    updatePointerFromClient(e.clientX, e.clientY)
  }, [updatePointerFromClient, mouseX, mouseY, smoothX, smoothY, containerRef])

  const handleMouseEnter = useCallback(() => {
    setIsPointerInside(true)
    setShowMask(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPointerInside(false)
    setTimeout(() => {
      setShowMask(false)
    }, 400)
  }, [])

  return {
    mouseX, mouseY,
    smoothX, smoothY,
    pointerPresence,
    isPointerInside,
    showMask,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    updatePointerFromClient
  }
}
