"use client";
import { Header } from "@/components/header";
import { TranscriptSidebar } from "@/components/transcript-sidebar";
import { AssistantProvider } from "@/components/assistant-context";
import { MobileTranscript } from "@/components/mobile-transcript";
import { LanguageProvider } from "@/components/language-context";
import VrmViewer from "@/components/vrmViewer";
import {
  MessageInputContainer,
  VoiceInputHandle,
} from "@/components/messageInputContainer";
import { useRef } from "react";

export default function AiPage() {
  const voiceRef = useRef<VoiceInputHandle>(null);
  return (
    <LanguageProvider>
      <AssistantProvider
        startVoiceChat={() => voiceRef.current?.startVoiceChat()}
      >
        <div className="h-screen bg-gradient-to-b from-amber-50 to-white text-amber-900 flex flex-col overflow-hidden">
          <Header />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center">
              <MessageInputContainer ref={voiceRef} />
              <VrmViewer />
            </div>

            <div className="hidden lg:block">
              <TranscriptSidebar />
            </div>
          </div>

          <MobileTranscript />
        </div>
      </AssistantProvider>
    </LanguageProvider>
  );
}
