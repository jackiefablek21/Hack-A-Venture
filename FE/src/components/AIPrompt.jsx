import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };

        // UI update
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const historyForAPI = updatedMessages.filter((msg, index) => {
                if (index === 0 && msg.role === 'assistant') return false;
                return true;
            });

            const response = await fetch('http://localhost:4000/api/ai/sendPrompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: input,
                    history: historyForAPI // Send the existing state
                }),
            });

            const data = await response.json();

            // 2. The critical change: match the backend key
            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.response }
                ]);
            } else if (data.error) {
                console.error("Backend Error:", data.error);
            }
        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg bg-gray-50 shadow-sm">
            {/* Header */}
            <div className="p-4 border-b bg-white rounded-t-lg">
                <h2 className="font-semibold flex items-center gap-2">
                    <Bot size={20} className="text-blue-500" /> AI Assistant
                </h2>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`p-2 rounded-full h-fit ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm ${
                                msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white border rounded-tl-none'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-none animate-pulse">
                            <Loader2 className="animate-spin" size={16} />
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-4 border-t bg-white rounded-b-lg flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;