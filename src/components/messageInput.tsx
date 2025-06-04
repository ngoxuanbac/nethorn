"use client";

import type React from "react";

import { Loader2Icon, Mic, Send } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-context";

type Props = {
  userMessage: string;
  isMicRecording: boolean;
  isChatProcessing: boolean;
  onChangeUserMessage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDownUserMessage: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClickSendButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickMicButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const MessageInput = ({
  userMessage,
  isMicRecording,
  isChatProcessing,
  onChangeUserMessage,
  onKeyDownUserMessage,
  onClickMicButton,
  onClickSendButton,
}: Props) => {
  const { t } = useLanguage();

  return (
    <div className="absolute bottom-0 w-full z-20">
      <div className="text-amber-900">
        <div className="mx-auto max-w-4xl p-2">
          <div className="flex items-center gap-2 p-2  bg-amber-50 rounded-full border border-amber-300">
            <Button
              size="icon"
              className={cn(
                "rounded-full border-0 h-10 w-10 transition-colors duration-300",
                isMicRecording
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-800"
              )}
              disabled={isChatProcessing}
              onClick={onClickMicButton}
            >
              <Mic className="h-4 w-4" />
            </Button>

            <input
              type="text"
              placeholder={t.inputPlaceholder}
              onChange={onChangeUserMessage}
              onKeyDown={onKeyDownUserMessage}
              disabled={isChatProcessing}
              className="flex-1 bg-transparent border-0 text-amber-900 placeholder:text-amber-500 focus:outline-none text-base px-3 disabled:text-amber-400 disabled:cursor-not-allowed"
              value={userMessage}
            />

            <Button
              size="icon"
              className="rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 border-0 h-10 w-10 disabled:bg-amber-100/50 disabled:text-amber-400"
              disabled={isChatProcessing || !userMessage}
              onClick={onClickSendButton}
            >
              {isChatProcessing ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
