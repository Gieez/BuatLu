let score = 0;  // Poin awal
const scoreText = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const resetButton = document.getElementById('reset-button');
const backButton = document.getElementById('back-button');  // Tombol back

// Fungsi untuk memperbarui tampilan poin
function updateScore() {
    scoreText.textContent = score;
}

// Event listener untuk tombol klik
clickButton.addEventListener('click', () => {
    score++;  // Menambahkan 1 poin setiap kali tombol diklik
    updateScore();
});

// Event listener untuk tombol reset
resetButton.addEventListener('click', () => {
    score = 0;  // Mengatur poin kembali ke 0
    updateScore();
});

// Event listener untuk tombol kembali (Back)
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Mengarahkan ke halaman index
});
