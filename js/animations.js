/**
 * 易卦占卜 - 动画控制模块
 * 处理卦象旋转、翻转等视觉效果
 */

class AnimationController {
    constructor() {
        this.cardSlots = [];
        this.isAnimating = false;
        this.animationDuration = 600; // 单个卡片动画时间（毫秒）
        this.delayBetweenCards = 300; // 卡片之间的延迟（毫秒）
        this.totalAnimationTime = 0;
        this.init();
    }

    /**
     * 初始化动画控制器
     */
    init() {
        this.cardSlots = document.querySelectorAll('.card-slot');
        this.calculateTotalAnimationTime();
    }

    /**
     * 计算总动画时间
     */
    calculateTotalAnimationTime() {
        const numCards = this.cardSlots.length;
        this.totalAnimationTime = 
            this.animationDuration + 
            (numCards - 1) * this.delayBetweenCards + 
            100; // 额外的缓冲时间
    }

    /**
     * 为指定的卡片添加旋转动画
     * @param {HTMLElement} cardElement - 卡片 DOM 元素
     * @param {number} delay - 延迟时间（毫秒）
     */
    animateCard(cardElement, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 添加旋转类
                cardElement.classList.add('rotating');
                
                // 在动画完成后移除类并触发回调
                setTimeout(() => {
                    cardElement.classList.remove('rotating');
                    resolve();
                }, this.animationDuration);
            }, delay);
        });
    }

    /**
     * 执行完整的占卜动画序列
     * @param {Array} baguas - 8卦数据对象数组
     * @returns {Promise} 当所有动画完成时解决
     */
    async runDivinationAnimation(baguas) {
        if (this.isAnimating) return;
        if (!baguas || baguas.length === 0) return;

        this.isAnimating = true;

        // 按顺序为每个卡片添加动画
        const animationPromises = [];
        
        this.cardSlots.forEach((slot, index) => {
            if (index < baguas.length) {
                const card = slot.querySelector('.card');
                const delay = index * this.delayBetweenCards;
                animationPromises.push(this.animateCard(card, delay));
            }
        });

        // 等待所有动画完成
        await Promise.all(animationPromises);
        
        this.isAnimating = false;
    }

    /**
     * 显示卦象信息（从背面翻到正面）
     * @param {Array} baguas - 8卦数据对象数组
     */
    displayBaguaInfo(baguas) {
        this.cardSlots.forEach((slot, index) => {
            if (index < baguas.length) {
                const bagua = baguas[index];
                const card = slot.querySelector('.card');
                
                // 清空旧内容
                card.innerHTML = '';
                
                // 添加新内容
                const symbol = document.createElement('div');
                symbol.className = 'card-symbol';
                symbol.textContent = bagua.symbol;
                
                const name = document.createElement('div');
                name.className = 'card-name';
                name.textContent = bagua.name + '卦';
                
                const wuxing = document.createElement('div');
                wuxing.className = 'card-wuxing';
                wuxing.textContent = bagua.wuxing;
                
                card.classList.remove('card-back');
                card.classList.add('card-front');
                
                card.appendChild(symbol);
                card.appendChild(name);
                card.appendChild(wuxing);
            }
        });
    }

    /**
     * 重置所有卡片到初始状态
     */
    resetCards() {
        this.cardSlots.forEach((slot) => {
            const card = slot.querySelector('.card');
            
            // 移除所有类
            card.classList.remove('card-front', 'rotating');
            card.classList.add('card-back');
            
            // 重置内容为符号
            card.innerHTML = '<div class="card-symbol">☰</div>';
        });
    }

    /**
     * 获取总动画时间（用于等待）
     * @returns {number} 毫秒数
     */
    getTotalAnimationTime() {
        return this.totalAnimationTime;
    }

    /**
     * 检查是否正在动画中
     * @returns {boolean}
     */
    isRunning() {
        return this.isAnimating;
    }

    /**
     * 设置动画参数
     * @param {Object} config - 配置对象
     */
    setConfig(config) {
        if (config.animationDuration) {
            this.animationDuration = config.animationDuration;
        }
        if (config.delayBetweenCards) {
            this.delayBetweenCards = config.delayBetweenCards;
        }
        this.calculateTotalAnimationTime();
    }

    /**
     * 为太极圆添加呼吸效果
     */
    addTaijiPulse() {
        const taiji = document.querySelector('.taiji-circle');
        if (!taiji) return;
        
        // 呼吸效果已在 CSS 中定义，此处仅用于演示
        console.log('太极圆呼吸效果已启用');
    }

    /**
     * 添加卡片悬停光晕效果
     */
    addCardHoverGlow() {
        const cards = document.querySelectorAll('.card-slot');
        cards.forEach((slot) => {
            slot.addEventListener('mouseenter', () => {
                const card = slot.querySelector('.card');
                card.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
            });
            
            slot.addEventListener('mouseleave', () => {
                const card = slot.querySelector('.card');
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    /**
     * 文字渐入效果（用于结果展示）
     * @param {HTMLElement} element - 目标元素
     * @param {string} text - 要显示的文字
     * @param {number} speed - 显示速度（毫秒/字符）
     * @returns {Promise}
     */
    async typewriterEffect(element, text, speed = 30) {
        element.innerHTML = '';
        
        return new Promise((resolve) => {
            let index = 0;
            
            const interval = setInterval(() => {
                if (index < text.length) {
                    // 处理 HTML 标签
                    if (text[index] === '<') {
                        // 找到标签的结束位置
                        const endTag = text.indexOf('>', index);
                        if (endTag !== -1) {
                            const tag = text.substring(index, endTag + 1);
                            element.innerHTML += tag;
                            index = endTag + 1;
                        }
                    } else {
                        const char = text[index];
                        if (char === '\n') {
                            element.innerHTML += '<br>';
                        } else {
                            element.innerHTML += char;
                        }
                        index++;
                    }
                    
                    // 自动滚动到底部
                    element.scrollTop = element.scrollHeight;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }

    /**
     * 淡入效果（用于结果展示）
     * @param {HTMLElement} element - 目标元素
     * @param {number} duration - 持续时间（毫秒）
     */
    fadeInEffect(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in`;
        
        // 触发重排以启动过渡
        element.offsetHeight;
        
        element.style.opacity = '1';
        
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }
}

// 创建全局动画控制器实例
const animationController = new AnimationController();

// 确保 DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animationController.init();
        animationController.addTaijiPulse();
        // animationController.addCardHoverGlow(); // 可选启用
    });
} else {
    animationController.init();
    animationController.addTaijiPulse();
    // animationController.addCardHoverGlow();
}
