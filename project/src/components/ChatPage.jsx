import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Send, Paperclip, Smile, Mic, Phone, Video, Settings, LogOut, User, Bell, Shield, MessageCircle, X } from 'lucide-react';

const ChatPage = ({ onLogout }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const contacts = [
    { id: 1, name: 'Sarah Johnson', lastMessage: 'Hey! How are you doing?', time: '2:30 PM', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', online: true, unread: 2 },
    { id: 2, name: 'Mike Chen', lastMessage: 'Did you see the game last night?', time: '1:45 PM', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150', online: false, unread: 0 },
    { id: 3, name: 'Emma Wilson', lastMessage: 'Thanks for the help earlier!', time: '12:20 PM', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', online: true, unread: 1 },
    { id: 4, name: 'Alex Rodriguez', lastMessage: 'Let me know when you arrive', time: '11:30 AM', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150', online: false, unread: 0 },
    { id: 5, name: 'Lisa Park', lastMessage: 'Perfect! See you tomorrow', time: '10:15 AM', avatar: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150', online: true, unread: 3 },
  ];

  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 1, text: 'Hey! How are you doing?', sender: 'contact', time: '2:30 PM' },
      { id: 2, text: 'I am doing great! Thanks for asking 😊', sender: 'me', time: '2:31 PM' },
      { id: 3, text: 'That\'s wonderful to hear! What have you been up to lately?', sender: 'contact', time: '2:32 PM' },
    ],
    2: [
      { id: 1, text: 'Did you see the game last night?', sender: 'contact', time: '1:45 PM' },
      { id: 2, text: 'Yes! It was incredible! What a finish 🏀', sender: 'me', time: '1:46 PM' },
    ],
    3: [
      { id: 1, text: 'Thanks for the help earlier!', sender: 'contact', time: '12:20 PM' },
      { id: 2, text: 'No problem at all! Happy to help 👍', sender: 'me', time: '12:21 PM' },
    ]
  });

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
      }));

      setMessage('');
      
      // Simulate typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          'That sounds great!',
          'I totally agree with you!',
          'Interesting point!',
          'Thanks for sharing that!',
          'I\'ll think about it 🤔'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'contact',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), responseMessage]
        }));
      }, 2000);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">John Doe</h3>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
          </div>

          {/* Settings Options */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">
              <Bell className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Notifications</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Privacy & Security</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Chat Settings</span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-slate-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-emerald-400" />
              ChatFlow
            </h1>
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact)}
              className={`p-4 cursor-pointer transition-all duration-200 border-b border-slate-700/50 hover:bg-slate-700/30 ${
                selectedChat?.id === contact.id ? 'bg-emerald-600/20 border-l-4 border-l-emerald-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-400">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-400">
                      {selectedChat.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/20">
              {(chatMessages[selectedChat.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg ${
                      msg.sender === 'me'
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                        : 'bg-slate-700 text-white'
                    } animate-slide-in`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-white px-4 py-2 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                {message.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-900/20">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to ChatFlow</h3>
              <p className="text-gray-400">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal />}
    </div>
  );
};

export default ChatPage;