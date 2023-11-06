import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage";
import storage from './storage'
import { api, persistApi } from './apis'
import { authReducer } from './slices'

const persistAuthConfig = persistReducer(
  {
    key: 'auth',
    storage,
  },
  authReducer
)

const persistApiConfig = persistReducer(
  {
    key: persistApi.reducerPath,
    storage,
  },
  persistApi.reducer
)

const rootReducer = combineReducers({
  auth: persistAuthConfig,
  [persistApi.reducerPath]: persistApiConfig,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      persistApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export * from './slices'
export * from './apis'
