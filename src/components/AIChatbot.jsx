import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Aura, your AI real estate assistant. What kind of property are you looking for today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [properties, setProperties] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    // We keep UI messages in state using 'text' and 'sender', 
    // but the API needs {role, content}. Let's format for API:
    const apiHistory = newMessages.map(m => ({
      role: m.sender === 'bot' ? 'model' : 'user',
      content: m.text || m.content
    }));

    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: apiHistory })
      });
      
      const data = await response.json();
      
      if (response.ok && data.text) {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: data.text, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: data.message || "Sorry, I'm having trouble connecting to the AI.", sender: 'bot' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error connecting to AI Server.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window glass-panel animate-fade-in">
          <div className="chatbot-header">
            <div className="flex items-center gap-sm">
              <Bot size={24} color="var(--color-primary)" />
              <span className="font-bold" style={{ color: 'var(--color-primary)' }}>Aura AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} color="var(--color-primary)" />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-bubble typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about properties (e.g. houses in Miami)..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button 
          className="chatbot-toggle-btn animate-fade-in"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
