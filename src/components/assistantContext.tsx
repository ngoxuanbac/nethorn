"use client";

import { getChatResponseStream } from "@/features/chat/openAiChat";
import {
  DEFAULT_ELEVEN_LABS_PARAM,
  ElevenLabsParam,
} from "@/features/constants/elevenLabsParam";
import {
  DEFAULT_KOEIRO_PARAM,
  KoeiroParam,
} from "@/features/constants/koeiroParam";
import { SYSTEM_PROMPT } from "@/features/constants/systemPromptConstants";
import { MessageMiddleOut } from "@/features/messages/messageMiddleOut";
import qaData from "../../public/qa.json";
import {
  Message,
  Screenplay,
  textsToScreenplay,
} from "@/features/messages/messages";
import { speakCharacter } from "@/features/messages/speakCharacter";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";

interface AssistantContextType {
  messages: Message[];
  clearMessages: () => void;
  startVoiceChat: () => void;
  chatProcessing: boolean;
  setKoeiroParam: (param: KoeiroParam) => void;
  handleSendChat: (prompt: string) => void;
  isTranscriptVisible: boolean;
  toggleTranscript: () => void;
  isMobileTranscriptOpen: boolean;
  toggleMobileTranscript: () => void;
  assistantMessage: string;
  isPlayingAudio: boolean;
  isAISpeaking: boolean;
}

const AssistantContext = createContext<AssistantContextType | undefined>(
  undefined
);

export function AssistantProvider({
  children,
  startVoiceChat,
}: {
  children: ReactNode;
  startVoiceChat: () => void;
}) {
  const { viewer } = useContext(ViewerContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const [isMobileTranscriptOpen, setIsMobileTranscriptOpen] = useState(false);
  const [elevenLabsParam, setElevenLabsParam] = useState<ElevenLabsParam>(
    DEFAULT_ELEVEN_LABS_PARAM
  );
  const [koeiroParam, setKoeiroParam] =
    useState<KoeiroParam>(DEFAULT_KOEIRO_PARAM);
  const [chatProcessing, setChatProcessing] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  // needed because AI speaking could involve multiple audios being played in sequence
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const toggleTranscript = useCallback(() => {
    setIsTranscriptVisible((prev) => !prev);
  }, []);

  const toggleMobileTranscript = useCallback(() => {
    setIsMobileTranscriptOpen((prev) => !prev);
  }, []);

  const updateLastMessage = useCallback((content: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content,
          isTyping: false,
        };
      }
      return updated;
    });
  }, []);

  const handleAssistantResponse = useCallback(
    (response: string) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          isTyping: true,
        },
      ]);

      setTimeout(() => {
        updateLastMessage(response);
      }, 500);
    },
    [updateLastMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("chatVRMParams")) {
      const params = JSON.parse(
        window.localStorage.getItem("chatVRMParams") as string
      );
      setElevenLabsParam(params.elevenLabsParam);
      setMessages(params.messages);
    }
  }, []);

  useEffect(() => {
    process.nextTick(() => {
      window.localStorage.setItem(
        "chatVRMParams",
        JSON.stringify({ elevenLabsParam, messages })
      );
    });
  }, [elevenLabsParam, messages]);

  const handleSpeakAi = useCallback(
    async (
      screenplay: Screenplay,
      elevenLabsParam: ElevenLabsParam,
      onStart?: () => void,
      onEnd?: () => void
    ) => {
      setIsAISpeaking(true); // Set speaking state before starting
      try {
        speakCharacter(
          screenplay,
          process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
          elevenLabsParam,
          viewer,
          () => {
            setIsPlayingAudio(true);
            onStart?.();
          },
          () => {
            setIsPlayingAudio(false);
            onEnd?.();
          }
        );
      } finally {
        setIsAISpeaking(false); // Ensure speaking state is reset even if there's an error
      }
    },
    [viewer]
  );

  const handleSendChat = useCallback(
    async (text: string) => {
      const newMessage = text;
      if (newMessage == null) return;

      setChatProcessing(true);
      // Add user's message to chat log
      const messageLog: Message[] = [
        ...messages,
        { role: "user", content: newMessage },
      ];
      setMessages(messageLog);

      // Process messages through MessageMiddleOut
      const messageProcessor = new MessageMiddleOut();
      const processedMessages = messageProcessor.process([
        {
          role: "system",
          content: `${SYSTEM_PROMPT}. \nBelow is a list of Q&A pairs about these products. 
            If the user's question is related to any of these, please provide the exact corresponding answer from the list.
            If the question is not related, answer normally. Q&A data: ${JSON.stringify(
              qaData
            )}`,
        },
        ...messageLog,
      ]);

      const stream = await getChatResponseStream(
        processedMessages,
        process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""
      ).catch((e) => {
        console.error(e);
        return null;
      });
      if (stream == null) {
        setChatProcessing(false);
        return;
      }

      const reader = stream.getReader();
      let receivedMessage = "";
      let aiTextLog = "";
      let tag = "";
      const sentences = new Array<string>();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          receivedMessage += value;

          const tagMatch = receivedMessage.match(/^\[(.*?)\]/);
          if (tagMatch && tagMatch[0]) {
            tag = tagMatch[0];
            receivedMessage = receivedMessage.slice(tag.length);

            console.log("tag:");
            console.log(tag);
          }

          const sentenceMatch = receivedMessage.match(
            /^(.+[。．！？\n.!?]|.{10,}[、,])/
          );
          if (sentenceMatch && sentenceMatch[0]) {
            const sentence = sentenceMatch[0];
            sentences.push(sentence);

            console.log("sentence:");
            console.log(sentence);

            receivedMessage = receivedMessage
              .slice(sentence.length)
              .trimStart();

            if (
              !sentence.replace(
                /^[\s\[\(\{「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」\}\)\]]+$/g,
                ""
              )
            ) {
              continue;
            }

            const aiText = `${tag} ${sentence}`;
            const aiTalks = textsToScreenplay([aiText], koeiroParam);
            aiTextLog += sentence;

            const currentAssistantMessage = sentences.join(" ");
            console.log(currentAssistantMessage);
            handleSpeakAi(aiTalks[0], elevenLabsParam, () => {
              setAssistantMessage(currentAssistantMessage);
            });
          }
        }
      } catch (e) {
        setChatProcessing(false);
        console.error(e);
      } finally {
        reader.releaseLock();
      }

      handleAssistantResponse(aiTextLog);
      setChatProcessing(false);
    },
    [
      messages,
      handleAssistantResponse,
      koeiroParam,
      handleSpeakAi,
      elevenLabsParam,
    ]
  );

  const value: AssistantContextType = {
    messages,
    clearMessages,
    isTranscriptVisible,
    toggleTranscript,
    isMobileTranscriptOpen,
    toggleMobileTranscript,
    startVoiceChat,
    handleSendChat,
    chatProcessing,
    setKoeiroParam,
    assistantMessage,
    isPlayingAudio,
    isAISpeaking,
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error("useAssistant must be used within a AssistantProvider");
  }
  return context;
}
