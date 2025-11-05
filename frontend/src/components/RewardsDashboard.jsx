import React, { useState, useEffect } from 'react';

const RewardsDashboard = ({ user, storageService }) => {
  const [userData, setUserData] = useState({
    points: 0,
    streak: 0,
    level: 1,
    walletConnected: true
  });

  const [dailyTasks, setDailyTasks] = useState([
    {
      id: 1,
      title: "Daily Login",
      description: "Visit the platform daily",
      points: 50,
      completed: false,
      type: "login"
    },
    {
      id: 2,
      title: "Twitter Post",
      description: "Share about CarVFi on Twitter",
      points: 100,
      completed: false,
      type: "social"
    },
    {
      id: 3,
      title: "Follow Account",
      description: "Follow our official Twitter account",
      points: 75,
      completed: false,
      type: "social"
    },
    {
      id: 4,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet",
      points: 200,
      completed: true,
      type: "wallet"
    }
  ]);

  const [userActivities, setUserActivities] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([
    {
      id: 1,
      type: "send",
      amount: "0.5 SVM",
      to: "0x742d...5a3b",
      status: "completed",
      timestamp: "2024-01-15 14:30"
    },
    {
      id: 2,
      type: "receive",
      amount: "1.2 SVM",
      from: "0x8f2c...9d1e",
      status: "completed",
      timestamp: "2024-01-15 11:20"
    },
    {
      id: 3,
      type: "swap",
      amount: "2.0 SVM",
      status: "pending",
      timestamp: "2024-01-15 10:15"
    }
  ]);

  useEffect(() => {
    if (user) {
      loadUserData();
      loadActivities();
      checkDailyLogin();
    }
  }, [user]);

  const loadUserData = () => {
    const savedUser = storageService.getUser(user.walletAddress);
    if (savedUser) {
      setUserData({
        points: savedUser.points || 0,
        streak: savedUser.streak || 1,
        level: savedUser.level || 1,
        walletConnected: true
      });
    }
  };

  const loadActivities = () => {
    const activities = storageService.getActivities(user.walletAddress);
    setUserActivities(activities);
  };

  const checkDailyLogin = () => {
    const today = new Date().toDateString();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin).toDateString() : null;
    
    if (lastLogin !== today) {
      // مكافأة الدخول اليومي
      completeTask(1); // مهمة الدخول اليومي
    }
  };

  const completeTask = (taskId) => {
    const task = dailyTasks.find(t => t.id === taskId);
    if (task && user && !task.completed) {
      // تحديث حالة المهمة أولاً
      setDailyTasks(tasks =>
        tasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );

      // تحديث النقاط في التخزين
      const newPoints = storageService.updatePoints(user.walletAddress, task.points);
      
      // تسجيل النشاط
      storageService.saveActivity(user.walletAddress, {
        type: task.type,
        description: `Completed: ${task.title}`,
        points: task.points
      });

      // تحديث الواجهة
      setUserData(prev => ({
        ...prev,
        points: newPoints
      }));

      // إعادة تحميل النشاطات
      loadActivities();

      // مكافأة streak إضافية
      if (task.type === 'login') {
        const userStreak = storageService.updateStreak(user.walletAddress);
        if (userStreak % 7 === 0) {
          const bonusPoints = 100;
          storageService.updatePoints(user.walletAddress, bonusPoints);
          storageService.saveActivity(user.walletAddress, {
            type: 'bonus',
            description: `Weekly streak bonus! ${userStreak} days`,
            points: bonusPoints
          });
          
          setUserData(prev => ({
            ...prev,
            points: prev.points + bonusPoints,
            streak: userStreak
          }));
          loadActivities();
        }
      }
    }
  };

  const claimDailyLogin = () => {
    const loginTask = dailyTasks.find(task => task.type === 'login');
    if (loginTask && !loginTask.completed) {
      completeTask(loginTask.id);
    }
  };

  // Helper functions
  const getActivityColor = (type) => {
    switch (type) {
      case 'post': return '#6366f1';
      case 'transaction': return '#8b5cf6';
      case 'login': return '#10b981';
      case 'follow': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'post': return '📝';
      case 'transaction': return '💸';
      case 'login': return '🔐';
      case 'follow': return '👥';
      default: return '📌';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'send': return '#ef4444';
      case 'receive': return '#10b981';
      case 'swap': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'send': return '⬆️';
      case 'receive': return '⬇️';
      case 'swap': return '🔄';
      default: return '📌';
    }
  };

  return (
    <div className="main-content">
      {/* Stats Overview */}
      <div className="grid" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ background: 'white', border: '1px solid #e5e7eb' }}>
          <div className="stats">
            <div className="stat">
              <div className="stat-value" style={{ color: '#6366f1' }}>{userData.points}</div>
              <div className="stat-label">Total Points</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: '#10b981' }}>{userData.streak} days</div>
              <div className="stat-label">Login Streak</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: '#8b5cf6' }}>Level {userData.level}</div>
              <div className="stat-label">User Level</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: userData.walletConnected ? '#10b981' : '#ef4444' }}>
                {userData.walletConnected ? 'Connected' : 'Disconnected'}
              </div>
              <div className="stat-label">Wallet Status</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Daily Tasks Section */}
        <div className="card" style={{ background: 'white', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>
            Daily Tasks
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Complete daily tasks to earn more points
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dailyTasks.map(task => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: task.completed ? '#f0fdf4' : '#f8fafc',
                  border: `1px solid ${task.completed ? '#bbf7d0' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: task.completed ? '#10b981' : '#6366f1',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  {task.completed ? '✓' : '+'}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.3rem'
                  }}>
                    <h4 style={{ 
                      color: '#1f2937', 
                      fontSize: '0.95rem', 
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {task.title}
                    </h4>
                    <span style={{
                      background: '#6366f1',
                      color: 'white',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      +{task.points} pts
                    </span>
                  </div>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.8rem', 
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {task.description}
                  </p>
                </div>

                <button
                  onClick={() => completeTask(task.id)}
                  disabled={task.completed}
                  style={{
                    padding: '0.6rem 1rem',
                    background: task.completed ? '#d1d5db' : '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    cursor: task.completed ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '80px'
                  }}
                  onMouseOver={(e) => !task.completed && (e.target.style.background = '#4f46e5')}
                  onMouseOut={(e) => !task.completed && (e.target.style.background = '#6366f1')}
                >
                  {task.completed ? 'Completed' : 'Claim'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card" style={{ background: 'white', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>
            Recent Activities
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Your recent interactions and rewards
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {userActivities.map(activity => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: getActivityColor(activity.type),
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {getActivityIcon(activity.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '0.3rem'
                  }}>
                    <div>
                      <h4 style={{ 
                        color: '#1f2937', 
                        fontSize: '0.9rem', 
                        fontWeight: '600',
                        margin: '0 0 0.2rem 0'
                      }}>
                        {activity.description}
                      </h4>
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: '0.75rem', 
                        margin: 0
                      }}>
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      +{activity.points}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{
                      background: '#f3f4f6',
                      color: '#6b7280',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {userActivities.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                No activities yet. Complete tasks to earn points!
              </div>
            )}
          </div>
        </div>

        {/* Wallet Transactions */}
        <div className="card" style={{ background: 'white', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>
            SVM Wallet Transactions
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Recent transactions on SVM Testnet
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {walletTransactions.map(transaction => (
              <div
                key={transaction.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: getTransactionColor(transaction.type),
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {getTransactionIcon(transaction.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.3rem'
                  }}>
                    <h4 style={{ 
                      color: '#1f2937', 
                      fontSize: '0.9rem', 
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} 
                      {transaction.to && ` to ${transaction.to}`}
                      {transaction.from && ` from ${transaction.from}`}
                    </h4>
                    <span style={{
                      color: transaction.type === 'receive' ? '#10b981' : '#1f2937',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {transaction.amount}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.75rem', 
                      margin: 0
                    }}>
                      {transaction.timestamp}
                    </p>
                    <span style={{
                      background: transaction.status === 'completed' ? '#ecfdf5' : '#fef3c7',
                      color: transaction.status === 'completed' ? '#065f46' : '#92400e',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ background: 'white', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>
            Quick Actions
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Common actions to earn points
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button
              style={{
                padding: '0.8rem 1rem',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.target.style.background = '#4f46e5'}
              onMouseOut={(e) => e.target.style.background = '#6366f1'}
            >
              📱 Connect Twitter Account
            </button>

            <button
              style={{
                padding: '0.8rem 1rem',
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.target.style.background = '#7c3aed'}
              onMouseOut={(e) => e.target.style.background = '#8b5cf6'}
            >
              🔗 Make SVM Transaction
            </button>

            <button
              onClick={() => {
                console.log('All Users:', storageService.getAllUsers());
                console.log('Current User:', user);
                console.log('Activities:', storageService.getActivities(user.walletAddress));
              }}
              style={{
                padding: '0.8rem 1rem',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              🔧 Debug Data
            </button>

            <button
              style={{
                padding: '0.8rem 1rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.target.style.background = '#059669'}
              onMouseOut={(e) => e.target.style.background = '#10b981'}
            >
              🎯 Claim Daily Bonus
            </button>

            <button
              style={{
                padding: '0.8rem 1rem',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => e.target.style.background = '#d97706'}
              onMouseOut={(e) => e.target.style.background = '#f59e0b'}
            >
              📊 View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;
