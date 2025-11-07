import React, { useState, useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { connectWallet, walletAddress } = useContext(WalletContext);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    wallet: '',
    twitter: '',
    telegram: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = 'https://script.google.com/macros/s/AKfycbxwqqYOry43uTlUkXRliqGEbB_7sC-OBvZ-FxGnwCqNx4jKiio7HGvbiMFGEnYoxa6z1A/exec';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      setFormData(prev => ({ ...prev, wallet: walletAddress }));
    } catch (error) {
      setMessage('Failed to connect wallet');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}?email=${encodeURIComponent(formData.email)}`);
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('carvfi_user', JSON.stringify(result.data.user));
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('carvfi_user', JSON.stringify(result.data.user));
        setMessage('Registration successful! Welcome to CARVFi.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(result.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="auth-tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-content">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <h3>Welcome Back</h3>
              
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="wallet-section">
                <p>Or connect your wallet</p>
                <button 
                  type="button" 
                  onClick={handleWalletConnect}
                  className="wallet-button"
                >
                  Connect Wallet
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="auth-form">
              <h3>Join CARVFi Community</h3>
              
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose unique username"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Wallet Address *</label>
                <div className="wallet-input-group">
                  <input
                    type="text"
                    name="wallet"
                    value={formData.wallet}
                    onChange={handleInputChange}
                    placeholder="Your wallet address"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={handleWalletConnect}
                    className="connect-wallet-btn"
                  >
                    Connect
                  </button>
                </div>
              </div>

              <div className="social-section">
                <h4>Social Links (Optional)</h4>
                <div className="form-group">
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="Twitter @username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    placeholder="Telegram @username"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Creating Account...' : 'Start My Journey'}
              </button>
            </form>
          )}

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;