import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import StorageService from '../services/StorageService';

const LoginPage = ({ onLoginSuccess, onShowRegister }) => {
  const { 
    isConnected, 
    publicKey, 
    connectWallet, 
    disconnectWallet,
    walletName 
  } = useWallet();
  
  const [loginMethod, setLoginMethod] = useState('wallet'); // 'wallet' or 'email'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userChecked, setUserChecked] = useState(false);

  // التحقق التلقائي عند توصيل المحفظة
  useEffect(() => {
    if (isConnected && publicKey && !userChecked) {
      checkExistingUser();
    }
  }, [isConnected, publicKey, userChecked]);

  const checkExistingUser = async () => {
    try {
      setIsLoading(true);
      setError('');
      setUserChecked(true);

      console.log('🔍 Checking for existing user...', publicKey);
      
      const existingUser = StorageService.getUser(publicKey);
      
      if (existingUser) {
        console.log('✅ Existing user found:', existingUser);
        
        // تحديث بيانات الدخول
        StorageService.updateStreak(publicKey);
        StorageService.saveActivity(publicKey, {
          type: 'login',
          description: 'User logged in successfully',
          points: 5
        });

        // إرسال بيانات المستخدم للتطبيق الرئيسي
        onLoginSuccess(existingUser);
      } else {
        console.log('❌ No existing user found');
        setError('No account found with this wallet. Please create a new account.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setError('Failed to check user account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      setUserChecked(false);

      if (!isConnected) {
        console.log('🔗 Connecting wallet...');
        await connectWallet('backpack');
      } else {
        console.log('🔍 Re-checking user...');
        await checkExistingUser();
      }
    } catch (error) {
      console.error('Wallet login error:', error);
      setError('Failed to connect wallet');
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // سيتم تطوير هذا الجزء لاحقاً
    setError('Email login coming soon! Use wallet login for now.');
  };

  const handleSwitchToRegister = () => {
    setUserChecked(false);
    setError('');
    onShowRegister();
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setUserChecked(false);
    setError('');
  };

  return (
    <div className="modern-app">
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-content">
            
            {/* Header */}
            <div className="logo-section">
              <div className="logo-icon">🌐</div>
              <h1 className="hero-title">CARVFi</h1>
              <p className="hero-subtitle">Sign In to Your Account</p>
            </div>

            {/* Login Methods Tabs */}
            <div className="auth-tabs">
              <button 
                className={`tab-button ${loginMethod === 'wallet' ? 'active' : ''}`}
                onClick={() => setLoginMethod('wallet')}
              >
                🔗 Wallet Login
              </button>
              <button 
                className={`tab-button ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => setLoginMethod('email')}
              >
                📧 Email Login
              </button>
            </div>

            {/* Wallet Login */}
            {loginMethod === 'wallet' && (
              <div className="login-section">
                <div className="login-card">
                  <h3>Wallet Sign In</h3>
                  <p className="login-description">
                    {isConnected 
                      ? `Connected with ${walletName}`
                      : 'Connect your wallet to sign in to your account'
                    }
                  </p>

                  {isConnected && publicKey && (
                    <div className="wallet-info-card">
                      <div className="wallet-badge connected">
                        <span className="badge-icon">✅</span>
                        Wallet Connected
                      </div>
                      <p className="wallet-address">
                        {publicKey.slice(0, 10)}...{publicKey.slice(-8)}
                      </p>
                      <button 
                        className="disconnect-btn"
                        onClick={handleDisconnect}
                      >
                        Disconnect
                      </button>
                    </div>
                  )}

                  {error && !error.includes('No account found') && (
                    <div className="error-message">
                      ❌ {error}
                    </div>
                  )}

                  {error && error.includes('No account found') && (
                    <div className="info-message">
                      <div className="info-icon">ℹ️</div>
                      <div className="info-content">
                        <strong>No Account Found</strong>
                        <p>This wallet doesn't have an account yet.</p>
                        <button 
                          className="create-account-btn"
                          onClick={handleSwitchToRegister}
                        >
                          Create New Account
                        </button>
                      </div>
                    </div>
                  )}

                  <button 
                    className="cta-button login-button"
                    onClick={handleWalletLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner small"></div>
                        {isConnected ? 'Checking Account...' : 'Connecting Wallet...'}
                      </>
                    ) : (
                      <>
                        <span className="button-icon">🔗</span>
                        {isConnected ? 'Check My Account' : 'Connect Wallet & Sign In'}
                      </>
                    )}
                  </button>

                  <div className="login-footer">
                    <p>New to CARVFi?</p>
                    <button 
                      className="text-button"
                      onClick={handleSwitchToRegister}
                    >
                      Create Your First Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Email Login */}
            {loginMethod === 'email' && (
              <div className="login-section">
                <div className="login-card">
                  <h3>Email Sign In</h3>
                  <p className="login-description">
                    Enter your email and password to access your account
                  </p>

                  <form onSubmit={handleEmailLogin}>
                    <div className="input-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label>Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="login-input"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="cta-button login-button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="loading-spinner small"></div>
                          Signing In...
                        </>
                      ) : (
                        'Sign In to Dashboard'
                      )}
                    </button>
                  </form>

                  {error && (
                    <div className="error-message">
                      ❌ {error}
                    </div>
                  )}

                  <div className="login-footer">
                    <p>Don't have an account?</p>
                    <button 
                      className="text-button"
                      onClick={handleSwitchToRegister}
                    >
                      Create New Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features Grid */}
            <div className="features-grid login-features">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h4>Access Rewards</h4>
                <p>Continue earning points and achievements</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h4>Track Progress</h4>
                <p>Monitor your SocialFi journey</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h4>Secure & Fast</h4>
                <p>Instant wallet authentication</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 4px;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
          flex: 1;
          padding: 12px 20px;
          border: none;
          background: transparent;
          color: #94a3b8;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .login-section {
          max-width: 400px;
          margin: 0 auto;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .login-card h3 {
          color: white;
          margin-bottom: 0.5rem;
          text-align: center;
          font-size: 1.5rem;
        }

        .login-description {
          color: #94a3b8;
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .wallet-info-card {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .wallet-badge.connected {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .wallet-address {
          font-family: monospace;
          color: #64748b;
          font-size: 0.8rem;
          margin: 0.5rem 0;
        }

        .disconnect-btn {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .disconnect-btn:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group label {
          display: block;
          color: #94a3b8;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .login-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .login-input:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.08);
        }

        .login-input::placeholder {
          color: #64748b;
        }

        .login-button {
          width: 100%;
          margin-top: 1rem;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .info-message {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #3b82f6;
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .info-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-content strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        .info-content p {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .create-account-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .create-account-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .login-footer p {
          color: #94a3b8;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .text-button {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .text-button:hover {
          color: #764ba2;
        }

        .login-features {
          margin-top: 3rem;
        }

        .loading-spinner.small {
          width: 16px;
          height: 16px;
          border-width: 2px;
          border-top-color: white;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;