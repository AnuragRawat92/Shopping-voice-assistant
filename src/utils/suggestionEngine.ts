import { ShoppingItem } from '../types'

// Mock data for seasonal items
const seasonalItems = {
  spring: ['asparagus', 'peas', 'strawberries', 'rhubarb', 'artichokes'],
  summer: ['tomatoes', 'corn', 'watermelon', 'peaches', 'zucchini', 'bell peppers'],
  fall: ['pumpkin', 'squash', 'apples', 'pears', 'mushrooms', 'sweet potatoes'],
  winter: ['citrus fruits', 'root vegetables', 'winter squash', 'cabbage', 'kale']
}

// Enhanced trending items with more variety
const trendingItems = [
  'organic avocados',
  'plant-based milk',
  'quinoa',
  'chia seeds',
  'kombucha',
  'kale chips',
]

// Enhanced frequently bought together with more comprehensive suggestions
const frequentlyBoughtTogether: { [key: string]: string[] } = {
  'milk': ['bread', 'cereal', 'eggs', 'honey', 'cookies', 'chocolate'],
  'bread': ['milk', 'butter', 'jam', 'honey', 'olive oil', 'garlic'],
  'eggs': ['milk', 'bacon', 'cheese', 'bread', 'vegetables', 'herbs'],
  'bananas': ['yogurt', 'cereal', 'peanut butter', 'honey', 'nuts', 'chocolate'],
  'chicken': ['rice', 'vegetables', 'sauce', 'herbs', 'olive oil', 'garlic'],
  'pasta': ['tomato sauce', 'cheese', 'vegetables', 'olive oil', 'garlic', 'herbs'],
  'coffee': ['cream', 'sugar', 'filters', 'cookies'],
  'toothpaste': ['toothbrush', 'floss', 'mouthwash'],
  'tomato': ['onion', 'garlic', 'potatoes', 'cilantro', 'ginger', 'spices'],
}

// Mock data for substitutes
const substitutes: { [key: string]: string[] } = {
  'milk': ['almond milk', 'soy milk', 'oat milk', 'coconut milk'],
  'butter': ['olive oil', 'coconut oil', 'avocado'],
  'eggs': ['flax seeds', 'chia seeds', 'banana', 'applesauce'],
  'sugar': ['honey', 'maple syrup', 'stevia', 'coconut sugar'],
  'flour': ['almond flour', 'coconut flour'],
  'meat': ['tofu', 'tempeh', 'seitan']
}

/**
 * Generates a list of smart suggestions based on the current shopping list.
 * @param shoppingList The user's current shopping list.
 * @returns A list of unique, relevant suggestions.
 */
export function generateSuggestions(shoppingList: ShoppingItem[]): string[] {
  const allSuggestions: string[] = []
  const listNames = shoppingList.map(item => item.name.toLowerCase())

  // Add seasonal items, ensuring they aren't already in the list
  const currentSeason = getCurrentSeason()
  const seasonItems = seasonalItems[currentSeason as keyof typeof seasonalItems] || []
  allSuggestions.push(...seasonItems.filter(item => !listNames.includes(item.toLowerCase())))

  // Add trending items
  allSuggestions.push(...trendingItems.filter(item => !listNames.includes(item.toLowerCase())))

  // Add items based on the current shopping list
  if (shoppingList.length > 0) {
    shoppingList.forEach(item => {
      const itemName = item.name.toLowerCase()
      
      // Add frequently bought together suggestions
      if (frequentlyBoughtTogether[itemName]) {
        allSuggestions.push(...frequentlyBoughtTogether[itemName].filter(suggestion => !listNames.includes(suggestion.toLowerCase())))
      }

      // Add substitute suggestions
      if (substitutes[itemName]) {
        allSuggestions.push(...substitutes[itemName].filter(suggestion => !listNames.includes(suggestion.toLowerCase())))
      }
    })
  }

  // Remove duplicates and return a clean list
  const uniqueSuggestions = [...new Set(allSuggestions)]
  return uniqueSuggestions.slice(0, 10)
}

/**
 * Determines the current season based on the month.
 * @returns The current season as a string ('spring', 'summer', 'fall', 'winter').
 */
function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

/**
 * Determines the reason for a suggestion.
 * @param suggestion The suggested item.
 * @param shoppingList The current shopping list.
 * @returns An object with the reason and type of suggestion.
 */
export function getSuggestionReason(suggestion: string, shoppingList: ShoppingItem[]): {
  reason: string;
  type: 'seasonal' | 'trending' | 'frequent' | 'substitute';
} {
  const lowerSuggestion = suggestion.toLowerCase()
  const listNames = shoppingList.map(item => item.name.toLowerCase())
  const currentSeason = getCurrentSeason()
  const seasonalList = seasonalItems[currentSeason as keyof typeof seasonalItems] || []

  // Check if it's a frequently bought together item
  for (const itemName of listNames) {
    if (frequentlyBoughtTogether[itemName]?.includes(lowerSuggestion)) {
      return { reason: 'Frequently bought together', type: 'frequent' }
    }
  }

  // Check if it's a substitute
  for (const itemName of listNames) {
    if (substitutes[itemName]?.includes(lowerSuggestion)) {
      return { reason: 'Good substitute', type: 'substitute' }
    }
  }

  // Check if it's a seasonal item
  if (seasonalList.includes(lowerSuggestion)) {
    return { reason: 'In Season', type: 'seasonal' }
  }

  // Check if it's a trending item
  if (trendingItems.includes(lowerSuggestion)) {
    return { reason: 'Trending', type: 'trending' }
  }

  // If none of the above, categorize as smart
  return { reason: 'Smart suggestion', type: 'frequent' }
}