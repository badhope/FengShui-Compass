<template>
  <div class="fengshui-calculator">
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
          <h1>家居风水测算</h1>
          <p>客厅/卧室/厨房/卫生间分区测算，给出可视化改造建议，提升居家运势</p>
        </div>

        <!-- 房间选择 -->
        <div class="room-selection fade-in">
          <h3 class="section-title">选择房间</h3>
          <div class="room-buttons">
            <button 
              v-for="room in rooms" 
              :key="room.id"
              class="btn" 
              :class="{ 'btn-primary': selectedRoom === room.id, 'btn-outline': selectedRoom !== room.id }"
              @click="selectRoom(room.id)"
            >
              {{ room.name }}
            </button>
          </div>
        </div>

        <!-- 风水测算结果 -->
        <div class="calculator-result fade-in">
          <div class="result-card">
            <h3 class="result-title">{{ currentRoom.name }}风水解读</h3>
            <div class="result-content">
              <div class="room-info">
                <img :src="currentRoom.image" :alt="currentRoom.name" class="room-image">
                <div class="room-details">
                  <div class="detail-item">
                    <span class="detail-label">最佳方位：</span>
                    <span class="detail-value">{{ currentRoom.bestDirection }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">五行属性：</span>
                    <span class="detail-value">{{ currentRoom.element }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">运势评分：</span>
                    <span class="detail-value">{{ currentRoom.score }}/100</span>
                  </div>
                </div>
              </div>
              <div class="description">
                <h4>风水解读：</h4>
                <p>{{ currentRoom.description }}</p>
              </div>
              <div class="adjustment">
                <h4>改造建议：</h4>
                <ul class="adjustment-list">
                  <li v-for="(tip, index) in currentRoom.adjustmentTips" :key="index">
                    {{ tip }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 家具摆放建议 -->
        <div class="furniture-suggestions fade-in">
          <h3 class="section-title">家具摆放建议</h3>
          <div class="furniture-grid">
            <div 
              v-for="furniture in currentRoom.furnitureSuggestions" 
              :key="furniture.id"
              class="furniture-item"
            >
              <div class="furniture-icon">{{ furniture.icon }}</div>
              <h4 class="furniture-name">{{ furniture.name }}</h4>
              <p class="furniture-desc">{{ furniture.description }}</p>
            </div>
          </div>
        </div>

        <!-- 风水知识 -->
        <div class="fengshui-knowledge fade-in">
          <h3 class="section-title">风水小知识</h3>
          <div class="knowledge-card">
            <p>{{ currentRoom.knowledge }}</p>
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
  name: 'FengShuiCalculatorView',
  setup() {
    const router = useRouter();
    const store = useAppStore();
    
    // 计算属性：是否为长辈模式
    const isElderMode = computed(() => store.isElderMode);
    
    // 房间数据
    const rooms = ref([
      {
        id: 'living-room',
        name: '客厅',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20living%20room%20feng%20shui%20layout&image_size=landscape_16_9',
        bestDirection: '正东',
        element: '木',
        score: 85,
        description: '客厅是家庭的核心区域，象征着家庭的财运和人际关系。正东方向为事业位，有利于家庭成员的事业发展和人际关系。',
        adjustmentTips: [
          '客厅中央忌摆放重物，保持开阔通透',
          '沙发宜背靠实墙，象征有靠山',
          '客厅宜摆放绿植，增加生机和财运',
          '电视宜放在东南方向，有利于家庭和谐',
          '客厅灯光宜明亮，忌阴暗潮湿'
        ],
        furnitureSuggestions: [
          { id: 1, name: '沙发', icon: '🛋️', description: '宜选择舒适的沙发，摆放位置应背靠实墙，象征有靠山' },
          { id: 2, name: '茶几', icon: '☕', description: '宜选择圆形或方形茶几，避免尖锐形状' },
          { id: 3, name: '绿植', icon: '🌿', description: '宜摆放发财树、富贵竹等招财植物' },
          { id: 4, name: '挂画', icon: '🖼️', description: '宜选择山水、牡丹等吉祥图案' }
        ],
        knowledge: '客厅风水的好坏直接影响家庭的整体运势。保持客厅整洁、明亮，避免杂乱无章，有利于正能量的聚集。'
      },
      {
        id: 'bedroom',
        name: '卧室',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20bedroom%20feng%20shui%20layout&image_size=landscape_16_9',
        bestDirection: '正南',
        element: '火',
        score: 90,
        description: '卧室是休息和恢复精力的地方，象征着家庭的健康和感情。正南方向为名声位，有利于家庭成员的健康和感情和谐。',
        adjustmentTips: [
          '床宜南北朝向，符合地球磁场',
          '床头宜背靠实墙，忌对着门或窗户',
          '卧室忌摆放镜子对着床',
          '卧室宜保持安静，忌噪音干扰',
          '卧室灯光宜柔和，忌过于明亮'
        ],
        furnitureSuggestions: [
          { id: 1, name: '床', icon: '🛏️', description: '宜选择舒适的床，摆放位置应南北朝向' },
          { id: 2, name: '衣柜', icon: '📦', description: '宜选择高大的衣柜，象征储存财富' },
          { id: 3, name: '床头柜', icon: '🚪', description: '宜选择一对床头柜，象征平衡' },
          { id: 4, name: '窗帘', icon: '🧵', description: '宜选择遮光性好的窗帘，保证睡眠质量' }
        ],
        knowledge: '卧室风水的好坏直接影响睡眠质量和身体健康。保持卧室整洁、安静，避免杂乱无章，有利于良好的睡眠和健康。'
      },
      {
        id: 'kitchen',
        name: '厨房',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20kitchen%20feng%20shui%20layout&image_size=landscape_16_9',
        bestDirection: '东南',
        element: '火',
        score: 80,
        description: '厨房是家庭的饮食中心，象征着家庭的健康和财运。东南方向为财运位，有利于家庭的财运和健康。',
        adjustmentTips: [
          '厨房忌对着大门或卧室',
          '炉灶宜放在东南方向，有利于财运',
          '厨房宜保持清洁，忌杂乱无章',
          '厨房忌摆放刀具等尖锐物品',
          '厨房宜通风良好，避免油烟堆积'
        ],
        furnitureSuggestions: [
          { id: 1, name: '炉灶', icon: '🍳', description: '宜选择质量好的炉灶，摆放位置应远离水源' },
          { id: 2, name: '水槽', icon: '🚿', description: '宜选择不锈钢水槽，保持清洁' },
          { id: 3, name: '橱柜', icon: '🗄️', description: '宜选择木质橱柜，象征生机' },
          { id: 4, name: '排气扇', icon: '💨', description: '宜选择强力排气扇，保持空气流通' }
        ],
        knowledge: '厨房风水的好坏直接影响家庭的健康和财运。保持厨房清洁、通风，避免杂乱无章，有利于家庭的健康和财运。'
      },
      {
        id: 'bathroom',
        name: '卫生间',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=clean%20bathroom%20feng%20shui%20layout&image_size=landscape_16_9',
        bestDirection: '西北',
        element: '水',
        score: 75,
        description: '卫生间是排泄和清洁的地方，象征着家庭的清洁和健康。西北方向为贵人位，有利于化解卫生间的负面能量。',
        adjustmentTips: [
          '卫生间忌对着大门或卧室',
          '卫生间宜保持清洁，忌杂乱无章',
          '卫生间宜通风良好，避免潮湿',
          '卫生间忌摆放杂物，保持整洁',
          '卫生间宜使用浅色瓷砖，象征清洁'
        ],
        furnitureSuggestions: [
          { id: 1, name: '马桶', icon: '🚽', description: '宜选择质量好的马桶，摆放位置应远离门' },
          { id: 2, name: '洗手盆', icon: '🚰', description: '宜选择陶瓷洗手盆，保持清洁' },
          { id: 3, name: '淋浴间', icon: '🚿', description: '宜选择玻璃淋浴间，保持干燥' },
          { id: 4, name: '收纳柜', icon: '📦', description: '宜选择防水收纳柜，存放洗漱用品' }
        ],
        knowledge: '卫生间风水的好坏直接影响家庭的健康和运势。保持卫生间清洁、通风，避免杂乱无章，有利于家庭的健康和运势。'
      }
    ]);
    
    // 选中的房间
    const selectedRoom = ref('living-room');
    
    // 当前房间数据
    const currentRoom = computed(() => {
      return rooms.value.find(room => room.id === selectedRoom.value) || rooms.value[0];
    });
    
    // 选择房间
    const selectRoom = (roomId) => {
      selectedRoom.value = roomId;
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
      rooms,
      selectedRoom,
      currentRoom,
      selectRoom,
      toggleTheme,
      navigateTo
    };
  }
};
</script>

<style scoped>
.fengshui-calculator {
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

.room-selection {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .room-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
  }
}

.calculator-result {
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
      .room-info {
        display: flex;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
        
        .room-image {
          width: 200px;
          height: 150px;
          object-fit: cover;
          border-radius: var(--border-radius-md);
        }
        
        .room-details {
          flex: 1;
          
          .detail-item {
            margin-bottom: var(--spacing-md);
            font-size: var(--font-size-base);
            
            .detail-label {
              font-weight: bold;
              color: var(--color-text);
            }
            
            .detail-value {
              color: var(--color-primary);
              font-weight: bold;
            }
          }
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
        
        .adjustment-list {
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
      }
    }
  }
}

.furniture-suggestions {
  margin-bottom: var(--spacing-xl);
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .furniture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    
    .furniture-item {
      background-color: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-lg);
      text-align: center;
      
      .furniture-icon {
        font-size: var(--font-size-xxl);
        margin-bottom: var(--spacing-md);
      }
      
      .furniture-name {
        font-size: var(--font-size-lg);
        font-weight: bold;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text);
      }
      
      .furniture-desc {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
        line-height: 1.5;
      }
    }
  }
}

.fengshui-knowledge {
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    text-align: center;
  }
  
  .knowledge-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    
    p {
      font-size: var(--font-size-base);
      line-height: 1.6;
      color: var(--color-text);
      text-align: center;
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
  
  .room-selection {
    .room-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
  
  .calculator-result {
    .result-card {
      .result-content {
        .room-info {
          flex-direction: column;
          
          .room-image {
            width: 100%;
            height: 200px;
          }
        }
      }
    }
  }
  
  .furniture-suggestions {
    .furniture-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>