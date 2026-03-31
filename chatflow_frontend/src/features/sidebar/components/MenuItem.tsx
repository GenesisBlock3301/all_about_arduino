import React from 'react'

interface MenuItemProps {
  icon: React.ElementType
  label: string
  onClick: () => void
  hasSubmenu?: boolean
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ icon: Icon, label, onClick, hasSubmenu = false }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none
        focus:bg-gray-100 transition-colors duration-200"
      >
        <Icon className="w-5 h-5 mr-3 text-gray-600" />
        <span className="flex-1 text-left">{label}</span>
        {hasSubmenu && <span className="text-gray-400">›</span>}
      </button>
    )
  }
)

MenuItem.displayName = 'MenuItem'