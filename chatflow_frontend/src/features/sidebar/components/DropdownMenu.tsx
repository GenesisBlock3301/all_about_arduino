import { useState, useRef } from 'react'
import { MoreSubmenu } from './MoreSubmenu'
import { MenuItem } from './MenuItem'
import { MenuItemWithAvatar } from './MenuItemWithAvatar'
import { MenuDivider } from './MenuDivider'
import { menuItems } from '../constants/menuItems'

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
}

function DropdownItem({
  item,
  onClose,
  onMoreClick,
  moreButtonRef,
}: Readonly<{
    item: (typeof menuItems)[0]
    onClose: () => void
    onMoreClick: () => void
    moreButtonRef: React.RefObject<HTMLButtonElement | null>
}>) {
  if (item.divider) {
    return <MenuDivider key={item.id} />
  }

  if (item.avatar) {
    return <MenuItemWithAvatar key={item.id} label={item.label!} onClick={onClose} />
  }

  if (!item.icon || !item.label) {
    return null
  }

  if (item.submenu) {
    return (
      <MenuItem
        key={item.id}
        icon={item.icon}
        label={item.label}
        hasSubmenu
        onClick={onMoreClick}
        ref={moreButtonRef}
      />
    )
  }

  return <MenuItem key={item.id} icon={item.icon} label={item.label} onClick={onClose} />
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [moreRect, setMoreRect] = useState<DOMRect | null>(null)
  const moreRef = useRef<HTMLButtonElement>(null)

  if (!isOpen) return null

  const handleMoreClick = () => {
    if (moreRef.current) {
      setMoreRect(moreRef.current.getBoundingClientRect())
    }
    setIsMoreOpen(!isMoreOpen)
  }

  const handleMoreItemClick = (item: string) => {
    console.log(`Clicked: ${item}`)
    setIsMoreOpen(false)
    onClose()
  }

  return (
    <nav className="absolute left-0 top-full mt-2 z-50">
      <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200">
        {menuItems.map((item) => (
          <DropdownItem
            key={item.id}
            item={item}
            onClose={onClose}
            onMoreClick={handleMoreClick}
            moreButtonRef={moreRef}
          />
        ))}
      </div>
      <MoreSubmenu
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onItemClick={handleMoreItemClick}
        anchorRect={moreRect}
      />
    </nav>
  )
}
