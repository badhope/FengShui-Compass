import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: '', // 后续可配置为实际API地址
  timeout: 10000
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可添加认证信息等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 模拟API请求
export const mockApi = {
  // 获取风水数据
  getFengShuiData: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            directions: [
              { name: '正东', element: '木', luck: '大吉', description: '事业位，象征发展与突破' },
              { name: '正南', element: '火', luck: '平', description: '名声位，象征荣誉与社交' },
              { name: '正西', element: '金', luck: '凶', description: '口舌位，象征是非与争执' },
              { name: '正北', element: '水', luck: '吉', description: '财运位，象征智慧与机遇' },
              { name: '东南', element: '木', luck: '吉', description: '人缘位，象征社交与机遇' },
              { name: '西南', element: '土', luck: '平', description: '家庭位，象征和谐与包容' },
              { name: '东北', element: '土', luck: '平', description: '健康位，象征稳定与守护' },
              { name: '西北', element: '金', luck: '大吉', description: '贵人位，象征贵人与机遇' }
            ]
          }
        });
      }, 500);
    });
  },
  
  // 获取每日运势
  getDailyFortune: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            date: '癸卯年 甲寅月 乙未日',
            luckyDirection: '正东（震位）',
            unluckyDirection: '正西（兑位）',
            luckyColor: '朱砂红、青黛绿',
            luckyNumber: '3、8、9',
            suitable: ['纳财', '安床', '出行', '会友', '祈福', '开市'],
            avoid: ['动土', '装修', '嫁娶', '搬迁', '安葬', '打官司'],
            zodiacConflict: '冲牛(己丑)煞西',
            fiveElements: '木旺缺金，宜补金气'
          }
        });
      }, 500);
    });
  }
};

export default api;