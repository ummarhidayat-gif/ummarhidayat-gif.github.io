// Fungsi untuk scroll ke atas
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle dark/light mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Simpan preferensi tema di localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Animasi scroll untuk section
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Observ header juga
observer.observe(header);

// Efek hover untuk kontak
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('span').textContent;
        
        // Coba menyalin teks ke clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Tampilkan pesan sukses
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Tersalin!';
            
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
            }, 1500);
        }).catch(err => {
            console.error('Gagal menyalin: ', err);
            // Fallback untuk browser yang tidak support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Tersalin!';
            
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
            }, 1500);
        });
    });
});

// Perbaiki gambar jika tidak ditemukan
const profileImage = document.getElementById('profileImage');
profileImage.addEventListener('error', function() {
    this.src = 'https://via.placeholder.com/300x300/1a2a6c/ffffff?text=Umar+Hidayat';
    this.alt = 'Foto Profil Umar Hidayat - Gambar Tidak Ditemukan';
});

// Tampilkan tombol scroll ke atas hanya saat di-scroll ke bawah
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Muat preferensi tema dari localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    // Tambahkan animasi pada header setelah halaman dimuat
    setTimeout(() => {
        header.classList.add('visible');
    }, 300);
});

// Animasi ketik untuk header
function initTypeWriter() {
    const headerTexts = document.querySelectorAll('header h1, header p');
    headerTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                text.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + (index * 20));
            }
        };
        
        setTimeout(typeWriter, 500 + (index * 300));
    });
}

// Inisialisasi typewriter setelah halaman dimuat
window.addEventListener('load', initTypeWriter);