export type Language = "vi" | "en";

export interface Translations {
  // Header
  voiceChat: string;
  hideTranscript: string;
  showTranscript: string;
  transcript: string;
  conversationHistory: string;

  //Input
  inputPlaceholder: string;

  // Suggested Prompts
  quickSuggestions: string;
  selectSuggestionToStart: string;
  orStartSpeaking: string;

  // Prompt Categories
  ideas: string;
  chat: string;
  gift: string;
  preserve: string;
  use: string;
  review: string;
  compare: string;
  order: string;
  price: string;

  // Prompt Templates
  ideasPrompt: string;
  chatPrompt: string;
  giftPrompt: string;
  preservePrompt: string;
  usePrompt: string;
  reviewPrompt: string;
  comparePrompt: string;
  orderPrompt: string;
  pricePrompt: string;

  // Messages
  you: string;
  aiAssistant: string;
  noConversation: string;
  startSpeakingToSeeTranscript: string;
  messages: string;
  readyToRecord: string;

  // Responses
  defaultResponse: string;

  // Settings
  language: string;
  voice: string;
  speed: string;
  settings: string;
  volume: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    // Header
    voiceChat: "Voice Chat",
    hideTranscript: "Ẩn",
    showTranscript: "Hiện",
    transcript: "Transcript",
    conversationHistory: "Lịch sử cuộc trò chuyện",

    inputPlaceholder: "Hỏi tôi bất cứ điều gì",
    readyToRecord: "Sẵn sàng ghi âm",

    // Suggested Prompts
    quickSuggestions: "Gợi ý nhanh",
    selectSuggestionToStart: "Chọn một gợi ý để bắt đầu",
    orStartSpeaking: "Hoặc bắt đầu nói ngay",

    // Prompt Categories
    ideas: "Ý tưởng",
    chat: "Trò chuyện",
    gift: "Quà tặng",
    preserve: "Bảo quản",
    use: "Hướng dẫn",
    review: "Đánh giá",
    compare: "So sánh",
    order: "Đặt hàng",
    price: "Giá thành",

    // Prompt Templates
    ideasPrompt:
      "Gợi ý 5 sản phẩm thủ công nổi bật của làng nghề Thụy Ứng - Thường Tín.",
    giftPrompt:
      "Tôi muốn tìm một bộ quà tặng làm từ sừng phù hợp để biếu sếp – bạn có gợi ý không?",
    preservePrompt:
      "Làm sao để bảo quản sản phẩm từ sừng để giữ độ bền và độ bóng?",
    usePrompt:
      "Cách sử dụng dụng cụ massage bằng sừng như thế nào để đạt hiệu quả tốt nhất?",
    reviewPrompt:
      "Bạn có thể cho tôi xem đánh giá của khách hàng về một số sản phẩm gua từ sừng được không?",
    comparePrompt:
      "Sản phẩm lược sừng khác gì so với lược gỗ hay lược nhựa thông thường?",
    orderPrompt:
      "Tôi muốn đặt một bộ sản phẩm từ sừng làm quà tặng, cần làm như thế nào?",
    pricePrompt:
      "Lược sừng massage da đầu hiện đang được bán với giá bao nhiêu?",
    chatPrompt:
      "Làng nghề Thụy Ứng có truyền thống làm sừng như thế nào? Ý nghĩa văn hóa là gì?",

    // Messages
    you: "Bạn",
    aiAssistant: "AI Assistant",
    noConversation: "Chưa có cuộc trò chuyện nào",
    startSpeakingToSeeTranscript: "Bắt đầu nói để xem transcript",
    messages: "tin nhắn",

    defaultResponse:
      "Cảm ơn bạn đã sử dụng gợi ý! Tôi sẽ giúp bạn với yêu cầu này. Bạn có thể cung cấp thêm chi tiết để tôi hỗ trợ tốt hơn không?",

    language: "Ngôn ngữ",
    voice: "Giọng nói",
    speed: "Tốc độ",
    settings: "Cài đặt",
    volume: "Âm lượng",
  },

  en: {
    // Header
    voiceChat: "Voice Chat",
    hideTranscript: "Hide",
    showTranscript: "Show",
    transcript: "Transcript",
    conversationHistory: "Conversation History",

    inputPlaceholder: "Ask me anything",
    readyToRecord: "Ready to record",

    // Suggested Prompts
    quickSuggestions: "Quick Suggestions",
    selectSuggestionToStart: "Select a suggestion to start",
    orStartSpeaking: "Or start speaking now",

    // Prompt Categories
    ideas: "Ideas",
    chat: "Chat",
    gift: "Gift",
    preserve: "Preservation",
    use: "Usage",
    review: "Review",
    compare: "Comparison",
    order: "Order",
    price: "Price",

    // Prompt Templates
    ideasPrompt:
      "Suggest 5 outstanding handicraft products from Thụy Ứng village.",
    giftPrompt:
      "I want to find a suitable gift set made from horn for my boss, do you have any suggestions?",
    preservePrompt:
      "How to preserve horn products to maintain their durability and shine?",
    usePrompt: "How to use horn massage tools to achieve the best results?",
    reviewPrompt: "Can you show me customer reviews of some horn products?",
    comparePrompt:
      "What are the differences between horn and wooden or plastic combs?",
    orderPrompt: "I want to order a horn gift set, what should I do?",
    pricePrompt: "What is the current price of a horn scalp massager?",
    chatPrompt:
      "What is the cultural significance of horn products in Thụy Ứng village?",

    // Messages
    you: "You",
    aiAssistant: "AI Assistant",
    noConversation: "No conversation yet",
    startSpeakingToSeeTranscript: "Start speaking to see transcript",
    messages: "messages",

    defaultResponse:
      "Thank you for using the suggestion! I'll help you with this request. Can you provide more details so I can assist you better?",

    // Settings
    language: "Language",
    voice: "Voice",
    speed: "Speed",
    settings: "Settings",
    volume: "Volume",
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.vi;
}
