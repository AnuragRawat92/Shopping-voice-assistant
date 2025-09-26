import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import VoiceRecognition from './VoiceRecognition'
import ShoppingList from './ShoppingList'
import SmartSuggestions from './SmartSuggestions'
import VarietySelector from './VarietySelector'
import { ShoppingItem } from '../types'
import { processVoiceCommand, ProcessedVoiceResult } from '../utils/voiceProcessor'
import { generateSuggestions } from '../utils/suggestionEngine'
import toast from 'react-hot-toast'

interface VoiceShoppingAssistantProps {
  shoppingList: ShoppingItem[]
  onAddItem: (item: ShoppingItem) => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, updates: Partial<ShoppingItem>) => void
  isListening: boolean
  setIsListening: (listening: boolean) => void
  selectedLanguage: string
}

// Hindi-to-English item map for consistency (should match the one in voiceProcessor)
const HINDI_ITEM_MAP: { [key: string]: string } = {
  'दूध': 'milk',
  'रोटी': 'bread',
  'अंडे': 'eggs',
  'चावल': 'rice',
  'चाय': 'tea',
  'कॉफी': 'coffee',
  'शक्कर': 'sugar',
  'नमक': 'salt',
  'तेल': 'oil',
  'आटा': 'flour',
  'मैदा': 'flour', 
  'दाल': 'lentils',
  'सब्जी': 'vegetables',
  'फल': 'fruits',
  'सेब': 'apple',
  'केला': 'banana',
  'केले': 'banana',
  'संतरा': 'orange',
  'टमाटर': 'tomato',
  'आलू': 'potato',
  'प्याज': 'onion',
  'लहसुन': 'garlic',
  'अदरक': 'ginger',
  'मांस': 'meat',
  'मछली': 'fish',
  'चिकन': 'chicken',
  'पनीर': 'cheese',
  'दही': 'yogurt',
  'मक्खन': 'butter',
  'बिस्कुट': 'biscuit',
  'चॉकलेट': 'chocolate',
  'आइसक्रीम': 'ice cream',
  'पानी': 'water',
  'जूस': 'juice',
  'नूडल्स': 'noodles',
  'पास्ता': 'pasta',
  'सूप': 'soup',
  'चिप्स': 'chips',
  'नमकीन': 'snacks',
  'ब्रेड': 'bread',
  'केक': 'cake',
  'बटर': 'butter',
  'चीज़': 'cheese',
  'चना': 'chickpeas',
  'राजमा': 'kidney beans',
  'हल्दी': 'turmeric',
  'धनिया': 'coriander',
  'जीरा': 'cumin',
  'मसाला': 'spices'
}

// Create reverse mapping for English to Hindi
const ENGLISH_ITEM_MAP: { [key: string]: string } = {};
Object.entries(HINDI_ITEM_MAP).forEach(([hindi, english]) => {
  ENGLISH_ITEM_MAP[english] = hindi;
});

const VoiceShoppingAssistant: React.FC<VoiceShoppingAssistantProps> = ({
  shoppingList,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  isListening,
  setIsListening,
  selectedLanguage
}) => {
  const [transcript, setTranscript] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showVarietySelector, setShowVarietySelector] = useState(false)
  const [varietySuggestions, setVarietySuggestions] = useState<string[]>([])
  const [varietyMessage, setVarietyMessage] = useState('')
  const [varietyCategory, setVarietyCategory] = useState('general')

  useEffect(() => {
    try {
      const newSuggestions = generateSuggestions(shoppingList)
      setSuggestions(newSuggestions)
    } catch (error) {
      console.error('Error generating suggestions:', error)
      setSuggestions([])
    }
  }, [shoppingList])

  // Helper function to find item by name (handles both Hindi and English)
  const findItemByName = (itemName: string): ShoppingItem | undefined => {
    console.log('Searching for item:', itemName);
    console.log('Shopping list:', shoppingList);
    
    const lowerCaseName = itemName.toLowerCase();
    
    // First, try direct match with the exact name
    let item = shoppingList.find(item => 
      item.name.toLowerCase() === lowerCaseName
    );
    
    if (item) {
      console.log('Found by direct match:', item);
      return item;
    }
    
    // If not found, try matching through translation
    if (selectedLanguage === 'hi-IN') {
      // If we're in Hindi mode and have an English item name from voice processor, try Hindi equivalent
      const hindiEquivalent = ENGLISH_ITEM_MAP[itemName.toLowerCase()];
      console.log('Hindi equivalent for', itemName, ':', hindiEquivalent);
      
      if (hindiEquivalent) {
        item = shoppingList.find(item => 
          item.name.toLowerCase() === hindiEquivalent.toLowerCase()
        );
        if (item) {
          console.log('Found by Hindi translation:', item);
          return item;
        }
      }
    } else {
      // If we're in English mode and have a Hindi item name, try English equivalent
      const englishEquivalent = HINDI_ITEM_MAP[itemName];
      console.log('English equivalent for', itemName, ':', englishEquivalent);
      
      if (englishEquivalent) {
        item = shoppingList.find(item => 
          item.name.toLowerCase() === englishEquivalent.toLowerCase()
        );
        if (item) {
          console.log('Found by English translation:', item);
          return item;
        }
      }
    }
    
    // Last resort: partial match
    item = shoppingList.find(item => 
      item.name.toLowerCase().includes(lowerCaseName) || 
      lowerCaseName.includes(item.name.toLowerCase())
    );
    
    if (item) {
      console.log('Found by partial match:', item);
    } else {
      console.log('Item not found');
    }
    
    return item;
  }

  const handleTranscript = async (newTranscript: string) => {
    console.log('Processing transcript:', newTranscript, 'Language:', selectedLanguage)
    setTranscript(newTranscript)
    setIsProcessing(true)

    try {
      const result: ProcessedVoiceResult = await processVoiceCommand(newTranscript, selectedLanguage)
      console.log('Voice command result:', result)
      
      switch (result.type) {
        case 'add':
          if (result.item) {
            onAddItem(result.item)
            toast.success(result.message, {
              icon: '✅',
              style: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }
            })
          }
          break

        case 'remove':
          if (result.selectedItem) {
            console.log('Attempting to remove item:', result.selectedItem)
            
            // Find the item using our improved matching function
            const itemToRemove = findItemByName(result.selectedItem)
            
            if (itemToRemove) {
              console.log('Found item to remove:', itemToRemove)
              onRemoveItem(itemToRemove.id)
              toast.success(result.message, {
                icon: '🗑️',
                style: {
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)'
                }
              })
            } else {
              console.log('Item not found in list')
              // Item not found, inform the user
              const errorMessage = selectedLanguage === 'hi-IN' 
                ? `"${result.selectedItem}" आपकी सूची में नहीं है।`
                : `"${result.selectedItem}" is not in your list.`;
              
              toast.error(errorMessage, {
                icon: '🤔',
                style: {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)'
                }
              })
            }
          }
          break

        case 'suggest':
          if (result.suggestions) {
            setVarietySuggestions(result.suggestions)
            setVarietyMessage(result.message)
            setVarietyCategory(result.category || 'general')
            setShowVarietySelector(true)
            toast.success('Choose your variety!', {
              icon: '🎯',
              style: {
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }
            })
          }
          break

        case 'confirm':
          if (result.selectedItem) {
            const selectedItem = createShoppingItemFromVariety(result.selectedItem, varietyCategory)
            onAddItem(selectedItem)
            setShowVarietySelector(false)
            toast.success(`Added ${result.selectedItem} to your list!`, {
              icon: '✅',
              style: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }
            })
          }
          break

        case 'clear':
          // Clear all items from the shopping list
          shoppingList.forEach(item => {
            onRemoveItem(item.id)
          })
          toast.success(result.message, {
            icon: '🗑️',
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }
          })
          break

        case 'error':
          toast.error(result.message, {
            icon: '❌',
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }
          })
          break
      }
    } catch (error) {
      console.error('Error processing voice command:', error)
      toast.error('Sorry, I had trouble processing your request. Please try again.', {
        icon: '❌',
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        }
      })
    } finally {
      setIsProcessing(false)
      setTranscript('')
    }
  }

  const createShoppingItemFromVariety = (varietyName: string, category: string): ShoppingItem => {
    return {
      id: Date.now().toString(),
      name: varietyName,
      quantity: 1,
      unit: getDefaultUnit(varietyName),
      category,
      isCompleted: false,
      addedAt: new Date()
    }
  }

  const getDefaultUnit = (itemName: string): string => {
    const lowerName = itemName.toLowerCase()
    if (lowerName.includes('apple') || lowerName.includes('सेब')) return 'piece'
    if (lowerName.includes('milk') || lowerName.includes('दूध')) return 'gallon'
    if (lowerName.includes('bread') || lowerName.includes('रोटी')) return 'loaf'
    if (lowerName.includes('egg') || lowerName.includes('अंडे')) return 'dozen'
    if (lowerName.includes('cheese') || lowerName.includes('पनीर')) return 'package'
    if (lowerName.includes('yogurt') || lowerName.includes('दही')) return 'container'
    if (lowerName.includes('banana') || lowerName.includes('केला')) return 'bunch'
    if (lowerName.includes('tomato') || lowerName.includes('टमाटर')) return 'piece'
    if (lowerName.includes('chicken') || lowerName.includes('चिकन')) return 'pound'
    if (lowerName.includes('rice') || lowerName.includes('चावल')) return 'bag'
    return 'piece'
  }

  const handleVarietySelection = (selectedVariety: string) => {
    const newItem = createShoppingItemFromVariety(selectedVariety, varietyCategory)
    onAddItem(newItem)
    setShowVarietySelector(false)
    toast.success(`Added ${selectedVariety} to your shopping list!`, {
      icon: '✅',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }
    })
  }

  const handleAddSuggestion = (suggestion: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: suggestion,
      quantity: 1,
      unit: 'piece',
      category: 'general',
      isCompleted: false,
      addedAt: new Date()
    }
    onAddItem(newItem)
    toast.success(`Added ${suggestion} to your shopping list!`, {
      icon: '✅',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Voice Recognition and Shopping List */}
      <div className="space-y-8">
        <VoiceRecognition
          isListening={isListening}
          setIsListening={setIsListening}
          onTranscript={handleTranscript}
          isProcessing={isProcessing}
          selectedLanguage={selectedLanguage}
        />
        
        <ShoppingList
          items={shoppingList}
          onRemoveItem={onRemoveItem}
          onUpdateItem={onUpdateItem}
          onAddItem={(itemName) => {
            const newItem: ShoppingItem = {
              id: Date.now().toString(),
              name: itemName,
              quantity: 1,
              unit: 'piece',
              category: 'general',
              isCompleted: false,
              addedAt: new Date()
            }
            onAddItem(newItem)
          }}
        />
      </div>

      {/* Right Column - Smart Suggestions */}
      <div>
        <SmartSuggestions
          suggestions={suggestions}
          onAddSuggestion={handleAddSuggestion}
          shoppingList={shoppingList}
        />
      </div>

      {/* Variety Selector Modal */}
      <VarietySelector
        isVisible={showVarietySelector}
        suggestions={varietySuggestions}
        message={varietyMessage}
        onSelect={handleVarietySelection}
        onCancel={() => setShowVarietySelector(false)}
        category={varietyCategory}
      />
    </div>
  )
}

export default VoiceShoppingAssistant
