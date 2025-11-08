export interface Task {
  id: string
  title: string
  description: string
  notes: string
  createdAt: number
}

export interface Column {
  id: string
  title: string
  taskIds: string[]
}

export interface KanbanState {
  tasks: Record<string, Task>
  columns: Column[]
  columnOrder: string[]
}
