// countdown.js - File JavaScript untuk Countdown

// Countdown untuk 1 Month Anniversary: 17 Januari 2026
const countdownDate = new Date('January 17, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    // Jika countdown sudah lewat
    if (distance < 0) {
        // Ini adalah hari anniversary!
        celebrateAnniversaryDay();
        return;
    }
    
    // Hitung hari, jam, menit, detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update elements jika ada
    updateElement('days', days);
    updateElement('hours', hours.toString().padStart(2, '0'));
    updateElement('minutes', minutes.toString().padStart(2, '0'));
    updateElement('seconds', seconds.toString().padStart(2, '0'));
    
    // Jika kurang dari 24 jam, tambahkan efek khusus
    if (days === 0) {
        addCountdownUrgency();
    }
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        // Hanya update jika value berubah
        if (element.textContent !== value.toString()) {
            element.textContent = value;
            
            // Tambahkan animasi kecil
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

function addCountdownUrgency() {
    const countdownContainer = document.querySelector('.countdown');
    if (countdownContainer && !countdownContainer.classList.contains('urgent')) {
        countdownContainer.classList.add('urgent');
        
        // Tambahkan styles untuk urgency
        const style = document.createElement('style');
        style.textContent = `
            .countdown.urgent {
                animation: pulseUrgent 1.5s infinite;
            }
            
            .countdown.urgent .time-box {
                background: linear-gradient(45deg, #ff4757, #ff6b81);
            }
            
            @keyframes pulseUrgent {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

function celebrateAnniversaryDay() {
    // Update countdown untuk menunjukkan anniversary
    document.querySelectorAll('.countdown .time-box span').forEach(span => {
        span.textContent = '00';
    });
    
    // Update judul countdown
    const countdownTitle = document.querySelector('.countdown-container h3');
    if (countdownTitle) {
        countdownTitle.innerHTML = '<i class="fas fa-heart"></i> Happy 1 Month Anniversary! <i class="fas fa-heart"></i>';
        countdownTitle.style.color = '#ff6b8b';
        countdownTitle.style.animation = 'celebrateText 2s infinite';
    }
    
    // Tambahkan efek celebration
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrateText {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Tampilkan banyak hati
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createClickHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
    
    // Play celebration sound jika ada
    const celebrationSound = new Audio('assets/audio/celebration.mp3');
    celebrationSound.volume = 0.5;
    celebrationSound.play().catch(e => console.log("Celebration sound prevented"));
}

// Jalankan countdown setiap detik
const countdownInterval = setInterval(updateCountdown, 1000);

// Jalankan sekali saat pertama load
updateCountdown();

// Export fungsi jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        celebrateAnniversaryDay
    };
}