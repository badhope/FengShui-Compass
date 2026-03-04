<template>
  <div class="knowledge-view">
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
          <h1>玄学知识库</h1>
          <p>零基础了解罗盘、五行、八卦、家居风水，边学边玩，解锁传统文化趣味</p>
        </div>

        <!-- 知识分类 -->
        <div class="knowledge-categories fade-in">
          <h3 class="section-title">知识分类</h3>
          <div class="category-buttons">
            <button 
              v-for="category in categories" 
              :key="category.id"
              class="btn" 
              :class="{ 'btn-primary': selectedCategory === category.id, 'btn-outline': selectedCategory !== category.id }"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- 知识内容 -->
        <div class="knowledge-content fade-in">
          <div class="content-card">
            <h3 class="content-title">{{ currentCategory.name }}</h3>
            <div class="content-body">
              <div v-for="(item, index) in currentCategory.items" :key="index" class="knowledge-item">
                <h4 class="item-title">{{ item.title }}</h4>
                <div class="item-content">
                  <p v-if="item.type === 'text'" v-for="(paragraph, pIndex) in item.content" :key="pIndex">
                    {{ paragraph }}
                  </p>
                  <div v-else-if="item.type === 'list'">
                    <ul class="item-list">
                      <li v-for="(listItem, lIndex) in item.content" :key="lIndex">
                        {{ listItem }}
                      </li>
                    </ul>
                  </div>
                  <div v-else-if="item.type === 'image'" class="item-image">
                    <img :src="item.content" :alt="item.title">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 互动问答 -->
        <div class="interactive-section fade-in">
          <h3 class="section-title">互动问答</h3>
          <div class="qa-card">
            <h4>常见问题</h4>
            <div class="qa-list">
              <div v-for="(qa, index) in faqs" :key="index" class="qa-item">
                <div class="qa-question" @click="toggleQAResponse(index)">
                  {{ qa.question }}
                  <span class="qa-icon">{{ qa.expanded ? '▼' : '▶' }}</span>
                </div>
                <div v-if="qa.expanded" class="qa-answer">
                  {{ qa.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 学习进度 -->
        <div class="progress-section fade-in">
          <h3 class="section-title">学习进度</h3>
          <div class="progress-card">
            <div class="progress-item">
              <span class="progress-label">罗盘基础</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '75%' }"></div>
              </div>
              <span class="progress-percent">75%</span>
            </div>
            <div class="progress-item">
              <span class="progress-label">五行理论</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '60%' }"></div>
              </div>
              <span class="progress-percent">60%</span>
            </div>
            <div class="progress-item">
              <span class="progress-label">八卦知识</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '45%' }"></div>
              </div>
              <span class="progress-percent">45%</span>
            </div>
            <div class="progress-item">
              <span class="progress-label">家居风水</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: '80%' }"></div>
              </div>
              <span class="progress-percent">80%</span>
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
  name: 'KnowledgeView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 知识分类
    const categories = ref([
      {
        id: 'compass',
        name: '罗盘基础',
        items: [
          {
            type: 'text',
            title: '罗盘的起源与发展',
            content: [
              '罗盘是中国古代四大发明之一，最早起源于战国时期的司南。',
              '罗盘的主要功能是测定方向，是风水师必备的工具之一。',
              '现代罗盘通常由天池、内盘和外盘三部分组成。'
            ]
          },
          {
            type: 'image',
            title: '罗盘的结构',
            content: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20compass%20structure%20diagram&image_size=landscape_16_9'
          },
          {
            type: 'list',
            title: '罗盘的使用方法',
            content: [
              '将罗盘水平放置，使天池中的磁针指向南北方向。',
              '根据需要测定的方向，旋转内盘使指针与天池中的红线重合。',
              '读取内盘上的刻度，确定具体的方向和角度。'
            ]
          }
        ]
      },
      {
        id: 'five-elements',
        name: '五行理论',
        items: [
          {
            type: 'text',
            title: '五行的概念',
            content: [
              '五行是中国古代哲学中的重要概念，包括金、木、水、火、土五种元素。',
              '五行之间存在相生相克的关系，相生为金生水、水生木、木生火、火生土、土生金。',
              '相克为金克木、木克土、土克水、水克火、火克金。'
            ]
          },
          {
            type: 'image',
            title: '五行相生相克图',
            content: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=five%20elements%20cycle%20diagram%20chinese%20philosophy&image_size=landscape_16_9'
          },
          {
            type: 'list',
            title: '五行与方位的对应关系',
            content: [
              '金：西方、秋季、白色',
              '木：东方、春季、青色',
              '水：北方、冬季、黑色',
              '火：南方、夏季、红色',
              '土：中央、四季末、黄色'
            ]
          }
        ]
      },
      {
        id: 'bagua',
        name: '八卦知识',
        items: [
          {
            type: 'text',
            title: '八卦的起源',
            content: [
              '八卦是中国古代的一种符号系统，起源于《易经》。',
              '八卦由阴爻（--）和阳爻（—）组成，共有八种基本组合。',
              '八卦分别为乾、坤、震、巽、坎、离、艮、兑。'
            ]
          },
          {
            type: 'image',
            title: '八卦图',
            content: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bagua%20diagram%20chinese%20philosophy&image_size=landscape_16_9'
          },
          {
            type: 'list',
            title: '八卦与方位的对应关系',
            content: [
              '乾：西北、天、父',
              '坤：西南、地、母',
              '震：正东、雷、长男',
              '巽：东南、风、长女',
              '坎：正北、水、中男',
              '离：正南、火、中女',
              '艮：东北、山、少男',
              '兑：正西、泽、少女'
            ]
          }
        ]
      },
      {
        id: 'fengshui',
        name: '家居风水',
        items: [
          {
            type: 'text',
            title: '家居风水的基本原理',
            content: [
              '家居风水是研究居住环境与人类运势关系的学问。',
              '好的风水环境可以提升居住者的运势，改善生活质量。',
              '家居风水主要考虑方位、布局、色彩、家具摆放等因素。'
            ]
          },
          {
            type: 'list',
            title: '家居风水禁忌',
            content: [
              '忌大门对着楼梯或电梯',
              '忌卧室对着厨房或卫生间',
              '忌沙发背后无靠',
              '忌镜子对着床',
              '忌尖角冲射'
            ]
          },
          {
            type: 'list',
            title: '家居风水吉祥物',
            content: [
              '风水轮：招财进宝',
              '五帝钱：化煞辟邪',
              '貔貅：招财纳福',
              '麒麟：吉祥如意',
              '文昌塔：提升学业'
            ]
          }
        ]
      }
    ]);
    
    // 选中的分类
    const selectedCategory = ref('compass');
    
    // 当前分类数据
    const currentCategory = computed(() => {
      return categories.value.find(category => category.id === selectedCategory.value) || categories.value[0];
    });
    
    // 常见问题
    const faqs = ref([
      {
        question: '风水真的有科学依据吗？',
        answer: '风水是中国传统文化的一部分，虽然没有现代科学的验证，但它包含了许多关于环境心理学、建筑学和美学的智慧。从科学角度看，良好的居住环境确实会对人的心理和生理产生积极影响。',
        expanded: false
      },
      {
        question: '如何选择适合自己的风水吉祥物？',
        answer: '选择风水吉祥物时，应考虑个人的生肖、五行属性以及具体需求。例如，想要提升财运可以选择貔貅，想要提升学业可以选择文昌塔，想要化煞可以选择五帝钱。',
        expanded: false
      },
      {
        question: '罗盘的使用需要注意什么？',
        answer: '使用罗盘时，应选择平坦的地面，避免靠近金属物品和电器，以免影响磁针的准确性。同时，使用前应校准罗盘，确保测量结果的准确性。',
        expanded: false
      },
      {
        question: '家居风水调整需要专业人士吗？',
        answer: '对于简单的家居风水调整，可以参考相关知识自行进行。但对于复杂的风水问题，建议咨询专业的风水师，以获得更准确的建议。',
        expanded: false
      }
    ]);
    
    // 选择分类
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId;
    };
    
    // 切换问答展开状态
    const toggleQAResponse = (index) => {
      faqs.value[index].expanded = !faqs.value[index].expanded;
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
      categories,
      selectedCategory,
      currentCategory,
      faqs,
      selectCategory,
      toggleQAResponse,
      toggleTheme,
      navigateTo
    };
  }
};
</script>

<style scoped>
.knowledge-view {
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

.knowledge-categories {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
  }
}

.knowledge-content {
  margin-bottom: var(--spacing-xl);
  
  .content-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .content-title {
      font-size: var(--font-size-xl);
      font-weight: bold;
      margin-bottom: var(--spacing-lg);
      color: var(--color-primary);
      text-align: center;
    }
    
    .content-body {
      .knowledge-item {
        margin-bottom: var(--spacing-xl);
        
        .item-title {
          font-size: var(--font-size-lg);
          font-weight: bold;
          margin-bottom: var(--spacing-md);
          color: var(--color-text);
          border-bottom: 2px solid var(--color-primary);
          padding-bottom: var(--spacing-sm);
        }
        
        .item-content {
          p {
            font-size: var(--font-size-base);
            line-height: 1.6;
            color: var(--color-text-light);
            margin-bottom: var(--spacing-md);
          }
          
          .item-list {
            list-style: none;
            
            li {
              margin-bottom: var(--spacing-sm);
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
          
          .item-image {
            margin: var(--spacing-md) 0;
            
            img {
              width: 100%;
              height: auto;
              border-radius: var(--border-radius-md);
              box-shadow: var(--shadow-md);
            }
          }
        }
      }
    }
  }
}

.interactive-section {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .qa-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    h4 {
      font-size: var(--font-size-lg);
      font-weight: bold;
      margin-bottom: var(--spacing-lg);
      color: var(--color-primary);
      text-align: center;
    }
    
    .qa-list {
      .qa-item {
        margin-bottom: var(--spacing-md);
        
        .qa-question {
          background-color: #f8f9fa;
          padding: var(--spacing-md);
          border-radius: var(--border-radius-md);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all var(--transition-fast);
          
          &:hover {
            background-color: #e9ecef;
          }
          
          .qa-icon {
            font-size: var(--font-size-sm);
            color: var(--color-primary);
          }
        }
        
        .qa-answer {
          padding: var(--spacing-md);
          background-color: rgba(200, 16, 46, 0.05);
          border-radius: var(--border-radius-md);
          margin-top: var(--spacing-sm);
          font-size: var(--font-size-base);
          line-height: 1.6;
          color: var(--color-text-light);
        }
      }
    }
  }
}

.progress-section {
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .progress-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    .progress-item {
      display: flex;
      align-items: center;
      margin-bottom: var(--spacing-md);
      
      .progress-label {
        width: 100px;
        font-size: var(--font-size-base);
        color: var(--color-text);
      }
      
      .progress-bar {
        flex: 1;
        height: 10px;
        background-color: #f8f9fa;
        border-radius: var(--border-radius-full);
        margin: 0 var(--spacing-md);
        overflow: hidden;
        
        .progress-fill {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: var(--border-radius-full);
          transition: width var(--transition-slow);
        }
      }
      
      .progress-percent {
        width: 50px;
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
        text-align: right;
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
  
  .knowledge-categories {
    .category-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
  
  .progress-section {
    .progress-card {
      .progress-item {
        flex-direction: column;
        align-items: flex-start;
        
        .progress-label {
          width: 100%;
          margin-bottom: var(--spacing-xs);
        }
        
        .progress-bar {
          width: 100%;
          margin: var(--spacing-xs) 0;
        }
        
        .progress-percent {
          width: 100%;
          text-align: left;
          margin-top: var(--spacing-xs);
        }
      }
    }
  }
}
</style>