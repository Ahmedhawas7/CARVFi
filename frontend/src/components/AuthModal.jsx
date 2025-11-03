import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Connection } from '@solana/web3.js';

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

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(10px);
        }

        .modal-content {
          background: var(--glass);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow: hidden;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .modal-close:hover {
          background: var(--glass);
          color: var(--text-primary);
        }

        .modal-tabs {
          display: flex;
          border-bottom: 1px solid var(--glass-border);
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          color: var(--primary);
          border-bottom: 2px solid var(--primary);
        }

        .tab-btn:hover:not(.active) {
          color: var(--text-primary);
          background: var(--glass);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .wallet-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wallet-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .wallet-option:hover {
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .wallet-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--glass);
          border-radius: 10px;
        }

        .wallet-info {
          flex: 1;
        }

        .wallet-info h3 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .wallet-info p {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .btn-connect {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-connect:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .btn-connect:disabled {
          background: var(--text-secondary);
          cursor: not-allowed;
          transform: none;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .disclaimer {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 95%;
            margin: 1rem;
          }
          
          .wallet-option {
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
