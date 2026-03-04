<template>
  <div class="fortune-view">
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
          <h1>今日运势测试</h1>
          <p>生肖/星座/八字多维度测算，解锁财运、健康、感情、事业专属运势解读</p>
        </div>

        <!-- 测算类型选择 -->
        <div class="calculator-type fade-in">
          <h3 class="section-title">选择测算类型</h3>
          <div class="type-buttons">
            <button 
              v-for="type in calculatorTypes" 
              :key="type.id"
              class="btn" 
              :class="{ 'btn-primary': selectedType === type.id, 'btn-outline': selectedType !== type.id }"
              @click="selectType(type.id)"
            >
              {{ type.name }}
            </button>
          </div>
        </div>

        <!-- 生肖选择 -->
        <div v-if="selectedType === 'zodiac'" class="zodiac-selection fade-in">
          <h3 class="section-title">选择生肖</h3>
          <div class="zodiac-grid">
            <div 
              v-for="zodiac in zodiacs" 
              :key="zodiac.name"
              class="zodiac-item"
              :class="{ 'selected': selectedZodiac === zodiac.name }"
              @click="selectZodiac(zodiac.name)"
            >
              <div class="zodiac-icon">{{ zodiac.icon }}</div>
              <div class="zodiac-name">{{ zodiac.name }}</div>
            </div>
          </div>
        </div>

        <!-- 星座选择 -->
        <div v-if="selectedType === 'constellation'" class="constellation-selection fade-in">
          <h3 class="section-title">选择星座</h3>
          <div class="constellation-grid">
            <div 
              v-for="constellation in constellations" 
              :key="constellation.name"
              class="constellation-item"
              :class="{ 'selected': selectedConstellation === constellation.name }"
              @click="selectConstellation(constellation.name)"
            >
              <div class="constellation-icon">{{ constellation.icon }}</div>
              <div class="constellation-name">{{ constellation.name }}</div>
            </div>
          </div>
        </div>

        <!-- 运势结果 -->
        <div v-if="showResult" class="fortune-result fade-in">
          <div class="result-card">
            <h3 class="result-title">{{ resultTitle }}运势解读</h3>
            <div class="result-content">
              <div class="fortune-scores">
                <div class="score-item">
                  <span class="score-label">财运：</span>
                  <span class="score-value">{{ currentFortune.wealth }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">健康：</span>
                  <span class="score-value">{{ currentFortune.health }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">感情：</span>
                  <span class="score-value">{{ currentFortune.love }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">事业：</span>
                  <span class="score-value">{{ currentFortune.career }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">整体：</span>
                  <span class="score-value">{{ currentFortune.overall }}</span>
                </div>
              </div>
              <div class="lucky-info">
                <h4>幸运数字：</h4>
                <p>{{ currentFortune.lucky.number }}</p>
                <h4>幸运颜色：</h4>
                <p>{{ currentFortune.lucky.color }}</p>
                <h4>幸运方位：</h4>
                <p>{{ currentFortune.lucky.direction }}</p>
              </div>
              <div class="suggestion">
                <h4>今日建议：</h4>
                <p>{{ currentFortune.suggest }}</p>
              </div>
              <div class="detail">
                <h4>详细解读：</h4>
                <p>{{ currentFortune.detail }}</p>
              </div>
              <button class="btn btn-primary" @click="saveResult">保存运势记录</button>
            </div>
          </div>
        </div>

        <!-- 测算按钮 -->
        <div v-if="!showResult" class="calculate-button fade-in">
          <button class="btn btn-primary btn-block" @click="calculateFortune">开始测算</button>
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
import { getZodiacFortune, getConstellationFortune, getTodayFortune } from '../data/fortune-data';

export default {
  name: 'FortuneView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 测算类型
    const calculatorTypes = ref([
      { id: 'zodiac', name: '生肖运势' },
      { id: 'constellation', name: '星座运势' },
      { id: 'today', name: '今日通用运势' }
    ]);
    
    // 选中的测算类型
    const selectedType = ref('zodiac');
    
    // 生肖数据
    const zodiacs = ref([
      { name: '鼠', icon: '🐭' },
      { name: '牛', icon: '🐂' },
      { name: '虎', icon: '🐅' },
      { name: '兔', icon: '🐇' },
      { name: '龙', icon: '🐉' },
      { name: '蛇', icon: '🐍' },
      { name: '马', icon: '🐎' },
      { name: '羊', icon: '🐏' },
      { name: '猴', icon: '🐒' },
      { name: '鸡', icon: '🐓' },
      { name: '狗', icon: '🐕' },
      { name: '猪', icon: '🐖' }
    ]);
    
    // 星座数据
    const constellations = ref([
      { name: '白羊座', icon: '♈' },
      { name: '金牛座', icon: '♉' },
      { name: '双子座', icon: '♊' },
      { name: '巨蟹座', icon: '♋' },
      { name: '狮子座', icon: '♌' },
      { name: '处女座', icon: '♍' },
      { name: '天秤座', icon: '♎' },
      { name: '天蝎座', icon: '♏' },
      { name: '射手座', icon: '♐' },
      { name: '摩羯座', icon: '♑' },
      { name: '水瓶座', icon: '♒' },
      { name: '双鱼座', icon: '♓' }
    ]);
    
    // 选中的生肖和星座
    const selectedZodiac = ref('鼠');
    const selectedConstellation = ref('白羊座');
    
    // 显示结果
    const showResult = ref(false);
    
    // 结果标题
    const resultTitle = computed(() => {
      if (selectedType.value === 'zodiac') return selectedZodiac.value;
      if (selectedType.value === 'constellation') return selectedConstellation.value;
      return '今日通用';
    });
    
    // 当前运势数据
    const currentFortune = ref({
      wealth: '★★★☆☆',
      health: '★★★☆☆',
      love: '★★★☆☆',
      career: '★★★☆☆',
      overall: '★★★☆☆',
      lucky: {
        color: '红色',
        number: '1, 6',
        direction: '正东'
      },
      suggest: '今日宜保持积极心态，努力工作',
      detail: '今日整体运势平稳，宜保持积极心态，努力工作。'
    });
    
    // 选择测算类型
    const selectType = (typeId) => {
      selectedType.value = typeId;
      showResult.value = false;
    };
    
    // 选择生肖
    const selectZodiac = (zodiacName) => {
      selectedZodiac.value = zodiacName;
      showResult.value = false;
    };
    
    // 选择星座
    const selectConstellation = (constellationName) => {
      selectedConstellation.value = constellationName;
      showResult.value = false;
    };
    
    // 测算运势
    const calculateFortune = () => {
      if (selectedType.value === 'zodiac') {
        currentFortune.value = getZodiacFortune(selectedZodiac.value);
      } else if (selectedType.value === 'constellation') {
        const constellationData = getConstellationFortune(selectedConstellation.value);
        // 为星座数据添加完整结构
        currentFortune.value = {
          wealth: '★★★☆☆',
          health: '★★★☆☆',
          love: '★★★☆☆',
          career: '★★★☆☆',
          overall: constellationData.overall,
          lucky: {
            color: '蓝色',
            number: '3, 8',
            direction: '东南'
          },
          suggest: constellationData.suggest,
          detail: `${selectedConstellation.value}今日运势${constellationData.overall}，${constellationData.suggest}`
        };
      } else {
        const todayData = getTodayFortune();
        // 为今日运势添加完整结构
        currentFortune.value = {
          wealth: '★★★★☆',
          health: '★★★☆☆',
          love: '★★★☆☆',
          career: '★★★★☆',
          overall: todayData.overallLuck,
          lucky: {
            color: todayData.luckyColor,
            number: todayData.luckyNumber,
            direction: todayData.luckyDirection
          },
          suggest: '今日宜按照运势指引行事，保持积极心态',
          detail: todayData.desc
        };
      }
      showResult.value = true;
    };
    
    // 保存结果
    const saveResult = () => {
      store.saveFortuneRecord(selectedType.value, resultTitle.value, currentFortune.value);
      alert('运势记录已保存到个人中心！');
    };
    
    // 切换主题模式
    const toggleTheme = () => {
      store.toggleTheme();
      // 更新文档主题属性
      document.documentElement.setAttribute('data-theme', store.theme);
    };
    
    // 页面导航
    const navigateTo = (page) => {
      router.push(`/${page}`);
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
      calculatorTypes,
      selectedType,
      zodiacs,
      selectedZodiac,
      constellations,
      selectedConstellation,
      showResult,
      resultTitle,
      currentFortune,
      selectType,
      selectZodiac,
      selectConstellation,
      calculateFortune,
      saveResult,
      toggleTheme,
      navigateTo
    };
  }
};
</script>

<style scoped>
.fortune-view {
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

.calculator-type {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .type-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
  }
}

.zodiac-selection,
.constellation-selection {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .zodiac-grid,
  .constellation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--spacing-md);
    
    .zodiac-item,
    .constellation-item {
      background-color: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-lg);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-normal);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      &.selected {
        background-color: var(--color-primary);
        color: white;
      }
      
      .zodiac-icon,
      .constellation-icon {
        font-size: var(--font-size-xxl);
        margin-bottom: var(--spacing-sm);
      }
      
      .zodiac-name,
      .constellation-name {
        font-size: var(--font-size-sm);
        font-weight: bold;
      }
    }
  }
}

.fortune-result {
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
      .fortune-scores {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        
        .score-item {
          text-align: center;
          padding: var(--spacing-md);
          background-color: #f8f9fa;
          border-radius: var(--border-radius-md);
          
          .score-label {
            display: block;
            font-size: var(--font-size-sm);
            color: var(--color-text-light);
            margin-bottom: var(--spacing-xs);
          }
          
          .score-value {
            font-size: var(--font-size-lg);
            font-weight: bold;
            color: var(--color-primary);
          }
        }
      }
      
      .lucky-info {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-md);
        background-color: rgba(255, 215, 0, 0.1);
        border-radius: var(--border-radius-md);
        
        h4 {
          font-size: var(--font-size-base);
          font-weight: bold;
          margin-bottom: var(--spacing-xs);
          color: var(--color-text);
        }
        
        p {
          font-size: var(--font-size-sm);
          color: var(--color-text-light);
          margin-bottom: var(--spacing-sm);
        }
      }
      
      .suggestion,
      .detail {
        margin-bottom: var(--spacing-lg);
        
        h4 {
          font-size: var(--font-size-base);
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
      
      button {
        margin-top: var(--spacing-lg);
        width: 100%;
      }
    }
  }
}

.calculate-button {
  margin: var(--spacing-xl) 0;
  
  button {
    font-size: var(--font-size-lg);
    padding: var(--spacing-md) var(--spacing-xl);
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
  
  .calculator-type {
    .type-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
  
  .zodiac-selection,
  .constellation-selection {
    .zodiac-grid,
    .constellation-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .fortune-result {
    .result-card {
      .result-content {
        .fortune-scores {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
}
</style>