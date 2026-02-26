/**
 * 主题模式切换工具（年轻/长辈模式）
 * 新增：保存更多偏好、字体大小细调、模拟语音播报开关
 */
function initThemeSwitch() {
    const switchBtn = document.getElementById('themeSwitch');
    const body = document.body;
    const userTheme = localStorage.getItem('compassTheme') || 'youth'; // 默认年轻模式

    // 初始化模式状态
    if (userTheme === 'elder') {
        body.classList.add('elder-mode');
        switchBtn.textContent = '年轻';
        // 模拟长辈模式额外配置：关闭动画、放大点击区域（纯前端标记）
        localStorage.setItem('compassAnim', 'off');
    } else {
        body.classList.remove('elder-mode');
        switchBtn.textContent = '长辈';
        localStorage.setItem('compassAnim', 'on');
    }

    // 模式切换核心逻辑
    switchBtn.addEventListener('click', function() {
        if (body.classList.contains('elder-mode')) {
            // 切换为年轻模式
            body.classList.remove('elder-mode');
            this.textContent = '长辈';
            localStorage.setItem('compassTheme', 'youth');
            localStorage.setItem('compassAnim', 'on');
            alert('已切换为年轻模式：动效开启，字体恢复默认，交互更丰富');
        } else {
            // 切换为长辈模式
            body.classList.add('elder-mode');
            this.textContent = '年轻';
            localStorage.setItem('compassTheme', 'elder');
            localStorage.setItem('compassAnim', 'off');
            alert('已切换为长辈模式：字体放大，按钮加宽，动效减弱，更易操作');
        }
        // 刷新页面确保所有样式生效（可选，提升体验）
        window.location.reload();
    });

    // 扩展功能：模拟语音播报开关（纯前端演示）
    window.toggleVoice = function() {
        const voiceStatus = localStorage.getItem('compassVoice') || 'off';
        if (voiceStatus === 'off') {
            localStorage.setItem('compassVoice', 'on');
            alert('语音播报已开启：后续运势、风水结果将自动朗读');
        } else {
            localStorage.setItem('compassVoice', 'off');
            alert('语音播报已关闭');
        }
    };

    // 扩展功能：字体大小微调（仅演示，可绑定到个人中心按钮）
    window.adjustFontSize = function(type) {
        const currentSize = localStorage.getItem('customFontSize') || 16;
        let newSize = parseInt(currentSize);
        if (type === 'plus') {
            newSize = Math.min(newSize + 2, 40); // 最大40px
        } else {
            newSize = Math.max(newSize - 2, 12); // 最小12px
        }
        localStorage.setItem('customFontSize', newSize);
        alert(`字体已调整为 ${newSize}px，刷新页面生效`);
    };
}

// 辅助函数：获取当前模式状态
function getCurrentTheme() {
    return localStorage.getItem('compassTheme') || 'youth';
}

// 辅助函数：获取动画状态
function getAnimStatus() {
    return localStorage.getItem('compassAnim') || 'on';
}
