import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isAddress } from 'viem'

const initialState = {
  orchestratorAddresses: [] as { address: `0x${string}`; date: Date }[],
  editingOrchestratorAddress: false,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<Partial<CompState>>) => ({
      ...state,
      ...action.payload,
    }),
    setOrchestratorAddress: (
      state,
      action: PayloadAction<`0x${string}` | null | undefined>
    ) => {
      if (!action.payload) return
      if (!isAddress(action.payload)) return

      // if address is already in the list, set existingIndex
      const existingIndex = state.orchestratorAddresses.findIndex(
        (a) => a.address === action.payload
      )

      // if address is already in the list
      if (existingIndex !== -1)
        // remove the existing index
        state.orchestratorAddresses.splice(existingIndex, 1)

      state.orchestratorAddresses.unshift({
        address: action.payload,
        // if address is already in the list, use the existing date
        date: state.orchestratorAddresses?.[existingIndex]?.date ?? new Date(),
      })

      state.editingOrchestratorAddress = false
    },
    resetComponents: () => initialState,
  },
})

export type CompState = typeof initialState

// Action creators are generated for each case reducer function
export const { setComponents, setOrchestratorAddress, resetComponents } =
  componentsSlice.actions

export const componentsReducer = componentsSlice.reducer
