"use client";
import { Header } from "@/components/header";
import { TranscriptSidebar } from "@/components/transcript-sidebar";
import { AssistantProvider } from "@/components/assistantContext";
import { MobileTranscript } from "@/components/mobile-transcript";
import { LanguageProvider } from "@/components/languageContext";
import VrmViewer from "@/components/vrmViewer";
import {
  MessageInputContainer,
  VoiceInputHandle,
} from "@/components/messageInputContainer";
import { useRef } from "react";

export default function HomePage() {
  const voiceRef = useRef<VoiceInputHandle>(null);

  return (
    <LanguageProvider>
      <AssistantProvider
        startVoiceChat={() => voiceRef.current?.startVoiceChat()}
      >
        <div className="h-screen bg-gradient-to-b from-blue-50 to-white text-blue-900 flex flex-col overflow-hidden">
          <Header />

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col justify-center items-center">
              <MessageInputContainer ref={voiceRef} />
              <VrmViewer url="https://ipfs.io/ipfs/bafybeihx4xjb5mphocdq2os63g43pgnpi46ynolpmhln3oycoasywdnl3u" />
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
