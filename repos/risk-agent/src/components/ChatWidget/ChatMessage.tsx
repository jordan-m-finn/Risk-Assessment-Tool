import ProfileImage from './ProfileImage'

interface ChatMessage {
  content: string
  isBot: boolean
  timestamp: Date
}

export default function ChatMessage({ content, isBot, timestamp }: ChatMessage) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 items-start space-x-2`}>
      {isBot && <ProfileImage />}
      <div className={`rounded-lg px-4 py-2 max-w-[75%] ${
        isBot ? 'bg-gray-100 text-gray-800' : 'bg-[#003087] text-white'
      }`}>
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}