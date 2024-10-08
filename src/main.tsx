import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
// import { Provider } from 'jotai/ts3.8/react/Provider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<Provider>*/}
        <Analytics />
        <App />
        {/*</Provider>*/}
    </StrictMode>
)
