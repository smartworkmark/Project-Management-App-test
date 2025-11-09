import { KanbanState, Column, Task } from './types'

const STORAGE_KEY = 'kanban-board-state'

const defaultState: KanbanState = {
  tasks: {},
  columns: [
    { id: 'col-1', title: 'TO-DO', taskIds: [] },
    { id: 'col-2', title: 'IN PROGRESS', taskIds: [] },
    { id: 'col-3', title: 'COMPLETED', taskIds: [] },
  ],
  columnOrder: ['col-1', 'col-2', 'col-3'],
  cardFontSize: 'medium',
}

export function getInitialState(): KanbanState {
  if (typeof window === 'undefined') {
    return defaultState
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultState

    const parsed = JSON.parse(stored)
    // Migration: add cardFontSize if it doesn't exist
    if (!parsed.cardFontSize) {
      parsed.cardFontSize = 'medium'
    }
    return parsed
  } catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return defaultState
  }
}

export function saveState(state: KanbanState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}

export function addTask(state: KanbanState, columnId: string, task: Omit<Task, 'createdAt' | 'id'>): KanbanState {
  const taskId = `task-${Date.now()}`
  const newTask: Task = {
    id: taskId,
    ...task,
    createdAt: Date.now(),
  }

  const column = state.columns.find(col => col.id === columnId)
  if (!column) return state

  return {
    ...state,
    tasks: { ...state.tasks, [taskId]: newTask },
    columns: state.columns.map(col =>
      col.id === columnId ? { ...col, taskIds: [...col.taskIds, taskId] } : col
    ),
  }
}

export function updateTask(state: KanbanState, taskId: string, updates: Partial<Task>): KanbanState {
  const task = state.tasks[taskId]
  if (!task) return state

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskId]: { ...task, ...updates },
    },
  }
}

export function deleteTask(state: KanbanState, taskId: string): KanbanState {
  const { [taskId]: _, ...remainingTasks } = state.tasks

  return {
    ...state,
    tasks: remainingTasks,
    columns: state.columns.map(col => ({
      ...col,
      taskIds: col.taskIds.filter(id => id !== taskId),
    })),
  }
}

export function moveTask(
  state: KanbanState,
  taskId: string,
  sourceColumnId: string,
  destinationColumnId: string,
  destinationIndex: number
): KanbanState {
  const sourceColumn = state.columns.find(col => col.id === sourceColumnId)
  const destColumn = state.columns.find(col => col.id === destinationColumnId)

  if (!sourceColumn || !destColumn) return state

  const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId)
  const newDestTaskIds = [...destColumn.taskIds]
  newDestTaskIds.splice(destinationIndex, 0, taskId)

  return {
    ...state,
    columns: state.columns.map(col => {
      if (col.id === sourceColumnId) return { ...col, taskIds: newSourceTaskIds }
      if (col.id === destinationColumnId) return { ...col, taskIds: newDestTaskIds }
      return col
    }),
  }
}

export function addColumn(state: KanbanState, title: string): KanbanState {
  const columnId = `col-${Date.now()}`
  const newColumn: Column = {
    id: columnId,
    title,
    taskIds: [],
  }

  return {
    ...state,
    columns: [...state.columns, newColumn],
    columnOrder: [...state.columnOrder, columnId],
  }
}

export function deleteColumn(state: KanbanState, columnId: string): KanbanState {
  const column = state.columns.find(col => col.id === columnId)
  if (!column) return state

  const taskIdsToDelete = column.taskIds
  const newTasks = { ...state.tasks }
  taskIdsToDelete.forEach(taskId => {
    delete newTasks[taskId]
  })

  return {
    ...state,
    tasks: newTasks,
    columns: state.columns.filter(col => col.id !== columnId),
    columnOrder: state.columnOrder.filter(id => id !== columnId),
  }
}

export function updateCardFontSize(state: KanbanState, cardFontSize: KanbanState['cardFontSize']): KanbanState {
  return {
    ...state,
    cardFontSize,
  }
}
