// frontend/src/App.jsx
import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import './App.css';

// Header component with connect button
const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">CARVFi</h1>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              SocialFi
            </span>
          </div>

          {/* Connect Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CARVFi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Social Finance Platform - Connect, Socialize, and Earn
          </p>
        </div>

        {/* Wallet Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto mb-8">
          <h3 className="text-lg font-semibold mb-4">Wallet Status</h3>
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">Wallet not connected</p>
            <p className="text-sm text-gray-400">
              Connect your wallet to start using CARVFi
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold mb-2">🤖 AI Assistant</h4>
            <p className="text-gray-600 text-sm">
              Get AI-powered assistance for your Web3 journey
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold mb-2">💰 Social Rewards</h4>
            <p className="text-gray-600 text-sm">
              Earn tokens through social interactions
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold mb-2">🛡️ Bot Protection</h4>
            <p className="text-gray-600 text-sm">
              Advanced protection against bots
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return <AppContent />;
}

export default App;