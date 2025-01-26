import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import ThemeToggle from "../components/ThemeToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Risk Assessment Tool",
  description: "Determining risks through AI and image classification by assessing available CCTV and security sources",
}

import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import ChatWidget from '@/components/ChatWidget/ChatWidget'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            <main>{children}</main>
            <ChatWidget />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

