// Header.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Mic, Globe, BarChart3, Info, ShoppingCart ,LogOut } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

interface HeaderProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
     isAuthenticated?: boolean
  setIsAuthenticated?: (isAuthenticated: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ selectedLanguage, onLanguageChange ,isAuthenticated = false,
  setIsAuthenticated  }) => {
  const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  if (setIsAuthenticated) {
    setIsAuthenticated(false)
  }
  window.location.href = '/'
}
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 bg-gray-800/90 backdrop-blur-xl border-b border-gray-700/50 sticky top-0"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
           <div className="relative">
  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
    <ShoppingCart className="w-7 h-7 text-white" />
  </div>
  <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-400 rounded-full ring-2 ring-gray-800 animate-pulse"></div>
</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                BlueCart AI
              </h1>
              <p className="text-xs text-gray-400 font-medium">Smart Voice-Powered Shopping</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:flex items-center space-x-8"
          >
            {/* <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-2 group"
            >
              <Info className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span>About</span>
            </a> */}
          </motion.nav>

          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />

             {isAuthenticated && (
  <button onClick={handleLogout} className="text-blue-300 hover:text-white">
    Logout
  </button>
)}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
