import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { WalletProvider } from "./contexts/WalletContext.jsx";
import App from './App.jsx'

import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <WalletProvider>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ WalletProvider>
    </StrictMode>,
)