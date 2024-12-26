const cardSymbols = ['🍰', '🎁', '🎈', '🍩', '🧸', '🎉', '🍪', '🍦', '🍰', '🎁', '🎈', '🍩', '🧸', '🎉', '🍪', '🍦'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const gameBoard = document.getElementById('game-board');
const movesText = document.getElementById('moves');
const matchedPairsText = document.getElementById('matched-pairs');
const resetButton = document.getElementById('reset-memory');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    shuffle(cardSymbols);

    for (let i = 0; i < cardSymbols.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);

        // Membuat dua bagian: front dan back
        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?'; // Menampilkan tanda tanya di bagian depan kartu

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = cardSymbols[i]; // Menampilkan emotikon di belakang kartu

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard(event) {
    const clickedCard = event.target.closest('.card');

    // Jangan flip kartu jika sudah terbalik atau sudah cocok
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    movesText.textContent = `Langkah: ${moves}`;

    const [card1, card2] = flippedCards;
    if (card1.querySelector('.back').textContent === card2.querySelector('.back').textContent) {
        matchedPairs++;
        matchedPairsText.textContent = `Pasangan yang cocok: ${matchedPairs}`;
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        if (matchedPairs === cardSymbols.length / 2) {
            alert('Selamat, Anda menang!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    movesText.textContent = `Langkah: ${moves}`;
    matchedPairsText.textContent = `Pasangan yang cocok: ${matchedPairs}`;
    createCards();
}

resetButton.addEventListener('click', resetGame);

// Initialize the game
createCards();
