"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CameraSetup() {
  const router = useRouter()
  const [cameraData, setCameraData] = useState({
    cameraType: "",
    location: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/camera-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cameraData),
      })

      if (!response.ok) {
        throw new Error("Failed to save camera information")
      }

      router.push("/employee-dashboard")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 dark:text-white">Camera Setup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cameraType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Camera Type
                </label>
                <input
                  type="text"
                  id="cameraType"
                  value={cameraData.cameraType}
                  onChange={(e) => setCameraData({ ...cameraData, cameraType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={cameraData.location}
                  onChange={(e) => setCameraData({ ...cameraData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Enroll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}