<template>
  <div class="profile-view">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container header-content">
        <div class="logo">
          <div class="logo-icon">玄</div>
          <div class="logo-text">赛博罗盘·国风玄易</div>
        </div>
        <div class="header-buttons">
          <button class="btn btn-outline" @click="toggleTheme">{{ isElderMode ? '年轻' : '长辈' }}</button>
          <button class="btn btn-primary" @click="navigateTo('home')">首页</button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <!-- 页面标题 -->
        <div class="page-title fade-in">
          <h1>个人中心</h1>
          <p>管理个人信息、查看运势记录、设置偏好</p>
        </div>

        <!-- 用户信息 -->
        <div class="user-info fade-in">
          <div class="user-card">
            <div class="user-avatar">
              <div class="avatar-icon">用</div>
            </div>
            <div class="user-details">
              <h3 class="user-name">用户</h3>
              <p class="user-id">ID: {{ userId }}</p>
              <p class="user-join-date">加入时间: {{ joinDate }}</p>
            </div>
          </div>
        </div>

        <!-- 运势记录 -->
        <div class="fortune-records fade-in">
          <h3 class="section-title">运势记录</h3>
          <div class="records-card">
            <div v-if="fortuneRecords.length === 0" class="no-records">
              <p>暂无运势记录</p>
              <button class="btn btn-outline" @click="navigateTo('fortune')">去测算运势</button>
            </div>
            <div v-else class="records-list">
              <div v-for="record in fortuneRecords" :key="record.id" class="record-item">
                <div class="record-header">
                  <h4 class="record-title">{{ record.name }}运势</h4>
                  <span class="record-time">{{ record.time }}</span>
                </div>
                <div class="record-content">
                  <div class="record-overall">
                    <span class="record-label">整体运势：</span>
                    <span class="record-value">{{ record.data.overall }}</span>
                  </div>
                  <div class="record-actions">
                    <button class="btn btn-sm btn-outline" @click="viewRecordDetail(record)">查看详情</button>
                    <button class="btn btn-sm btn-outline" @click="deleteRecord(record.id)">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 设置选项 -->
        <div class="settings-section fade-in">
          <h3 class="section-title">设置</h3>
          <div class="settings-card">
            <div class="setting-item">
              <span class="setting-label">通知提醒</span>
              <label class="switch">
                <input type="checkbox" v-model="userPreferences.enableNotifications">
                <span class="slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <span class="setting-label">罗盘提示</span>
              <label class="switch">
                <input type="checkbox" v-model="userPreferences.showCompassTips">
                <span class="slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <span class="setting-label">语言</span>
              <select class="select-input" v-model="userPreferences.language">
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
            <div class="setting-item">
              <span class="setting-label">清除缓存</span>
              <button class="btn btn-sm btn-outline" @click="clearCache">清除</button>
            </div>
          </div>
        </div>

        <!-- 关于我们 -->
        <div class="about-section fade-in">
          <h3 class="section-title">关于我们</h3>
          <div class="about-card">
            <p class="about-content">赛博罗盘是一款融合传统风水智慧与现代科技的应用，为用户提供专业的风水测算与运势分析。</p>
            <p class="about-version">版本：1.0.0</p>
            <div class="about-links">
              <a href="#" class="about-link">隐私政策</a>
              <a href="#" class="about-link">用户协议</a>
              <a href="#" class="about-link">联系我们</a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部信息 -->
    <footer class="footer">
      <div class="container footer-content">
        <div>赛博罗盘 © 2026 国风玄易 | 传统风水×数字交互</div>
        <div class="footer-note">⚠️ 本网站内容仅为传统文化科普与娱乐，请勿迷信，理性看待</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores';

export default {
  name: 'ProfileView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 计算属性：运势记录
    const fortuneRecords = computed(() => store.fortuneRecords);
    
    // 用户偏好设置
    const userPreferences = ref({
      enableNotifications: store.userPreferences.enableNotifications,
      showCompassTips: store.userPreferences.showCompassTips,
      language: store.userPreferences.language
    });
    
    // 用户信息
    const userId = ref('user_123456');
    const joinDate = ref('2026-01-01');
    
    // 切换主题模式
    const toggleTheme = () => {
      store.toggleTheme();
      // 更新文档主题属性
      document.documentElement.setAttribute('data-theme', store.theme);
    };
    
    // 页面导航
    const navigateTo = (page) => {
      if (page === 'home') {
        router.push('/');
      } else {
        router.push(`/${page}`);
      }
    };
    
    // 查看记录详情
    const viewRecordDetail = (record) => {
      console.log('查看记录详情:', record);
      // 这里可以实现查看详细记录的逻辑
      alert(`查看${record.name}的运势详情`);
    };
    
    // 删除记录
    const deleteRecord = (id) => {
      if (confirm('确定要删除这条运势记录吗？')) {
        store.deleteFortuneRecord(id);
      }
    };
    
    // 清除缓存
    const clearCache = () => {
      if (confirm('确定要清除所有缓存数据吗？')) {
        // 这里可以实现清除缓存的逻辑
        localStorage.clear();
        alert('缓存已清除');
        window.location.reload();
      }
    };
    
    // 组件挂载后设置主题
    onMounted(() => {
      // 设置初始主题
      document.documentElement.setAttribute('data-theme', store.theme);
      
      // 为元素添加动画延迟
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
      });
    });
    
    return {
      isElderMode,
      fortuneRecords,
      userPreferences,
      userId,
      joinDate,
      toggleTheme,
      navigateTo,
      viewRecordDetail,
      deleteRecord,
      clearCache
    };
  }
};
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.page-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
  
  h1 {
    font-size: var(--font-size-xxl);
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
  }
  
  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }
}

.user-info {
  margin-bottom: var(--spacing-xl);
  
  .user-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    
    .user-avatar {
      .avatar-icon {
        width: 80px;
        height: 80px;
        background-color: var(--color-primary);
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: var(--font-size-xxl);
        font-weight: bold;
      }
    }
    
    .user-details {
      .user-name {
        font-size: var(--font-size-xl);
        font-weight: bold;
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
      }
      
      .user-id,
      .user-join-date {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
        margin-bottom: var(--spacing-xs);
      }
    }
  }
}

.fortune-records {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .records-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .no-records {
      text-align: center;
      padding: var(--spacing-xl) 0;
      
      p {
        font-size: var(--font-size-base);
        color: var(--color-text-light);
        margin-bottom: var(--spacing-lg);
      }
    }
    
    .records-list {
      .record-item {
        border-bottom: 1px solid var(--color-border);
        padding: var(--spacing-md) 0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .record-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          
          .record-title {
            font-size: var(--font-size-base);
            font-weight: bold;
            color: var(--color-text);
          }
          
          .record-time {
            font-size: var(--font-size-xs);
            color: var(--color-text-light);
          }
        }
        
        .record-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .record-overall {
            .record-label {
              font-size: var(--font-size-sm);
              color: var(--color-text-light);
            }
            
            .record-value {
              font-size: var(--font-size-sm);
              font-weight: bold;
              color: var(--color-primary);
            }
          }
          
          .record-actions {
            display: flex;
            gap: var(--spacing-sm);
            
            .btn-sm {
              font-size: var(--font-size-xs);
              padding: var(--spacing-xs) var(--spacing-sm);
            }
          }
        }
      }
    }
  }
}

.settings-section {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .settings-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md) 0;
      border-bottom: 1px solid var(--color-border);
      
      &:last-child {
        border-bottom: none;
      }
      
      .setting-label {
        font-size: var(--font-size-base);
        color: var(--color-text);
      }
      
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        
        input {
          opacity: 0;
          width: 0;
          height: 0;
          
          &:checked + .slider {
            background-color: var(--color-primary);
          }
          
          &:checked + .slider:before {
            transform: translateX(26px);
          }
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: var(--transition-fast);
          border-radius: 24px;
          
          &:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: var(--transition-fast);
            border-radius: 50%;
          }
        }
      }
      
      .select-input {
        padding: var(--spacing-xs) var(--spacing-sm);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-md);
        font-size: var(--font-size-sm);
        color: var(--color-text);
      }
    }
  }
}

.about-section {
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .about-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    text-align: center;
    
    .about-content {
      font-size: var(--font-size-base);
      line-height: 1.6;
      color: var(--color-text-light);
      margin-bottom: var(--spacing-lg);
    }
    
    .about-version {
      font-size: var(--font-size-sm);
      color: var(--color-text-light);
      margin-bottom: var(--spacing-lg);
    }
    
    .about-links {
      display: flex;
      justify-content: center;
      gap: var(--spacing-lg);
      
      .about-link {
        font-size: var(--font-size-sm);
        color: var(--color-primary);
        text-decoration: none;
        transition: all var(--transition-fast);
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-title {
    padding: var(--spacing-lg) 0;
    
    h1 {
      font-size: var(--font-size-xl);
    }
    
    p {
      font-size: var(--font-size-base);
    }
  }
  
  .user-info {
    .user-card {
      flex-direction: column;
      text-align: center;
    }
  }
  
  .fortune-records {
    .records-card {
      .records-list {
        .record-item {
          .record-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-xs);
          }
          
          .record-content {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
        }
      }
    }
  }
  
  .settings-section {
    .settings-card {
      .setting-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
      }
    }
  }
  
  .about-section {
    .about-card {
      .about-links {
        flex-direction: column;
        gap: var(--spacing-sm);
      }
    }
  }
}
</style>