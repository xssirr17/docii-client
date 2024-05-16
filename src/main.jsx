import React from 'react'
import ReactDOM from 'react-dom/client'
import store from '@/stores'
import App from './App'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
