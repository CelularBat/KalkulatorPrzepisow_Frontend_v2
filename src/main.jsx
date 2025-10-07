import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToastManager from '@zustand/widgets/ToastManager';
import { AskPopUpManager } from '@zustand/widgets/AskPopUpManager';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   
    <ToastManager/>
    <AskPopUpManager />
  </StrictMode>,
)
