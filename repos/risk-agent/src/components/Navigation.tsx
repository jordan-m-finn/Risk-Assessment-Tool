"use client"

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { SunIcon, MoonIcon } from './ThemeIcons'

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4 items-center">
            <Link href="/" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200">
              Home
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link href="/register" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200">
                  Register
                </Link>
                <Link href="/login" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link href="/employee-dashboard" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}