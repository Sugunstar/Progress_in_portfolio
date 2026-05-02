import { useSpring, useTransform, MotionValue } from 'framer-motion'

export function useMaskSize(
  smoothOffsetMV: MotionValue<number>, 
  containerSize: { width: number, height: number },
  pointerPresence: MotionValue<number>,
  smoothX: MotionValue<number>,
  smoothY: MotionValue<number>
) {
  const fullscreenSize = Math.max(containerSize.width, containerSize.height) * 2.5
  const baseSize = 200

  // As smoothOffset increases from 0 to containerHeight, mask grows from 200 to fullscreen
  const baseMaskSizeMV = useTransform(
    smoothOffsetMV,
    [0, containerSize.height],
    [baseSize, fullscreenSize],
    { clamp: true }
  )

  const maskSizeMV = useTransform(
    [baseMaskSizeMV, pointerPresence],
    ([base, presence]: any) => {
      const progress = (base - baseSize) / (fullscreenSize - baseSize || 1)
      const effectivePresence = Math.max(presence, progress)
      return base * effectivePresence
    }
  )

  const maskClipPathMV = useTransform(
    [maskSizeMV, smoothX, smoothY],
    ([size, x, y]: any) => `circle(${size / 2}px at ${x}px ${y}px)`
  )

  return { maskSizeMV, maskClipPathMV }
}
