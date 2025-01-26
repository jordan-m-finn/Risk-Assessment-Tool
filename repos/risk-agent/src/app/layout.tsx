import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import ThemeToggle from "../components/ThemeToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Risk Assessment Engine",
  description: "Determining risks through AI and image classification by assessing available CCTV and security sources",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <nav className="bg-indigo-600 dark:bg-indigo-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Risk Assessment Engine
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login" className="hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

