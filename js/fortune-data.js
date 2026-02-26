/**
 * 运势数据核心库（生肖/星座/今日运势，内容大幅扩展）
 * 新增：星座运势、每日宜忌详解、运势评分细则
 */

// 12生肖运势完整数据
const zodiacFortuneData = [
    {
        name: '鼠',
        fortune: {
            wealth: '★★★★☆',
            health: '★★★☆☆',
            love: '★★☆☆☆',
            career: '★★★★☆',
            overall: '★★★★☆'
        },
        lucky: {
            color: '黑色、蓝色',
            number: '1、6',
            direction: '正北'
        },
        taboo: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '西南'
        },
        suggest: '今日宜佩戴黑色饰品提升财运，工作中保持专注，避免情绪化决策；健康方面注意补水，忌熬夜',
        detail: '属鼠之人今日财运顺遂，正财稳定，偏财有小幅惊喜；事业上易得到同事协助，可推进长期项目；感情上易有小摩擦，需多沟通；健康上注意肠胃不适，少食生冷'
    },
    {
        name: '牛',
        fortune: {
            wealth: '★★★☆☆',
            health: '★★★★☆',
            love: '★★★☆☆',
            career: '★★☆☆☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '西南'
        },
        taboo: {
            color: '绿色、青色',
            number: '3、8',
            direction: '正东'
        },
        suggest: '今日宜与家人团聚，调整工作节奏，避免过度劳累；健康方面注意颈椎保养，可适当拉伸',
        detail: '属牛之人今日财运平稳，忌盲目投资；事业上易遇瓶颈，需耐心等待时机；感情上稳定和谐，适合增进彼此了解；健康上状态良好，忌久坐不动'
    },
    {
        name: '虎',
        fortune: {
            wealth: '★★★★☆',
            health: '★★☆☆☆',
            love: '★★★★☆',
            career: '★★★★☆',
            overall: '★★★★☆'
        },
        lucky: {
            color: '绿色、青色',
            number: '3、8',
            direction: '正东'
        },
        taboo: {
            color: '白色、金色',
            number: '7、4',
            direction: '正西'
        },
        suggest: '今日宜主动沟通化解人际矛盾，把握事业上的合作机会；健康方面注意休息，忌过度运动',
        detail: '属虎之人今日财运上扬，适合小额投资；事业上贵人运佳，易获得重要资源；感情上桃花旺盛，单身者易遇良缘；健康上注意心脏和血压，忌情绪激动'
    },
    {
        name: '兔',
        fortune: {
            wealth: '★★☆☆☆',
            health: '★★★★☆',
            love: '★★★★☆',
            career: '★★★☆☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '绿色、青色',
            number: '3、8',
            direction: '东南'
        },
        taboo: {
            color: '红色、紫色',
            number: '9、2',
            direction: '正南'
        },
        suggest: '今日宜避免熬夜，保证充足休息，工作中忌急躁冒进；健康方面注意眼睛保养，少看电子屏幕',
        detail: '属兔之人今日财运平淡，忌冲动消费；事业上稳步推进，易得到领导认可；感情上甜蜜和谐，已婚者易增进感情；健康上状态极佳，忌暴饮暴食'
    },
    {
        name: '龙',
        fortune: {
            wealth: '★★★★★',
            health: '★★★☆☆',
            love: '★★★☆☆',
            career: '★★★★★',
            overall: '★★★★★'
        },
        lucky: {
            color: '红色、紫色',
            number: '9、2',
            direction: '正南'
        },
        taboo: {
            color: '黑色、蓝色',
            number: '1、6',
            direction: '正北'
        },
        suggest: '今日宜把握投资理财机会，大胆推进事业规划；健康方面注意降火，少食辛辣食物',
        detail: '属龙之人今日财运大旺，正偏财皆顺；事业上如鱼得水，易获得晋升机会；感情上稳定，忌过度关注工作忽略伴侣；健康上注意上火，多喝清热茶饮'
    },
    {
        name: '蛇',
        fortune: {
            wealth: '★★☆☆☆',
            health: '★★★☆☆',
            love: '★★★★☆',
            career: '★★☆☆☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '红色、紫色',
            number: '9、2',
            direction: '东南'
        },
        taboo: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '东北'
        },
        suggest: '今日宜外出散步放松心情，避免钻牛角尖；健康方面注意关节保养，忌受凉',
        detail: '属蛇之人今日财运一般，忌参与高风险投资；事业上易遇小挫折，需灵活应对；感情上桃花朵朵，易有浪漫邂逅；健康上注意保暖，忌吹冷风'
    },
    {
        name: '马',
        fortune: {
            wealth: '★★★☆☆',
            health: '★★☆☆☆',
            love: '★★★☆☆',
            career: '★★★★☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '红色、紫色',
            number: '9、2',
            direction: '正南'
        },
        taboo: {
            color: '绿色、青色',
            number: '3、8',
            direction: '东北'
        },
        suggest: '今日宜谨慎行事，避免冲动决策，工作中注重细节；健康方面注意疲劳，适当补充营养',
        detail: '属马之人今日财运平稳，适合稳健理财；事业上行动力强，易完成重要任务；感情上易有小误会，需及时沟通；健康上易疲劳，忌过度奔波'
    },
    {
        name: '羊',
        fortune: {
            wealth: '★★★★☆',
            health: '★★★★☆',
            love: '★★★★☆',
            career: '★★☆☆☆',
            overall: '★★★★☆'
        },
        lucky: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '西南'
        },
        taboo: {
            color: '白色、金色',
            number: '7、4',
            direction: '西北'
        },
        suggest: '今日宜与家人团聚增进感情，放慢工作节奏；健康方面注意饮食清淡，忌油腻',
        detail: '属羊之人今日财运不错，易有意外收获；事业上压力较小，可适当放松；感情上温馨甜蜜，适合表达心意；健康上状态良好，忌熬夜追剧'
    },
    {
        name: '猴',
        fortune: {
            wealth: '★★★★☆',
            health: '★★★☆☆',
            love: '★★☆☆☆',
            career: '★★★★☆',
            overall: '★★★★☆'
        },
        lucky: {
            color: '白色、金色',
            number: '7、4',
            direction: '正西'
        },
        taboo: {
            color: '红色、紫色',
            number: '9、2',
            direction: '正南'
        },
        suggest: '今日宜专注工作提升效率，避免分心；健康方面注意口腔护理，忌甜食过多',
        detail: '属猴之人今日财运顺遂，易有奖金或提成；事业上思维敏捷，易解决难题；感情上易有小矛盾，需多包容；健康上注意口腔溃疡，多喝水'
    },
    {
        name: '鸡',
        fortune: {
            wealth: '★★☆☆☆',
            health: '★★★★☆',
            love: '★★★☆☆',
            career: '★★★☆☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '白色、金色',
            number: '7、4',
            direction: '正西'
        },
        taboo: {
            color: '黑色、蓝色',
            number: '1、6',
            direction: '正北'
        },
        suggest: '今日宜多喝水补充水分，工作中忌斤斤计较；健康方面注意呼吸道保养，忌吸烟',
        detail: '属鸡之人今日财运平淡，忌盲目消费；事业上按部就班，易获得同事认可；感情上稳定，适合规划未来；健康上状态良好，忌出入人多拥挤场所'
    },
    {
        name: '狗',
        fortune: {
            wealth: '★★★☆☆',
            health: '★★★☆☆',
            love: '★★★★☆',
            career: '★★☆☆☆',
            overall: '★★★☆☆'
        },
        lucky: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '西北'
        },
        taboo: {
            color: '绿色、青色',
            number: '3、8',
            direction: '正东'
        },
        suggest: '今日宜坦诚表达避免误会，工作中忌固执己见；健康方面注意睡眠质量，忌睡前玩手机',
        detail: '属狗之人今日财运平稳，适合储蓄；事业上易遇沟通障碍，需耐心解释；感情上甜蜜，易增进彼此信任；健康上易失眠，可睡前泡脚'
    },
    {
        name: '猪',
        fortune: {
            wealth: '★★★★☆',
            health: '★★★★☆',
            love: '★★☆☆☆',
            career: '★★★☆☆',
            overall: '★★★★☆'
        },
        lucky: {
            color: '黑色、蓝色',
            number: '1、6',
            direction: '正北'
        },
        taboo: {
            color: '黄色、棕色',
            number: '5、0',
            direction: '西南'
        },
        suggest: '今日宜清淡饮食保持健康，工作中注重团队合作；健康方面注意体重管理，忌暴饮暴食',
        detail: '属猪之人今日财运不错，易有长辈相助；事业上氛围轻松，易完成团队任务；感情上易有小失落，需调整心态；健康上状态极佳，适合轻度运动'
    }
];

// 12星座运势简化数据（新增）
const constellationFortuneData = [
    { name: '白羊座', overall: '★★★★☆', suggest: '今日行动力强，适合开启新计划，忌冲动行事' },
    { name: '金牛座', overall: '★★★☆☆', suggest: '今日财运平稳，适合理财规划，忌贪小便宜' },
    { name: '双子座', overall: '★★★★☆', suggest: '今日沟通运佳，适合洽谈合作，忌言多必失' },
    { name: '巨蟹座', overall: '★★★☆☆', suggest: '今日家庭运旺，适合陪伴家人，忌过度敏感' },
    { name: '狮子座', overall: '★★★★★', suggest: '今日贵人运佳，适合展现自我，忌骄傲自满' },
    { name: '处女座', overall: '★★★☆☆', suggest: '今日细节运佳，适合处理琐事，忌吹毛求疵' },
    { name: '天秤座', overall: '★★★★☆', suggest: '今日人缘运旺，适合社交活动，忌犹豫不决' },
    { name: '天蝎座', overall: '★★★☆☆', suggest: '今日洞察力强，适合深度思考，忌猜忌他人' },
    { name: '射手座', overall: '★★★★☆', suggest: '今日自由运旺，适合外出游玩，忌粗心大意' },
    { name: '摩羯座', overall: '★★★☆☆', suggest: '今日事业运稳，适合埋头苦干，忌过度劳累' },
    { name: '水瓶座', overall: '★★★★☆', suggest: '今日创意运佳，适合创新尝试，忌特立独行' },
    { name: '双鱼座', overall: '★★★☆☆', suggest: '今日灵感运旺，适合艺术创作，忌多愁善感' }
];

// 今日通用运势数据（大幅丰富）
const todayFortuneData = {
    date: '癸卯年 甲寅月 乙未日',
    zodiac: '羊',
    luckyDirection: '正东（震位）',
    unluckyDirection: '正西（兑位）',
    luckyColor: '朱砂红、青黛绿',
    tabooColor: '白色、金色',
    luckyNumber: '3、8、9',
    tabooNumber: '4、7、0',
    suitable: ['纳财', '安床', '出行', '会友', '祈福', '开市'],
    avoid: ['动土', '装修', '嫁娶', '搬迁', '安葬', '打官司'],
    zodiacConflict: '冲牛(己丑)煞西',
    fiveElements: '木旺缺金，宜补金气',
    overallLuck: '★★★★☆',
    desc: '今日整体运势上扬，木气旺盛，利于事业发展和人际社交；金气不足，需注意口舌是非，避免争执；财运方面正财稳定，偏财有小幅惊喜'
};

// 获取生肖运势
function getZodiacFortune(zodiacName) {
    return zodiacFortuneData.find(item => item.name === zodiacName) || zodiacFortuneData[0];
}

// 获取星座运势
function getConstellationFortune(constellationName) {
    return constellationFortuneData.find(item => item.name === constellationName) || constellationFortuneData[0];
}

// 获取今日通用运势
function getTodayFortune() {
    return todayFortuneData;
}

// 保存运势记录到本地存储（新增功能）
function saveFortuneRecord(type, name, data) {
    const records = JSON.parse(localStorage.getItem('fortuneRecords') || '[]');
    records.push({
        id: Date.now(),
        type: type, // zodiac/constellation/today
        name: name,
        data: data,
        time: new Date().toLocaleString()
    });
    // 只保留最近10条记录
    const latestRecords = records.slice(-10);
    localStorage.setItem('fortuneRecords', JSON.stringify(latestRecords));
    return latestRecords;
}

// 获取运势记录
function getFortuneRecords() {
    return JSON.parse(localStorage.getItem('fortuneRecords') || '[]');
}

// 删除指定运势记录
function deleteFortuneRecord(id) {
    let records = JSON.parse(localStorage.getItem('fortuneRecords') || '[]');
    records = records.filter(item => item.id !== id);
    localStorage.setItem('fortuneRecords', JSON.stringify(records));
    return records;
}
