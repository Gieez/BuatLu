// Ambil elemen-elemen yang diperlukan
const hamburgerButton = document.getElementById('hamburger-button');
const nav = document.querySelector('nav');

// Tambahkan event listener untuk tombol hamburger
hamburgerButton.addEventListener('click', () => {
    // Toggle class 'active' pada navbar untuk menampilkan/menyembunyikan menu
    nav.classList.toggle('active');
});
