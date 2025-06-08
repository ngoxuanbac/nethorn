import { MessageInput } from "@/components/messageInput";
import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useLanguage } from "./languageContext";
import { useAssistant } from "./assistantContext";

export type VoiceInputHandle = {
  startVoiceChat: () => void;
};

export const MessageInputContainer = forwardRef<VoiceInputHandle>((_, ref) => {
  const { language } = useLanguage();

  const { chatProcessing: isChatProcessing, handleSendChat } = useAssistant();

  const [userMessage, setUserMessage] = useState("");
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition>();
  const [isMicRecording, setIsMicRecording] = useState(false);

  const handleRecognitionResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setUserMessage(text);

      if (event.results[0].isFinal) {
        setUserMessage(text);
        handleSendChat(text);
      }
    },
    [handleSendChat]
  );

  const handleRecognitionEnd = useCallback(() => {
    setIsMicRecording(false);
  }, []);

  const handleClickMicButton = useCallback(() => {
    if (isMicRecording) {
      speechRecognition?.abort();
      setIsMicRecording(false);

      return;
    }

    speechRecognition?.start();
    setIsMicRecording(true);
  }, [isMicRecording, speechRecognition]);

  useImperativeHandle(ref, () => ({
    startVoiceChat: handleClickMicButton,
  }));

  const handleClickSendButton = useCallback(() => {
    handleSendChat(userMessage);
  }, [handleSendChat, userMessage]);

  useEffect(() => {
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = getVoiceLanguage(language);
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener("result", handleRecognitionResult);
    recognition.addEventListener("end", handleRecognitionEnd);

    setSpeechRecognition(recognition);
  }, [handleRecognitionResult, handleRecognitionEnd, language]);

  useEffect(() => {
    if (!isChatProcessing) {
      setUserMessage("");
    }
  }, [isChatProcessing]);

  return (
    <>
      <MessageInput
        userMessage={userMessage}
        isChatProcessing={isChatProcessing}
        isMicRecording={isMicRecording}
        onKeyDownUserMessage={(e) => {
          if (e.key === "Enter") {
            handleClickSendButton();
          }
        }}
        onChangeUserMessage={(e) => setUserMessage(e.target.value)}
        onClickMicButton={handleClickMicButton}
        onClickSendButton={handleClickSendButton}
      />
    </>
  );
});
MessageInputContainer.displayName = "MessageInputContainer";

function getVoiceLanguage(uiLanguage: string): string {
  const languageMap: Record<string, string> = {
    vi: "vi-VN",
    en: "en-US",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    th: "th-TH",
    id: "id-ID",
  };
  return languageMap[uiLanguage] || "vi-VN";
}
