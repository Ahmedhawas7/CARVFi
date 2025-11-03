import React, { useState, useRef, useEffect } from 'react';

// بدائل SVG للأيقونات
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <circle cx="8.5" cy="10.5" r="1.5"/>
    <circle cx="15.5" cy="10.5" r="1.5"/>
    <path d="M12 18c2.28 0 4.22-1.66 5-4H7c.78 2.34 2.72 4 5 4z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const PaperclipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
  </svg>
);

const SmileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'مرحباً! أنا المساعد الافتراضي لـ CarVFi، كيف يمكنني مساعدتك اليوم؟',
      sender: 'AI',
      timestamp: new Date(),
      isCurrentUser: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        isCurrentUser: true
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsLoading(true);

      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: `هذه استجابة من الذكاء الاصطناعي لرسالتك: "${newMessage}". كيف يمكنني مساعدتك أكثر؟`,
          sender: 'AI',
          timestamp: new Date(),
          isCurrentUser: false
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <BotIcon />
          </div>
          <div>
            <h3 className="font-semibold text-white">المساعد الافتراضي CarVFi</h3>
            <p className="text-sm text-gray-400">متصل وجاهز للمساعدة</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`flex items-start space-x-2 space-x-reverse ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm ${
                message.isCurrentUser ? 'bg-blue-500/80' : 'bg-purple-500/60'
              }`}>
                {message.isCurrentUser ? <UserIcon /> : <BotIcon />}
              </div>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isCurrentUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-gray-200 rounded-bl-none border border-gray-600'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isCurrentUser ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-2 space-x-reverse">
              <div className="w-8 h-8 rounded-full bg-purple-500/60 flex items-center justify-center backdrop-blur-sm">
                <BotIcon />
              </div>
              <div className="bg-gray-700 text-gray-200 rounded-2xl rounded-bl-none border border-gray-600 px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2 space-x-reverse">
          <button type="button" className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
            <PaperclipIcon />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
            <SmileIcon />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <SendIcon />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-green-400 transition-colors">
            <MicIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
