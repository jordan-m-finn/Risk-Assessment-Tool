"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CameraSetup() {
  const router = useRouter()
  const [cameraData, setCameraData] = useState({
    cameraURL: "",  // This should match the field name in our API
    position: "",
    customPrompt: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/camera-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cameraURL: cameraData.cameraURL,    // Make sure field names match
          position: cameraData.position,
          customPrompt: cameraData.customPrompt,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save camera information")
      }

      router.push("/user-dashboard")
    } catch (err: any) {
      setError(err.message)
    }
  }
  const [error, setError] = useState("")

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 dark:text-white">Camera Setup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cameraURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Camera URL
                </label>
                <input
                  type="text"
                  id="cameraURL"
                  value={cameraData.cameraURL}
                  onChange={(e) => setCameraData({ ...cameraData, cameraURL: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={cameraData.position}
                  onChange={(e) => setCameraData({ ...cameraData, position: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="custom prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Custom Prompt
                </label>
                <input
                  type="text"
                  id="customPrompt"
                  value={cameraData.customPrompt}
                  onChange={(e) => setCameraData({ ...cameraData, customPrompt: e.target.value })}
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