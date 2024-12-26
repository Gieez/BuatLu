let board = ['', '', '', '', '', '', '', '', '']; // Representasi board
let currentPlayer = 'X'; // Pemain pertama adalah X
let gameOver = false;
let playerScore = 0;
let botScore = 0;
let level = 'hard'; // Default level adalah hard

// Memilih elemen-elemen
const cells = document.querySelectorAll('.cell');
const scoreText = document.getElementById('score');
const botScoreText = document.getElementById('bot-score');
const resetButton = document.getElementById('reset-button');
const backButton = document.getElementById('back-button');
const levelSelector = document.getElementById('level-selector');

// Fungsi untuk memeriksa apakah ada pemenang
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // X atau O
        }
    }

    if (board.every(cell => cell !== '')) {
        return 'Draw';
    }

    return null;
}

// Fungsi untuk memulai permainan baru
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

// Fungsi untuk mengubah giliran pemain
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Fungsi untuk menangani klik pada sel
function handleCellClick(e) {
    if (gameOver) return;
    const index = e.target.dataset.index;
    if (board[index]) return; // Jangan ubah sel yang sudah terisi
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameOver = true;
        if (winner === 'Draw') {
            alert('Draw!');
        } else if (winner === 'X') {
            playerScore++;
            alert('You Win!');
        } else {
            botScore++;
            alert('Bot Wins!');
        }
        updateScores();
        return;
    }

    changePlayer();
    if (currentPlayer === 'O') {
        botMove(); // Bot bergerak setelah pemain
    }
}

// Fungsi untuk gerakan bot dengan algoritma Minimax atau random
function botMove() {
    setTimeout(() => {
        let bestMove;
        if (level === 'hard') {
            bestMove = minimax(board, 'O');
        } else {
            bestMove = randomMove(board);
        }
        board[bestMove.index] = 'O';
        cells[bestMove.index].textContent = 'O';

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === 'Draw') {
                alert('Draw!');
            } else if (winner === 'X') {
                playerScore++;
                alert('You Win!');
            } else {
                botScore++;
                alert('Bot Wins!');
            }
            updateScores();
            return;
        }

        changePlayer();
    }, 1000); // Delay 1 detik sebelum bot bergerak
}

// Algoritma Minimax
function minimax(board, player) {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableMoves = getAvailableMoves(board);

    if (checkWinner() === 'X') return { score: -10 };
    if (checkWinner() === 'O') return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        board[move] = player;

        const result = minimax(board, opponent);
        moves.push({
            index: move,
            score: result.score
        });

        board[move] = ''; // Reset move
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}

// Fungsi untuk gerakan acak pada level easy
function randomMove(board) {
    const availableMoves = getAvailableMoves(board);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return { index: availableMoves[randomIndex] };
}

// Fungsi untuk mendapatkan daftar langkah yang tersedia
function getAvailableMoves(board) {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableMoves.push(i);
        }
    }
    return availableMoves;
}

// Fungsi untuk memperbarui skor
function updateScores() {
    scoreText.textContent = playerScore;
    botScoreText.textContent = botScore;
}

// Event listener untuk klik pada sel
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Event listener untuk reset tombol
resetButton.addEventListener('click', resetGame);

// Tombol kembali
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Kembali ke halaman index
});

// Event listener untuk memilih level
levelSelector.addEventListener('change', (e) => {
    level = e.target.value;
    resetGame();
});
