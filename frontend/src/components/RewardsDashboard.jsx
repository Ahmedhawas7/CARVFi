import React, { useState, useEffect } from 'react'

const RewardsDashboard = ({ account, contracts }) => {
  const [rewards, setRewards] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    loadRewardsData()
  }, [account])

  const loadRewardsData = async () => {
    // بيانات تجريبية
    const mockRewards = [
      { id: 1, amount: 10, activityType: 'ai_chat', timestamp: Date.now() - 3600000, claimed: true },
      { id: 2, amount: 5, activityType: 'profile_update', timestamp: Date.now() - 7200000, claimed: true },
      { id: 3, amount: 15, activityType: 'social_post', timestamp: Date.now() - 10800000, claimed: false },
      { id: 4, amount: 25, activityType: 'referral', timestamp: Date.now() - 14400000, claimed: false },
      { id: 5, amount: 50, activityType: 'bug_report', timestamp: Date.now() - 18000000, claimed: false }
    ]

    const mockActivities = [
      { id: 1, type: 'ai_chat', points: 10, description: 'محادثة مع المساعد AI', timestamp: Date.now() - 3600000 },
      { id: 2, type: 'profile_update', points: 5, description: 'تحديث البروفيل', timestamp: Date.now() - 7200000 },
      { id: 3, type: 'social_post', points: 15, description: 'منشور اجتماعي', timestamp: Date.now() - 10800000 },
      { id: 4, type: 'referral', points: 25, description: 'إحالة صديق', timestamp: Date.now() - 14400000 },
      { id: 5, type: 'bug_report', points: 50, description: 'الإبلاغ عن ثغرة', timestamp: Date.now() - 18000000 }
    ]

    setRewards(mockRewards)
    setActivities(mockActivities)
    setTotalPoints(mockRewards.reduce((sum, reward) => sum + reward.amount, 0))
  }

  const handleClaimReward = async (rewardId) => {
    try {
      console.log('Claiming reward:', rewardId)
      // TODO: استدعاء العقد للمطالبة بالمكافأة
      alert(`تم المطالبة بالمكافأة #${rewardId}`)
    } catch (error) {
      console.error('Error claiming reward:', error)
      alert('خطأ في المطالبة بالمكافأة')
    }
  }

  const handleReportBug = async () => {
    const bugDescription = prompt('صف الثغرة التي وجدتها:')
    if (bugDescription) {
      try {
        // TODO: استدعاء العقد للإبلاغ عن الثغرة
        console.log('Bug reported:', bugDescription)
        alert('شكراً للإبلاغ! سيتم تحليل الثغرة ومكافأتك إذا كانت حقيقية.')
      } catch (error) {
        console.error('Error reporting bug:', error)
      }
    }
  }

  const getActivityIcon = (type) => {
    const icons = {
      'ai_chat': '🤖',
      'profile_update': '👤',
      'social_post': '💬',
      'referral': '👥',
      'bug_report': '🐛'
    }
    return icons[type] || '🎯'
  }

  return (
    <div className="grid">
      {/* إحصائيات النقاط */}
      <div className="card">
        <div className="stats">
          <div className="stat">
            <div className="stat-value">{totalPoints}</div>
            <div className="stat-label">إجمالي النقاط</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {rewards.filter(r => !r.claimed).length}
            </div>
            <div className="stat-label">مكافآت قابلة للصرف</div>
          </div>
          <div className="stat">
            <div className="stat-value">{rewards.length}</div>
            <div className="stat-label">إجمالي المكافآت</div>
          </div>
        </div>
      </div>

      {/* المكافآت القابلة للصرف */}
      <div className="card">
        <h3>🏆 المكافآت القابلة للصرف</h3>
        <div style={{ marginTop: '15px' }}>
          {rewards.filter(reward => !reward.claimed).length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              لا توجد مكافآت قابلة للصرف حالياً
            </p>
          ) : (
            rewards.filter(reward => !reward.claimed).map(reward => (
              <div key={reward.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>
                    {getActivityIcon(reward.activityType)}
                  </span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>
                      {reward.amount} نقطة
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {reward.activityType === 'ai_chat' && 'محادثة AI'}
                      {reward.activityType === 'profile_update' && 'تحديث البروفيل'}
                      {reward.activityType === 'social_post' && 'منشور اجتماعي'}
                      {reward.activityType === 'referral' && 'إحالة صديق'}
                      {reward.activityType === 'bug_report' && 'الإبلاغ عن ثغرة'}
                    </div>
                  </div>
                </div>
                <button 
                  className="btn"
                  onClick={() => handleClaimReward(reward.id)}
                  style={{ padding: '8px 15px', fontSize: '14px' }}
                >
                  صرف
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* الأنشطة الأخيرة */}
      <div className="card">
        <h3>📊 الأنشطة الأخيرة</h3>
        <div style={{ marginTop: '15px' }}>
          {activities.map(activity => (
            <div key={activity.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>
                  {getActivityIcon(activity.type)}
                </span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(activity.timestamp).toLocaleDateString('ar-EG')}
                  </div>
                </div>
              </div>
              <div style={{ 
                background: 'var(--success)', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                +{activity.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الإبلاغ عن الثغرات */}
      <div className="card">
        <h3>🐛 الإبلاغ عن الثغرات</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          ساعدنا في تحسين المنصة وأحصل على مكافآت تصل إلى 50 نقطة
        </p>
        <button 
          className="btn"
          onClick={handleReportBug}
          style={{ width: '100%' }}
        >
          الإبلاغ عن ثغرة
        </button>
        
        <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
          <h4>🎯 كيف تكسب نقاط أكثر؟</h4>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>محادثة AI: 10 نقاط</li>
            <li>تحديث البروفيل: 5 نقاط</li>
            <li>منشور اجتماعي: 15 نقطة</li>
            <li>إحالة صديق: 25 نقطة</li>
            <li>الإبلاغ عن ثغرة: حتى 50 نقطة</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RewardsDashboard
