import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string
  title: string
  category: string
  completed: boolean
}

interface TasksState {
  items: Task[]
  filter: string
}

const initialState: TasksState = {
  items: [],
  filter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = { id: crypto.randomUUID(), ...action.payload }
      state.items.push(newTask)
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.items.find(t => t.id === action.payload)
      if (task) task.completed = !task.completed
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
  },
})



export const { addTask, toggleComplete, updateTask,  deleteTask, setFilter } = tasksSlice.actions
export default tasksSlice.reducer





