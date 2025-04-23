import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routers/router'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { WishlistProvider } from './provider/WishlistContext'
import AuthProvider from './provider/Authprovider'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <WishlistProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </WishlistProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
