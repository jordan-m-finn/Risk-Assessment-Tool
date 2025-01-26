import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 dark:text-white">Welcome to Risk Assessment Engine</h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto dark:text-gray-300">
          Revolutionize your security with AI-powered risk assessment. Our cutting-edge platform analyzes CCTV feeds and
          security sources to provide real-time insights and protect what matters most.
        </p>
        <div className="flex justify-center">
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI-Powered Analysis"
            description="Our advanced AI algorithms analyze video feeds in real-time, detecting potential risks and anomalies."
          />
          <FeatureCard
            title="Customizable Alerts"
            description="Set up personalized alerts and receive notifications via Telegram for immediate response to potential threats."
          />
          <FeatureCard
            title="Comprehensive Reporting"
            description="Generate detailed risk assessment reports to improve your security strategies and resource allocation."
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

