// components/InteractiveHero/InteractiveHero.js (النسخة الكاملة والنهائية - تصميم فاخر)

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Send, X, MessageSquare } from "lucide-react";

// --- Global Style to control body scroll ---
const GlobalChatStyle = createGlobalStyle`
  body {
    overflow: ${({ isOpen }) => (isOpen ? "hidden" : "auto")};
  }
`;

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// --- (Part 1: Creative Hero View) ---
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #ffffff;
  text-align: center;
  padding: 2rem;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  z-index: -2;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: -1;
`;

const InitialView = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 700px;
  z-index: 10;
`;

const MainTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  max-width: 550px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const StartChatButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// --- (Part 2: Redesigned Chat Window) ---

const ChatModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ChatWindow = styled(motion.div)`
  width: 100%;
  max-width: 42rem;
  height: 85vh;
  background-color: #1c1c1e; /* Deep charcoal black */
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  font-family: var(--font-poppins), sans-serif; /* Elegant font */
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatTitle = styled.h3`
  font-weight: 500;
  font-size: 1.125rem;
  color: #fff;
`;

const CloseButton = styled.button`
  padding: 0.25rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #fff;
    transform: rotate(90deg);
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 0.8rem 1.2rem;
  border-radius: 1.25rem;
  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};
  color: #fff;
  line-height: 1.6;
  font-weight: 400;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background: ${({ sender }) =>
    sender === "user"
      ? "linear-gradient(135deg, #c09f6b, #a9834e)" /* Luxury gold/bronze */
      : "#2c2c2e"}; /* Dark gray for AI */
  border-bottom-right-radius: ${({ sender, lang }) =>
    sender === "user" && lang !== "ar" ? "0.35rem" : "1.25rem"};
  border-bottom-left-radius: ${({ sender, lang }) =>
    sender === "ai" || (sender === "user" && lang === "ar")
      ? "0.35rem"
      : "1.25rem"};
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  span {
    width: 0.5rem;
    height: 0.5rem;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 9999px;
    animation: ${pulse} 1.4s infinite ease-in-out both;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const SuggestedQuestionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 0 1.5rem 1rem 1.5rem;
`;

const QuestionChip = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
`;

const InputForm = styled.form`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  background-color: #2c2c2e;
  color: white;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: border-color 0.2s ease;
  font-family: var(--font-poppins), sans-serif;
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    outline: none;
    border-color: #c09f6b; /* Gold accent on focus */
  }
`;

const SendButton = styled.button`
  padding: 0.8rem;
  background: #c09f6b; /* Gold accent */
  color: #1c1c1e; /* Dark text for contrast */
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #a9834e;
  }
  &:disabled {
    background-color: #4b5563;
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.5);
  }
`;

// --- The Main Component ---
export default function InteractiveHero() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const lang = "ar"; // Or 'en'

  // This is the message sending logic.
  const handleSendMessage = async (messageText) => {
    const userMessage = messageText.trim();
    if (!userMessage) return;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user", lang },
    ]);
    setIsTyping(true);

    // Call your backend API here
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const aiReply = data.reply;

      setMessages((prev) => [...prev, { text: aiReply, sender: "ai", lang }]);
    } catch (error) {
      console.error("Failed to fetch AI reply:", error);
      const errorMsg =
        lang === "ar"
          ? "عفواً، حدث خطأ أثناء الاتصال. يرجى المحاولة مرة أخرى."
          : "Sorry, an error occurred. Please try again.";
      setMessages((prev) => [...prev, { text: errorMsg, sender: "ai", lang }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
    setInputValue("");
  };

  const suggestedQuestions =
    lang === "ar"
      ? [
          "ما هي خدماتكم الأساسية؟",
          "أريد تصميم فيلا، من أين أبدأ؟",
          "هل لديكم مشاريع في أبوظبي؟",
        ]
      : [
          "What are your core services?",
          "I want to design a villa, where do I start?",
          "Do you have projects in Abu Dhabi?",
        ];

  // Set initial welcome message when chat opens
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          text:
            lang === "ar"
              ? "مرحباً! أنا مساعد خالص الذكي. كيف يمكنني مساعدتك اليوم؟"
              : "Hello! I am the Khales AI assistant. How can I help you today?",
          sender: "ai",
          lang: lang,
        },
      ]);
    }
  }, [isChatOpen, messages.length, lang]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <GlobalChatStyle isOpen={isChatOpen} />
      <HeroContainer>
        <VideoBackground
          autoPlay
          loop
          muted
          playsInline
          src="/assets/Untitled video - Made with Clipchamp.mp4"
        />
        <Overlay />
        <AnimatePresence>
          {!isChatOpen && (
            <InitialView
              key="initial"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <MainTitle variants={itemVariants}>
                {lang === "ar"
                  ? "نصمم الواقع من وحي الخيال"
                  : "Designing Reality from Imagination"}
              </MainTitle>
              <Subtitle variants={itemVariants}>
                {lang === "ar"
                  ? "مساعدنا الذكي جاهز للإجابة على استفساراتك حول مشاريع الهندسة المعمارية والتصميم الداخلي الفاخرة."
                  : "Our intelligent assistant is ready to answer your inquiries about luxury architecture and interior design projects."}
              </Subtitle>
              <StartChatButton
                variants={itemVariants}
                onClick={() => setIsChatOpen(true)}
              >
                <MessageSquare size={20} />
                {lang === "ar"
                  ? "ابدأ محادثة فورية"
                  : "Start an Instant Conversation"}
              </StartChatButton>
            </InitialView>
          )}
        </AnimatePresence>
      </HeroContainer>

      <AnimatePresence>
        {isChatOpen && (
          <ChatModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChatWindow
              lang={lang}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
            >
              <ChatHeader>
                <ChatTitle>
                  {lang === "ar" ? "مساعد خالص الذكي" : "Khales AI Assistant"}
                </ChatTitle>
                <CloseButton onClick={() => setIsChatOpen(false)}>
                  <X size={20} />
                </CloseButton>
              </ChatHeader>

              <MessagesArea>
                {messages.map((msg, index) => (
                  <MessageBubble key={index} sender={msg.sender} lang={lang}>
                    {msg.text}
                  </MessageBubble>
                ))}
                {isTyping && (
                  <MessageBubble sender="ai" lang={lang}>
                    <TypingIndicator>
                      <span></span>
                      <span></span>
                      <span></span>
                    </TypingIndicator>
                  </MessageBubble>
                )}
                <div ref={messagesEndRef} />
              </MessagesArea>

              <SuggestedQuestionsContainer>
                {suggestedQuestions.map((q, i) => (
                  <QuestionChip key={i} onClick={() => handleSendMessage(q)}>
                    {q}
                  </QuestionChip>
                ))}
              </SuggestedQuestionsContainer>
              <InputForm onSubmit={handleFormSubmit}>
                <ChatInput
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  placeholder={
                    lang === "ar"
                      ? "اكتب سؤالك هنا..."
                      : "Type your question here..."
                  }
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
                <SendButton type="submit" disabled={!inputValue.trim()}>
                  <Send size={20} />
                </SendButton>
              </InputForm>
            </ChatWindow>
          </ChatModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
