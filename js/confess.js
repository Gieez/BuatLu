document.addEventListener('DOMContentLoaded', () => {
    const flap = document.getElementById('envelope-flap');
    const letter = document.getElementById('letter');
    const openButton = document.getElementById('open-button');
    const music = document.getElementById('background-music');
    const emoteContainer = document.getElementById('emote-container');

    openButton.addEventListener('click', () => {
        flap.style.transform = 'rotateX(-180deg)';
        letter.style.bottom = '0';
        music.play();
        createEmotes();
    });

    function createEmotes() {
        for (let i = 0; i < 20; i++) {
            const emote = document.createElement('div');
            emote.className = 'emote';
            emote.style.left = `${Math.random() * 100}vw`;
            emote.style.animationDuration = `${Math.random() * 2 + 1}s`;
            emote.style.animationDelay = `-${Math.random() * 2}s`;
            emote.style.opacity = 1;
            emote.style.setProperty('--i', i);
            emoteContainer.appendChild(emote);

            emote.addEventListener('animationend', () => emote.remove());
        }
    }

    // Tombol kembali
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Kembali ke halaman index
});
    // Rocket Animation
    setInterval(createRocket, 2000);

    function createRocket() {
        const rocket = document.createElement('div');
        rocket.className = 'rocket';
        rocket.style.left = `${Math.random() * 100}vw`;
        document.getElementById('background-particles').appendChild(rocket);
    }
    
});

document.addEventListener('DOMContentLoaded', () => {
    const flap = document.getElementById('envelope-flap');
    const letter = document.getElementById('letter');
    const openButton = document.getElementById('open-button');
    const music = document.getElementById('background-music');
    const flowerContainer = document.getElementById('flower-container'); // Menangkap container bunga

    openButton.addEventListener('click', () => {
        flap.style.transform = 'rotateX(-180deg)';
        letter.style.bottom = '0';
        music.play();
        createEmotes();
        createFlowers();  // Menambahkan bunga
    });

    // Fungsi untuk menambahkan bunga
    function createFlowers() {
        for (let i = 0; i < 10; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.left = `${Math.random() * 100}vw`;
            flower.style.top = `${Math.random() * 100}vh`;
            flower.style.animationDuration = `${Math.random() * 3 + 3}s`;
            flowerContainer.appendChild(flower);

            flower.addEventListener('animationend', () => flower.remove());
        }
    }

    function createEmotes() {
        for (let i = 0; i < 20; i++) {
            const emote = document.createElement('div');
            emote.className = 'emote';
            emote.style.left = `${Math.random() * 100}vw`;
            emote.style.animationDuration = `${Math.random() * 2 + 1}s`;
            emote.style.animationDelay = `-${Math.random() * 2}s`;
            emote.style.opacity = 1;
            emote.style.setProperty('--i', i);
            emoteContainer.appendChild(emote);

            emote.addEventListener('animationend', () => emote.remove());
        }
    }

    // Tombol kembali
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';  // Kembali ke halaman index
    });

    // Rocket Animation
    setInterval(createRocket, 2000);

    function createRocket() {
        const rocket = document.createElement('div');
        rocket.className = 'rocket';
        rocket.style.left = `${Math.random() * 100}vw`;
        document.getElementById('background-particles').appendChild(rocket);
    }
});


