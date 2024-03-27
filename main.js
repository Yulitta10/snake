const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasElementSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake = [];
let direction = { };
let food = {};
let gameLoop;
let score = 0;

function drawSnake() {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    ctx.fillStyle = color;
    snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, canvasElementSize, canvasElementSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#2ad0c4";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f4c623b5";
    ctx.beginPath();
    ctx.rect(food.x, food.y, canvasElementSize, canvasElementSize);
    ctx.stroke();
    ctx.fill();
}

function generateFood() {
    return {
        x: generatePosition(canvasWidth),
        y: generatePosition(canvasHeight)
        };
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * canvasElementSize,
            y: snake[0].y + direction.y * canvasElementSize
    };
    snake.unshift(newHead);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = generateFood();
        score += 1;
        document.getElementById('score_count').innerText =score.toString();
        } else {
                snake.pop();
    }
}


function checkCollision() {
    if (
        snake[0].y < 0 || snake[0].y >= canvasHeight ||
        snake[0].x < 0 || snake[0].x >= canvasWidth ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        return true;
    }

    return false;
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

function update() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        document.getElementById('game_over').style ="display: flex";
        document.getElementById('score').style ="display: none";
        document.getElementById('result_score').innerHTML =score.toString();
        canvas.style = "display: none";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSnake();
    drawFood();
}

function restartGame() {
    clearInterval(gameLoop);
    score = 0;
    snake = [{ x: 20, y: 20 }];
    direction = { x: 1, y: 0 };
    food = generateFood();
    document.getElementById('game_over').style ="display: none";
    document.getElementById('start_game').style ="display: none";
    document.getElementById('score').style ="display: flex";
    document.getElementById('score_count').innerText =score.toString();
    canvas.style = "display: flex";
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 200);
}

function startGame() {
    document.getElementById('start_game').style ="display: none";
    document.getElementById('score').style ="display: flex";
    canvas.style = "display: flex";
    snake = [{ x: 20, y: 20 }];
    direction = { x: 1, y: 0 };
    score = 0;
    food = generateFood();
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 200);
}

function generatePosition(canvasSide) {
    return Math.floor(Math.random() * (canvasSide / canvasElementSize)) * canvasElementSize
}

document.addEventListener('keydown', handleKeyPress);
document.getElementById('restart_btn').addEventListener('click', restartGame);
document.getElementById('start_btn').addEventListener('click', startGame);