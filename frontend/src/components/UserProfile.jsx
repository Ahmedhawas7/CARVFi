import React, { useState, useEffect } from 'react'

const UserProfile = ({ account, contracts, carvService }) => {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
    bio: '',
    socialLinks: ['']
  })

  useEffect(() => {
    loadUserProfile()
  }, [account, contracts])

  const loadUserProfile = async () => {
    try {
      // محاكاة تحميل البروفيل
      const mockProfile = {
        username: 'user_' + account.substring(2, 8),
        avatar: '',
        bio: 'CARVFi enthusiast',
        joinDate: Date.now(),
        reputation: 100,
        socialLinks: [],
        isVerified: false,
        totalPoints: 150
      }
      setProfile(mockProfile)
      setFormData(mockProfile)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const handleSaveProfile = async () => {
    try {
      // محاكاة حفظ البروفيل
      console.log('Saving profile:', formData)
      setProfile({ ...formData })
      setIsEditing(false)
      
      // TODO: استدعاء العقد لحفظ البيانات
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, '']
    })
  }

  if (!profile) {
    return <div className="card">Loading profile...</div>
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="profile-header">
          <div className="avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" style={{ width: '100%', borderRadius: '50%' }} />
            ) : (
              '👤'
            )}
          </div>
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <div style={{ marginTop: '10px' }}>
            <span style={{ 
              background: profile.isVerified ? 'var(--success)' : 'var(--warning)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              {profile.isVerified ? 'Verified' : 'Not Verified'}
            </span>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-value">{profile.reputation}</div>
            <div className="stat-label">Reputation</div>
          </div>
          <div className="stat">
            <div className="stat-value">{profile.totalPoints}</div>
            <div className="stat-label">Points</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {Math.floor((Date.now() - profile.joinDate) / (24 * 60 * 60 * 1000))}
            </div>
            <div className="stat-label">Days</div>
          </div>
        </div>

        <button 
          className="btn" 
          onClick={() => setIsEditing(!isEditing)}
          style={{ width: '100%' }}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {isEditing && (
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Edit Profile</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '5px' }}
              />
            </div>

            <div>
              <label>Avatar URL</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '5px' }}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '5px', minHeight: '80px' }}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label>Social Links</label>
              {formData.socialLinks.map((link, index) => (
                <input
                  key={index}
                  type="text"
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...formData.socialLinks]
                    newLinks[index] = e.target.value
                    setFormData({ ...formData, socialLinks: newLinks })
                  }}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '5px', marginBottom: '10px' }}
                  placeholder="https://twitter.com/username"
                />
              ))}
              <button type="button" className="btn btn-secondary" onClick={addSocialLink}>
                Add Social Link
              </button>
            </div>

            <button className="btn" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3 style={{ marginBottom: '15px' }}>Carv Wallet Activity</h3>
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          Connected to Carv Testnet
        </div>
        {/* سيتم إضافة نشاط المحفظة هنا */}
      </div>
    </div>
  )
}

export default UserProfile
