"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Menu, RotateCcw } from "lucide-react";
import { SettingsMenu } from "./settings-menu";
import { useAssistant } from "./assistantContext";
import { useLanguage } from "./languageContext";
import { LanguageSelector } from "./languageSelector";
import Link from "next/link";

export function Header() {
  const {
    clearMessages,
    toggleTranscript,
    isTranscriptVisible,
    toggleMobileTranscript,
  } = useAssistant();
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center p-3 md:p-4 border-b border-amber-200 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center gap-2 md:gap-3">
        <h1 className="text-base md:text-lg font-bold text-amber-900">
          <Link href="/">NETHORN</Link>
        </h1>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTranscript}
          className="hidden lg:flex text-amber-800 hover:text-amber-600 hover:bg-amber-50"
        >
          <MessageSquare fill="currentColor" className="w-4 h-4 mr-2" />
          {isTranscriptVisible ? t.hideTranscript : t.showTranscript}{" "}
          {t.transcript.toLowerCase()}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileTranscript}
          className="lg:hidden text-amber-800 hover:text-amber-600 hover:bg-amber-50"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <LanguageSelector />
        <Button
          variant="ghost"
          size="sm"
          onClick={clearMessages}
          className="text-amber-800 hover:text-amber-600"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <SettingsMenu />
      </div>
    </div>
  );
}
