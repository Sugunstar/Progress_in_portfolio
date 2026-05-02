'use client'

import { useState } from 'react'
import { config } from '@/lib/config'
import { MainPanel } from './MainPanel'
import { MenuOverlay } from './MenuOverlay'
import { PageView } from './PageView'

interface CrazyNavigationProps {
  onMenuOpen?: () => void
}

export function CrazyNavigation({ onMenuOpen }: CrazyNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null)
  const [isPageLeaving, setIsPageLeaving] = useState(false)

  const handleOpenMenu = () => {
    setIsOpen(true)
    setSelectedPageIndex(null)
    if (onMenuOpen) onMenuOpen()
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
    setSelectedPageIndex(null)
  }

  const handleSelectPage = (index: number) => {
    if (index === 2) {
      window.open(config.page3Link, '_blank')
      return
    }
    setSelectedPageIndex(index)
    setIsPageLeaving(false)
  }

  const handleClosePage = () => {
    setIsPageLeaving(true)
    setTimeout(() => {
      setSelectedPageIndex(null)
      setIsPageLeaving(false)
      // Return to menu
      setIsOpen(true)
    }, 700)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MenuOverlay 
        isOpen={isOpen} 
        onClose={handleCloseMenu} 
        onSelect={handleSelectPage} 
      />
      <MainPanel 
        isOpen={isOpen} 
        onOpenMenu={handleOpenMenu} 
      />
      
      {selectedPageIndex !== null && (
        <PageView 
          index={selectedPageIndex} 
          isLeaving={isPageLeaving} 
          onClose={handleClosePage} 
        />
      )}
    </div>
  )
}
