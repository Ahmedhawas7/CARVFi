// frontend/src/App.jsx
import React, { useState } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import AuthModal from './components/AuthModal';
import { useWallet } from './contexts/WalletContext';
import './App.css';

// Header component with connect button
const Header = () => {
  const { isConnected, publicKey, connectWallet } = useWallet();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const formatPublicKey = (pubkey) => {
    return `${pubkey.slice(0, 6)}...${pubkey.slice(-4)}`;
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CARVFi</h1>
              <p className="text-xs text-gray-500">Social Finance on Carv SVM</p>
            </div>
          </div>

          {/* Connect Button */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>{formatPublicKey(publicKey)}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

// Main App Content
const AppContent = () => {
  const { isConnected, publicKey, balance } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CARVFi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The next generation Social Finance platform on Carv SVM Testnet. 
            Connect your BackPack wallet, socialize with the community, and earn CARV rewards.
          </p>
        </div>

        {/* Wallet Status Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-12 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Wallet Status</h3>
          
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className="flex items-center text-green-600 font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {publicKey.slice(0, 8)}...{publicKey.slice(-6)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Balance:</span>
                <span className="font-bold text-xl text-gray-900">
                  {parseFloat(balance).toFixed(4)} CARV
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Network:</span>
                <span className="font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Carv SVM
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎒</span>
              </div>
              <p className="text-gray-500 mb-2 text-lg">Wallet not connected</p>
              <p className="text-sm text-gray-400">
                Connect your BackPack wallet to start using CARVFi
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">🤖</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">AI Assistant</h4>
            <p className="text-gray-600">
              Get AI-powered assistance for your Web3 journey and social interactions
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 hover:border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">💰</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Social Rewards</h4>
            <p className="text-gray-600">
              Earn CARV tokens through social interactions and community engagement
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">🛡️</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Bot Protection</h4>
            <p className="text-gray-600">
              Advanced protection against bots and sybil attacks using AI verification
            </p>
          </div>
        </div>

        {/* CTA Section */}
        {!isConnected && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6 opacity-90">
                Connect your BackPack wallet and join the CARVFi community today
              </p>
              <button
                onClick={() => document.querySelector('header button').click()}
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Connect BackPack Wallet
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;