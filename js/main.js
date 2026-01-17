// main.js - File JavaScript Utama

// DOM Elements (mengikuti ID yang sudah ada di HTML)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const musicToggle = document.getElementById('musicToggle');
const themeToggle = document.getElementById('themeToggle');
const bgMusic = document.getElementById('bgMusic');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const dailyQuote = document.getElementById('dailyQuote');
const daysTogether = document.getElementById('daysTogether');
const yearsTogether = document.getElementById('yearsTogether');

// Database Kutipan Cinta untuk 1 Bulan (dalam bahasa Indonesia)
const loveQuotes = [
    "Cinta bukan tentang berapa hari, bulan, atau tahun kita bersama. Cinta adalah tentang seberapa besar kita saling mencintai setiap harinya.",
    "Dalam senyummu, aku melihat sesuatu yang lebih indah dari bintang-bintang.",
    "Aku melihat bahwa kamu sempurna, dan aku mencintaimu. Kemudian aku melihat bahwa kamu tidak sempurna dan aku semakin mencintaimu.",
    "Kamu adalah sumber kebahagiaanku, pusat duniaku, dan seluruh hatiku.",
    "Aku mencintaimu bukan hanya karena siapa kamu, tapi karena siapa aku ketika bersamamu.",
    "Jika aku punya bunga untuk setiap kali aku memikirkanmu, aku bisa berjalan di taman selamanya.",
    "Bagi dunia kamu mungkin satu orang, tapi bagi satu orang kamu adalah dunianya.",
    "Cinta adalah ketika kamu bertemu seseorang yang memberitahumu sesuatu yang baru tentang dirimu.",
    "Aku memilihmu. Dan aku akan terus memilihmu berulang kali. Tanpa ragu, tanpa keraguan, dalam sekejap. Aku akan terus memilihmu.",
    "Kamu tidak mencintai seseorang karena penampilan, pakaian, atau mobil mewah mereka, tapi karena mereka menyanyikan lagu yang hanya bisa kamu dengar.",
    // Kutipan tambahan untuk 1 bulan
    "Satu bulan bersamamu terasa seperti seumur hidup yang indah.",
    "Setiap momen bulan ini telah menjadi kenangan berharga yang sedang terbentuk.",
    "Mereka bilang waktu berlalu cepat ketika kita bersenang-senang, dan bersamamu, bulan ini terbang begitu cepat.",
    "Satu bulan sudah, selamanya menanti, cintaku.",
    "Hanya dalam 30 hari, kamu telah menjadi segalanya bagiku.",
    "Bulan pertama ini seperti mimpi indah yang tidak ingin aku bangun.",
    "Setiap hari bersamamu adalah halaman baru dalam buku cinta kita.",
    "Di bulan pertama ini, aku menemukan rumah di pelukanmu.",
    "Cinta kita mungkin baru sebulan, tapi rasanya seperti sudah selamanya.",
    "Satu bulan, sejuta kenangan, cinta tak terhingga."
];

// Tanggal Jadian: 17 Desember 2025
const anniversaryDate = new Date('December 17, 2025 00:00:00').getTime();

// Inisialisasi Website
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website Cerita Cinta Kita Dimuat!");
    initializeWebsite();
});

function initializeWebsite() {
    // Toggle Menu Mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.toggle('active');
                menuToggle.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Tutup menu ketika mengklik link
    if (navMenu) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // ====================== PERBAIKAN MUSIK ======================
    // Toggle Musik
    if (musicToggle && bgMusic) {
        // 1. Set volume default
        bgMusic.volume = 0.3;
        
        // 2. Cek status musik dari localStorage
        const savedMusicState = localStorage.getItem('musicPlaying');
        const savedMusicTime = localStorage.getItem('musicTime');
        const savedMusicVolume = localStorage.getItem('musicVolume');
        
        // 3. Restore volume jika ada
        if (savedMusicVolume) {
            bgMusic.volume = parseFloat(savedMusicVolume);
        }
        
        // 4. Restore state pemutaran
        if (savedMusicState === 'true') {
            // Set waktu sebelumnya jika ada
            if (savedMusicTime) {
                bgMusic.currentTime = parseFloat(savedMusicTime);
            }
            
            // Coba play musik (dengan delay untuk menghindari autoplay block)
            setTimeout(() => {
                bgMusic.play().then(() => {
                    updateMusicButton(true);
                }).catch(error => {
                    console.log("Autoplay diblokir, perlu interaksi pengguna");
                    updateMusicButton(false);
                });
            }, 1000);
        } else {
            updateMusicButton(false);
        }
        
        // 5. Event listener untuk tombol toggle
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    // Simpan status ke localStorage
                    localStorage.setItem('musicPlaying', 'true');
                    updateMusicButton(true);
                }).catch(error => {
                    console.log("Gagal memutar musik:", error);
                    // Fallback: ubah tampilan tombol
                    musicToggle.innerHTML = '<i class="fas fa-play"></i> <span>Klik untuk Putar</span>';
                });
            } else {
                bgMusic.pause();
                localStorage.setItem('musicPlaying', 'false');
                updateMusicButton(false);
            }
        });
        
        // 6. Simpan waktu pemutaran secara berkala
        bgMusic.addEventListener('timeupdate', function() {
            if (!bgMusic.paused) {
                localStorage.setItem('musicTime', bgMusic.currentTime.toString());
            }
        });
        
        // 7. Simpan volume saat diubah
        bgMusic.addEventListener('volumechange', function() {
            localStorage.setItem('musicVolume', bgMusic.volume.toString());
        });
        
        // 8. Simpan status saat halaman ditutup
        window.addEventListener('beforeunload', function() {
            if (!bgMusic.paused) {
                localStorage.setItem('musicTime', bgMusic.currentTime.toString());
            }
        });
        
        // 9. Fungsi untuk update tombol musik
        function updateMusicButton(isPlaying) {
            if (isPlaying) {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>Jeda Musik</span>';
                musicToggle.classList.add('playing');
            } else {
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Putar Musik</span>';
                musicToggle.classList.remove('playing');
            }
        }
    }
    // ====================== END PERBAIKAN MUSIK ======================

    // Toggle Tema (Mode Gelap/Terang)
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark 
                ? '<i class="fas fa-sun"></i> Mode Terang' 
                : '<i class="fas fa-moon"></i> Mode Gelap';
            
            // Simpan preferensi tema
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Muat tema yang disimpan
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
        }
    }

    // Generate Kutipan Acak
    if (newQuoteBtn && dailyQuote) {
        newQuoteBtn.addEventListener('click', generateRandomQuote);
        // Generate kutipan awal
        generateRandomQuote();
    }

    // Hitung statistik hubungan
    calculateRelationshipStats();

    // Muat kenangan unggulan
    loadFeaturedMemories();

    // Buat hati melayang
    createFloatingHearts();

    // Tambah badge perayaan 1 bulan
    addOneMonthCelebration();

    // Tambah efek klik hati
    addClickHearts();

    // Setup pembaruan statistik otomatis setiap jam
    setInterval(calculateRelationshipStats, 3600000);
}

function generateRandomQuote() {
    if (!dailyQuote) return;
    
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    const quoteText = `"${loveQuotes[randomIndex]}"`;
    
    // Efek transisi halus
    dailyQuote.style.opacity = '0';
    
    setTimeout(() => {
        dailyQuote.textContent = quoteText;
        dailyQuote.style.opacity = '1';
        
        // Tambah animasi halus
        dailyQuote.style.transform = 'scale(1.05)';
        setTimeout(() => {
            dailyQuote.style.transform = 'scale(1)';
        }, 300);
    }, 300);
}

function calculateRelationshipStats() {
    const now = new Date().getTime();
    const diff = now - anniversaryDate;
    
    // Hitung total hari bersama
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalDaysDisplay = totalDays > 0 ? totalDays : 0;
    
    // Update counter hari
    if (daysTogether) {
        daysTogether.textContent = totalDaysDisplay;
        
        // Warna khusus untuk hari-hari pertama
        if (totalDaysDisplay < 7) {
            daysTogether.style.color = '#ff6b8b';
            daysTogether.style.fontWeight = 'bold';
        } else if (totalDaysDisplay < 30) {
            daysTogether.style.color = '#ff8e53';
        }
    }
    
    // Hitung bulan bersama
    const months = Math.floor(totalDaysDisplay / 30.44);
    const monthsDisplay = months > 0 ? months : 0;
    
    // Update untuk "yearsTogether" (sebenarnya bulan)
    if (yearsTogether) {
        yearsTogether.textContent = monthsDisplay;
        
        // Efek khusus untuk bulan pertama
        if (monthsDisplay === 1) {
            yearsTogether.style.color = '#ff6b8b';
            yearsTogether.style.animation = 'pulse 2s infinite';
            yearsTogether.style.fontWeight = 'bold';
        }
    }
    
    console.log(`Statistik Hubungan: ${totalDaysDisplay} hari, ${monthsDisplay} bulan`);
}

function loadFeaturedMemories() {
    const memoryGrid = document.querySelector('.memory-grid');
    if (!memoryGrid) return;
    
    // Data kenangan sampel untuk 1 bulan (menggunakan placeholder images)
    const memories = [
        {
            image: 'img/kenangan-1.jpeg',
            date: '17 Desember 2025',
            title: 'Hari Pertama Kita',
            description: 'Awal yang indah dari kisah cinta kita.'
        },
        {
            image: 'img/kenangan-2.jpeg',
            date: '24 Desember 2025',
            title: 'Malam yang indah',
            description: 'Malam yang indah bersama kamu.'
        },
        {
            image: 'img/kenangan-3.jpeg',
            date: '31 Desember 2025',
            title: 'Malam Tahun Baru',
            description: 'Menyambut tahun baru dengan harapan baru untuk kita.'
        }
    ];

    // Hapus konten yang ada
    memoryGrid.innerHTML = '';

    // Buat kartu kenangan
    memories.forEach(memory => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.innerHTML = `
            <div class="memory-image">
                <img src="${memory.image}" alt="${memory.title}" loading="lazy">
                <div class="memory-date">${memory.date}</div>
            </div>
            <div class="memory-content">
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
            </div>
        `;
        memoryGrid.appendChild(memoryCard);
    });
}

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    // Hapus hati yang ada
    heartsContainer.innerHTML = '';
    
    // Buat 10 hati melayang
    for (let i = 1; i <= 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        
        // Properti acak untuk setiap hati
        const size = Math.random() * 24 + 16; // 16-40px
        const left = Math.random() * 100; // 0-100%
        const duration = Math.random() * 15 + 10; // 10-25s
        const delay = Math.random() * 5; // 0-5s
        const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
        
        heart.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${left}%;
            color: #ff6b8b;
            opacity: ${opacity};
            animation: floatHeart ${duration}s linear ${delay}s infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        heartsContainer.appendChild(heart);
    }
    
    // Tambah keyframes animasi jika belum ada
    if (!document.getElementById('floatHeartAnimation')) {
        const style = document.createElement('style');
        style.id = 'floatHeartAnimation';
        style.textContent = `
            @keyframes floatHeart {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: ${Math.random() * 0.8 + 0.2};
                }
                90% {
                    opacity: ${Math.random() * 0.8 + 0.2};
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addClickHearts() {
    document.addEventListener('click', function(e) {
        // Hanya buat hati di area tertentu
        const clickableAreas = ['.hero', '.quote-section', '.memories-preview', '.stats-section'];
        const isInArea = clickableAreas.some(selector => 
            e.target.closest(selector) || e.target.matches(selector)
        );
        
        if (isInArea) {
            createClickHeart(e.clientX, e.clientY);
        }
    });
}

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        font-size: 24px;
        color: #ff6b8b;
        pointer-events: none;
        z-index: 10000;
        animation: clickHeart 1.2s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(heart);
    
    // Hapus hati setelah animasi
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 1200);
    
    // Tambah keyframes animasi jika belum ada
    if (!document.getElementById('clickHeartAnimation')) {
        const style = document.createElement('style');
        style.id = 'clickHeartAnimation';
        style.textContent = `
            @keyframes clickHeart {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -150%) scale(1.2);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -250%) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addOneMonthCelebration() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Cek apakah badge perayaan sudah ada
    if (document.querySelector('.month-celebration')) return;
    
    const celebration = document.createElement('div');
    celebration.className = 'month-celebration';
    celebration.innerHTML = `
        <div class="celebration-badge">
            <i class="fas fa-heart"></i>
            <span>1 Bulan Anniversary!</span>
            <i class="fas fa-heart"></i>
        </div>
        <div class="celebration-date">17 Des 2025 - 17 Jan 2026</div>
    `;
    
    heroSection.appendChild(celebration);
    
    // Tambah style perayaan
    const style = document.createElement('style');
    style.textContent = `
        .month-celebration {
            position: absolute;
            top: 120px;
            right: 20px;
            z-index: 100;
            text-align: center;
        }
        
        .celebration-badge {
            background: linear-gradient(45deg, #ff6b8b, #ff8e53);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            animation: celebrationPulse 2s infinite;
            box-shadow: 0 4px 20px rgba(255, 107, 139, 0.4);
            font-size: 0.9em;
        }
        
        .celebration-date {
            margin-top: 8px;
            font-size: 0.8em;
            color: white;
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 12px;
            border-radius: 20px;
            backdrop-filter: blur(5px);
        }
        
        @keyframes celebrationPulse {
            0% {
                transform: scale(1);
                box-shadow: 0 4px 20px rgba(255, 107, 139, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 6px 25px rgba(255, 107, 139, 0.6);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 4px 20px rgba(255, 107, 139, 0.4);
            }
        }
        
        @media (max-width: 768px) {
            .month-celebration {
                top: 100px;
                right: 10px;
            }
            
            .celebration-badge {
                padding: 8px 16px;
                font-size: 0.8em;
                gap: 8px;
            }
            
            .celebration-date {
                font-size: 0.7em;
            }
        }
        
        @media (max-width: 480px) {
            .month-celebration {
                position: relative;
                top: 0;
                right: 0;
                margin: 20px auto;
                width: 90%;
            }
            
            .celebration-badge {
                justify-content: center;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Handle resize window
window.addEventListener('resize', function() {
    // Tutup menu mobile ketika resize ke desktop
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Buat ulang hati melayang pada resize
    createFloatingHearts();
});

// Shortcut keyboard
document.addEventListener('keydown', function(e) {
    // Tombol M untuk toggle musik (ketika tidak fokus di input)
    if (e.key === 'm' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        if (musicToggle) musicToggle.click();
    }
    
    // Tombol D untuk toggle mode gelap
    if (e.key === 'd' && e.ctrlKey && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        if (themeToggle) themeToggle.click();
    }
    
    // Tombol Q untuk kutipan baru
    if (e.key === 'q' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        if (newQuoteBtn) newQuoteBtn.click();
    }
});

// Tambah smooth scroll untuk link anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Inisialisasi ketika halaman dimuat
window.onload = function() {
    // Delay kecil untuk memastikan semuanya dimuat
    setTimeout(() => {
        createFloatingHearts();
        
        // Tambah animasi untuk statistik
        const statsElements = [daysTogether, yearsTogether];
        statsElements.forEach(element => {
            if (element) {
                element.style.transition = 'all 0.5s ease';
            }
        });
        
        // Update tombol musik berdasarkan status saat ini
        if (bgMusic && musicToggle) {
            if (!bgMusic.paused) {
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>Jeda Musik</span>';
                musicToggle.classList.add('playing');
            }
        }
    }, 500);
};

// Fungsi tambahan untuk perayaan
function celebrateOneMonth() {
    // Fungsi ini bisa dipanggil ketika mencapai 1 bulan
    const celebrationConfetti = document.createElement('div');
    celebrationConfetti.innerHTML = '🎉🥂💖';
    celebrationConfetti.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3em;
        z-index: 100000;
        animation: confettiCelebration 3s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(celebrationConfetti);
    
    // Hapus setelah animasi
    setTimeout(() => {
        if (celebrationConfetti.parentNode) {
            celebrationConfetti.remove();
        }
    }, 3000);
    
    // Tambah animasi confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiCelebration {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            30% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 1;
            }
            70% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Cek apakah sudah 1 bulan dan jalankan perayaan
setTimeout(() => {
    const now = new Date().getTime();
    const oneMonthDate = new Date('January 17, 2026 00:00:00').getTime();
    const toOneMonth = oneMonthDate - now;
    
    if (toOneMonth <= 0 && toOneMonth > -86400000) { // Dalam 24 jam setelah 1 bulan
        celebrateOneMonth();
    }
}, 1000);

// Event listener untuk visibility change (tab dipindah)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && bgMusic) {
        // Saat kembali ke tab, coba lanjutkan musik jika sebelumnya play
        if (localStorage.getItem('musicPlaying') === 'true' && bgMusic.paused) {
            setTimeout(() => {
                bgMusic.play().catch(e => {
                    console.log("Gagal melanjutkan musik:", e);
                });
            }, 300);
        }
    }
});

// Export fungsi jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRandomQuote,
        calculateRelationshipStats,
        loadFeaturedMemories
    };
}