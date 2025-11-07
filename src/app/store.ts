import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/task/taskSlice'
import categoriesReducer from '../features/categories/categoriesSlice'


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
