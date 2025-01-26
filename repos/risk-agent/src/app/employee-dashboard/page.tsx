"use client"

import { useState } from "react"

export default function EmployeeDashboard() {
  const [searchParams, setSearchParams] = useState({
    address: "",
    radius: "",
  })
  const [searchResults, setSearchResults] = useState([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to the 3rd party service
    // to get location data and perform risk assessment
    // For this example, we'll use mock data
    const mockResults = [
      { id: 1, address: "123 Main St", risk: "Low" },
      { id: 2, address: "456 Elm St", risk: "Medium" },
      { id: 3, address: "789 Oak St", risk: "High" },
    ]
    setSearchResults(mockResults)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Location Search</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={searchParams.address}
                  onChange={(e) => setSearchParams({ ...searchParams, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
                  Radius (km)
                </label>
                <input
                  type="number"
                  id="radius"
                  value={searchParams.radius}
                  onChange={(e) => setSearchParams({ ...searchParams, radius: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                <ul className="space-y-2">
                  {searchResults.map((result: any) => (
                    <li key={result.id} className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">{result.address}</p>
                      <p className="text-sm text-gray-600">Risk: {result.risk}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

