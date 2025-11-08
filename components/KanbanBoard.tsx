'use client'

import { useEffect, useState, useCallback } from 'react'
import { KanbanState, Task } from '@/lib/types'
import {
  getInitialState,
  saveState,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  addColumn,
  deleteColumn,
} from '@/lib/localStorage'
import Column from './Column'
import { motion, AnimatePresence } from 'framer-motion'

export default function KanbanBoard() {
  const [state, setState] = useState<KanbanState | null>(null)
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  // Initialize state
  useEffect(() => {
    setState(getInitialState())
  }, [])

  // Auto-save state to localStorage
  useEffect(() => {
    if (state) {
      saveState(state)
    }
  }, [state])

  const handleAddTask = useCallback(
    (columnId: string, task: Omit<Task, 'createdAt' | 'id'>) => {
      setState((prev) => (prev ? addTask(prev, columnId, task) : null))
    },
    []
  )

  const handleDeleteTask = useCallback((taskId: string) => {
    setState((prev) => (prev ? deleteTask(prev, taskId) : null))
  }, [])

  const handleUpdateTask = useCallback((task: Task) => {
    setState((prev) => (prev ? updateTask(prev, task.id, task) : null))
  }, [])

  const handleMoveTask = useCallback(
    (taskId: string, sourceColumnId: string, destColumnId: string, destIndex: number) => {
      setState((prev) =>
        prev ? moveTask(prev, taskId, sourceColumnId, destColumnId, destIndex) : null
      )
    },
    []
  )

  const handleAddColumn = useCallback(() => {
    if (newColumnTitle.trim()) {
      setState((prev) => (prev ? addColumn(prev, newColumnTitle.trim().toUpperCase()) : null))
      setNewColumnTitle('')
      setIsAddingColumn(false)
    }
  }, [newColumnTitle])

  const handleDeleteColumn = useCallback((columnId: string) => {
    setState((prev) => (prev ? deleteColumn(prev, columnId) : null))
  }, [])

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-tactical-orange text-lg font-bold">
          INITIALIZING TACTICAL OPS SYSTEM...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tactical-dark via-tactical-darkAlt to-tactical-dark p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-tactical-orange/20 to-transparent blur-lg rounded-lg"></div>
          <div className="relative bg-tactical-darkAlt border-2 border-tactical-orange p-6 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-tactical-orange uppercase tracking-widest mb-2">
              TACTICAL OPS
            </h1>
            <p className="text-tactical-textSecondary text-sm font-mono">
              Mission Control System v2.1.7 | Classified
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Board */}
      <motion.div
        layout
        className="flex gap-4 pb-8 overflow-x-auto min-h-[calc(100vh-300px)]"
      >
        <AnimatePresence>
          {state.columnOrder.map((columnId) => {
            const column = state.columns.find((c) => c.id === columnId)
            if (!column) return null

            const columnTasks = column.taskIds
              .map((taskId) => state.tasks[taskId])
              .filter(Boolean)

            return (
              <motion.div
                key={column.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Column
                  column={column}
                  tasks={columnTasks}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteColumn={handleDeleteColumn}
                  onMoveTask={handleMoveTask}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Add Column Button */}
        {!isAddingColumn ? (
          <motion.button
            layout
            onClick={() => setIsAddingColumn(true)}
            className="flex-shrink-0 bg-tactical-border hover:bg-tactical-orange/10 border-2 border-dashed border-tactical-orange text-tactical-orange rounded-lg p-4 h-fit hover:text-tactical-orangeLight transition-all font-bold uppercase tracking-wider min-w-max"
          >
            + Add Column
          </motion.button>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-shrink-0 bg-tactical-darkAlt border-2 border-tactical-orange rounded-lg p-4 w-96"
          >
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Column name"
              className="w-full bg-tactical-dark border border-tactical-border rounded px-3 py-2 text-tactical-text focus:outline-none focus:border-tactical-orange mb-3"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddColumn}
                className="flex-1 bg-tactical-orange text-tactical-dark font-bold py-2 rounded hover:bg-tactical-orangeLight transition-all"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingColumn(false)
                  setNewColumnTitle('')
                }}
                className="flex-1 bg-tactical-border text-tactical-text py-2 rounded hover:opacity-80 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 text-center text-tactical-textSecondary text-xs font-mono border-t border-tactical-border pt-4"
      >
        <p>System Status: ONLINE | Tasks: {Object.keys(state.tasks).length} | Columns: {state.columns.length}</p>
        <p>Data persisted locally | Last sync: now</p>
      </motion.div>
    </div>
  )
}
