import React, { useState } from 'react';

const RewardsDashboard = ({ user }) => {
  const [rewards] = useState([
    { id: 1, type: 'ai_chat', points: 10, description: 'AI Chat Session', claimed: true },
    { id: 2, type: 'profile', points: 5, description: 'Profile Update', claimed: true },
    { id: 3, type: 'wallet', points: 25, description: 'Wallet Connection', claimed: true },
    { id: 4, type: 'social', points: 15, description: 'Social Interaction', claimed: false },
    { id: 5, type: 'nft', points: 50, description: 'NFT Display', claimed: false }
  ]);

  const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);
  const claimedPoints = rewards.filter(r => r.claimed).reduce((sum, reward) => sum + reward.points, 0);

  return (
    <div className="grid">
      <div className="card">
        <div className="stats">
          <div className="stat">
            <div className="stat-value">{totalPoints}</div>
            <div className="stat-label">Total Points</div>
          </div>
          <div className="stat">
            <div className="stat-value">{claimedPoints}</div>
            <div className="stat-label">Claimed</div>
          </div>
          <div className="stat">
            <div className="stat-value">{rewards.filter(r => !r.claimed).length}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Available Rewards</h3>
        <div className="rewards-list">
          {rewards.filter(reward => !reward.claimed).map(reward => (
            <div key={reward.id} className="reward-item">
              <div className="reward-icon">
                {reward.type === 'ai_chat' && '🤖'}
                {reward.type === 'profile' && '👤'}
                {reward.type === 'wallet' && '🔗'}
                {reward.type === 'social' && '💬'}
                {reward.type === 'nft' && '🖼️'}
              </div>
              <div className="reward-info">
                <div className="reward-title">{reward.description}</div>
                <div className="reward-points">+{reward.points} points</div>
              </div>
              <button className="btn btn-claim">Claim</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Reward History</h3>
        <div className="history-list">
          {rewards.filter(reward => reward.claimed).map(reward => (
            <div key={reward.id} className="history-item">
              <div className="history-icon">
                {reward.type === 'ai_chat' && '🤖'}
                {reward.type === 'profile' && '👤'}
                {reward.type === 'wallet' && '🔗'}
              </div>
              <div className="history-info">
                <div className="history-title">{reward.description}</div>
                <div className="history-date">2 days ago</div>
              </div>
              <div className="history-points">+{reward.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;
