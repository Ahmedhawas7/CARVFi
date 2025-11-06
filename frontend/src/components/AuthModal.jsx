import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';

const AuthModal = ({ isOpen, onClose, onAuthSuccess, walletAddress }) => {
  const { 
    availableWallets, 
    connectWallet, 
    isLoading, 
    error 
  } = useWallet();
  
  const [activeTab, setActiveTab] = useState('connect');
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    avatar: ''
  });

  // إذا كان فيه walletAddress يبقي المستخدم متصل بالمحفظة وبيسجل بياناته الإضافية
  const isProfileCompletion = !!walletAddress;

  // توليد username تلقائي عند فتح المودال
  useEffect(() => {
    if (isProfileCompletion && isOpen && !username) {
      const randomNum = Math.floor(Math.random() * 10000);
      const newUsername = `user_${randomNum}`;
      setUsername(newUsername);
      console.log('🎲 Auto-generated username:', newUsername);
    }
  }, [isProfileCompletion, isOpen, username]);

  if (!isOpen) return null;

  const handleWalletConnect = async (walletType) => {
    try {
      console.log(`🔗 Connecting to ${walletType}...`);
      const result = await connectWallet(walletType);
      if (result.success) {
        console.log('✅ Wallet connected successfully');
        // نجاح الربط - نغلق المودال ونترك App.jsx يتعامل مع الباقي
        onClose();
      }
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    console.log('📝 Submitting profile data:', { username, profileData });
    console.log('🎯 Calling onAuthSuccess with wallet:', walletAddress);
    
    if (onAuthSuccess) {
      onAuthSuccess({
        address: walletAddress,
        type: 'solana',
        username: username,
        displayName: profileData.displayName,
        bio: profileData.bio
      });
      console.log('✅ onAuthSuccess called successfully');
    } else {
      console.error('❌ onAuthSuccess is not defined!');
    }
    
    onClose();
  };

  const generateRandomUsername = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const newUsername = `user_${randomNum}`;
    setUsername(newUsername);
    console.log('🎲 Generated random username:', newUsername);
  };

  // مودال إكمال الملف الشخصي
  if (isProfileCompletion) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Complete Your Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Wallet Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800 font-medium">
              ✅ Wallet Connected
            </p>
            <p className="text-xs text-green-600 mt-1 font-mono">
              {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
            </p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={generateRandomUsername}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  Random
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  displayName: e.target.value
                }))}
                placeholder="Your display name (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  bio: e.target.value
                }))}
                placeholder="Tell us about yourself..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!username}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // مودال ربط المحفظة العادي
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 font-medium ${
              activeTab === 'connect' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('connect')}
          >
            Connect
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Available Wallets</h3>
            <p className="text-sm text-gray-600">
              Connect your wallet to start using CARVFi
            </p>
          </div>

          {/* Wallet List */}
          <div className="space-y-3">
            {availableWallets.length > 0 ? (
              availableWallets.map((wallet, index) => (
                <button 
                  key={index}
                  onClick={() => handleWalletConnect(wallet.name.toLowerCase())}
                  disabled={isLoading}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-xl">{wallet.icon}</span>
                  <span className="font-medium">{wallet.name}</span>
                  {isLoading && (
                    <div className="ml-auto w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-3">No wallets detected</p>
                <div className="space-y-2">
                  <a 
                    href="https://www.backpack.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Install BackPack
                  </a>
                  <a 
                    href="https://phantom.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 ml-2"
                  >
                    Install Phantom
                  </a>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              🔒 Your wallet connection is secure and private
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By connecting, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;