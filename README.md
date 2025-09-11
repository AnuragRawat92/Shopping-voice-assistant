# 🛒 BlueCartAI – Shopping Voice Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://shopping-voice-assistant.vercel.app/)  
[![GitHub Repo](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/AnuragRawat92/Shopping-voice-assistant)  

---

## 📖 Live Link

✨ **Try it live:** [Shopping Voice Assistant](https://shopping-voice-assistant.vercel.app/)  

---
---

## 📖 Overview

**BlueCartAI** is a **multilingual AI-powered voice shopping assistant** that allows users to manage shopping lists using **voice commands** in **English & Hindi**.  
It provides **smart product suggestions**, seasonal recommendations, pricing filters, and supports secure **JWT authentication**.  

✨ **Try it live:** [Shopping Voice Assistant](https://shopping-voice-assistant.vercel.app/)  

---

## 🚀 Core Features

### 🎙️ Voice Command Recognition
- Add / remove items via natural voice input.  
- Handles flexible phrasing:  
  - `Add milk`  
  - `I need apples`  
  - `Buy 2 bottles of water`  

### 🌍 Multilingual (English + Hindi)
- **English:**  
  - `Add 5 apples` → adds 5 apples.  
  - `Remove apples` → removes apples.  
- **हिंदी:**  
  - `5 सेब जोड़ दो` → adds 5 apples.  
  - `सेब हटा दो` → removes apples.  

### 🧠 Smart Suggestions
- Seasonal & trending products (`Mangoes in summer`).  
- Brand-based filters (`Show me organic apples`).  
- Price filters (`Find toothpaste under $5`).  
- Substitutes (`Suggest almond milk instead of milk`).  

### 📦 Shopping List Management
- Add, remove, or modify items.  
- Categorization (fruits, dairy, snacks, etc).  
- Real-time updates in UI.  

### 🔐 Authentication
- JWT Token-based authentication for secure shopping sessions.  

### 🎨 UI/UX
- Clean, minimalist design built with **TailwindCSS**.  
- Mobile-first, voice-friendly interface.  
- Real-time confirmation of actions.  

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | React + Vite + TypeScript + Tailwind CSS |
| **Backend**  | Node.js + Express |
| **Auth**     | JWT Tokens |
| **Hosting**  | Vercel |
| **Voice/NLP**| Speech Recognition API + Custom NLP logic |

---

## ⚡ Architecture & Flow

```mermaid
flowchart TD
    A[🎙️ User Voice Command] --> B[🔊 Speech Recognition API]
    B --> C[🧠 NLP Processing (English/Hindi)]
    C --> D[🌐 Node.js Backend + Express]
    D --> E[🗂️ JWT Authentication + User Session]
    D --> F[📦 Shopping List Manager]
    F --> G[🧠 Smart Suggestions Engine]
    G --> H[📊 Categorization + Seasonal + Brand + Price Filters]
    F --> I[🖥️ React + Tailwind UI]
    H --> I
    E --> I
 ```
🧑‍💻 Installation & Setup

# Clone the repo
git clone https://github.com/AnuragRawat92/Shopping-voice-assistant.git
cd Shopping-voice-assistant

# Install dependencies
npm install

# Run dev server
npm run dev

# Build production
npm run build

🎤 Example Commands
✅ English

Add 5 apples

Remove milk

Find organic apples

Show trending items

Find toothpaste under $5

🇮🇳 Hindi

5 सेब जोड़ दो

सेब हटा दो

ऑर्गेनिक सेब दिखाओ

सीजनल प्रोडक्ट्स बताओ

🔮 Future Enhancements

✅ Support for more Indian regional languages.

✅ Payment gateway integration.

✅ AI-driven personalized recommendations.

✅ Push notifications for discounts & offers.

👨‍💻 Author

Anurag Rawat – IET 2025
