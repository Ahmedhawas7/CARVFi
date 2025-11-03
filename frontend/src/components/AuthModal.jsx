import React, { useState } from 'react';
import { ethers } from 'ethers';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('evm');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const connectEVM = async () => {
    try {
      setIsConnecting(true);
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        
        onAuthSuccess({
          type: 'evm',
          address: accounts[0],
          provider: provider,
          signer: signer
        });
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Error connecting EVM wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectSolana = async () => {
    try {
      setIsConnecting(true);
      if (window.solana || window.phantom) {
        const provider = window.solana || window.phantom;
        
        if (!provider.isConnected) {
          await provider.connect();
        }
        
        onAuthSuccess({
          type: 'solana',
          address: provider.publicKey.toString(),
          provider: provider
        });
      } else {
        alert('Please install Phantom Wallet or another Solana wallet');
      }
    } catch (error) {
      console.error('Error connecting Solana wallet:', error);
      alert('Failed to connect Solana wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <button className="modal-close" onClick={onClose}>×</button>
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
          {activeTab === 'evm' && (
            <div className="wallet-options">
              <div className="wallet-option">
                <div className="wallet-icon">🦊</div>
                <div className="wallet-info">
                  <h3>MetaMask</h3>
                  <p>Connect to Ethereum and EVM chains</p>
                </div>
                <button 
                  className="btn btn-connect"
                  onClick={connectEVM}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>

              <div className="wallet-option">
                <div className="wallet-icon">🟠</div>
                <div className="wallet-info">
                  <h3>WalletConnect</h3>
                  <p>Connect with QR code</p>
                </div>
                <button className="btn btn-connect" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          )}

          {activeTab === 'solana' && (
            <div className="wallet-options">
              <div className="wallet-option">
                <div className="wallet-icon">👻</div>
                <div className="wallet-info">
                  <h3>Phantom</h3>
                  <p>Connect to Solana network</p>
                </div>
                <button 
                  className="btn btn-connect"
                  onClick={connectSolana}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>

              <div className="wallet-option">
                <div className="wallet-icon">🔷</div>
                <div className="wallet-info">
                  <h3>Solflare</h3>
                  <p>Connect to Solana network</p>
                </div>
                <button className="btn btn-connect" disabled>
                  Coming Soon
                </button>
              </div>
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
