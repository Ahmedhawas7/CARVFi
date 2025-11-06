// src/services/StorageService.js
class StorageService {
  static getKey(walletAddress, key) {
    return `carvfi_${walletAddress}_${key}`;
  }

  static saveUser(user) {
    if (!user || !user.walletAddress) return;
    localStorage.setItem(this.getKey(user.walletAddress, 'user'), JSON.stringify(user));
    localStorage.setItem('carvfi_current_user', user.walletAddress);
  }

  static getUser(walletAddress) {
    const data = localStorage.getItem(this.getKey(walletAddress, 'user'));
    return data ? JSON.parse(data) : null;
  }

  static getCurrentUser() {
    const wallet = localStorage.getItem('carvfi_current_user');
    if (!wallet) return null;
    return this.getUser(wallet);
  }

  static saveActivity(walletAddress, activity) {
    const key = this.getKey(walletAddress, 'activities');
    const activities = this.getActivities(walletAddress);
    activities.push({
      ...activity,
      date: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(activities));
  }

  static getActivities(walletAddress) {
    const data = localStorage.getItem(this.getKey(walletAddress, 'activities'));
    return data ? JSON.parse(data) : [];
  }

  static updatePoints(walletAddress, amount = 0) {
    const user = this.getUser(walletAddress);
    if (!user) return;
    user.points = (user.points || 0) + amount;
    this.saveUser(user);
  }

  static getPoints(walletAddress) {
    const user = this.getUser(walletAddress);
    return user ? user.points || 0 : 0;
  }

  static updateStreak(walletAddress) {
    const key = this.getKey(walletAddress, 'streak');
    const lastLoginKey = this.getKey(walletAddress, 'last_login');
    const lastLogin = localStorage.getItem(lastLoginKey);
    const today = new Date().toDateString();

    if (lastLogin === today) {
      return parseInt(localStorage.getItem(key)) || 1;
    }

    let streak = parseInt(localStorage.getItem(key)) || 0;
    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    localStorage.setItem(lastLoginKey, today);
    localStorage.setItem(key, streak);
    return streak;
  }
}

export default StorageService;