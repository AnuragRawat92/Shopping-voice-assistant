// ShoppingList.tsx (updated)
// ShoppingList.tsx (UI Enhanced)
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Plus, 
  Package,
  DollarSign,
  Tag,
  Grid
} from 'lucide-react'
import { ShoppingItem } from '../types'

interface ShoppingListProps {
  items: ShoppingItem[]
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, updates: Partial<ShoppingItem>) => void
  onAddItem: (itemName: string) => void
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onRemoveItem,
  onUpdateItem,
  onAddItem
}) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<ShoppingItem>>({})
  const [newItemName, setNewItemName] = useState('')

  const handleEdit = (item: ShoppingItem) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const handleSave = () => {
    if (editingId && editForm.name) {
      onUpdateItem(editingId, editForm)
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItemName.trim()) {
      onAddItem(newItemName.trim())
      setNewItemName('')
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      dairy: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      produce: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      meat: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      pantry: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      beverages: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      snacks: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      household: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'personal care': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      frozen: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      bakery: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      general: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
    return colors[category.toLowerCase()] || colors.general
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      dairy: <Package className="w-4 h-4" />,
      produce: <Package className="w-4 h-4" />,
      meat: <Package className="w-4 h-4" />,
      pantry: <Package className="w-4 h-4" />,
      beverages: <Package className="w-4 h-4" />,
      snacks: <Package className="w-4 h-4" />,
      household: <Package className="w-4 h-4" />,
      'personal care': <Package className="w-4 h-4" />,
      frozen: <Package className="w-4 h-4" />,
      bakery: <Package className="w-4 h-4" />,
      general: <Grid className="w-4 h-4" />
    }
    return icons[category.toLowerCase()] || icons.general
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Product Inventory</h3>
            <p className="text-gray-400 text-sm">
              {items.length} product{items.length !== 1 ? 's' : ''} • {items.filter(i => i.isCompleted).length} acquired
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Real-time Sync</span>
        </div>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter product name..."
            className="flex-1 bg-gray-700/50 border border-gray-600 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!newItemName.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Items List */}
      <div className="space-y-3">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-400 mb-2">No Products Yet</h4>
              <p className="text-gray-500 text-sm">Add products manually or use voice commands</p>
            </motion.div>
          ) : (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gray-700/30 border border-gray-600 rounded-xl p-4 flex items-start justify-between group hover:bg-gray-700/50 transition-all duration-200 ${
                  item.isCompleted ? 'opacity-60' : ''
                }`}
              >
                {editingId === item.id ? (
                  // Edit Mode
                  <div className="w-full space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm"
                        placeholder="Product name"
                      />
                      <input
                        type="number"
                        value={editForm.quantity || ''}
                        onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                        className="bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editForm.unit || ''}
                        onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                        className="bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm"
                        placeholder="Unit (kg, pcs)"
                      />
                      <input
                        type="text"
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm"
                        placeholder="Category"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center justify-center space-x-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <>
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => onUpdateItem(item.id, { isCompleted: !item.isCompleted })}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          item.isCompleted
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-400 hover:border-emerald-400'
                        }`}
                      >
                        {item.isCompleted && <Check className="w-3 h-3 text-white" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4
                            className={`font-medium text-sm truncate ${
                              item.isCompleted ? 'text-gray-400 line-through' : 'text-white'
                            }`}
                          >
                            {item.name}
                          </h4>
                          <span className="text-gray-500 text-sm">
                            {item.quantity} {item.unit}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getCategoryColor(item.category)}`}>
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </span>

                          {item.price && (
                            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                              <DollarSign className="w-3 h-3" />
                              <span>${item.price}</span>
                            </span>
                          )}

                          {item.brand && (
                            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs">
                              <Tag className="w-3 h-3" />
                              <span>{item.brand}</span>
                            </span>
                          )}
                        </div>

                        {item.notes && <p className="text-gray-400 text-xs mt-1">{item.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ShoppingList
