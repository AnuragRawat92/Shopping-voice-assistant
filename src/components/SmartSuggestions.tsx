// SmartSuggestions.tsx (updated)
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Plus,
  TrendingUp,
  Clock,
  Sparkles,
  Lightbulb,
  Zap,
} from 'lucide-react'
import { ShoppingItem } from '../types'
import { getSuggestionReason } from '../utils/suggestionEngine'

interface SmartSuggestionsProps {
  suggestions: string[]
  onAddSuggestion: (itemName: string) => void
  shoppingList: ShoppingItem[]
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  suggestions,
  onAddSuggestion,
  shoppingList,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  useEffect(() => {
    const newFiltered = suggestions.filter(suggestion => {
      const reason = getSuggestionReason(suggestion, shoppingList);

      if (selectedCategory === 'all') {
        return true
      }
      
      if (selectedCategory === 'smart') {
        return reason.type === 'frequent' || reason.type === 'substitute'
      }

      return reason.type === selectedCategory
    })
    setFilteredSuggestions(newFiltered.sort())
  }, [suggestions, selectedCategory, shoppingList])

  const categories = [
    { id: 'all', name: 'All', icon: Sparkles, color: 'from-cyan-600 to-blue-600' },
    { id: 'smart', name: 'Smart', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'seasonal', name: 'Seasonal', icon: Clock, color: 'from-emerald-500 to-teal-500' },
    { id: 'trending', name: 'Trending', icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Predictive Analytics</h3>
            <p className="text-gray-400 text-sm">AI-driven product recommendations</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">AI Active</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
            }`}
          >
            <category.icon className="w-3 h-3" />
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredSuggestions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-gray-400 mb-1">No recommendations available</h4>
              <p className="text-gray-500 text-xs">
                Add products to your inventory to receive personalized suggestions
              </p>
            </motion.div>
          ) : (
            filteredSuggestions.map((suggestion, index) => {
              const reason = getSuggestionReason(suggestion, shoppingList)
              const isInList = shoppingList.some(item =>
                item.name.toLowerCase() === suggestion.toLowerCase()
              )
              
              const isSmart = ['frequent', 'substitute'].includes(reason.type);

              return (
                <motion.div
                  key={suggestion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-700/30 border border-gray-600 rounded-xl p-4 transition-all duration-200 ${
                    isInList ? 'opacity-50' : 'hover:bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-gray-600/50 rounded-lg flex items-center justify-center">
                        {reason.type === 'seasonal' && <Clock className="w-4 h-4 text-gray-400" />}
                        {reason.type === 'trending' && <TrendingUp className="w-4 h-4 text-gray-400" />}
                        {isSmart && <Brain className="w-4 h-4 text-gray-400" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm ${
                          isInList ? 'text-gray-500 line-through' : 'text-white'
                        }`}>
                          {suggestion}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${
                            reason.type === 'seasonal'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : reason.type === 'trending'
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                              : isSmart
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}>
                            <Zap className="w-3 h-3" />
                            <span className="capitalize">{reason.reason}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isInList ? (
                        <span className="text-xs text-gray-500 bg-gray-600/50 px-2 py-1 rounded-lg">
                          Added
                        </span>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onAddSuggestion(suggestion)}
                          className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* AI Status */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>AI analyzing consumption patterns</span>
          </div>
          <span className="text-gray-500">Powered by Gemini</span>
        </div>
      </div>
    </div>
  )
}

export default SmartSuggestions