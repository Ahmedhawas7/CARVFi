import React, { useState, useRef, useEffect } from 'react';

const AIChat = ({ user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // تحميل المحادثة من localStorage إذا موجودة
    const savedChat = localStorage.getItem(`carvfi_chat_${user.address}`);
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      // رسالة ترحيب أولية
      setMessages([
        {
          id: 1,
          text: `Hello ${user.address.substring(0, 6)}...! 👋 I'm your CARVFi AI assistant. I'm here to help you with Web3, blockchain, and everything CARVFi! What would you like to know?`,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [user.address]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
    // حفظ المحادثة في localStorage عند كل تحديث
    localStorage.setItem(`carvfi_chat_${user.address}`, JSON.stringify(messages));
  }, [messages, user.address]);

  // ذكاء اصطناعي متقدم مع ذاكرة
  const generateAIResponse = async (userMessage, messageHistory) => {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // التحقق من التاريخ للمزيد من الذكاء
    const lastUserMessages = messageHistory
      .filter(msg => msg.sender === 'user')
      .slice(-3)
      .map(msg => msg.text.toLowerCase());

    // نظام ردود ذكي مع ذاكرة
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      if (lastUserMessages.some(msg => msg.includes('hello') || msg.includes('hi'))) {
        return "Hello again! 😊 I'm still here to help with anything about CARVFi or Web3. What's on your mind?";
      }
      return "Hello there! 👋 I'm excited to help you explore CARVFi and the world of Web3. What specifically would you like to know?";
    }
    else if (lowerMessage.includes('carvfi')) {
      return "CARVFi is a revolutionary Social FI platform on the Carv network! 🚀 It combines social interactions with DeFi rewards, allowing you to earn points for being active, connecting wallets, and participating in the community.";
    }
    else if (lowerMessage.includes('web3') || lowerMessage.includes('blockchain')) {
      return "Web3 represents the next evolution of the internet - decentralized, user-owned, and built on blockchain technology. 🌐 Unlike Web2 where companies control your data, Web3 gives you ownership and control!"; 
    }
    else if (lowerMessage.includes('reward') || lowerMessage.includes('point')) {
      return "On CARVFi, you earn rewards by: 💰\n• Chatting with me (+10 points)\n• Updating your profile (+5 points)\n• Connecting wallets (+25 points)\n• Social interactions (+15 points)\n• NFT activities (+50 points)\nThe more active you are, the more you earn!";
    }
    else if (lowerMessage.includes('nft')) {
      return "NFTs (Non-Fungible Tokens) are unique digital assets on blockchain! 🎨 Each NFT is one-of-a-kind and can represent art, collectibles, or even membership access. CARVFi will soon support NFT displays and trading!";
    }
    else if (lowerMessage.includes('defi')) {
      return "DeFi (Decentralized Finance) is financial services without intermediaries! 💸 Think lending, borrowing, and trading directly on blockchain. CARVFi integrates DeFi principles with social interactions - that's Social FI!";
    }
    else if (lowerMessage.includes('profile') || lowerMessage.includes('edit')) {
      return "You can edit your profile by clicking the 'Edit Profile' button! ✏️ Update your username, bio, avatar, and social links. Don't forget to save your changes!";
    }
    else if (lowerMessage.includes('help')) {
      return "I can help you with: 🤖\n• Understanding CARVFi features\n• Web3 and blockchain concepts\n• NFT and DeFi explanations\n• Reward system details\n• Profile management\n• Technical guidance\nWhat would you like to explore?";
    }
    else if (lowerMessage.includes('thank')) {
      return "You're welcome! 😊 I'm always here to help. Feel free to ask me anything else about CARVFi or Web3!";
    }
    else {
      // ردود عشوائية ذكية
      const randomResponses = [
        "That's an interesting question! I'm constantly learning about Web3 and CARVFi. Could you tell me more about what you'd like to know?",
        "I love exploring new topics with you! Could you rephrase that or ask about something specific?",
        "Great question! I'm here to help you navigate CARVFi and Web3. What aspect are you most curious about?",
        "I'm excited to learn with you! Let me know if you have questions about CARVFi, rewards, Web3, or anything blockchain-related!",
        "That's a thoughtful question! Based on our conversation, I think you'd enjoy learning more about Web3 fundamentals. Want me to explain anything specific?"
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage, newMessages);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in AI chat:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I encountered a small issue! Let me try again... What were you asking about?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared! 🧹 I'm ready for a fresh conversation. What would you like to talk about?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    localStorage.removeItem(`carvfi_chat_${user.address}`);
  };

  const quickReplies = [
    "How do I edit my profile?",
    "Tell me about CARVFi rewards",
    "What is Web3?",
    "Explain NFTs simply",
    "How does DeFi work?"
  ];

  return (
    <div className="ai-chat-wrapper">
      {/* Header ثابت خارج المحادثة */}
      <div className="ai-chat-header-fixed">
        <div className="ai-header-info">
          <h3>🤖 CARVFi AI Assistant</h3>
          <span className="ai-status">Online • Ready to help</span>
        </div>
        <div className="ai-header-actions-fixed">
          <button className="btn btn-clear-fixed" onClick={clearChat} title="Clear chat history">
            🧹 Clear Chat
          </button>
          <button className="btn btn-close-fixed" onClick={onClose} title="Close chat">
            ✕ Close
          </button>
        </div>
      </div>

      {/* منطقة المحادثة الرئيسية */}
      <div className="ai-chat-container-fixed" ref={messagesContainerRef}>
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {messages.length <= 2 && (
          <div className="quick-replies">
            <p>💡 Quick questions to get started:</p>
            <div className="reply-buttons">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="reply-btn"
                  onClick={() => {
                    setInputMessage(reply);
                    setTimeout(() => {
                      document.querySelector('.ai-chat-input-fixed input')?.focus();
                    }, 100);
                  }}
                  disabled={isLoading}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input ثابت خارج المحادثة */}
      <div className="ai-chat-input-fixed">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter to send)"
          disabled={isLoading}
          autoFocus
        />
        <button 
          className="btn btn-send-fixed"
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? '⏳' : '🚀 Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChat;
