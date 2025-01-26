export default function TypingIndicator() {
  return (
    <div className="flex space-x-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-[60px]">
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  )
}