import blogPostsData from './blog-data.js';

function displayPostNotFound() {
    const contentArea = document.getElementById('post-content-area');
    const notFoundMessage = document.getElementById('post-not-found');
    if (contentArea) contentArea.classList.add('d-none');
    if (notFoundMessage) notFoundMessage.classList.remove('d-none');
    document.title = "Postingan Tidak Ditemukan - FebnawanFR";
}

function renderPostDetails() {
    // 1. Dapatkan ID dari URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    // Validasi ID (harus angka)
    if (!postId || isNaN(parseInt(postId))) {
        displayPostNotFound();
        return;
    }

    const postIdNumber = parseInt(postId);

    // 2. Cari data postingan berdasarkan ID
    const post = blogPostsData.find(p => p.id === postIdNumber);

    // 3. Jika tidak ditemukan, tampilkan error
    if (!post) {
        displayPostNotFound();
        return;
    }

    // 4. Jika ditemukan, isi elemen HTML
    const postTitleEl = document.querySelector('.post-title');
    const postDateEl = document.querySelector('.post-date');
    const postCategoryEl = document.querySelector('.post-category');
    const postImageContainerEl = document.querySelector('.post-image-container');
    const postBodyEl = document.querySelector('.post-body');

    if (postTitleEl) {
        postTitleEl.textContent = post.title;
        document.title = `${post.title} - FebnawanFR Blog`; // Update judul halaman
    }
    if (postDateEl) postDateEl.innerHTML = `<i class="ri-calendar-line"></i> ${post.date}`;
    if (postCategoryEl) {
        if (post.category) {
            postCategoryEl.innerHTML = `<i class="ri-price-tag-3-line"></i> ${post.category}`;
        } else {
            postCategoryEl.style.display = 'none'; // Sembunyikan jika tidak ada kategori
        }
    }
    if (postImageContainerEl) {
        if (post.image) {
            postImageContainerEl.innerHTML = `<img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3 post-featured-image">`;
        } else {
            postImageContainerEl.style.display = 'none'; // Sembunyikan jika tidak ada gambar
        }
    }
    if (postBodyEl) {
        // Pastikan properti 'content' ada di blog-data.js
        postBodyEl.innerHTML = post.content || '<p>Konten belum tersedia.</p>';

        // Panggil Prism.highlightAll() SETELAH konten dimasukkan
        // Pastikan objek Prism ada (script sudah dimuat)
        if (window.Prism) {
            Prism.highlightAllUnder(postBodyEl);
            // Atau cukup Prism.highlightAll(); jika tidak ada masalah performa
        }
    }
}

// Panggil fungsi render saat DOM siap
document.addEventListener('DOMContentLoaded', renderPostDetails); 