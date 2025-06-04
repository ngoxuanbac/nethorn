"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <div className="flex gap-3 group">
      <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
        <AvatarFallback
          className={
            message.type === "assistant"
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : "bg-gray-600 text-white"
          }
        >
          {message.type === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white">
            {message.type === "assistant" ? "AI Assistant" : "Bạn"}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <Card className="p-3 bg-gray-800 border-gray-700 relative">
          {message.isTyping ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap pr-8">{message.content}</p>

              {/* Message Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  {message.type === "assistant" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-green-400 hover:bg-gray-700"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
