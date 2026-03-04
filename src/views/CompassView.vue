<template>
  <div class="compass-view">
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
        <!-- 页面标题 -->
        <div class="page-title fade-in">
          <h1>赛博罗盘测风水</h1>
          <p>拖动罗盘精准测算方位吉凶，结合五行八卦解读，生成专属风水调整方案</p>
        </div>

        <!-- 罗盘区域 -->
        <div class="compass-container fade-in">
          <div class="compass-wrapper">
            <canvas id="compass-canvas" ref="compassCanvas"></canvas>
            <p class="compass-tip">🔄 拖动罗盘调整方位 | 📱 或使用手机重力感应</p>
          </div>
        </div>

        <!-- 风水解读结果 -->
        <div class="result-section fade-in">
          <div class="result-card">
            <h3 class="result-title">风水解读</h3>
            <div class="result-content">
              <div class="direction-info">
                <span class="direction-label">当前方位：</span>
                <span class="direction-value">{{ currentDirection }}</span>
              </div>
              <div class="element-info">
                <span class="element-label">五行属性：</span>
                <span class="element-value">{{ currentElement }}</span>
              </div>
              <div class="luck-info">
                <span class="luck-label">吉凶判断：</span>
                <span class="luck-value" :class="luckClass">{{ currentLuck }}</span>
              </div>
              <div class="description">
                <h4>风水解读：</h4>
                <p>{{ currentDescription }}</p>
              </div>
              <div class="adjustment">
                <h4>调整建议：</h4>
                <p>{{ currentAdjustment }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 罗盘使用指南 -->
        <div class="guide-section fade-in">
          <div class="guide-card">
            <h3 class="guide-title">使用指南</h3>
            <ul class="guide-list">
              <li>1. 拖动罗盘或点击方向按钮调整方位</li>
              <li>2. 观察罗盘指针指向的方位</li>
              <li>3. 查看下方的风水解读和调整建议</li>
              <li>4. 可以保存测算结果到个人中心</li>
            </ul>
          </div>
        </div>

        <!-- 方向快捷按钮 -->
        <div class="direction-buttons fade-in">
          <h3 class="buttons-title">快速调整方向</h3>
          <div class="button-grid">
            <button class="btn btn-outline" @click="setDirection('正北')">正北</button>
            <button class="btn btn-outline" @click="setDirection('东北')">东北</button>
            <button class="btn btn-outline" @click="setDirection('正东')">正东</button>
            <button class="btn btn-outline" @click="setDirection('东南')">东南</button>
            <button class="btn btn-outline" @click="setDirection('正南')">正南</button>
            <button class="btn btn-outline" @click="setDirection('西南')">西南</button>
            <button class="btn btn-outline" @click="setDirection('正西')">正西</button>
            <button class="btn btn-outline" @click="setDirection('西北')">西北</button>
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
import { initCompass, updateFengshuiResult } from '../utils/compass-utils';

export default {
  name: 'CompassView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    const compassCanvas = ref(null);
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 风水结果数据
    const currentDirection = ref('正北');
    const currentElement = ref('水');
    const currentLuck = ref('吉');
    const currentDescription = ref('水主财，此方位为财运位，象征智慧与机遇');
    const currentAdjustment = ref('💡 调整建议：可摆放水生植物（如富贵竹），保持方位整洁通风，忌摆放干燥易燃物品');
    
    // 吉凶样式类
    const luckClass = computed(() => {
      switch (currentLuck.value) {
        case '大吉': return 'luck大吉';
        case '吉': return 'luck吉';
        case '平': return 'luck平';
        case '凶': return 'luck凶';
        default: return '';
      }
    });
    
    // 切换主题模式
    const toggleTheme = () => {
      store.toggleTheme();
      // 更新文档主题属性
      document.documentElement.setAttribute('data-theme', store.theme);
      // 重新初始化罗盘以适应新主题
      if (compassCanvas.value) {
        initCompass('compass-canvas', true);
      }
    };
    
    // 页面导航
    const navigateTo = (page) => {
      router.push(`/${page}`);
    };
    
    // 设置方向
    const setDirection = (direction) => {
      // 这里可以实现根据方向设置罗盘角度的逻辑
      console.log('设置方向:', direction);
      // 模拟更新结果
      updateDirectionResult(direction);
    };
    
    // 更新方向结果
    const updateDirectionResult = (direction) => {
      const directionMap = {
        '正北': { element: '水', luck: '吉', description: '水主财，此方位为财运位，象征智慧与机遇', adjustment: '💡 调整建议：可摆放水生植物（如富贵竹），保持方位整洁通风，忌摆放干燥易燃物品' },
        '东北': { element: '土', luck: '平', description: '土主稳，此方位为健康位，象征稳定与守护', adjustment: '💡 调整建议：保持方位无杂物堆积，可摆放陶瓷摆件增强土气，忌摆放过多金属物品' },
        '正东': { element: '木', luck: '大吉', description: '木主旺，此方位为事业位，象征发展与突破', adjustment: '💡 调整建议：开窗通风增加阳气，摆放绿植（如发财树），忌摆放沉重的石头类物品' },
        '东南': { element: '木', luck: '吉', description: '木主运，此方位为人缘位，象征社交与机遇', adjustment: '💡 调整建议：摆放鲜花或绿植，保持光线充足，忌摆放尖锐物品（如剪刀、刀具）' },
        '正南': { element: '火', luck: '平', description: '火主礼，此方位为名声位，象征荣誉与社交', adjustment: '💡 调整建议：忌摆放过多红色物品，可摆放陶瓷摆件平衡火气，保持方位清爽' },
        '西南': { element: '土', luck: '平', description: '土主顺，此方位为家庭位，象征和谐与包容', adjustment: '💡 调整建议：摆放温馨的家居摆件，忌摆放大型金属家具，保持方位温暖整洁' },
        '正西': { element: '金', luck: '凶', description: '金主煞，此方位为口舌位，象征是非与争执', adjustment: '💡 调整建议：减少金属物品摆放，可摆放陶瓷或布艺物品化解煞气，忌大声喧哗' },
        '西北': { element: '金', luck: '大吉', description: '金主义，此方位为贵人位，象征贵人与机遇', adjustment: '💡 调整建议：保持方位开阔无遮挡，可摆放金色摆件增强金气，忌摆放过多杂物' }
      };
      
      const data = directionMap[direction];
      if (data) {
        currentDirection.value = direction;
        currentElement.value = data.element;
        currentLuck.value = data.luck;
        currentDescription.value = data.description;
        currentAdjustment.value = data.adjustment;
      }
    };
    
    // 组件挂载后初始化罗盘
    onMounted(() => {
      // 设置初始主题
      document.documentElement.setAttribute('data-theme', store.theme);
      
      if (compassCanvas.value) {
        initCompass('compass-canvas', true);
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
      currentDirection,
      currentElement,
      currentLuck,
      currentDescription,
      currentAdjustment,
      luckClass,
      toggleTheme,
      navigateTo,
      setDirection
    };
  }
};
</script>

<style scoped>
.compass-view {
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

.compass-container {
  margin-bottom: var(--spacing-xl);
}

.result-section {
  margin-bottom: var(--spacing-xl);
  
  .result-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .result-title {
      font-size: var(--font-size-xl);
      font-weight: bold;
      margin-bottom: var(--spacing-lg);
      color: var(--color-primary);
      text-align: center;
    }
    
    .result-content {
      .direction-info,
      .element-info,
      .luck-info {
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-base);
        
        .direction-label,
        .element-label,
        .luck-label {
          font-weight: bold;
          color: var(--color-text);
        }
        
        .direction-value,
        .element-value,
        .luck-value {
          color: var(--color-primary);
          font-weight: bold;
        }
      }
      
      .luck-value {
        &.luck大吉 {
          color: var(--color-success);
        }
        
        &.luck吉 {
          color: var(--color-info);
        }
        
        &.luck平 {
          color: var(--color-warning);
        }
        
        &.luck凶 {
          color: var(--color-danger);
        }
      }
      
      .description,
      .adjustment {
        margin-top: var(--spacing-lg);
        
        h4 {
          font-size: var(--font-size-lg);
          font-weight: bold;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text);
        }
        
        p {
          font-size: var(--font-size-base);
          line-height: 1.6;
          color: var(--color-text-light);
        }
      }
      
      .adjustment {
        background-color: rgba(255, 215, 0, 0.1);
        padding: var(--spacing-md);
        border-radius: var(--border-radius-md);
      }
    }
  }
}

.guide-section {
  margin-bottom: var(--spacing-xl);
  
  .guide-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .guide-title {
      font-size: var(--font-size-xl);
      font-weight: bold;
      margin-bottom: var(--spacing-lg);
      color: var(--color-primary);
      text-align: center;
    }
    
    .guide-list {
      list-style: none;
      
      li {
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-base);
        color: var(--color-text);
        padding-left: var(--spacing-lg);
        position: relative;
        
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: bold;
        }
      }
    }
  }
}

.direction-buttons {
  .buttons-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: var(--spacing-md);
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
  
  .compass-container {
    .compass-wrapper {
      max-width: 300px;
    }
  }
  
  .direction-buttons {
    .button-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>