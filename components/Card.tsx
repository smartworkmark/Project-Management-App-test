'use client'

import { Task, CardFontSize } from '@/lib/types'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PromptModal from './PromptModal'

interface CardProps {
  task: Task
  onDelete: () => void
  onUpdate: (task: Task) => void
  isDragging?: boolean
  columnId: string
  fontSize: CardFontSize
}

const fontSizeClasses = {
  small: {
    title: 'text-xs',
    description: 'text-[10px]',
    button: 'text-[10px]',
    input: 'text-xs',
    textareaDesc: 'text-[10px]',
  },
  medium: {
    title: 'text-sm',
    description: 'text-xs',
    button: 'text-xs',
    input: 'text-sm',
    textareaDesc: 'text-xs',
  },
  large: {
    title: 'text-base',
    description: 'text-sm',
    button: 'text-xs',
    input: 'text-base',
    textareaDesc: 'text-sm',
  },
}

export default function Card({ task, onDelete, onUpdate, isDragging, columnId, fontSize }: CardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [notes, setNotes] = useState(task.notes)
  const [showNotes, setShowNotes] = useState(false)
  const [showPromptModal, setShowPromptModal] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const classes = fontSizeClasses[fontSize]

  const handleDragStart = (e: React.DragEvent) => {
    if (isEditing) {
      e.preventDefault()
      return
    }
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, sourceColumnId: columnId }))
  }

  const handleSave = () => {
    onUpdate({
      ...task,
      title,
      description,
      notes,
    })
    setIsEditing(false)
  }

  const handleGeneratePrompt = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(`Error: ${error.error}`)
        setIsGenerating(false)
        return
      }

      const data = await response.json()
      setGeneratedPrompt(data.prompt)
      setShowPromptModal(true)
    } catch (error) {
      console.error('Error generating prompt:', error)
      alert('Failed to generate prompt. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div
      draggable={!isEditing}
      onDragStart={handleDragStart}
      className={`bg-tactical-darkAlt border border-tactical-border rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-tactical-orange hover:shadow-lg hover:shadow-tactical-orange/20 ${
        isDragging ? 'opacity-50 ring-2 ring-tactical-orange' : ''
      }`}
      role="button"
      tabIndex={0}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-tactical-text ${classes.title} break-words flex-1`}>{title || 'Untitled Task'}</h3>
            <div className="flex gap-1 ml-2">
              <button
                onClick={handleGeneratePrompt}
                disabled={isGenerating}
                className="text-xs px-2 py-1 rounded bg-tactical-border text-tactical-text hover:bg-tactical-orange hover:text-tactical-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Generate AI prompt"
              >
                ✨
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className={`${classes.button} px-2 py-1 rounded bg-tactical-border text-tactical-text hover:bg-tactical-orange hover:text-tactical-dark transition-all`}
              >
                ✎
              </button>
              <button
                onClick={onDelete}
                className={`${classes.button} px-2 py-1 rounded bg-tactical-border text-tactical-text hover:bg-red-600 hover:text-white transition-all`}
              >
                ✕
              </button>
            </div>
          </div>

          {description && (
            <p className={`${classes.description} text-tactical-textSecondary mb-2 line-clamp-2`}>{description}</p>
          )}

          {notes && (
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`${classes.description} text-tactical-orange hover:text-tactical-orangeLight transition-colors`}
            >
              {showNotes ? '▼ Notes' : '▶ Notes'}
            </button>
          )}

          {showNotes && notes && (
            <div className="mt-2 pt-2 border-t border-tactical-border">
              <p className={`${classes.description} text-tactical-textSecondary`}>{notes}</p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 ${classes.input} text-tactical-text focus:outline-none focus:border-tactical-orange`}
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 ${classes.textareaDesc} text-tactical-text focus:outline-none focus:border-tactical-orange resize-none`}
            placeholder="Description"
            rows={2}
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 ${classes.textareaDesc} text-tactical-text focus:outline-none focus:border-tactical-orange resize-none`}
            placeholder="Notes"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`flex-1 bg-tactical-orange text-tactical-dark font-bold ${classes.button} py-1 rounded hover:bg-tactical-orangeLight transition-all`}
            >
              Save
            </button>
            <button
              onClick={() => {
                setTitle(task.title)
                setDescription(task.description)
                setNotes(task.notes)
                setIsEditing(false)
              }}
              className={`flex-1 bg-tactical-border text-tactical-text ${classes.button} py-1 rounded hover:bg-tactical-border transition-all`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </motion.div>

      <PromptModal
        isOpen={showPromptModal}
        prompt={generatedPrompt}
        isLoading={isGenerating}
        onClose={() => setShowPromptModal(false)}
      />
    </div>
  )
}
