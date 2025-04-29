import blogPostsData from './blog-data.js';

let currentFilter = 'all'; // Menyimpan filter aktif

function createBlogPostCard(post) {
    // Membuat HTML untuk gambar jika ada
    const imageHtml = post.image
        ? `<img src="${post.image}" class="card-img-top" alt="${post.title}">`
        : '';

    // Membuat HTML untuk badge kategori jika ada
    const categoryHtml = post.category
        ? `<span class="badge bg-primary-subtle text-primary-emphasis">${post.category}</span>`
        : '';

    // Buat link yang benar ke halaman detail
    const detailLink = `post.html?id=${post.id}`;

    return `
        <div class="col blog-post-item">
            <div class="card h-100 blog-card d-flex flex-column">
                ${imageHtml}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.summary}</p>
                    <a href="${detailLink}" class="btn btn-primary mt-auto align-self-start">
                        <span>Baca Selengkapnya</span>
                        <i class="ri-arrow-right-line btn-icon"></i>
                    </a>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="ri-calendar-line me-1"></i> ${post.date}
                    </small>
                    ${categoryHtml}
                </div>
            </div>
        </div>
    `;
}

function renderBlogPosts(filter = 'all') {
    const gridContainer = document.querySelector('.blog-posts-grid');
    if (!gridContainer) {
        console.error('Blog post grid container not found!');
        return;
    }

    // Filter data
    const filteredPosts = (filter === 'all')
        ? blogPostsData
        : blogPostsData.filter(post => post.category === filter);

    let allPostsHtml = '';
    if (filteredPosts.length > 0) {
        filteredPosts.forEach(post => {
            allPostsHtml += createBlogPostCard(post);
        });
    } else {
        // Tampilkan pesan jika tidak ada post yang cocok
        allPostsHtml = '<div class="col-12"><p class="text-center text-secondary">Tidak ada postingan dalam kategori ini.</p></div>';
    }

    // Animasi fade out sebelum render ulang (opsional tapi bagus)
    gridContainer.style.opacity = '0';
    gridContainer.style.transition = 'opacity 0.3s ease-out';

    setTimeout(() => {
        gridContainer.innerHTML = allPostsHtml;
        gridContainer.style.opacity = '1';

        // Re-inisialisasi ScrollReveal untuk item yang baru dirender
        if (typeof sr !== 'undefined') {
            sr.reveal('.blog-post-item', { interval: 100, delay: 100 }); // Tambahkan delay kecil
        }
    }, 300); // Sesuaikan delay dengan transisi opacity
}

// Fungsi untuk membuat dan merender tombol filter
function renderCategoryFilters() {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // 1. Dapatkan semua kategori unik (jangan sertakan null/undefined)
    const categories = [...new Set(blogPostsData.map(post => post.category).filter(cat => cat))];

    // 2. Buat HTML untuk tombol kategori
    let filterButtonsHtml = '<button class="btn filter-btn active" data-category="all">// Semua Kategori</button>'; // Tombol "Semua" sudah ada
    categories.forEach(category => {
        // Format nama kategori untuk tampilan (contoh: Web Dev -> // Web Dev)
        const formattedCategory = `// ${category}`;
        filterButtonsHtml += `
            <button class="btn filter-btn" data-category="${category}">${formattedCategory}</button>
        `;
    });

    filterContainer.innerHTML = filterButtonsHtml;

    // 3. Tambahkan event listener ke container (event delegation)
    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-btn')) {
            const selectedCategory = event.target.getAttribute('data-category');

            // Jangan lakukan apa-apa jika filter yang sama diklik
            if (selectedCategory === currentFilter) return;

            currentFilter = selectedCategory;

            // Update kelas 'active' pada tombol
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Render ulang postingan dengan filter baru
            renderBlogPosts(currentFilter);
        }
    });
}

// Panggil fungsi-fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilters(); // Render filter dulu
    renderBlogPosts(currentFilter); // Render postingan awal (semua)
}); 