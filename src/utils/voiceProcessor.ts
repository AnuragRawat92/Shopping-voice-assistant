


import { ShoppingItem } from '../types'

// Product variety database for common items
const PRODUCT_VARIETIES: { [key: string]: string[] } = {
  apples: [
    'Red Delicious Apples',
    'Granny Smith Apples', 
    'Gala Apples',
    'Fuji Apples',
    'Honeycrisp Apples',
    'Pink Lady Apples',
    'Golden Delicious Apples',
    'McIntosh Apples',
    'Braeburn Apples',
    'Cortland Apples'
  ],
  milk: [
    'Whole Milk',
    '2% Reduced Fat Milk',
    '1% Low Fat Milk',
    'Skim Milk',
    'Almond Milk',
    'Soy Milk',
    'Oat Milk',
    'Coconut Milk',
    'Organic Whole Milk',
    'Lactose-Free Milk'
  ],
  bread: [
    'Whole Wheat Bread',
    'White Bread',
    'Sourdough Bread',
    'Multigrain Bread',
    'Rye Bread',
    'Pumpernickel Bread',
    'Brioche Bread',
    'Ciabatta Bread',
    'Gluten-Free Bread',
    'Artisan Bread'
  ],
  eggs: [
    'Large Eggs',
    'Extra Large Eggs',
    'Jumbo Eggs',
    'Organic Eggs',
    'Free-Range Eggs',
    'Cage-Free Eggs',
    'Pasture-Raised Eggs',
    'Brown Eggs',
    'White Eggs',
    'Omega-3 Enriched Eggs'
  ],
  cheese: [
    'Cheddar Cheese',
    'Mozzarella Cheese',
    'Swiss Cheese',
    'Provolone Cheese',
    'Gouda Cheese',
    'Brie Cheese',
    'Blue Cheese',
    'Feta Cheese',
    'Parmesan Cheese',
    'Colby Jack Cheese'
  ],
  yogurt: [
    'Greek Yogurt',
    'Regular Yogurt',
    'Vanilla Yogurt',
    'Strawberry Yogurt',
    'Blueberry Yogurt',
    'Plain Yogurt',
    'Low-Fat Yogurt',
    'Non-Fat Yogurt',
    'Organic Yogurt',
    'Plant-Based Yogurt'
  ],
  bananas: [
    'Regular Bananas',
    'Organic Bananas',
    'Plantains',
    'Red Bananas',
    'Lady Finger Bananas',
    'Cavendish Bananas',
    'Baby Bananas',
    'Green Bananas',
    'Ripe Bananas',
    'Frozen Bananas'
  ],
  tomatoes: [
    'Roma Tomatoes',
    'Cherry Tomatoes',
    'Beefsteak Tomatoes',
    'Grape Tomatoes',
    'Heirloom Tomatoes',
    'Campari Tomatoes',
    'Vine-Ripened Tomatoes',
    'Organic Tomatoes',
    'Green Tomatoes',
    'Yellow Tomatoes'
  ],
  chicken: [
    'Chicken Breast',
    'Chicken Thighs',
    'Chicken Wings',
    'Whole Chicken',
    'Ground Chicken',
    'Chicken Tenders',
    'Organic Chicken',
    'Free-Range Chicken',
    'Boneless Chicken',
    'Skinless Chicken'
  ],
  rice: [
    'White Rice',
    'Brown Rice',
    'Basmati Rice',
    'Jasmine Rice',
    'Arborio Rice',
    'Wild Rice',
    'Sushi Rice',
    'Long Grain Rice',
    'Short Grain Rice',
    'Organic Rice'
  ]
}

// Enhanced Hindi to English item mapping
const HINDI_ITEM_MAP: { [key: string]: string } = {
  'दूध': 'milk',
  'रोटी': 'bread',
  'अंडे': 'eggs',
  'चावल': 'rice',
  'चवाल': 'rice', // Common mispronunciation
  'चाय': 'tea',
  'कॉफी': 'coffee',
  'शक्कर': 'sugar',
  'नमक': 'salt',
  'तेल': 'oil',
  'आटा': 'flour',
  'मैदा': 'flour', // Alternative name for flour
  'दाल': 'lentils',
  'सब्जी': 'vegetables',
  'फल': 'fruits',
  'सेब': 'apple',
  'केला': 'banana',
  'कैला': 'banana', // Common mispronunciation
  'केले': 'banana', // Plural form
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

// Hindi number mapping
const HINDI_NUMBERS: { [key: string]: number } = {
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  '१': 1, '२': 2, '३': 3, '४': 4, '५': 5, '६': 6, '७': 7, '८': 8, '९': 9, '१०': 10
}

export interface ProcessedVoiceResult {
  type: 'add' | 'remove' | 'suggest' | 'confirm' | 'error' | 'clear'
  message: string
  item?: ShoppingItem
  suggestions?: string[]
  selectedItem?: string
  quantity?: number
  unit?: string
  category?: string
}

// Call Gemini API for variety suggestions
async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyDDRXyZPZvy2VSnaMkvsuSU_pKs3VGJWcs'
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates[0]?.content.parts[0]?.text || ''
  } catch (error) {
    console.error('Gemini API call failed:', error)
    return ''
  }
}

// Get variety suggestions from Gemini API
async function getVarietySuggestions(itemName: string): Promise<string[]> {
  try {
    const prompt = `Generate 8-10 popular varieties, brands, or types of "${itemName}" for shopping. 
    Include different brands, flavors, sizes, or types that people commonly buy.
    Return only the names, one per line, without numbers or bullet points.
    Examples:
    - For "toothpaste": Colgate, Crest, Sensodyne, Oral-B, etc.
    - For "shoes": Nike, Adidas, Converse, Vans, etc.
    - For "meat": Beef, Pork, Lamb, Chicken, etc.
    - For "lentils": Red Lentils, Green Lentils, Black Lentils, etc.`
    
    const response = await callGeminiAPI(prompt)
    if (response) {
      const suggestions = response.split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .slice(0, 10)
      
      return suggestions.length > 0 ? suggestions : getFallbackSuggestions(itemName)
    }
  } catch (error) {
    console.error('Error getting variety suggestions:', error)
  }
  
  return getFallbackSuggestions(itemName)
}

// Correct Hinglish to proper Hindi using Gemini API and detect remove commands
async function correctHinglishToHindi(text: string): Promise<{correctedText: string, isRemoveCommand: boolean}> {
  try {
    // First check for common remove patterns in Hinglish
    const removePatterns = ['hatao', 'hata', 'nikalo', 'delete', 'remove'];
    const isRemove = removePatterns.some(pattern => text.toLowerCase().includes(pattern));
    
    const prompt = `Correct this Hinglish (Hindi written in English letters) to proper Hindi text.
    Return a JSON object with two fields: "correctedText" and "isRemoveCommand".
    Examples:
    - Input: "doodh" → Output: {"correctedText": "दूध", "isRemoveCommand": false}
    - Input: "kela" → Output: {"correctedText": "केला", "isRemoveCommand": false}
    - Input: "aata hatao" → Output: {"correctedText": "आटा हटाओ", "isRemoveCommand": true}
    - Input: "chawal hatao" → Output: {"correctedText": "चावल हटाओ", "isRemoveCommand": true}
    - Input: "mujhe panch seb chahiye" → Output: {"correctedText": "मुझे पांच सेब चाहिए", "isRemoveCommand": false}
    - Input: "rotī" → Output: {"correctedText": "रोटी", "isRemoveCommand": false}
    
    Input: "${text}"
    Output:`
    
    const response = await callGeminiAPI(prompt)
    if (response) {
      try {
        // Clean the response - remove markdown code blocks if present
        let cleanResponse = response.trim();
        if (cleanResponse.startsWith('```json')) {
          cleanResponse = cleanResponse.replace('```json', '').replace('```', '').trim();
        }
        
        const result = JSON.parse(cleanResponse)
        console.log(`Corrected Hinglish "${text}" to:`, result)
        
        // If we detected a remove pattern but the API didn't, override it
        if (isRemove && !result.isRemoveCommand) {
          result.isRemoveCommand = true;
        }
        
        return result
      } catch (e) {
        console.error('Error parsing Gemini response:', e)
        // Fallback: check if the text contains remove patterns
        const correctedText = response.trim()
        const isRemoveCommand = isRemove || correctedText.includes('हटाओ') || text.toLowerCase().includes('hatao')
        return {correctedText, isRemoveCommand}
      }
    }
  } catch (error) {
    console.error('Error correcting Hinglish to Hindi:', error)
  }
  
  // Fallback: check if the original text contains remove patterns
  const removePatterns = ['hatao', 'hata', 'nikalo', 'delete', 'remove'];
  const isRemoveCommand = removePatterns.some(pattern => text.toLowerCase().includes(pattern));
  return {correctedText: text, isRemoveCommand}
}

// Extract item name from Hindi command using Gemini API and fallback logic
async function extractItemFromHindiCommand(text: string): Promise<string> {
  try {
    const prompt = `Extract the item name from this Hindi command. Return only the item name in Hindi. If the input is a JSON object with a 'correctedText' field, extract the item from that field.
    Examples:
    - Input: "आटा हटाओ" → Output: "आटा"
    - Input: "दूध जोड़ो" → Output: "दूध"
    - Input: "मुझे पांच सेब चाहिए" → Output: "सेब"
    - Input: "रोटी हटाओ" → Output: "रोटी"
    - Input: "चवाल हटाओ" → Output: "चावल"
    - Input: "{"correctedText": "चावल हटाओ", "isRemoveCommand": true}" → Output: "चावल"
    
    Input: "${text}"
    Output:`
    
    const response = await callGeminiAPI(prompt)
    if (response) {
      const itemName = response.trim()
      console.log(`Extracted item from "${text}":`, itemName)
      
      // Handle common mispronunciations
      if (itemName === 'चवाल') return 'चावल'
      
      return itemName
    }
  } catch (error) {
    console.error('Error extracting item from Hindi command:', error)
  }
  
  // Enhanced fallback logic for when Gemini returns an invalid response or fails
  let processedText = text;
  try {
    const parsed = JSON.parse(text);
    if (parsed.correctedText) {
      processedText = parsed.correctedText;
    }
  } catch (e) {
    // If text is not JSON, continue with the original text
  }

  const removePatterns = [' हटाओ', ' हटा', ' निकालो', ' डिलीट करो', ' remove', ' delete']
  for (const pattern of removePatterns) {
    if (processedText.includes(pattern)) {
      const item = processedText.split(pattern)[0].trim()
      if (item === 'चवाल') return 'चावल'
      return item
    }
  }

  const addPatterns = [' जोड़ो', ' एड करो', ' डालो', ' लाओ', ' खरीदो', ' add', ' buy']
  for (const pattern of addPatterns) {
    if (processedText.includes(pattern)) {
      const item = processedText.split(pattern)[0].trim()
      return item;
    }
  }

  // If it's a simple phrase, return the main word
  const words = processedText.split(' ')
  if (words.length > 0) {
    return words[words.length - 1]; // Assume last word is the item
  }

  return processedText
}

// Fallback suggestions if API fails
function getFallbackSuggestions(itemName: string): string[] {
  const lowerName = itemName.toLowerCase()
  
  if (lowerName.includes('shirt') || lowerName.includes('clothes') || lowerName.includes('clothing')) {
    return ['Nike Shirt', 'Adidas Shirt', 'Puma Shirt', 'Under Armour Shirt', 'Levi\'s Shirt', 'Tommy Hilfiger Shirt', 'Calvin Klein Shirt', 'Ralph Lauren Shirt']
  }
  
  if (lowerName.includes('shoes') || lowerName.includes('footwear')) {
    return ['Nike Shoes', 'Adidas Shoes', 'Converse Shoes', 'Vans Shoes', 'Puma Shoes', 'Reebok Shoes', 'New Balance Shoes', 'Skechers Shoes']
  }
  
  if (lowerName.includes('toothpaste') || lowerName.includes('dental')) {
    return ['Colgate Toothpaste', 'Crest Toothpaste', 'Sensodyne Toothpaste', 'Oral-B Toothpaste', 'Aquafresh Toothpaste', 'Arm & Hammer Toothpaste', 'Tom\'s Toothpaste', 'Close-Up Toothpaste']
  }
  
  if (lowerName.includes('meat') || lowerName.includes('beef') || lowerName.includes('pork')) {
    return ['Beef', 'Pork', 'Lamb', 'Chicken', 'Turkey', 'Duck', 'Goat', 'Bison']
  }
  
  if (lowerName.includes('lentil') || lowerName.includes('dal')) {
    return ['Red Lentils', 'Green Lentils', 'Black Lentils', 'Yellow Lentils', 'Brown Lentils', 'Split Peas', 'Chickpeas', 'Kidney Beans']
  }
  
  return [
    `${itemName} - Brand A`,
    `${itemName} - Brand B`, 
    `${itemName} - Premium`,
    `${itemName} - Organic`,
    `${itemName} - Regular`,
    `${itemName} - Large Size`,
    `${itemName} - Small Size`,
    `${itemName} - Standard`
  ]
}

export const processVoiceCommand = async (
  transcript: string,
  language: string = 'en-US'
): Promise<ProcessedVoiceResult> => {
  try {
    const isHindi = language === 'hi-IN';
    let text = transcript.trim();
    let isRemoveCommand = false;
    
    console.log(`Processing command: "${text}" in ${language}`);
    
    // Handle English commands first (simpler logic)
    if (!isHindi) {
      const englishResult = processEnglishCommand(text);
      if (englishResult) {
        console.log('English command processed:', englishResult);
        return englishResult;
      }
    }
    
    // Handle Hindi/Hinglish commands
    if (isHindi) {
      const hasEnglishLetters = /[a-zA-Z]/.test(text);
      
      // Define remove patterns for both languages
      const englishRemovePatterns = ['hatao', 'hata', 'nikalo', 'delete', 'remove'];
      const hindiRemovePatterns = ['हटाओ', 'हटा', 'निकालो', 'डिलीट'];
      
      // Check for remove patterns in original text
      const hasRemovePattern = 
        englishRemovePatterns.some(pattern => text.toLowerCase().includes(pattern)) ||
        hindiRemovePatterns.some(pattern => text.includes(pattern));
      
      let correctedText = text;
      
      if (hasEnglishLetters) {
        const correctionResult = await correctHinglishToHindi(text);
        correctedText = correctionResult.correctedText;
        isRemoveCommand = correctionResult.isRemoveCommand || hasRemovePattern;
      } else {
        isRemoveCommand = hasRemovePattern;
      }
      
      console.log(`Processed text: "${correctedText}", isRemoveCommand: ${isRemoveCommand}`);
      
      // Handle remove commands first
      if (isRemoveCommand) {
        const itemName = await extractItemFromHindiCommand(correctedText);
        const englishItem = HINDI_ITEM_MAP[itemName] || itemName;
        
        console.log(`Remove command - Hindi item: "${itemName}", English item: "${englishItem}"`);
        
        if (englishItem && englishItem !== itemName) {
          return {
            type: 'remove',
            message: `${itemName} आपकी खरीदारी सूची से हटा दिया गया है।`,
            selectedItem: englishItem
          };
        } else if (itemName) {
          return {
            type: 'remove',
            message: `${itemName} आपकी खरीदारी सूची से हटा दिया गया है।`,
            selectedItem: itemName
          };
        } else {
          return {
            type: 'error',
            message: `मैं आइटम को पहचान नहीं पाया। कृपया कोई अन्य आइटम नाम कहें।`
          };
        }
      }
      
      // Handle add commands and other Hindi commands
      const hindiResult = await processHindiCommand(correctedText);
      if (hindiResult) {
        console.log('Hindi command processed:', hindiResult);
        return hindiResult;
      }
    }

    // If no command was processed, return error
    return {
      type: 'error',
      message: isHindi 
        ? 'मैं समझ नहीं पाया। कृपया "दूध जोड़ो" या "मुझे पांच सेब चाहिए" जैसे वाक्य कहकर प्रयास करें।'
        : 'I didn\'t understand that. Try saying something like "add milk" or "I need 5 apples".'
    }

  } catch (error) {
    console.error('Error processing voice command:', error)
    return {
      type: 'error',
      message: 'Sorry, I had trouble processing your request. Please try again.'
    }
  }
}

// Process Hindi commands (add commands only)
async function processHindiCommand(text: string): Promise<ProcessedVoiceResult | null> {
  console.log('Processing Hindi command:', text);
  const lowerText = text.toLowerCase();
  
  // Handle clear command
  if (lowerText.includes('साफ') || lowerText.includes('खाली') || lowerText.includes('clear')) {
    return {
      type: 'clear',
      message: 'आपकी खरीदारी सूची साफ कर दी गई है।'
    };
  }
  
  const addPatterns = ['जोड़ो', 'ऐड करो', 'डालो', 'लाओ', 'खरीदो', 'चाहिए', 'add', 'buy'];
  const hasAddPattern = addPatterns.some(pattern => lowerText.includes(pattern));

  let extractedItem = '';
  let extractedQuantity = 1;

  // First try to extract item and quantity from known Hindi items
  for (const [hindiItem, englishItem] of Object.entries(HINDI_ITEM_MAP)) {
    const hindiItemLower = hindiItem.toLowerCase();
    if (lowerText.includes(hindiItemLower)) {
      extractedItem = hindiItem;

      // Extract quantity
      for (const [hindiNumber, quantity] of Object.entries(HINDI_NUMBERS)) {
        if (lowerText.includes(`${hindiNumber.toLowerCase()} ${hindiItemLower}`) ||
            lowerText.includes(`${quantity} ${hindiItemLower}`)) {
          extractedQuantity = quantity;
          break;
        }
      }
      break;
    }
  }

  // If item found, process it
  if (extractedItem) {
    const englishItem = HINDI_ITEM_MAP[extractedItem] || extractedItem;
    const category = getCategoryForProduct(englishItem);
    const unit = getDefaultUnit(englishItem);
    const quantityText = extractedQuantity > 1 ? `${extractedQuantity} ${unit} ` : `1 ${unit} `;
    
    return {
      type: 'add',
      message: `${quantityText}${extractedItem} आपकी खरीदारी सूची में जोड़ दिया गया है।`,
      item: {
        id: Date.now().toString(),
        name: extractedItem,
        quantity: extractedQuantity,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }

  // If add pattern but no recognized item
  if (hasAddPattern) {
    return {
      type: 'error',
      message: 'आपकी सूची में क्या जोड़ना है, कृपया उस आइटम का नाम कहें। उदाहरण के लिए, "दूध जोड़ो"।'
    };
  }

  // Handle single word items
  const words = text.split(' ').filter(word => word.trim().length > 0);
  if (words.length === 1) {
    const singleWord = words[0];
    const englishItem = HINDI_ITEM_MAP[singleWord] || singleWord;
    
    if (englishItem && HINDI_ITEM_MAP[singleWord]) {
      const category = getCategoryForProduct(englishItem);
      const unit = getDefaultUnit(englishItem);
      
      return {
        type: 'add',
        message: `1 ${unit} ${singleWord} आपकी खरीदारी सूची में जोड़ दिया गया है।`,
        item: {
          id: Date.now().toString(),
          name: singleWord,
          quantity: 1,
          unit,
          category,
          isCompleted: false,
          addedAt: new Date()
        }
      };
    }
  }

  return null;
}

// Process English commands - IMPROVED VERSION
function processEnglishCommand(text: string): ProcessedVoiceResult | null {
  const lowerText = text.toLowerCase();
  
  // Check for clear command
  if (lowerText.includes('clear') || lowerText.includes('empty')) {
    return {
      type: 'clear',
      message: 'Cleared your shopping list.'
    };
  }
  
  // Enhanced remove command handling
  const removePatterns = [
    /(remove|delete|take off|get rid of)\s+(\w+)/i,
    /(\w+)\s+(remove|delete)/i,
    /no more\s+(\w+)/i,
    /don't need\s+(\w+)/i,
    /cancel\s+(\w+)/i
  ];
  
  for (const pattern of removePatterns) {
    const removeMatch = lowerText.match(pattern);
    if (removeMatch) {
      const itemName = removeMatch[2] || removeMatch[1];
      if (itemName && itemName !== 'remove' && itemName !== 'delete') {
        return {
          type: 'remove',
          message: `Removed ${itemName} from your shopping list.`,
          selectedItem: itemName
        };
      }
    }
  }
  
  // Enhanced quantity matching - handle both "5 apples" and "five apples"
  const quantityMatch = lowerText.match(/(add|buy|get|need|want|i need|i want)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(\w+)/i);
  if (quantityMatch) {
    let quantity = parseInt(quantityMatch[2]);
    
    // Handle word numbers
    if (isNaN(quantity)) {
      const numberWords: {[key: string]: number} = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      quantity = numberWords[quantityMatch[2].toLowerCase()] || 1;
    }
    
    const itemName = quantityMatch[3];
    const category = getCategoryForProduct(itemName);
    const unit = getDefaultUnit(itemName);
    
    return {
      type: 'add',
      message: `Added ${quantity} ${unit} of ${itemName} to your shopping list.`,
      item: {
        id: Date.now().toString(),
        name: itemName,
        quantity,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }
  
  // Handle "a" or "an" before items (e.g., "add an apple")
  const aAnMatch = lowerText.match(/(add|buy|get|need|want|i need|i want)\s+(a|an)\s+(\w+)/i);
  if (aAnMatch) {
    const itemName = aAnMatch[3];
    const category = getCategoryForProduct(itemName);
    const unit = getDefaultUnit(itemName);
    
    return {
      type: 'add',
      message: `Added 1 ${unit} of ${itemName} to your shopping list.`,
      item: {
        id: Date.now().toString(),
        name: itemName,
        quantity: 1,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }
  
  // Handle simple add commands without quantity
  const addMatch = lowerText.match(/(add|buy|get|need|want|i need|i want)\s+(\w+)/i);
  if (addMatch) {
    const itemName = addMatch[2];
    const category = getCategoryForProduct(itemName);
    const unit = getDefaultUnit(itemName);
    
    return {
      type: 'add',
      message: `Added 1 ${unit} of ${itemName} to your shopping list.`,
      item: {
        id: Date.now().toString(),
        name: itemName,
        quantity: 1,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }
  
  // Handle standalone items with quantities (e.g., "5 apples", "three bananas")
  const standaloneQuantityMatch = lowerText.match(/^(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(\w+)$/i);
  if (standaloneQuantityMatch) {
    let quantity = parseInt(standaloneQuantityMatch[1]);
    
    // Handle word numbers
    if (isNaN(quantity)) {
      const numberWords: {[key: string]: number} = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      quantity = numberWords[standaloneQuantityMatch[1].toLowerCase()] || 1;
    }
    
    const itemName = standaloneQuantityMatch[2];
    const category = getCategoryForProduct(itemName);
    const unit = getDefaultUnit(itemName);
    
    return {
      type: 'add',
      message: `Added ${quantity} ${unit} of ${itemName} to your shopping list.`,
      item: {
        id: Date.now().toString(),
        name: itemName,
        quantity,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }
  
  // Handle standalone items without quantity (just the item name)
  const commonItems = [
    'milk', 'bread', 'eggs', 'rice', 'tea', 'coffee', 'sugar', 'salt',
    'oil', 'flour', 'apple', 'banana', 'orange', 'tomato', 'potato',
    'onion', 'chicken', 'cheese', 'yogurt', 'butter'
  ];
  
  if (commonItems.includes(lowerText)) {
    const category = getCategoryForProduct(lowerText);
    const unit = getDefaultUnit(lowerText);
    
    return {
      type: 'add',
      message: `Added 1 ${unit} of ${lowerText} to your shopping list.`,
      item: {
        id: Date.now().toString(),
        name: lowerText,
        quantity: 1,
        unit,
        category,
        isCompleted: false,
        addedAt: new Date()
      }
    };
  }
  
  return null;
}

const getCategoryForProduct = (product: string): string => {
  const lowerProduct = product.toLowerCase();
  
  if (lowerProduct.includes('apple') || lowerProduct.includes('banana') || 
      lowerProduct.includes('orange') || lowerProduct.includes('tomato') || 
      lowerProduct.includes('potato') || lowerProduct.includes('onion')) {
    return 'produce';
  }
  
  if (lowerProduct.includes('milk') || lowerProduct.includes('cheese') || 
      lowerProduct.includes('yogurt') || lowerProduct.includes('egg') || 
      lowerProduct.includes('butter')) {
    return 'dairy';
  }
  
  if (lowerProduct.includes('bread')) {
    return 'bakery';
  }
  
  if (lowerProduct.includes('chicken') || lowerProduct.includes('meat') || 
      lowerProduct.includes('fish')) {
    return 'meat';
  }
  
  if (lowerProduct.includes('rice') || lowerProduct.includes('flour') || 
      lowerProduct.includes('sugar') || lowerProduct.includes('salt') || 
      lowerProduct.includes('oil') || lowerProduct.includes('tea') || 
      lowerProduct.includes('coffee')) {
    return 'pantry';
  }
  
  return 'general';
}

const getDefaultUnit = (item: string): string => {
  const lowerItem = item.toLowerCase();
  
  if (lowerItem.includes('apple') || lowerItem.includes('banana') || 
      lowerItem.includes('orange') || lowerItem.includes('tomato') || 
      lowerItem.includes('potato') || lowerItem.includes('onion')) {
    return 'piece';
  }
  
  if (lowerItem.includes('milk')) return 'gallon';
  if (lowerItem.includes('bread')) return 'loaf';
  if (lowerItem.includes('egg')) return 'dozen';
  if (lowerItem.includes('cheese')) return 'package';
  if (lowerItem.includes('yogurt')) return 'container';
  if (lowerItem.includes('chicken')) return 'pound';
  if (lowerItem.includes('rice')) return 'bag';
  if (lowerItem.includes('flour')) return 'bag';
  if (lowerItem.includes('sugar')) return 'bag';
  if (lowerItem.includes('salt')) return 'box';
  if (lowerItem.includes('oil')) return 'bottle';
  if (lowerItem.includes('tea')) return 'box';
  if (lowerItem.includes('coffee')) return 'bag';
  if (lowerItem.includes('butter')) return 'pack';
  
  return 'piece';
}

export const createShoppingItem = (
  name: string,
  quantity: number = 1,
  unit: string = 'piece',
  category: string = 'general'
): ShoppingItem => {
  return {
    id: Date.now().toString(),
    name,
    quantity,
    unit,
    category,
    isCompleted: false,
    addedAt: new Date()
  };
};
