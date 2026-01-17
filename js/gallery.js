// Data galeri
const galleryData = [
    {
        id: 1,
        video: '../vid/kenangan-4.mp4',
        thumbnail: '../img/thumbnails/kenangan-4.jpg', // Tambahkan thumbnail
        category: 'dates',
        date: '17 Desember 2025',
        caption: 'Kencan pertama kita di cafe kopi'
    },
    {
        id: 2,
        video: '../vid/kenangan-5.mp4',
        thumbnail: '../img/thumbnails/kenangan-5.jpg',
        category: 'special',
        date: '24 Desember 2025',
        caption: 'second date - sudah mulai timbul rasa sayang satu sama lain'
    },
    {
        id: 3,
        video: '../vid/kenangan-6.mp4',
        thumbnail: '../img/thumbnails/kenangan-6.jpg',
        category: 'special',
        date: '31 Desember 2025',
        caption: 'Malam Tahun Baru bersama'
    },
    {
        id: 4,
        video: '../vid/kenangan-13.mp4',
        thumbnail: '../img/thumbnails/kenangan-13.jpg',
        category: 'everyday',
        date: '01 Januari 2026',
        caption: 'Pembukaan malam tahun baru bersama'
    },
    {
        id: 5,
        video: '../vid/kenangan-14.mp4',
        thumbnail: '../img/thumbnails/kenangan-14.jpg',
        category: 'dates',
        date: '01 Januari 2026',
        caption: 'Makan malam perayaan di restoran favorit kita'
    },
    {
        id: 6,
        video: '../vid/kenangan-15.mp4',
        thumbnail: '../img/thumbnails/kenangan-15.jpg',
        category: 'everyday',
        date: '01 Januari 2026',
        caption: 'Pelukan hangat di tengah malam dingin tahun baru'
    },
    {
        id: 7,
        video: '../vid/kenangan-7.mp4',
        thumbnail: '../img/thumbnails/kenangan-7.jpg',
        category: 'special',
        date: '14 Januari 2026',
        caption: 'Full day date - jalan-jalan ke taman dan piknik bersama'
    },
    {
        id: 8,
        video: '../vid/kenangan-8.mp4',
        thumbnail: '../img/thumbnails/kenangan-8.jpg',
        category: 'everyday',
        date: '14 Januari 2026',
        caption: 'Makan Bakso bersama setelah jalan-jalan'
    },
    {
        id: 9,
        video: '../vid/kenangan-99.mp4',
        thumbnail: '../img/thumbnails/kenangan-99.jpg',
        category: 'dates',
        date: '14 Januari 2026',
        caption: 'Kegabutan di rumah, nonton film bareng'
    },
    {
        id: 10,
        video: '../vid/kenangan-10.mp4',
        thumbnail: '../img/thumbnails/kenangan-10.jpg',
        category: 'travel',
        date: '14 Januari 2026',
        caption: 'Lapar malam setelah seharian jalan-jalan'
    },
    {
        id: 11,
        video: '../vid/kenangan-11.mp4',
        thumbnail: '../img/thumbnails/kenangan-11.jpg',
        category: 'travel',
        date: '15 Januari 2026',
        caption: 'Menikmati kegembiraan setelah seharian berkeliling kota'
    },
    {
        id: 12,
        video: '../vid/kenangan-12.mp4',
        thumbnail: '../img/thumbnails/kenangan-12.jpg',
        category: 'travel',
        date: '15 Januari 2026',
        caption: 'Keliling kota sambil menikmati es krim bersama'
    }
];

// Elemen DOM
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const photoCount = document.getElementById('photoCount');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentFilter = 'all';
let currentVideoIndex = 0;
let filteredVideos = [];

// Inisialisasi Galeri
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    // Muat item galeri
    loadGalleryItems();
    
    // Setup tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus kelas aktif dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas aktif ke tombol yang diklik
            this.classList.add('active');
            // Perbarui filter saat ini
            currentFilter = this.dataset.filter;
            // Muat ulang item galeri
            loadGalleryItems();
        });
    });
    
    // Event lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevVideo);
    lightboxNext.addEventListener('click', showNextVideo);
    
    // Tutup lightbox saat klik di luar konten
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigasi keyboard
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevVideo();
            if (e.key === 'ArrowRight') showNextVideo();
            if (e.key === ' ') { // Space untuk play/pause
                const video = document.querySelector('.lightbox-video');
                if (video) {
                    if (video.paused) video.play();
                    else video.pause();
                }
            }
        }
    });
}

function loadGalleryItems() {
    // Kosongkan grid galeri
    galleryGrid.innerHTML = '';
    
    // Filter video berdasarkan filter saat ini
    if (currentFilter === 'all') {
        filteredVideos = galleryData;
    } else {
        filteredVideos = galleryData.filter(item => item.category === currentFilter);
    }
    
    // Perbarui jumlah video
    photoCount.textContent = filteredVideos.length;
    
    // Buat item galeri
    filteredVideos.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.category = item.category;
        galleryItem.dataset.index = index;
        
        // Gunakan video preview dengan thumbnail/GIF sebagai fallback
        galleryItem.innerHTML = `
            <div class="video-preview">
                <video muted loop playsinline preload="metadata">
                    <source src="${item.video}" type="video/mp4">
                </video>
                <div class="video-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
            </div>
            <div class="gallery-overlay">
                <div class="gallery-date">${item.date}</div>
                <p>${item.caption}</p>
            </div>
        `;
        
        // Setup video untuk autoplay saat hover
        const videoElement = galleryItem.querySelector('video');
        galleryItem.addEventListener('mouseenter', function() {
            if (videoElement) {
                videoElement.currentTime = 0;
                videoElement.play().catch(e => console.log("Autoplay prevented:", e));
            }
        });
        
        galleryItem.addEventListener('mouseleave', function() {
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        });
        
        // Tambahkan event klik untuk membuka lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
        
        galleryGrid.appendChild(galleryItem);
    });
}

function openLightbox(index) {
    currentVideoIndex = index;
    const videoItem = filteredVideos[index];
    
    // Kosongkan dan isi ulang lightbox dengan video
    lightbox.innerHTML = `
        <button class="lightbox-close" id="lightboxClose" title="Tutup lightbox">
            <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-prev" id="lightboxPrev" title="Video sebelumnya">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="lightbox-next" id="lightboxNext" title="Video berikutnya">
            <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-content">
            <video class="lightbox-video" controls autoplay>
                <source src="${videoItem.video}" type="video/mp4">
                Browser Anda tidak mendukung tag video.
            </video>
            <div class="lightbox-caption">${videoItem.caption} - ${videoItem.date}</div>
        </div>
    `;
    
    // Re-attach event listeners
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', showPrevVideo);
    document.getElementById('lightboxNext').addEventListener('click', showNextVideo);
    
    // Tampilkan lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Fokus ke video untuk keyboard controls
    setTimeout(() => {
        const videoElement = document.querySelector('.lightbox-video');
        if (videoElement) videoElement.focus();
    }, 100);
}

function closeLightbox() {
    // Hentikan video sebelum menutup
    const videoElement = document.querySelector('.lightbox-video');
    if (videoElement) {
        videoElement.pause();
    }
    
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevVideo() {
    currentVideoIndex--;
    if (currentVideoIndex < 0) {
        currentVideoIndex = filteredVideos.length - 1;
    }
    updateLightboxVideo();
}

function showNextVideo() {
    currentVideoIndex++;
    if (currentVideoIndex >= filteredVideos.length) {
        currentVideoIndex = 0;
    }
    updateLightboxVideo();
}

function updateLightboxVideo() {
    const videoItem = filteredVideos[currentVideoIndex];
    
    // Update konten lightbox dengan video baru
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.innerHTML = `
            <video class="lightbox-video" controls autoplay>
                <source src="${videoItem.video}" type="video/mp4">
                Browser Anda tidak mendukung tag video.
            </video>
            <div class="lightbox-caption">${videoItem.caption} - ${videoItem.date}</div>
        `;
    }
}