import React, { useState, useEffect } from 'react';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import AIChat from './components/AIChat';
import RewardsDashboard from './components/RewardsDashboard';
import BotProtection from './components/BotProtection';
import './App.css';

// خدمة تخزين محلية بسيطة
const StorageService = {
  // حفظ بيانات المستخدم
  saveUser: (userData) => {
    const users = JSON.parse(localStorage.getItem('carvfi_users') || '{}');
    users[userData.walletAddress] = {
      ...userData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('carvfi_users', JSON.stringify(users));
    localStorage.setItem('carvfi_current_user', JSON.stringify(userData));
  },

  // جلب بيانات المستخدم
  getUser: (walletAddress) => {
    const users = JSON.parse(localStorage.getItem('carvfi_users') || '{}');
    return users[walletAddress];
  },

  // جلب المستخدم الحالي
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('carvfi_current_user') || 'null');
  },

  // حفظ النشاطات
  saveActivity: (walletAddress, activity) => {
    const activities = JSON.parse(localStorage.getItem('carvfi_activities') || '{}');
    if (!activities[walletAddress]) {
      activities[walletAddress] = [];
    }
    activities[walletAddress].unshift({
      id: Date.now().toString(),
      ...activity,
      timestamp: new Date().toISOString()
    });
    
    // حفظ آخر 50 نشاط فقط
    activities[walletAddress] = activities[walletAddress].slice(0, 50);
    localStorage.setItem('carvfi_activities', JSON.stringify(activities));
  },

  // جلب النشاطات
  getActivities: (walletAddress) => {
    const activities = JSON.parse(localStorage.getItem('carvfi_activities') || '{}');
    return activities[walletAddress] || [];
  },

  // تحديث النقاط
  updatePoints: (walletAddress, pointsToAdd) => {
    const users = JSON.parse(localStorage.getItem('carvfi_users') || '{}');
    if (users[walletAddress]) {
      users[walletAddress].points = (users[walletAddress].points || 0) + pointsToAdd;
      users[walletAddress].lastUpdated = new Date().toISOString();
      localStorage.setItem('carvfi_users', JSON.stringify(users));
      
      // تحديث المستخدم الحالي أيضاً
      const currentUser = JSON.parse(localStorage.getItem('carvfi_current_user') || '{}');
      if (currentUser.walletAddress === walletAddress) {
        currentUser.points = users[walletAddress].points;
        localStorage.setItem('carvfi_current_user', JSON.stringify(currentUser));
      }
    }
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    const savedUser = StorageService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setShowAuthModal(false);
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData);
    
    const userWithStats = {
      ...userData,
      points: 0,
      streak: 1,
      level: 1,
      loginCount: 1,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // حفظ في التخزين المحلي
    StorageService.saveUser(userWithStats);
    
    // تسجيل نشاط الدخول
    StorageService.saveActivity(userData.address, {
      type: 'login',
      description: 'User logged in successfully',
      points: 10
    });
    
    // تحديث النقاط
    StorageService.updatePoints(userData.address, 10);
    
    setUser(userWithStats);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('carvfi_current_user');
    setShowAuthModal(true);
  };

  if (showAuthModal) {
    return (
      <div className="app">
        <AuthModal 
          isOpen={true}
          onClose={() => {}} 
          onAuthSuccess={handleAuthSuccess}
        />
        <div className="auth-background">
          <div className="welcome-content">
            <h1>🌐 CARVFi</h1>
            <p>Web3 Social Platform</p>
            <div className="welcome-features">
              <div className="feature">🤖 AI Assistant</div>
              <div className="feature">💰 Rewards System</div>
              <div className="feature">🛡️ Bot Protection</div>
              <div className="feature">🔗 Multi-Chain Support</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="logo">🌐 CARVFi</h1>
          <p className="tagline">Web3 Social Platform</p>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-wallet">
              {user?.address ? `${user.address.substring(0, 6)}...${user.address.substring(38)}` : 'No wallet'}
            </span>
            <span className="network-badge">
              {user?.type === 'evm' ? 'Ethereum' : 'Solana'}
            </span>
            <span style={{fontSize: '0.7rem', color: '#10b981', marginTop: '2px'}}>
              {user?.points || 0} points
            </span>
          </div>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
          <button 
            className="btn btn-ai" 
            onClick={() => setShowAIChat(!showAIChat)}
          >
            🤖 AI
          </button>
        </div>
      </header>

      <nav className="navigation">
        {['dashboard', 'profile', 'protection'].map(tab => (
          <button
            key={tab}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'dashboard' ? 'Dashboard' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && <RewardsDashboard user={user} storageService={StorageService} />}
        {activeTab === 'profile' && <UserProfile user={user} storageService={StorageService} />}
        {activeTab === 'protection' && <BotProtection user={user} />}
      </main>

      {showAIChat && (
        <AIChat 
          user={user}
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
}

export default App;
