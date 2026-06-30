import Lenis from 'lenis'
import { useEffect, RefObject } from 'react'

export function useLenis(
  containerRef: RefObject<HTMLElement | null>,
  onScroll: (scroll: number) => void
) {
  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Lenis scoped to the container
    const lenis = new Lenis({
      eventsTarget: containerRef.current,
      wrapper: containerRef.current,
      content: containerRef.current,
      smoothWheel: true,
      lerp: 0.1,
    })

    lenis.on('scroll', (e: any) => {
      onScroll(e.scroll || e.animatedScroll || 0)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [containerRef, onScroll])
}
