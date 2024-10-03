import { Provider } from 'react-redux'
import { store } from '.'
import { persistStore } from 'redux-persist'

persistStore(store) // persist the store

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
