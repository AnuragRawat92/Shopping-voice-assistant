// VoiceRecognition.tsx 
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, Loader2, Zap } from 'lucide-react'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface VoiceRecognitionProps {
  isListening: boolean
  setIsListening: (listening: boolean) => void
  onTranscript: (transcript: string) => void
  isProcessing: boolean
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
  isListening,
  setIsListening,
  onTranscript,
  isProcessing
}) => {
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setTranscript(transcript)
        onTranscript(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        setError(event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      setIsSupported(false)
      setError('Your browser does not support speech recognition.')
    }
  }, [onTranscript, setIsListening])

  const toggleListening = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isSupported) return

    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      setError('')
      setTranscript('')
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch {
        setError('Unable to start voice recognition.')
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
        <MicOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          Voice Commands Unavailable
        </h3>
        <p className="text-gray-400 text-sm">
          Please try using Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>Smart Voice Assistant</span>
        </h3>
        <p className="text-gray-400 text-sm">
          Tap the mic and say what you need
        </p>
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          disabled={isProcessing}
          type="button"
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25'
              : isProcessing
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
          }`}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </motion.div>
            ) : isListening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Volume2 className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rings when listening */}
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border-2 border-red-400 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 border-2 border-pink-400 rounded-full"
              />
            </>
          )}
        </motion.button>
      </div>

      {/* Status */}
      <AnimatePresence mode="wait">
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <p className="text-emerald-400 font-medium">Listening...</p>
            <p className="text-gray-400 text-sm">Say your request</p>
          </motion.div>
        )}
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <p className="text-cyan-400 font-medium">Processing...</p>
            <p className="text-gray-400 text-sm">Analyzing your input</p>
          </motion.div>
        )}
        
        {!isListening && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <p className="text-gray-400">Press the mic to begin</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700/50 rounded-xl p-4 mb-4"
        >
          <p className="text-gray-300 text-sm font-medium mb-2">You said:</p>
          <p className="text-white font-semibold">"{transcript}"</p>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4"
        >
          <p className="text-red-400 text-sm">Error: {error}</p>
        </motion.div>
      )}

      {/* Example Commands */}
      <div className="bg-gray-700/30 rounded-xl p-4">
        <h4 className="text-gray-300 font-medium mb-2">Try saying:</h4>
        <div className="space-y-1 text-sm">
          <p className="text-gray-400">• "Add rice to my list"</p>
          <p className="text-gray-400">• "Remove sugar from cart"</p>
          <p className="text-gray-400">• "Show available fruits"</p>
          <p className="text-gray-400">• "I need 3 bottles of oil"</p>
                <p className="text-gray-400">• सेब</p>
                  <p className="text-gray-400">• मुझे सेब चाहिए</p>
                  <p className="text-gray-400">• सेब हटाओ</p>
        
        </div>
      </div>
    </div>
  )
}

export default VoiceRecognition
