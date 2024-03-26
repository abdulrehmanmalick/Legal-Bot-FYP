import { Inter } from 'next/font/google'
import './globals.css'

import "@/public/css/index.css"
import "@/public/css/output.css"
import AuthContext from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LegalBot',
  description: 'Virtual lawyer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          {children}
        </ AuthContext>
      </body>
    </html>
  )
}
