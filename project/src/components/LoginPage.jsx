import React, { useState, useEffect } from 'react';
import { MessageCircle, Smartphone, Monitor, FileText, Shield, ChevronRight, Phone } from 'lucide-react';
import GoogleSignIn from './GoogleSignIn.jsx';
import { addUser } from '../api.js'

const LoginPage = ({ onLogin }) => {
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Staggered animation phases
    const phases = [0, 1, 2, 3, 4];
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), index * 400);
    });

    // Generate floating elements for background animation
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setFloatingElements(elements);
  }, []);

  const handleQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  const handlePhoneLogin = async () => {
  const data = { phone: phoneNumber };
  await addUser(data);
  onLogin();
};

  const handleGoogleSuccess = async (userInfo) => {
  const data = {
    sub: userInfo.sub,
    name: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture,
  };
  await addUser(data);
  onLogin();
};


  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
    alert('Google Sign-In failed. Please try again.');
  };
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://chatflow.demo.login.${Date.now()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating animated elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/10 to-teal-400/10 blur-xl animate-bounce"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header with more animation */}
        <div className={`text-center mb-16 transition-all duration-1200 transform ${animationPhase >= 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 animate-pulse">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white ml-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              ChatFlow
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-300 text-xl">
            <Shield className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="font-medium">Your messages are end-to-end encrypted on all devices</span>
          </div>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Enhanced Main Login Card */}
        <div className={`max-w-7xl mx-auto transition-all duration-1200 delay-300 transform ${animationPhase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-700 hover:scale-[1.02]">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Instructions */}
              <div className="p-12 bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent animate-pulse"></div>
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4 relative z-10">
                  <span className="text-emerald-400 animate-pulse">Steps to connect</span>
                </h2>
                
                {!showPhoneLogin ? (
                  <div className="space-y-8 relative z-10">
                    <div className={`flex items-start gap-6 group hover:bg-white/10 p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg transform ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                      <div>
                        <p className="text-white font-semibold text-xl mb-2">Open ChatFlow on your phone</p>
                        <div className="flex items-center gap-3 mt-3">
                          <MessageCircle className="w-6 h-6 text-emerald-400 animate-pulse" />
                          <span className="text-gray-300 text-lg">Download the mobile app</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-start gap-6 group hover:bg-white/10 p-6 rounded-2xl transition-all duration-500 delay-100 hover:scale-105 hover:shadow-lg transform ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                      <div>
                        <p className="text-white font-semibold text-xl mb-2">Go to Settings → Web Link</p>
                        <p className="text-gray-300 text-lg">On Android tap Menu ⋮ • On iPhone tap Settings ⚙️</p>
                      </div>
                    </div>

                    <div className={`flex items-start gap-6 group hover:bg-white/10 p-6 rounded-2xl transition-all duration-500 delay-200 hover:scale-105 hover:shadow-lg transform ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                      <div>
                        <p className="text-white font-semibold text-xl mb-2">Tap Link Device, then Link Device</p>
                        <p className="text-gray-300 text-lg">Follow the prompts to connect your device</p>
                      </div>
                    </div>

                    <div className={`flex items-start gap-6 group hover:bg-white/10 p-6 rounded-2xl transition-all duration-500 delay-300 hover:scale-105 hover:shadow-lg transform ${animationPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">4</div>
                      <div>
                        <p className="text-white font-semibold text-xl mb-2">Scan this QR code to confirm</p>
                        <p className="text-gray-300 text-lg">Point your camera at the QR code</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 relative z-10">
                    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                      <div className="flex items-center gap-3 mb-6">
                        <Phone className="w-6 h-6 text-emerald-400" />
                        <h3 className="text-white font-bold text-2xl">Enter your phone number</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-white/30"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        
                        <button
                          onClick={handlePhoneLogin}
                          disabled={phoneNumber.length < 10}
                          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50"
                        >
                          {phoneNumber.length >= 10 ? 'Connect Now' : 'Enter Phone Number'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-10 pt-8 border-t border-white/20 relative z-10">
                  <button
                    onClick={() => setShowPhoneLogin(!showPhoneLogin)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold text-lg flex items-center gap-3 transition-all duration-300 group hover:scale-105"
                  >
                    {showPhoneLogin ? 'Use QR code instead' : 'Log in with phone number instead'}
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Right Side - QR Code */}
              <div className={`p-12 flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/15 relative overflow-hidden transition-all duration-1200 delay-500 transform ${animationPhase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-teal-500/20 to-transparent animate-pulse"></div>
                </div>
                
                {!showPhoneLogin && (
                  <div className="text-center relative z-10">
                    <div className={`bg-white p-8 rounded-3xl shadow-2xl mb-8 transform hover:scale-110 hover:rotate-1 transition-all duration-500 relative overflow-hidden ${isScanning ? 'animate-pulse' : ''}`}>
                      <img 
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="w-56 h-56 mx-auto"
                      />

                      {isScanning && (
                        <div className="absolute inset-0 bg-emerald-500/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                          <div className="text-emerald-800 font-bold text-xl animate-pulse">Scanning...</div>
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                      {/* Google Sign-In Component */}
                      <div className="mt-6 pt-6 border-t border-gray-200 mb-6 ">
                        <GoogleSignIn 
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                        />
                      </div>

                    <button
                      onClick={handleQRScan}
                      disabled={isScanning}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-emerald-400 disabled:to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-110 disabled:scale-100 shadow-2xl hover:shadow-emerald-500/30 mb-4"
                    >
                      {isScanning ? 'Connecting...' : 'Scan QR Code'}
                    </button>
                    
                    <p className="text-gray-400 text-base animate-pulse">
                      Click to simulate scanning
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className={`grid md:grid-cols-3 gap-8 mt-16 transition-all duration-1200 delay-700 transform ${animationPhase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-emerald-500/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">View photos on larger screen</h3>
            <p className="text-gray-300 text-base leading-relaxed">See your photos and videos in high quality on your computer</p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-purple-500/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Drag and drop documents</h3>
            <p className="text-gray-300 text-base leading-relaxed">Easily share files by dragging them into your chat</p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-emerald-500/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Keep chatting while multitasking</h3>
            <p className="text-gray-300 text-base leading-relaxed">Stay connected while working on other tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;