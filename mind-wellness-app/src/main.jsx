import { StrictMode } from 'react'
import { Client } from 'appwrite';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const client = new Client();
client.setProject('67c3145f000a63368658');

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
