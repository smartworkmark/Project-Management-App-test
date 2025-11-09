'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface PromptModalProps {
  isOpen: boolean
  prompt: string
  onClose: () => void
  isLoading?: boolean
}

export default function PromptModal({
  isOpen,
  prompt,
  onClose,
  isLoading = false,
}: PromptModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-2xl"
          >
            <div className="bg-tactical-darkAlt border-2 border-tactical-orange rounded-lg p-6 shadow-2xl shadow-tactical-orange/30">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tactical-orange uppercase tracking-wide">
                  AI Generated Prompt
                </h2>
                <button
                  onClick={onClose}
                  className="text-tactical-text hover:text-tactical-orange transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tactical-orange mb-4"></div>
                    <p className="text-tactical-textSecondary">Generating prompt...</p>
                  </div>
                </div>
              ) : (
                <>
                  <textarea
                    value={prompt}
                    readOnly
                    className="w-full h-64 bg-tactical-dark border border-tactical-border rounded-lg p-4 text-sm text-tactical-text font-mono resize-none focus:outline-none focus:border-tactical-orange mb-4 leading-relaxed"
                  />

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className={`flex-1 py-2 px-4 rounded font-bold text-sm uppercase tracking-wider transition-all ${
                        copied
                          ? 'bg-green-600 text-white'
                          : 'bg-tactical-orange text-tactical-dark hover:bg-tactical-orangeLight'
                      }`}
                    >
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 bg-tactical-border text-tactical-text py-2 px-4 rounded font-bold text-sm uppercase tracking-wider hover:bg-tactical-border/80 transition-all"
                    >
                      Close
                    </button>
                  </div>

                  <p className="text-xs text-tactical-textSecondary mt-4 text-center">
                    Paste this prompt into Claude Code to get started implementing this feature
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
