<template>
  <div class="home">
    <!-- 国风祥云装饰 -->
    <div class="cloud-group">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <!-- 头部导航 -->
    <header class="header">
      <div class="container header-content">
        <div class="logo">
          <div class="logo-icon">玄</div>
          <div class="logo-text">赛博罗盘·国风玄易</div>
        </div>
        <div class="header-buttons">
          <button class="btn btn-outline" @click="toggleTheme">{{ isElderMode ? '年轻' : '长辈' }}</button>
          <button class="btn btn-primary" @click="navigateTo('profile')">我的</button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <!-- 欢迎语 -->
        <div class="welcome-section fade-in">
          <h1 class="welcome-title">欢迎使用赛博罗盘</h1>
          <p class="welcome-desc">融合传统风水智慧与现代科技，为您提供专业的风水测算与运势分析</p>
        </div>

        <!-- 核心罗盘（Canvas绘制） -->
        <div class="compass-section fade-in">
          <div class="compass-wrapper">
            <canvas id="compass-canvas" ref="compassCanvas"></canvas>
            <p class="compass-tip">✨ 罗盘正在自动校准方位 | 点击功能卡片体验更多玩法</p>
          </div>
        </div>

        <!-- 今日运势模块 -->
        <div class="fortune-section fade-in">
          <div class="fortune-today">
            <h3 class="fortune-title">今日运势 · {{ todayFortune.date }}</h3>
            <div class="fortune-grid">
              <div class="fortune-item">
                <div class="fortune-item-label">今日吉位</div>
                <div class="fortune-item-value">{{ todayFortune.luckyDirection }}</div>
              </div>
              <div class="fortune-item">
                <div class="fortune-item-label">今日凶位</div>
                <div class="fortune-item-value">{{ todayFortune.unluckyDirection }}</div>
              </div>
              <div class="fortune-item">
                <div class="fortune-item-label">幸运色</div>
                <div class="fortune-item-value">{{ todayFortune.luckyColor }}</div>
              </div>
              <div class="fortune-item">
                <div class="fortune-item-label">幸运数字</div>
                <div class="fortune-item-value">{{ todayFortune.luckyNumber }}</div>
              </div>
            </div>
            <div class="fortune-detail">
              <span class="fortune-lucky">宜：{{ todayFortune.suitable.join('、') }}</span>
              <span class="fortune-taboo">忌：{{ todayFortune.avoid.join('、') }}</span>
              <span>{{ todayFortune.fiveElements }}</span>
              <span>冲煞：{{ todayFortune.zodiacConflict }}</span>
            </div>
          </div>
        </div>

        <!-- 功能入口卡片 -->
        <div class="function-section fade-in">
          <h3 class="function-title">玄易功能馆</h3>
          <div class="function-cards">
            <div class="card" @click="navigateTo('compass')">
              <div class="card-icon">🧭</div>
              <h4 class="card-title">赛博罗盘测风水</h4>
              <p class="card-desc">拖动罗盘精准测算方位吉凶，结合五行八卦解读，生成专属风水调整方案</p>
            </div>
            <div class="card" @click="navigateTo('fengshui-calculator')">
              <div class="card-icon">🏠</div>
              <h4 class="card-title">家居风水测算</h4>
              <p class="card-desc">客厅/卧室/厨房/卫生间分区测算，给出可视化改造建议，提升居家运势</p>
            </div>
            <div class="card" @click="navigateTo('fortune')">
              <div class="card-icon">🍀</div>
              <h4 class="card-title">今日运势测试</h4>
              <p class="card-desc">生肖/星座/八字多维度测算，解锁财运、健康、感情、事业专属运势解读</p>
            </div>
            <div class="card" @click="navigateTo('knowledge')">
              <div class="card-icon">📖</div>
              <h4 class="card-title">玄学知识库</h4>
              <p class="card-desc">零基础了解罗盘、五行、八卦、家居风水，边学边玩，解锁传统文化趣味</p>
            </div>
          </div>
        </div>

        <!-- 特色推荐 -->
        <div class="feature-section fade-in">
          <h3 class="feature-title">特色推荐</h3>
          <div class="feature-cards">
            <div class="card">
              <div class="card-icon">🔮</div>
              <h4 class="card-title">AI风水顾问</h4>
              <p class="card-desc">基于大数据分析，为您提供个性化的风水建议和运势预测</p>
            </div>
            <div class="card">
              <div class="card-icon">📱</div>
              <h4 class="card-title">移动罗盘</h4>
              <p class="card-desc">支持手机重力感应，实时显示方位和风水信息，随时随地测算</p>
            </div>
            <div class="card">
              <div class="card-icon">🏆</div>
              <h4 class="card-title">运势排行榜</h4>
              <p class="card-desc">查看每日生肖、星座运势排名，了解自己的运势在人群中的位置</p>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores';
import { initCompass } from '../utils/compass-utils';
import { getTodayFortune } from '../data/fortune-data';

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    const compassCanvas = ref(null);
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 今日运势数据
    const todayFortune = ref(getTodayFortune());
    
    // 切换主题模式
    const toggleTheme = () => {
      store.toggleTheme();
      // 更新文档主题属性
      document.documentElement.setAttribute('data-theme', store.theme);
      // 重新初始化罗盘以适应新主题
      if (compassCanvas.value) {
        initCompass('compass-canvas', false);
      }
    };
    
    // 页面导航
    const navigateTo = (page) => {
      router.push(`/${page}`);
    };
    
    // 组件挂载后初始化罗盘
    onMounted(() => {
      // 设置初始主题
      document.documentElement.setAttribute('data-theme', store.theme);
      
      if (compassCanvas.value) {
        initCompass('compass-canvas', false);
      }
      
      // 为元素添加动画延迟
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
      });
    });
    
    // 监听主题变化
    watch(() => store.theme, (newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme);
    });
    
    return {
      compassCanvas,
      isElderMode,
      todayFortune,
      toggleTheme,
      navigateTo
    };
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.welcome-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
  
  .welcome-title {
    font-size: var(--font-size-xxl);
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
  }
  
  .welcome-desc {
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }
}

.compass-section {
  margin-bottom: var(--spacing-xl);
}

.feature-section {
  margin-top: var(--spacing-xl);
  
  .feature-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .feature-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .welcome-section {
    padding: var(--spacing-lg) 0;
    
    .welcome-title {
      font-size: var(--font-size-xl);
    }
    
    .welcome-desc {
      font-size: var(--font-size-base);
    }
  }
  
  .feature-section {
    .feature-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>