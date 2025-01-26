import LoginForm from "../../components/LoginForm"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Welcome to Risk Assessment Engine</h1>
      <LoginForm />
    </main>
  )
}

