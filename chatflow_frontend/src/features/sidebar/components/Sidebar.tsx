'use client'

import { useChatStore, Contact } from '@/lib/store'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import { DropdownMenu } from './DropdownMenu'
import { SearchBar } from './SearchBar'
import { ContactList } from './ContactList'

export default function Sidebar() {
  const { contacts, setCurrentContact, searchTerm, setSearchTerm } = useChatStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useClickOutside(() => setIsMenuOpen(false))

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContactClick = (contact: Contact) => {
    setCurrentContact(contact)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`w-80 bg-white border-r border-gray-200 flex flex-col h-screen ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
      {/* Header with Menu and Search */}
      <div className="p-4 bg-[#0088cc] text-white flex items-center gap-3">
        <div className="relative" ref={menuRef}>
          <button
            className="p-2 hover:bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
            <DropdownMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </div>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <button
          className="p-2 hover:bg-white/20 rounded-full md:hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Contacts List */}
      <ContactList
        contacts={filteredContacts}
        onContactClick={handleContactClick}
      />
    </div>
  )
}