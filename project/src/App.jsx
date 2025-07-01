import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const clientID = '867560531415-cjhpfel057r1ji9ubvkpgj5dlnp7v0s1.apps.googleusercontent.com';

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold animate-pulse">Loading ChatFlow...</h2>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientID = {clientID}>
      {isAuthenticated ? (
        <ChatPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;