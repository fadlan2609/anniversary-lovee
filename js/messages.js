/**
 * Messages Module - Anniversary Special
 * Sistem pesan rahasia dengan kode sandi untuk anniversary 1 bulan
 */

// Pesan romantis untuk 1 bulan anniversary
const ROMANTIC_MESSAGE = `Sayangku yang tercinta...

Tidak terasa sudah satu bulan penuh kita menjalani kisah cinta ini. Tiga puluh hari yang terasa seperti mimpi indah yang tak ingin kubaangun dari tidur.

Aku masih ingat jelas detik-detik ketika kau mengatakan "iya" menjadi kekasihku. Dunia seakan berhenti berputar, hanya ada kita berdua. Dan sejak saat itu, setiap harinya membawa kebahagiaan baru yang tak terduga.

Dalam satu bulan ini, aku belajar bahwa cinta bukan hanya tentang perasaan berdebar-debar saat bertemu, tetapi juga tentang kenyamanan dalam diam bersama. Bukan hanya tentang tawa yang menggema, tetapi juga tentang saling memahami dalam kesedihan.

Kau telah menjadi alasan senyumku setiap pagi, alasan aku bersemangat menjalani hari, dan alasan aku berharap besok akan datang lebih cepat. Setiap pesan darimu adalah sinar matahari di hari kelabu, setiap tawamu adalah musik terindah di telingaku.

Terima kasih untuk kesabaranmu memahami segala kekuranganku. Terima kasih untuk senyumanmu yang selalu menyambutku. Terima kasih untuk keberanianmu mencintaiku apa adanya.

Satu bulan mungkin waktu yang singkat bagi sebagian orang, tapi bagi kita ini adalah fondasi kokoh untuk sebuah bangunan cinta abadi. Aku berjanji akan terus berusaha menjadi yang terbaik untukmu, untuk kita.

Di bulan pertama ini, ijinkan aku berjanji:
Aku akan selalu mendengarmu, dalam suka maupun duka.
Aku akan menghargai setiap momen bersamamu.
Aku akan tumbuh bersamamu, belajar bersamamu.
Dan yang terpenting, aku akan terus mencintaimu lebih dalam setiap harinya.

Selamat satu bulan, sayangku. Ini baru awal dari perjalanan panjang kita. Mari kita tulis babak-babak indah selanjutnya bersama.

Aku mencintaimu hari ini, besok, dan selamanya.
Selamat ulang bulan hubungan kita, kekasihku.

Dengan cinta yang tak terhingga,
Selamanya milikmu.`;

// Kode sandi yang benar (tanggal jadian)
const CORRECT_CODE = "171225"; // 17 Desember 2025

// Konfigurasi
const CONFIG = {
    messageSpeed: 100, // ms per kata
    unlockAnimationDuration: 1000, // ms
    maxAttempts: 3,
    lockoutTime: 30000 // 30 detik jika salah 3x
};

// State aplikasi
const state = {
    attempts: 0,
    locked: false,
    unlocked: false,
    messageRevealed: false,
    unlockTime: null
};

/**
 * Inisialisasi aplikasi pesan rahasia
 */
function initializeSecretMessage() {
    console.log('💌 Initializing anniversary secret message system...');
    
    // Setup digit inputs
    setupDigitInputs();
    
    // Setup unlock button
    setupUnlockButton();
    
    // Setup auto-focus
    autoFocusFirstDigit();
    
    // Setup countdown
    initializeCountdown();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup form reset
    setupFormReset();
    
    // Check if already unlocked (from localStorage)
    checkPreviousUnlock();
    
    console.log('✅ Secret message system initialized');
}

/**
 * Setup input digit untuk kode
 */
function setupDigitInputs() {
    const digitInputs = document.querySelectorAll('.secret-input-digit');
    
    digitInputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', function(e) {
            const value = this.value;
            
            // Hanya angka yang diperbolehkan
            if (!/^\d*$/.test(value)) {
                this.value = value.replace(/\D/g, '');
                return;
            }
            
            // Auto-focus ke input berikutnya jika sudah diisi
            if (value.length === 1 && index < digitInputs.length - 1) {
                digitInputs[index + 1].focus();
            }
            
            // Sembunyikan error jika ada
            hideCodeError();
        });
        
        // Handle keyboard navigation
        input.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Backspace':
                    if (this.value.length === 0 && index > 0) {
                        digitInputs[index - 1].focus();
                        digitInputs[index - 1].value = '';
                    }
                    break;
                    
                case 'ArrowLeft':
                    if (index > 0) {
                        digitInputs[index - 1].focus();
                    }
                    break;
                    
                case 'ArrowRight':
                    if (index < digitInputs.length - 1) {
                        digitInputs[index + 1].focus();
                    }
                    break;
                    
                case 'Enter':
                    document.getElementById('unlockMessage').click();
                    break;
            }
        });
        
        // Handle paste (untuk kode lengkap)
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();
            
            if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
                const digits = pastedData.split('');
                digits.forEach((digit, idx) => {
                    if (digitInputs[idx]) {
                        digitInputs[idx].value = digit;
                    }
                });
                
                // Auto submit jika kode lengkap
                setTimeout(() => {
                    document.getElementById('unlockMessage').click();
                }, 100);
            }
        });
    });
}

/**
 * Setup tombol unlock
 */
function setupUnlockButton() {
    const unlockButton = document.getElementById('unlockMessage');
    
    unlockButton.addEventListener('click', function() {
        if (state.locked) {
            showLockoutMessage();
            return;
        }
        
        const enteredCode = getEnteredCode();
        
        if (enteredCode.length < 6) {
            showCodeError('Kode belum lengkap! Masukkan 6 digit kode cinta kita.');
            return;
        }
        
        if (validateCode(enteredCode)) {
            unlockSecretMessage();
        } else {
            handleWrongCode();
        }
    });
}

/**
 * Mendapatkan kode yang dimasukkan
 */
function getEnteredCode() {
    const digitInputs = document.querySelectorAll('.secret-input-digit');
    let code = '';
    digitInputs.forEach(input => {
        code += input.value;
    });
    return code;
}

/**
 * Validasi kode
 */
function validateCode(code) {
    return code === CORRECT_CODE;
}

/**
 * Membuka pesan rahasia
 */
function unlockSecretMessage() {
    console.log('🔓 Unlocking secret message...');
    
    // Update state
    state.unlocked = true;
    state.unlockTime = new Date();
    
    // Save to localStorage
    localStorage.setItem('anniversaryUnlocked', 'true');
    localStorage.setItem('unlockTime', state.unlockTime.toISOString());
    
    // Tampilkan pesan sukses
    showUnlockSuccess();
    
    // Tampilkan pesan rahasia
    revealSecretMessage();
    
    // Update UI
    updateUIAfterUnlock();
    
    // Putar sukses sound (opsional)
    playSuccessSound();
}

/**
 * Menampilkan pesan rahasia dengan animasi kata per kata
 */
function revealSecretMessage() {
    const secretMessage = document.getElementById('secretMessage');
    const messageText = document.getElementById('messageText');
    
    // Tampilkan container pesan
    secretMessage.style.display = 'block';
    secretMessage.classList.add('unlock-success');
    
    // Clear previous content
    messageText.innerHTML = '';
    
    // Split message into words
    const words = ROMANTIC_MESSAGE.split(' ');
    
    // Create word elements
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'message-word';
        wordSpan.textContent = word + (word.includes('\n') ? '' : ' ');
        messageText.appendChild(wordSpan);
        
        // Animate each word
        setTimeout(() => {
            wordSpan.classList.add('visible');
            
            // Auto scroll jika diperlukan
            if (index % 20 === 0) {
                wordSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, CONFIG.messageSpeed * index);
    });
    
    state.messageRevealed = true;
    
    // Scroll to message
    setTimeout(() => {
        secretMessage.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

/**
 * Handle kode salah
 */
function handleWrongCode() {
    state.attempts++;
    
    // Show error with shake animation
    showCodeError('Kode cinta salah! Ingat tanggal spesial kita: 17-12-25');
    playErrorSound();
    
    // Shake animation untuk semua input
    const digitInputs = document.querySelectorAll('.secret-input-digit');
    digitInputs.forEach(input => {
        input.classList.add('shake-animation');
        setTimeout(() => {
            input.classList.remove('shake-animation');
        }, 500);
    });
    
    // Check if locked out
    if (state.attempts >= CONFIG.maxAttempts) {
        lockSystem();
    }
    
    // Clear inputs after wrong attempt
    setTimeout(() => {
        clearCodeInputs();
        autoFocusFirstDigit();
    }, 1000);
}

/**
 * Kunci sistem setelah terlalu banyak percobaan salah
 */
function lockSystem() {
    state.locked = true;
    
    // Show lockout message
    showLockoutMessage();
    
    // Auto unlock after lockout time
    setTimeout(() => {
        state.locked = false;
        state.attempts = 0;
        hideLockoutMessage();
        showCodeError('Sistem sudah terbuka kembali. Coba ingat tanggal jadian kita!');
    }, CONFIG.lockoutTime);
}

/**
 * Update UI setelah berhasil unlock
 */
function updateUIAfterUnlock() {
    const unlockButton = document.getElementById('unlockMessage');
    const digitInputs = document.querySelectorAll('.secret-input-digit');
    
    // Update button
    unlockButton.innerHTML = '<i class="fas fa-lock-open"></i> Terbuka dengan Cinta';
    unlockButton.style.background = '#4CAF50';
    unlockButton.disabled = true;
    
    // Disable inputs
    digitInputs.forEach(input => {
        input.disabled = true;
        input.style.background = '#f0f0f0';
    });
    
    // Show celebration
    showCelebration();
}

/**
 * Tampilkan animasi sukses
 */
function showUnlockSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-heart" style="font-size: 3rem; color: #ff477e; animation: heartbeat 1s 3;"></i>
            <h3 style="color: #4CAF50; margin-top: 10px;">Berhasil! 💕</h3>
            <p>Pesan cintaku untukmu...</p>
        </div>
    `;
    
    const unlockContainer = document.querySelector('.secret-unlock');
    unlockContainer.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

/**
 * Tampilkan error kode
 */
function showCodeError(message) {
    const errorDiv = document.getElementById('codeError');
    errorDiv.innerHTML = `<i class="fas fa-times-circle"></i> ${message}`;
    errorDiv.style.display = 'block';
}

/**
 * Sembunyikan error kode
 */
function hideCodeError() {
    const errorDiv = document.getElementById('codeError');
    errorDiv.style.display = 'none';
}

/**
 * Tampilkan pesan lockout
 */
function showLockoutMessage() {
    const lockoutDiv = document.createElement('div');
    lockoutDiv.id = 'lockoutMessage';
    lockoutDiv.className = 'lockout-message';
    lockoutDiv.innerHTML = `
        <i class="fas fa-lock"></i>
        <h3>Sistem Terkunci!</h3>
        <p>Coba lagi dalam 30 detik. Ingat tanggal jadian kita: 17 Desember 2025</p>
        <div class="countdown">30</div>
    `;
    
    document.querySelector('.secret-unlock').appendChild(lockoutDiv);
    
    // Start countdown
    let timeLeft = 30;
    const countdownElement = lockoutDiv.querySelector('.countdown');
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            lockoutDiv.remove();
        }
    }, 1000);
}

/**
 * Sembunyikan pesan lockout
 */
function hideLockoutMessage() {
    const lockoutDiv = document.getElementById('lockoutMessage');
    if (lockoutDiv) {
        lockoutDiv.remove();
    }
}

/**
 * Clear semua input kode
 */
function clearCodeInputs() {
    const digitInputs = document.querySelectorAll('.secret-input-digit');
    digitInputs.forEach(input => {
        input.value = '';
    });
}

/**
 * Auto-focus ke digit pertama
 */
function autoFocusFirstDigit() {
    const firstDigit = document.querySelector('.secret-input-digit');
    if (firstDigit && !state.unlocked) {
        firstDigit.focus();
    }
}

/**
 * Setup countdown ke bulan berikutnya
 */
function initializeCountdown() {
    function updateCountdown() {
        const countdownElement = document.getElementById('monthCountdown');
        if (!countdownElement) return;
        
        const anniversary = new Date(2025, 11, 17); // 17 Desember 2025
        const now = new Date();
        const nextMonth = new Date(anniversary);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        const diff = nextMonth - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <div class="countdown-display">
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Hari</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Jam</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Menit</span>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = `
                <div class="countdown-complete">
                    <i class="fas fa-heart"></i>
                    <h3>Selamat! Kita sudah melewati bulan pertama!</h3>
                    <p>Mari lanjutkan perjalanan cinta kita 💕</p>
                </div>
            `;
        }
    }
    
    // Update sekarang dan setiap menit
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Reset form button
    const clearFormBtn = document.getElementById('clearForm');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            if (confirm('Apakah kamu yakin ingin menghapus semua input?')) {
                clearCodeInputs();
                autoFocusFirstDigit();
                hideCodeError();
            }
        });
    }
    
    // Keyboard shortcut untuk reset (Ctrl + R)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            clearCodeInputs();
            autoFocusFirstDigit();
        }
    });
}

/**
 * Setup form reset
 */
function setupFormReset() {
    // Clear button untuk form
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn-clear';
    clearBtn.innerHTML = '<i class="fas fa-redo"></i> Reset Kode';
    clearBtn.onclick = function() {
        clearCodeInputs();
        autoFocusFirstDigit();
        hideCodeError();
    };
    
    const formActions = document.querySelector('.form-actions');
    if (formActions) {
        formActions.appendChild(clearBtn);
    }
}

/**
 * Cek apakah sudah pernah unlock sebelumnya
 */
function checkPreviousUnlock() {
    const wasUnlocked = localStorage.getItem('anniversaryUnlocked') === 'true';
    const unlockTime = localStorage.getItem('unlockTime');
    
    if (wasUnlocked && unlockTime) {
        const unlockDate = new Date(unlockTime);
        const now = new Date();
        const diffDays = Math.floor((now - unlockDate) / (1000 * 60 * 60 * 24));
        
        // Valid untuk 7 hari
        if (diffDays <= 7) {
            state.unlocked = true;
            unlockSecretMessage();
        } else {
            // Clear jika sudah kadaluarsa
            localStorage.removeItem('anniversaryUnlocked');
            localStorage.removeItem('unlockTime');
        }
    }
}

/**
 * Tampilkan animasi celebration
 */
function showCelebration() {
    const celebrationDiv = document.createElement('div');
    celebrationDiv.className = 'celebration-overlay';
    celebrationDiv.innerHTML = `
        <div class="celebration-content">
            <i class="fas fa-heart celebration-heart"></i>
            <i class="fas fa-heart celebration-heart"></i>
            <i class="fas fa-heart celebration-heart"></i>
            <h2>Selamat 1 Bulan!</h2>
            <p>💕 Cinta Kita 💕</p>
        </div>
    `;
    
    document.body.appendChild(celebrationDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        celebrationDiv.remove();
    }, 3000);
}

/**
 * Putar suara sukses
 */
function playSuccessSound() {
    // Bisa ditambahkan sound effect
    console.log('🎵 Playing success sound');
    // Contoh: new Audio('success-sound.mp3').play();
}

/**
 * Putar suara error
 */
function playErrorSound() {
    console.log('⚠️ Playing error sound');
    // Contoh: new Audio('error-sound.mp3').play();
}

/**
 * Setup CSS animations
 */
function setupAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .shake-animation {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% { transform: translateX(-1px); }
            20%, 80% { transform: translateX(2px); }
            30%, 50%, 70% { transform: translateX(-3px); }
            40%, 60% { transform: translateX(3px); }
        }
        
        .celebration-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 182, 193, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.5s;
        }
        
        .celebration-content {
            text-align: center;
            color: white;
            animation: popIn 0.5s;
        }
        
        .celebration-heart {
            font-size: 4rem;
            margin: 0 10px;
            animation: float 3s ease-in-out infinite;
        }
        
        .celebration-heart:nth-child(2) { animation-delay: 0.5s; }
        .celebration-heart:nth-child(3) { animation-delay: 1s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .lockout-message {
            background: #ffebee;
            border: 2px solid #ffcdd2;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
            animation: slideIn 0.5s;
        }
        
        .lockout-message .countdown {
            font-size: 2rem;
            font-weight: bold;
            color: #f44336;
            margin: 10px 0;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .countdown-display {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 20px 0;
        }
        
        .countdown-item {
            text-align: center;
        }
        
        .countdown-number {
            font-size: 3rem;
            font-weight: bold;
            color: #ff477e;
            display: block;
        }
        
        .countdown-label {
            font-size: 1rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .countdown-complete {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #ffafcc, #ffc8dd);
            border-radius: 15px;
            color: white;
        }
        
        .success-message {
            background: #e8f5e9;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
            animation: successPop 0.5s;
        }
        
        @keyframes successPop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .message-word {
            opacity: 0;
            transform: translateY(10px);
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        .message-word.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .message-word:nth-child(5n) {
            color: #ff477e;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Inisialisasi saat halaman dimuat
 */
document.addEventListener('DOMContentLoaded', function() {
    // Setup CSS animations
    setupAnimations();
    
    // Initialize secret message system
    initializeSecretMessage();
    
    // Add loading indicator
    console.log('💖 Anniversary Message System Ready!');
    
    // Tambahkan efek konfeti saat halaman dimuat
    setTimeout(() => {
        if (Math.random() > 0.7) {
            showConfetti();
        }
    }, 1000);
});

/**
 * Efek konfeti (opsional)
 */
function showConfetti() {
    const confettiCount = 50;
    const colors = ['#ff477e', '#ff85a2', '#ffafcc', '#b388eb'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.innerHTML = '💖';
        confetti.style.position = 'fixed';
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.zIndex = '9998';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}

// Export untuk modularitas (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSecretMessage,
        ROMANTIC_MESSAGE,
        CORRECT_CODE
    };
}