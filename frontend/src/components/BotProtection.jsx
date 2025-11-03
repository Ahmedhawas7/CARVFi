import React, { useState } from 'react';

const BotProtection = ({ user }) => {
  const [securityScore] = useState(88);

  return (
    <div className="grid">
      <div className="card">
        <h3>Security Status</h3>
        <div className="security-score">
          <div className="score-circle">
            <div className="score-value">{securityScore}</div>
            <div className="score-label">Score</div>
          </div>
          <div className="security-info">
            <div className="status-item">
              <span className="status-indicator green"></span>
              <span>Wallet Verified</span>
            </div>
            <div className="status-item">
              <span className="status-indicator green"></span>
              <span>Behavior Normal</span>
            </div>
            <div className="status-item">
              <span className="status-indicator yellow"></span>
              <span>2FA Recommended</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Activity Monitoring</h3>
        <div className="activity-stats">
          <div className="stat-item">
            <div className="stat-number">42</div>
            <div className="stat-label">Interactions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">Flags</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Clean</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Protection Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">🤖</div>
            <div className="feature-info">
              <div className="feature-title">AI Behavior Analysis</div>
              <div className="feature-desc">Monitors activity patterns</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div className="feature-info">
              <div className="feature-title">Bot Detection</div>
              <div className="feature-desc">Prevents automated activity</div>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <div className="feature-info">
              <div className="feature-title">Real-time Monitoring</div>
              <div className="feature-desc">Continuous security checks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotProtection;
