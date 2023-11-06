import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(),
  tagTypes: [],
  endpoints: (build) => ({
    // BREAK
  }),
  keepUnusedDataFor: 0,
})

export const persistApi = createApi({
  reducerPath: 'persistApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: [],
  endpoints: (build) => ({
    // BREAK
  }),
  keepUnusedDataFor: 0,
})
