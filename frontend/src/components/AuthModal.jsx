import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('evm');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  // محاكاة اتصال المحفظة
  const simulateWalletConnection = (type) => {
    return new Promise((resolve, reject) => {
      setIsConnecting(true);
      setError('');

      setTimeout(() => {
        // محاكاة نجاح الاتصال
        const mockUserData = {
          type: type,
          address: `0x${Math.random().toString(16).substr(2, 40)}`,
          network: type === 'evm' ? 'Ethereum Mainnet' : 'Solana Mainnet'
        };
        
        resolve(mockUserData);
      }, 1500);
    });
  };

  const handleConnectWallet = async (walletType) => {
    try {
      const userData = await simulateWalletConnection(walletType);
      onAuthSuccess(userData);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const walletOptions = {
    evm: [
      {
        id: 'metamask',
        name: 'MetaMask',
        description: 'Connect using MetaMask',
        icon: '🦊'
      },
      {
        id: 'walletconnect',
        name: 'WalletConnect',
        description: 'Connect using WalletConnect',
        icon: '🔗'
      },
      {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        description: 'Connect using Coinbase',
        icon: '🏦'
      }
    ],
    solana: [
      {
        id: 'phantom',
        name: 'Phantom',
        description: 'Connect using Phantom',
        icon: '👻'
      },
      {
        id: 'solflare',
        name: 'Solflare',
        description: 'Connect using Solflare',
        icon: '🔥'
      }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Connect Your Wallet</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'evm' ? 'active' : ''}`}
            onClick={() => setActiveTab('evm')}
          >
            EVM Chains
          </button>
          <button
            className={`tab-btn ${activeTab === 'solana' ? 'active' : ''}`}
            onClick={() => setActiveTab('solana')}
          >
            Solana
          </button>
        </div>

        <div className="modal-body">
          <div className="wallet-options">
            {walletOptions[activeTab].map((wallet) => (
              <div
                key={wallet.id}
                className="wallet-option"
                onClick={() => handleConnectWallet(activeTab)}
                style={{ cursor: isConnecting ? 'not-allowed' : 'pointer' }}
              >
                <div className="wallet-icon">
                  {wallet.icon}
                </div>
                <div className="wallet-info">
                  <h3>{wallet.name}</h3>
                  <p>{wallet.description}</p>
                </div>
                <button
                  className="btn-connect"
                  disabled={isConnecting}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnectWallet(activeTab);
                  }}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <p className="disclaimer">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;