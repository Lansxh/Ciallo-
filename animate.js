class CreatePattern {
    static audio = new Audio('Ciallo.mp3');

    constructor(el, x, y, config = {}) {
        this.root = el;
        this.x = x;
        this.y = y;
        this.options = {
            type: 'aixin',
            quantity: 10,
            distanceMax: 100,
            distanceMin: 20,
            palette: ['f9f383', 'eb125f', '6eff8a', '66ffff'],
            ...config,
        };
        this.growUp();
        this.setupAudio();
    }

    setupAudio() {
        document.addEventListener('click', () => {
            // 先停止音频
            CreatePattern.audio.pause();
            // 将播放位置设置为音频的开始
            CreatePattern.audio.currentTime = 0;
            // 播放音频
            CreatePattern.audio.play();
        });
    }

    giveBirthToAChild() {
        const initialStyles = document.createElement('i');
        const randomColor =
            this.options.palette[Math.floor(Math.random() * this.options.palette.length)];
        const randomTranslateValue = () =>
            (Math.random() < 0.5 ? -1 : 1) *
            (this.options.distanceMin +
                Math.random() * (this.options.distanceMax - this.options.distanceMin));

        this.root.append(initialStyles);
        initialStyles.classList.add(this.options.type);
        setTimeout(() => {
            initialStyles.style.cssText = `background-color:#${randomColor};
            left:${this.x}px;top:${this.y}px;
            z-index:999;
            transform: translate(${randomTranslateValue()}px,${randomTranslateValue()}px) scale(0)`
        }, 0);
        setTimeout(() => {
            initialStyles.remove();
        }, 700);
    }

    growUp() {
        for (let i = 0; i < this.options.quantity; i++) this.giveBirthToAChild();
    }
}

const el = document.createElement('div');

addEventListener('load', () => {
    document.body.append(el);

    document.addEventListener('click', function (e) {
        new CreatePattern(el, e.pageX, e.pageY);
    });
});
/*ciallo*/
function createTextAnimation(x, y) {
    const text = document.createElement('div');
    text.textContent = 'Ciallo～(∠・ω< )⌒★';
    text.className = 'text-animation';
    document.body.appendChild(text);

    // 设置文本位置
    text.style.left = x + 'px';
    text.style.top = y + 'px';

    // 在动画结束后移除文本元素
    text.addEventListener('animationend', () => {
        text.remove();
    });
}

document.addEventListener('click', function (e) {
    createTextAnimation(e.pageX, e.pageY);
});
/*随机文本飘入*/
function createFloatingText() {
    const text = document.createElement('div');
    text.textContent = 'Ciallo～(∠・ω< )⌒☆';
    text.className = 'text-float';
    document.body.appendChild(text);

    // 设置文本初始位置和样式
    text.style.right = Math.random() * window.innerWidth + 'px';
    text.style.top = Math.random() * window.innerHeight + 'px';
    text.style.fontSize = Math.floor(Math.random() * 20 + 10) + 'px'; // 随机字体大小
    text.style.color = getRandomColor(); // 随机文本颜色
    text.style.opacity = Math.random(); // 随机不透明度
    text.style.animationDuration = Math.random() * 5 + 5 + 's'; // 随机飘动速度

    // 在动画结束后移除文本元素
    text.addEventListener('animationiteration', () => {
        text.remove();
        createFloatingText(); // 创建新的文本元素
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 创建一开始的一串文本
for (let i = 0; i < 50; i++) {
    createFloatingText();
}
