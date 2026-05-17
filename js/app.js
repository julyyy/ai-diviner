/**
 * 易卦占卜 - 主应用逻辑
 * 处理用户交互、占卜流程、结果生成
 */

class DivinationApp {
    constructor() {
        this.questionInput = null;
        this.divinationBtn = null;
        this.resetBtn = null;
        this.resultContent = null;
        this.charCountDisplay = null;
        this.currentQuestion = '';
        this.currentBaguas = [];
        this.isProcessing = false;
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.initUI();
    }

    /**
     * 缓存 DOM 元素
     */
    cacheElements() {
        this.questionInput = document.getElementById('question');
        this.divinationBtn = document.getElementById('divination-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.resultContent = document.getElementById('result-content');
        this.charCountDisplay = document.getElementById('char-count');
    }

    /**
     * 绑定事件监听器
     */
    attachEventListeners() {
        // 占卜按钮点击事件
        this.divinationBtn.addEventListener('click', () => this.handleDivination());
        
        // 重置按钮点击事件
        this.resetBtn.addEventListener('click', () => this.handleReset());
        
        // 问题输入框事件
        this.questionInput.addEventListener('input', (e) => this.handleQuestionInput(e));
        
        // 回车键快速占卜
        this.questionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleDivination();
            }
        });
    }

    /**
     * 初始化 UI
     */
    initUI() {
        // 设置初始字符计数
        this.updateCharCount();
        // 重置卡片到初始状态
        animationController.resetCards();
    }

    /**
     * 处理问题输入
     */
    handleQuestionInput(e) {
        this.currentQuestion = e.target.value;
        this.updateCharCount();
    }

    /**
     * 更新字符计数显示
     */
    updateCharCount() {
        const count = this.questionInput.value.length;
        this.charCountDisplay.textContent = count;
    }

    /**
     * 验证问题输入
     * @returns {boolean}
     */
    validateQuestion() {
        const question = this.questionInput.value.trim();
        
        if (!question) {
            this.showError('请输入你想了解的问题');
            return false;
        }
        
        if (question.length < 3) {
            this.showError('问题需要至少 3 个字符');
            return false;
        }
        
        return true;
    }

    /**
     * 显示错误信息
     */
    showError(message) {
        // 简单的错误提示
        alert(message);
    }

    /**
     * 处理占卜流程
     */
    async handleDivination() {
        // 验证
        if (!this.validateQuestion()) {
            return;
        }
        
        if (this.isProcessing || animationController.isRunning()) {
            return;
        }
        
        this.isProcessing = true;
        this.divinationBtn.disabled = true;
        this.resetBtn.style.display = 'none';
        
        try {
            // 1. 重置卡片
            animationController.resetCards();
            this.currentQuestion = this.questionInput.value.trim();
            
            // 2. 随机抽取 5 个卦象
            this.currentBaguas = drawCards(5);
            
            // 3. 执行动画
            this.resultContent.innerHTML = '<p class="placeholder">卦象降临中...</p>';
            await animationController.runDivinationAnimation(this.currentBaguas);
            
            // 4. 动画完成后显示卦象信息
            animationController.displayBaguaInfo(this.currentBaguas);
            
            // 5. 生成占卜解读
            const divination = generateDivination(this.currentBaguas, this.currentQuestion);
            
            // 6. 显示结果
            this.displayResult(divination);
            
            // 7. 显示重置按钮
            this.resetBtn.style.display = 'block';
            
        } catch (error) {
            console.error('占卜过程中出现错误:', error);
            this.showError('占卜过程中出现错误，请重试');
        } finally {
            this.isProcessing = false;
            this.divinationBtn.disabled = false;
        }
    }

    /**
     * 显示占卜结果
     */
    async displayResult(divinationText) {
        // 清空结果区域
        this.resultContent.innerHTML = '';
        
        // 添加淡入效果
        await animationController.fadeInEffect(this.resultContent, 400);
        
        // 使用打字机效果显示结果（可选，用快速显示代替以提高用户体验）
        // 为了用户体验，我们使用快速显示而不是逐字显示
        this.resultContent.innerHTML = this.formatResultHTML(divinationText);
        
        // 自动滚动到顶部
        this.resultContent.scrollTop = 0;
    }

    /**
     * 格式化结果文本为 HTML
     */
    formatResultHTML(text) {
        // 将文本中的换行符转换为 <br>
        // 将标题（【】）加粗
        let html = text
            .replace(/\n/g, '<br>')
            .replace(/【([^】]+)】/g, '<strong style="color: var(--primary-gold);">【$1】</strong>');
        
        // 添加段落样式
        const paragraphs = html.split('<br><br>');
        html = paragraphs.map(p => `<p>${p}</p>`).join('');
        
        return html;
    }

    /**
     * 处理重置
     */
    handleReset() {
        this.questionInput.value = '';
        this.updateCharCount();
        this.currentQuestion = '';
        this.currentBaguas = [];
        this.resultContent.innerHTML = '<p class="placeholder">点击"开始占卜"，了解你的运势</p>';
        this.resetBtn.style.display = 'none';
        animationController.resetCards();
        this.questionInput.focus();
    }

    /**
     * 获取当前抽取的卦象
     */
    getCurrentBaguas() {
        return this.currentBaguas;
    }

    /**
     * 获取当前问题
     */
    getCurrentQuestion() {
        return this.currentQuestion;
    }
}

// ============== 初始化应用 ==============

let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new DivinationApp();
    });
} else {
    app = new DivinationApp();
}

// ============== 快速占卜函数（可选的全局接口） ==============

/**
 * 快速开始占卜（可以从控制台调用）
 */
function quickDivinate(question) {
    if (app) {
        app.questionInput.value = question;
        app.updateCharCount();
        app.handleDivination();
    }
}

// ============== 调试工具（可选） ==============

/**
 * 在控制台显示当前卦象信息
 */
function showCurrentBaguas() {
    if (app && app.getCurrentBaguas().length > 0) {
        console.table(app.getCurrentBaguas());
    } else {
        console.log('还没有抽取卦象');
    }
}

/**
 * 在控制台显示所有卦象数据
 */
function showAllBaguas() {
    console.table(getAllBagua());
}
