import { User, UserRole } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: User & { isAuth: boolean } = {
  isAuth: false,
  address: '',
  role: UserRole.User,
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<UserState>>) => {
      state = {
        ...state,
        ...action.payload,
      }

      state.isAuth = !!action.payload?.address

      return state
    },
    setUser: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetUser: () => initialState,
  },
})

export type UserState = typeof initialState

// Action creators are generated for each case reducer function
export const { setAuth, setUser, resetUser } = userSlice.actions

export const userReducer = userSlice.reducer
