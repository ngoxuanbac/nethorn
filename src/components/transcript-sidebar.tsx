"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bot,
  ChartColumnStacked,
  CircleDollarSign,
  Gift,
  Package,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useAssistant } from "./assistantContext";
import { Lightbulb, MessageCircle } from "lucide-react";
import { useLanguage } from "./languageContext";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";

export function TranscriptSidebar() {
  const { messages, isTranscriptVisible } = useAssistant();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  if (!isTranscriptVisible) {
    return null;
  }

  return (
    <div className="w-96 border-l border-amber-200 flex flex-col bg-amber-50 h-full">
      <div className="p-4 border-b border-amber-200 flex-shrink-0">
        <h2 className="font-medium text-amber-900">{t.transcript}</h2>
        <p className="text-sm text-amber-700">{t.conversationHistory}</p>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4">
            {messages.length === 0 ? (
              <SuggestedPrompts />
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.role === "assistant"
                            ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                            : "bg-amber-600 text-white"
                        }
                      >
                        {message.role === "assistant" ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-amber-900">
                          {message.role === "assistant" ? t.aiAssistant : t.you}
                        </span>
                      </div>

                      <Card className="p-3 bg-white border-amber-200">
                        {message.isTyping ? (
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t border-amber-200 flex-shrink-0">
        <div className="text-xs text-amber-600 text-center">
          {messages.length > 0
            ? `${messages.length} ${t.messages}`
            : t.readyToRecord}
        </div>
      </div>
    </div>
  );
}

function SuggestedPrompts() {
  const { startVoiceChat, handleSendChat } = useAssistant();
  const { t } = useLanguage();

  const suggestedPrompts = [
    {
      icon: Lightbulb,
      title: t.ideas,
      prompt: t.ideasPrompt,
      category: "creative",
    },
    {
      icon: MessageCircle,
      title: t.chat,
      prompt: t.chatPrompt,
      category: "chat",
    },
    {
      icon: Gift,
      title: t.gift,
      prompt: t.giftPrompt,
      category: "gift",
    },
    {
      icon: Package,
      title: t.preserve,
      prompt: t.preservePrompt,
      category: "preserve",
    },
    {
      icon: ShoppingBag,
      title: t.use,
      prompt: t.usePrompt,
      category: "use",
    },
    {
      icon: BarChart,
      title: t.review,
      prompt: t.reviewPrompt,
      category: "review",
    },
    {
      icon: ShoppingCart,
      title: t.order,
      prompt: t.orderPrompt,
      category: "order",
    },
    {
      icon: ChartColumnStacked,
      title: t.compare,
      prompt: t.comparePrompt,
      category: "compare",
    },
    {
      icon: CircleDollarSign,
      title: t.price,
      prompt: t.pricePrompt,
      category: "price",
    },
  ];

  const handlePromptClick = (prompt: string) => {
    handleSendChat(prompt);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-amber-900 mb-2">
          {t.quickSuggestions}
        </h3>
        <p className="text-xs text-amber-700">{t.selectSuggestionToStart}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {suggestedPrompts.map((item, index) => (
          <Card
            key={index}
            className="p-3 bg-white border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer group"
            onClick={() => handlePromptClick(item.prompt)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <item.icon className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-amber-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-amber-700 line-clamp-2">
                  {item.prompt}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-2 border-t border-amber-200">
        <Button
          onClick={startVoiceChat}
          variant="outline"
          className="w-full text-sm bg-transparent border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
        >
          {t.orStartSpeaking}
        </Button>
      </div>
    </div>
  );
}
