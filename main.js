const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let isGameStarted = false;
const canvasElementSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [{ x: 20, y: 20 }];
let direction = { x: 1, y: 0 };
let food = generateFood();

function drawSnake() {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    ctx.fillStyle = color;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, canvasElementSize, canvasElementSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#f84615";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#182860";
    ctx.beginPath();
    ctx.rect(food.x, food.y, canvasElementSize, canvasElementSize);
    ctx.stroke();
    ctx.fill();
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x * canvasElementSize, y: snake[0].y + direction.y * canvasElementSize };
    snake.unshift(newHead);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    return { x: Math.floor(Math.random() * (canvasWidth / canvasElementSize)) * canvasElementSize, y: Math.floor(Math.random() * (canvasHeight / canvasElementSize)) * canvasElementSize };
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvasWidth || snake[0].y < 0 || snake[0].y >= canvasHeight || snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
        return true;
    }
    return false;
}

function update() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        document.getElementById('game_over').style ="display: flex";
        canvas.style = "display: none";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSnake();
    drawFood();
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y !== -1) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x !== -1) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);

let gameLoop = setInterval(() => {
    update();
    draw();
}, 200);