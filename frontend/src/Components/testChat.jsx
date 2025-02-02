import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';

export default function TestChat() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand you're asking about that. Let me help you.",
        "That's a great question! Here's what I know...",
        "I can definitely help you with that.",
        "Let me check that information for you.",
        "I'm processing your request...",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200  to-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-amber-300 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-amber-500 p-4 flex items-center gap-3">
          <Bot className="w-8 h-8 text-white" />
          <h1 className="text-xl font-semibold text-white">Customer Support Bot</h1>
        </div>

        {/* Chat messages */}
        <div className="h-[600px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-red-100 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-orange-400">
          <div className="flex space-x-4 ">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
