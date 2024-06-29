import App from '@/App'
import { api } from '@/state/api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer},
  middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
