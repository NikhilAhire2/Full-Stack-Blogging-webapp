import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { Toaster } from 'sonner'
import store from './redux/store.js'
import Themeprovider from "./components/ui/Themeprovider.jsx"
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'


const persistor=persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <Themeprovider>

          <App />

        </Themeprovider>
        <Toaster richColors position="top-center" />
      </PersistGate>


    </Provider>

  </StrictMode>,
)
