import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetAuth: () => initialState,
  },
});

export type AuthState = typeof initialState;

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
