# 🛒 BlueCartAI – Shopping Voice Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://shopping-voice-assistant.vercel.app/)  
[![GitHub Repo](https://img.shields.io/badge/Code-GitHub-black?logo=github)](https://github.com/AnuragRawat92/Shopping-voice-assistant)  

---

## 📖 Live Link

✨ **Try it live:** [Shopping Voice Assistant](https://shopping-voice-assistant.vercel.app/)  

---
---
🔑 Testing Credentials

For demo and testing purposes, you can log in with the following credentials:

Email:    anurag@gmail.com
Password: anurag


👉 Use these credentials on the Login Page:
---
---

## 📖 Overview

**BlueCartAI** is a **multilingual AI-powered voice shopping assistant** that allows users to manage shopping lists using **voice commands** in **English & Hindi**.  
It provides **smart product suggestions**, seasonal recommendations, pricing filters, and supports secure **JWT authentication**.  

✨ **Try it live:** [Shopping Voice Assistant](https://shopping-voice-assistant.vercel.app/)  

---
## Setup

setup:
  steps:
    - step: Download/Clone
      description: |
        Download the project ZIP from GitHub or clone the repo.
        Example:
          git clone https://github.com/AnuragRawat92/Shopping-voice-assistant.git
          cd Shopping-voice-assistant

    - step: Install Dependencies
      commands:
        - npm install
      notes: Run in the root folder (this installs dependencies for both frontend and backend).

    - step: Run Backend
      commands:
        - npm run start
      notes: Backend will run on http://localhost:3001 (keep this terminal open).

    - step: Run Frontend
      commands:
        - npm run dev
      notes: Frontend will run on http://localhost:5173 (open this in your browser).

usage: |
  1. Open http://localhost:5173 in your browser.
  2. The frontend will connect to the backend running at http://localhost:3001.
  3. Run backend (`npm run start`) and frontend (`npm run dev`) in separate terminals.

notes: |
  - Ensure Node.js (>=18) is installed.
  - Keep both backend and frontend running simultaneously for full functionality.
  - Start backend first (`npm run start`), then frontend (`npm run dev`).



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
```
User Voice Command
        |
        v
Speech Recognition API
        |
        v
NLP Processing (English/Hindi)
        |
        v
Node.js Backend + Express
   |             |
   v             v
JWT Auth     Shopping List Manager
                 |
                 v
        Smart Suggestions Engine
                 |
                 v
   Categorization + Seasonal + Brand + Price Filters
                 |
                 v
          React + Tailwind UI

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
