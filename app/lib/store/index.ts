import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { persistReducer } from 'redux-persist'
import storage from './storage'
import { api, persistApi } from './apis'
import { compReducer } from './slices'

const persistCompConfig = persistReducer(
  {
    key: 'comp',
    storage,
  },
  compReducer
)

const persistApiConfig = persistReducer(
  {
    key: persistApi.reducerPath,
    storage,
  },
  persistApi.reducer
)

const rootReducer = combineReducers({
  comp: persistCompConfig,
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
