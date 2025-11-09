'use client'

import { Column as ColumnType, Task, CardFontSize } from '@/lib/types'
import Card from './Card'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ColumnProps {
  column: ColumnType
  tasks: Task[]
  onAddTask: (columnId: string, task: Omit<Task, 'createdAt' | 'id'>) => void
  onDeleteTask: (taskId: string) => void
  onUpdateTask: (task: Task) => void
  onDeleteColumn?: (columnId: string) => void
  onMoveTask?: (taskId: string, sourceColumnId: string, destColumnId: string, destIndex: number) => void
  fontSize: CardFontSize
}

export default function Column({
  column,
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onDeleteColumn,
  onMoveTask,
  fontSize,
}: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const handleAdd = () => {
    if (title.trim()) {
      onAddTask(column.id, {
        title: title.trim(),
        description: description.trim(),
        notes: notes.trim(),
      })
      setTitle('')
      setDescription('')
      setNotes('')
      setIsAdding(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      const { taskId, sourceColumnId } = data

      if (onMoveTask) {
        onMoveTask(taskId, sourceColumnId, column.id, tasks.length)
      }
    } catch (error) {
      console.error('Failed to drop task:', error)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`bg-tactical-dark border-2 rounded-lg p-4 min-h-screen max-h-[calc(100vh-120px)] overflow-y-auto flex flex-col w-full md:w-96 transition-all duration-200 ${
        isDragOver ? 'border-tactical-orange bg-tactical-orange/5 shadow-lg shadow-tactical-orange/20' : 'border-tactical-border'
      }`}
    >
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-tactical-dark pt-2 pb-4 z-10">
        <h2 className="text-lg font-bold text-tactical-orange uppercase tracking-wider">
          {column.title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-tactical-textSecondary bg-tactical-border px-2 py-1 rounded">
            {tasks.length}
          </span>
          {onDeleteColumn && column.id !== 'col-1' && column.id !== 'col-2' && column.id !== 'col-3' && (
            <button
              onClick={() => onDeleteColumn(column.id)}
              className="text-xs px-2 py-1 rounded bg-tactical-border text-tactical-text hover:bg-red-600 transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        <motion.div layout className="space-y-3 flex-1">
          {tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              columnId={column.id}
              onDelete={() => onDeleteTask(task.id)}
              onUpdate={onUpdateTask}
              fontSize={fontSize}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {!isAdding ? (
        <motion.button
          layout
          onClick={() => setIsAdding(true)}
          className="mt-4 w-full bg-tactical-border text-tactical-text border border-dashed border-tactical-orange py-2 rounded hover:bg-tactical-orange/10 hover:text-tactical-orange transition-all text-sm font-semibold uppercase tracking-wider"
        >
          + Add Card
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 space-y-2 bg-tactical-darkAlt p-3 rounded-lg border border-tactical-orange"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
            className="w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 text-sm text-tactical-text focus:outline-none focus:border-tactical-orange"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 text-xs text-tactical-text focus:outline-none focus:border-tactical-orange resize-none"
            rows={2}
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full bg-tactical-dark border border-tactical-border rounded px-2 py-1 text-xs text-tactical-text focus:outline-none focus:border-tactical-orange resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 bg-tactical-orange text-tactical-dark font-bold text-xs py-1 rounded hover:bg-tactical-orangeLight transition-all"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setTitle('')
                setDescription('')
                setNotes('')
              }}
              className="flex-1 bg-tactical-border text-tactical-text text-xs py-1 rounded hover:opacity-80 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
