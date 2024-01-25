import { Auth } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Auth = {
  isAuth: false,
  address: '',
  role: 'USER',
  email: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      state = {
        ...state,
        ...action.payload,
      }

      state.isAuth = !!action.payload?.address

      return state
    },
    resetAuth: () => initialState,
  },
})

export type AuthState = typeof initialState

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions

export const authReducer = authSlice.reducer
