import React, { useState } from 'react';
import { X, Bot, TrendingDown, Send } from 'lucide-react';

const AINegotiationAssistant = ({ isOpen, onClose, property }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I've analyzed the market data for ${property?.title}. How can I help you negotiate the best price?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const suggestedBid = property ? property.price * 0.94 : 0;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let aiResponse = '';
      
      if (lowerInput.includes('price') || lowerInput.includes('expensive') || lowerInput.includes('cost') || lowerInput.includes('offer')) {
        aiResponse = `Since they are asking ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property?.price || 0)}, I suggest an initial offer of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suggestedBid)} (approx. 6% below asking). This leaves room for counter-offers.`;
      } else if (lowerInput.includes('inspection') || lowerInput.includes('condition') || lowerInput.includes('repair')) {
        aiResponse = "I highly recommend adding an inspection contingency clause. If major repairs are needed, you can use that to renegotiate the final price or request repairs before closing.";
      } else if (lowerInput.includes('neighborhood') || lowerInput.includes('location') || lowerInput.includes('area') || lowerInput.includes('market')) {
        aiResponse = "This area has seen a steady 4% appreciation over the last year. The location is prime, meaning the seller might be less willing to drop the price significantly, but it's a solid investment.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        aiResponse = "Hello! I'm your AI negotiator. Ask me about pricing strategy, contract contingencies, or market analysis for this property!";
      } else if (lowerInput.includes('thank')) {
        aiResponse = "You're very welcome! Let me know if you need any more advice on closing this deal.";
      } else {
        aiResponse = "That's a great point. In a negotiation, it's always best to stay firm on your budget while showing you are a serious buyer. What specific aspect of the deal would you like advice on?";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 100000 }}>
      <div className="modal-content glass-panel animate-fade-in flex flex-col" style={{ maxWidth: '600px', height: '600px', padding: 0 }}>
        <div className="p-md flex justify-between items-center" style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(20,20,20,0.8)' }}>
          <div className="flex items-center gap-sm">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={24} color="#000" />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>AI Negotiator</h3>
              <p className="text-xs text-muted m-0">Powered by Aura AI</p>
            </div>
          </div>
          <button className="close-modal" onClick={onClose} style={{ position: 'relative', top: 0, right: 0 }}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 p-md" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel p-sm mb-md flex items-center gap-md" style={{ background: 'rgba(201, 162, 39, 0.1)', borderColor: 'var(--color-secondary)' }}>
            <TrendingDown size={32} className="text-secondary" />
            <div>
              <div className="font-bold">Market Insight</div>
              <div className="text-sm text-muted">Properties in this area are selling 4.2% below asking on average.</div>
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                style={{ 
                  maxWidth: '80%', 
                  padding: '1rem', 
                  borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                  color: msg.role === 'user' ? '#000' : 'var(--color-text-main)',
                  border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none'
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="text-muted text-sm flex gap-xs items-center p-sm">
                <Bot size={16} /> AI is thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-md flex gap-sm" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(20,20,20,0.8)' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about strategy or counter-offers..." 
            style={{ flex: 1, padding: '0.75rem', borderRadius: '50px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--color-border)', color: '#fff' }}
          />
          <button type="submit" className="btn btn-primary" style={{ borderRadius: '50px', padding: '0.75rem 1.5rem' }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AINegotiationAssistant;
