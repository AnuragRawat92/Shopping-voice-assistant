import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import VoiceShoppingAssistant from './components/VoiceShoppingAssistant'
import Header from './components/Header'
import Footer from './components/Footer'
import Auth from './components/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import { ShoppingItem } from './types'
import { generateSuggestions } from './utils/suggestionEngine'
import { motion } from 'framer-motion'

function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([])
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    const newSuggestions = generateSuggestions(shoppingList)
    setSmartSuggestions(newSuggestions)
  }, [shoppingList])

  const addItem = (item: ShoppingItem) => {
    setShoppingList(prev => [...prev, item])
  }

  const removeItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id))
  }

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setShoppingList(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-sky-900 to-black relative overflow-hidden">
        {/* Sparkling background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating glowing orbs */}
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-28 right-24 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-28 left-24 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-sky-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -70, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
          />

          {/* Sparkling stars overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)'
            }
          }}
        />

        <Routes>
          <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <>
                <Header
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
                
                <main className="container mx-auto px-6 py-12 relative z-10">
                  {/* Hero Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="text-6xl font-extrabold bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-lg"
                    >
                      BlueCart AI
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
                    >
                      Transform the way you shop with next-gen AI voice technology.  
                      Experience lightning-fast inventory control, predictive insights, and seamless commerce integration.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                      <div className="flex items-center space-x-2 bg-blue-900/50 backdrop-blur-md rounded-full px-6 py-3 border border-blue-700">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                        <span className="text-blue-100 text-sm">Real-Time Voice Commands</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-blue-900/50 backdrop-blur-md rounded-full px-6 py-3 border border-blue-700">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full animate-ping"></div>
                        <span className="text-blue-100 text-sm">Predictive AI Analytics</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-blue-900/50 backdrop-blur-md rounded-full px-6 py-3 border border-blue-700">
                        <div className="w-3 h-3 bg-sky-400 rounded-full animate-ping"></div>
                        <span className="text-blue-100 text-sm">Global Multilingual Support</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <VoiceShoppingAssistant
                    shoppingList={shoppingList}
                    onAddItem={addItem}
                    onRemoveItem={removeItem}
                    onUpdateItem={updateItem}
                    isListening={isListening}
                    setIsListening={setIsListening}
                    selectedLanguage={selectedLanguage}
                    smartSuggestions={smartSuggestions}
                  />
                </main>

                <Footer />
              </>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
