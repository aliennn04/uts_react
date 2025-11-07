import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CategoriesState {
  list: string[]
}

const initialState: CategoriesState = {
  list: ['Pekerjaan', 'Pribadi', 'Belajar', 'Lainnya'],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.list.includes(action.payload)) state.list.push(action.payload)
    },
  },
})

export const { addCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
