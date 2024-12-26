const gameBoard = document.getElementById('game-board');
const scoreText = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const backButton = document.getElementById('back-button');

// Inisialisasi variabel permainan
let snake = [{x: 5, y: 5}];  // Posisi awal ular
let food = {x: 8, y: 8};     // Posisi awal makanan
let score = 0;                // Skor permainan
let direction = 'RIGHT';      // Arah ular
let gameInterval;             // Interval permainan

// Fungsi untuk menggambar ular dan makanan
function drawGame() {
    gameBoard.innerHTML = '';  // Hapus konten lama
    // Gambarkan ular
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.position = 'absolute';
        snakeElement.style.width = '10px';
        snakeElement.style.height = '10px';
        snakeElement.style.backgroundColor = 'lime';
        snakeElement.style.left = `${segment.x * 10}px`;
        snakeElement.style.top = `${segment.y * 10}px`;
        gameBoard.appendChild(snakeElement);
    });

    // Gambarkan makanan
    const foodElement = document.createElement('div');
    foodElement.style.position = 'absolute';
    foodElement.style.width = '10px';
    foodElement.style.height = '10px';
    foodElement.style.backgroundColor = 'red';
    foodElement.style.left = `${food.x * 10}px`;
    foodElement.style.top = `${food.y * 10}px`;
    gameBoard.appendChild(foodElement);
}

// Fungsi untuk menggerakkan ular
function moveSnake() {
    const head = {...snake[0]};

    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;

    // Tambahkan kepala baru ke ular
    snake.unshift(head);

    // Cek jika ular makan makanan
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreText.textContent = score;
        // Posisikan makanan baru
        food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)};
    } else {
        snake.pop();  // Hapus ekor jika tidak makan
    }

    // Cek jika ular menabrak dirinya sendiri atau dinding
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over!');
    }

    drawGame();
}

// Fungsi untuk mengubah arah ular
function changeDirection(newDirection) {
    if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
    if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}

// Kontrol tombol untuk perangkat mobile
document.getElementById('left-button').addEventListener('click', () => changeDirection('LEFT'));
document.getElementById('right-button').addEventListener('click', () => changeDirection('RIGHT'));
document.getElementById('up-button').addEventListener('click', () => changeDirection('UP'));
document.getElementById('down-button').addEventListener('click', () => changeDirection('DOWN'));

// Fungsi untuk reset permainan
resetButton.addEventListener('click', () => {
    snake = [{x: 5, y: 5}];
    food = {x: 8, y: 8};
    score = 0;
    scoreText.textContent = score;
    direction = 'RIGHT';
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 100);  // Mulai permainan kembali
});

// Tombol kembali
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Kembali ke halaman index
});

// Mulai permainan
gameInterval = setInterval(moveSnake, 100);
