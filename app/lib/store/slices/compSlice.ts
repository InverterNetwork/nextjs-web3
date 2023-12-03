import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  theme: null as string | null,
}

export const compSlice = createSlice({
  name: 'comp',
  initialState,
  reducers: {
    setComp: (state, action: PayloadAction<Partial<CompState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetComp: () => initialState,
  },
})

export type CompState = typeof initialState

// Action creators are generated for each case reducer function
export const { setComp, resetComp } = compSlice.actions

export const compReducer = compSlice.reducer
