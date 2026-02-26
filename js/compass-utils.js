/**
 * 罗盘绘制与交互核心工具
 * 新增：五行标注、更细腻的旋转阻尼、角度实时显示、模式适配（长辈模式减弱动效）
 */
function initCompass(canvasId, isInteractive = true) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const isElderMode = getCurrentTheme() === 'elder';
    const animStatus = getAnimStatus();

    // 解决Canvas模糊问题（适配高清屏）
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 罗盘核心参数
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 15; // 留出边框空间
    let rotation = 0; // 旋转角度
    let lastRotation = 0; // 上一次旋转角度
    const damping = isElderMode ? 0.3 : 0.5; // 长辈模式阻尼更大，旋转更稳

    // 扩展数据：八卦+五行+方位+吉凶属性
    const baguaData = [
        { name: '乾', direction: '西北', element: '金', luck: '大吉', color: '#ffd700', angle: 315 },
        { name: '坎', direction: '正北', element: '水', luck: '吉', color: '#1e90ff', angle: 0 },
        { name: '艮', direction: '东北', element: '土', luck: '平', color: '#228b22', angle: 45 },
        { name: '震', direction: '正东', element: '木', luck: '大吉', color: '#ff4500', angle: 90 },
        { name: '巽', direction: '东南', element: '木', luck: '吉', color: '#9370db', angle: 135 },
        { name: '离', direction: '正南', element: '火', luck: '平', color: '#ff0000', angle: 180 },
        { name: '坤', direction: '西南', element: '土', luck: '平', color: '#8b4513', angle: 225 },
        { name: '兑', direction: '正西', element: '金', luck: '凶', color: '#ffff00', angle: 270 }
    ];

    // 绘制罗盘背景（多层圆环+刻度+十字线，更精致）
    function drawBackground() {
        // 最外层玄黑圆环
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#0a0a0a';
        ctx.fill();
        ctx.strokeStyle = '#c8102e';
        ctx.lineWidth = 6;
        ctx.stroke();

        // 第二层鎏金边框圆环
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 15, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        ctx.stroke();

        // 第三层五行色环（金/木/水/火/土）
        const elementRadius = radius - 30;
        const elementColors = ['#ffd700', '#ff4500', '#1e90ff', '#ff0000', '#8b4513'];
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, elementRadius - i * 8, 0, 2 * Math.PI);
            ctx.strokeStyle = elementColors[i];
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // 绘制十字线（带箭头）
        ctx.save();
        ctx.translate(centerX, centerY);
        // 竖线（南北）
        ctx.beginPath();
        ctx.moveTo(0, -radius + 20);
        ctx.lineTo(0, radius - 20);
        // 箭头（北）
        ctx.lineTo(-8, -radius + 30);
        ctx.moveTo(0, -radius + 20);
        ctx.lineTo(8, -radius + 30);
        // 箭头（南）
        ctx.lineTo(-8, radius - 30);
        ctx.moveTo(0, radius - 20);
        ctx.lineTo(8, radius - 30);
        // 横线（东西）
        ctx.beginPath();
        ctx.moveTo(-radius + 20, 0);
        ctx.lineTo(radius - 20, 0);
        // 箭头（东）
        ctx.lineTo(radius - 30, -8);
        ctx.moveTo(radius - 20, 0);
        ctx.lineTo(radius - 30, 8);
        // 箭头（西）
        ctx.lineTo(-radius + 30, -8);
        ctx.moveTo(-radius + 20, 0);
        ctx.lineTo(-radius + 30, 8);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        // 绘制刻度（每5度一个小刻度，45度一个大刻度+数字）
        ctx.save();
        ctx.translate(centerX, centerY);
        for (let i = 0; i < 360; i += 5) {
            const angle = i * Math.PI / 180;
            const startR = radius - 20;
            const endR = i % 45 === 0 ? radius - 40 : radius - 30;

            ctx.beginPath();
            ctx.moveTo(startR * Math.sin(angle), -startR * Math.cos(angle));
            ctx.lineTo(endR * Math.sin(angle), -endR * Math.cos(angle));
            ctx.strokeStyle = i % 45 === 0 ? '#ffd700' : '#fff';
            ctx.lineWidth = i % 45 === 0 ? 4 : 1;
            ctx.stroke();

            // 45度刻度标注数字
            if (i % 45 === 0) {
                ctx.font = isElderMode ? 'bold 24px SimHei' : 'bold 14px SimHei';
                ctx.fillStyle = '#ffd700';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(i.toString(), (endR - 15) * Math.sin(angle), -(endR - 15) * Math.cos(angle));
            }
        }
        ctx.restore();
    }

    // 绘制八卦与五行信息（更丰富的标注）
    function drawBaguaAndElement() {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation * Math.PI / 180); // 应用旋转

        baguaData.forEach(item => {
            const angle = item.angle * Math.PI / 180;
            const textRadius = radius - 50;

            // 绘制八卦名称
            ctx.font = isElderMode ? 'bold 30px SimHei' : 'bold 20px SimHei';
            ctx.fillStyle = item.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.name, textRadius * Math.sin(angle), -textRadius * Math.cos(angle));

            // 绘制方位+五行+吉凶
            ctx.font = isElderMode ? '18px SimHei' : '12px SimHei';
            ctx.fillStyle = '#fff';
            const subText = `${item.direction}·${item.element}·${item.luck}`;
            ctx.fillText(subText, (textRadius - 25) * Math.sin(angle), -(textRadius - 25) * Math.cos(angle));
        });
        ctx.restore();
    }

    // 绘制中心太极图（更精致的CSS/Canvas绘制）
    function drawTaiji() {
        ctx.save();
        ctx.translate(centerX, centerY);
        const taijiSize = isElderMode ? 80 : 60;

        // 太极外圈
        ctx.beginPath();
        ctx.arc(0, 0, taijiSize, 0, 2 * Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 太极阴阳分割
        ctx.beginPath();
        // 白色半圆（阴）
        ctx.arc(0, -taijiSize/2, taijiSize/2, Math.PI/2, 3*Math.PI/2, false);
        ctx.arc(0, taijiSize/2, taijiSize/2, 3*Math.PI/2, Math.PI/2, false);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // 阴阳鱼眼
        // 阴鱼眼（黑）
        ctx.beginPath();
        ctx.arc(0, -taijiSize/2, taijiSize/6, 0, 2*Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();

        // 阳鱼眼（白）
        ctx.beginPath();
        ctx.arc(0, taijiSize/2, taijiSize/6, 0, 2*Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.restore();
    }

    // 绘制罗盘角度提示（实时显示当前旋转角度）
    function drawAngleTip() {
        ctx.save();
        ctx.translate(centerX, centerY);
        const tipRadius = radius - 80;
        ctx.font = isElderMode ? '20px SimHei' : '14px SimHei';
        ctx.fillStyle = '#c8102e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`当前角度：${Math.round(rotation % 360)}°`, 0, tipRadius);
        ctx.restore();
    }

    // 整体绘制函数
    function drawCompass() {
        // 清空画布
        ctx.clearRect(0, 0, rect.width, rect.height);
        // 分层绘制
        drawBackground();
        drawBaguaAndElement();
        drawTaiji();
        drawAngleTip();
    }

    // 初始化绘制
    drawCompass();

    // 交互逻辑（可交互模式下开启）
    if (isInteractive) {
        let isDragging = false;
        let startX, startY, startRotation;

        // 鼠标/触摸事件绑定
        canvas.addEventListener('mousedown', startDrag);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startRotation = rotation;
            isDragging = true;
        });

        canvas.addEventListener('mousemove', drag);
        canvas.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            // 计算旋转角度（结合阻尼，更真实）
            rotation = startRotation + (deltaX - deltaY) * damping;
            drawCompass();
            // 实时更新风水结果
            updateFengshuiResult();
        });

        canvas.addEventListener('mouseup', endDrag);
        canvas.addEventListener('mouseleave', endDrag);
        canvas.addEventListener('touchend', endDrag);

        function startDrag(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startRotation = rotation;
        }

        function drag(e) {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            rotation = startRotation + (deltaX - deltaY) * damping;
            drawCompass();
            updateFengshuiResult();
        }

        function endDrag() {
            isDragging = false;
            lastRotation = rotation;
        }
    } else {
        // 非交互模式：自动缓慢旋转（长辈模式旋转速度减半）
        const rotateSpeed = isElderMode && animStatus === 'off' ? 0.2 : 0.5;
        setInterval(() => {
            rotation += rotateSpeed;
            drawCompass();
        }, 50);
    }

    // 暴露罗盘角度供外部使用
    window.getCompassRotation = () => Math.round(rotation % 360);
}

/**
 * 风水结果更新函数（大幅丰富解读内容）
 */
function updateFengshuiResult() {
    const resultEl = document.getElementById('fengshui-result');
    if (!resultEl) return;

    const rotation = window.getCompassRotation();
    let direction = '';
    let bagua = '';
    let element = '';
    let luck = '';
    let luckDesc = '';
    let adjustTip = '';
    let color = '';

    // 按角度区间匹配风水信息
    if (rotation >= 337.5 || rotation < 22.5) {
        direction = '正北';
        bagua = '坎位';
        element = '水';
        luck = '吉';
        color = '#1e90ff';
        luckDesc = '水主财，此方位为财运位，象征智慧与机遇';
        adjustTip = '💡 调整建议：可摆放水生植物（如富贵竹），保持方位整洁通风，忌摆放干燥易燃物品';
    } else if (rotation >= 22.5 && rotation < 67.5) {
        direction = '东北';
        bagua = '艮位';
        element = '土';
        luck = '平';
        color = '#228b22';
        luckDesc = '土主稳，此方位为健康位，象征稳定与守护';
        adjustTip = '💡 调整建议：保持方位无杂物堆积，可摆放陶瓷摆件增强土气，忌摆放过多金属物品';
    } else if (rotation >= 67.5 && rotation < 112.5) {
        direction = '正东';
        bagua = '震位';
        element = '木';
        luck = '大吉';
        color = '#ff4500';
        luckDesc = '木主旺，此方位为事业位，象征发展与突破';
        adjustTip = '💡 调整建议：开窗通风增加阳气，摆放绿植（如发财树），忌摆放沉重的石头类物品';
    } else if (rotation >= 112.5 && rotation < 157.5) {
        direction = '东南';
        bagua = '巽位';
        element = '木';
        luck = '吉';
        color = '#9370db';
        luckDesc = '木主运，此方位为人缘位，象征社交与机遇';
        adjustTip = '💡 调整建议：摆放鲜花或绿植，保持光线充足，忌摆放尖锐物品（如剪刀、刀具）';
    } else if (rotation >= 157.5 && rotation < 202.5) {
        direction = '正南';
        bagua = '离位';
        element = '火';
        luck = '平';
        color = '#ff0000';
        luckDesc = '火主礼，此方位为名声位，象征荣誉与社交';
        adjustTip = '💡 调整建议：忌摆放过多红色物品，可摆放陶瓷摆件平衡火气，保持方位清爽';
    } else if (rotation >= 202.5 && rotation < 247.5) {
        direction = '西南';
        bagua = '坤位';
        element = '土';
        luck = '平';
        color = '#8b4513';
        luckDesc = '土主顺，此方位为家庭位，象征和谐与包容';
        adjustTip = '💡 调整建议：摆放温馨的家居摆件，忌摆放大型金属家具，保持方位温暖整洁';
    } else if (rotation >= 247.5 && rotation < 292.5) {
        direction = '正西';
        bagua = '兑位';
        element = '金';
        luck = '凶';
        color = '#ffff00';
        luckDesc = '金主煞，此方位为口舌位，象征是非与争执';
        adjustTip = '💡 调整建议：减少金属物品摆放，可摆放陶瓷或布艺物品化解煞气，忌大声喧哗';
    } else {
        direction = '西北';
        bagua = '乾位';
        element = '金';
        luck = '大吉';
        color = '#ffd700';
        luckDesc = '金主义，此方位为贵人位，象征贵人与机遇';
        adjustTip = '💡 调整建议：保持方位开阔无遮挡，可摆放金色摆件增强金气，忌摆放过多杂物';
    }

    // 更新结果显示（适配模式字体）
    const isElderMode = getCurrentTheme() === 'elder';
    const fontSize = isElderMode ? 'var(--elder-font-base)' : 'var(--font-size-base)';
    resultEl.innerHTML = `
        <div style="font-size: ${fontSize}; color: ${color}; font-weight: bold; margin-bottom: 15px;">
            当前方位：${direction}（${bagua}）· 五行：${element} · 吉凶：${luck}
        </div>
        <div style="font-size: ${fontSize}; line-height: 1.8; margin-bottom: 15px;">
            风水解读：${luckDesc}
        </div>
        <div style="font-size: ${fontSize}; line-height: 1.8; background: rgba(255, 215, 0, 0.1); padding: 10px; border-radius: 8px;">
            ${adjustTip}
        </div>
    `;
}

// 复用之前的主题判断函数（避免依赖缺失）
function getCurrentTheme() {
    return localStorage.getItem('compassTheme') || 'youth';
}
function getAnimStatus() {
    return localStorage.getItem('compassAnim') || 'on';
}
