import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: localStorage.getItem('compassTheme') || 'youth',
    animStatus: localStorage.getItem('compassAnim') || 'on',
    fortuneRecords: JSON.parse(localStorage.getItem('fortuneRecords') || '[]'),
    userPreferences: {
      enableNotifications: true,
      showCompassTips: true,
      language: 'zh-CN'
    }
  }),
  getters: {
    isElderMode: (state) => state.theme === 'elder',
    shouldAnimate: (state) => state.animStatus === 'on',
    recentFortuneRecords: (state) => state.fortuneRecords.slice(-5)
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'youth' ? 'elder' : 'youth';
      this.animStatus = this.theme === 'youth' ? 'on' : 'off';
      localStorage.setItem('compassTheme', this.theme);
      localStorage.setItem('compassAnim', this.animStatus);
    },
    saveFortuneRecord(type, name, data) {
      const record = {
        id: Date.now(),
        type,
        name,
        data,
        time: new Date().toLocaleString()
      };
      this.fortuneRecords.push(record);
      // 只保留最近10条记录
      this.fortuneRecords = this.fortuneRecords.slice(-10);
      localStorage.setItem('fortuneRecords', JSON.stringify(this.fortuneRecords));
      return this.fortuneRecords;
    },
    deleteFortuneRecord(id) {
      this.fortuneRecords = this.fortuneRecords.filter(item => item.id !== id);
      localStorage.setItem('fortuneRecords', JSON.stringify(this.fortuneRecords));
      return this.fortuneRecords;
    },
    updateUserPreferences(preferences) {
      this.userPreferences = { ...this.userPreferences, ...preferences };
    }
  }
});