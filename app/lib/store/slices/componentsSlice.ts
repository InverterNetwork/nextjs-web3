import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {}

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<Partial<CompState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetComponents: () => initialState,
  },
})

export type CompState = typeof initialState

// Action creators are generated for each case reducer function
export const { setComponents, resetComponents } = componentsSlice.actions

export const componentsReducer = componentsSlice.reducer
