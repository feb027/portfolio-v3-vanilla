import articlesData from './articles-data.js';

let currentArticleFilter = 'all'; // Filter aktif untuk artikel

// Fungsi untuk membuat satu item daftar artikel
function createArtikelListItem(article) {
    const detailLink = `article.html?id=${article.id}`;
    const imageHtml = article.image 
        ? `<img src="${article.image}" alt="${article.title}" class="article-list-item-img">` 
        : '<div class="article-list-item-img-placeholder"></div>'; // Placeholder jika tidak ada gambar

    // Buat HTML untuk tags jika ada
    const tagsHtml = article.tags && article.tags.length > 0
        ? `<div class="article-list-item-tags">
               ${article.tags.map(tag => `<span class="tag-item">#${tag}</span>`).join('')}
           </div>`
        : '';

    const metaHtml = `
        <div class="article-list-item-meta">
            <span class="me-3"><i class="ri-calendar-line"></i> ${article.date}</span>
            ${article.category ? `<span class="me-3"><i class="ri-price-tag-3-line"></i> ${article.category}</span>` : ''}
            ${article.author ? `<span><i class="ri-user-line"></i> ${article.author}</span>` : ''} 
        </div>`;

    return `
    <a href="${detailLink}" class="article-list-item">
        <div class="article-list-item-image-wrapper">
            ${imageHtml}
        </div>
        <div class="article-list-item-content">
            <h4 class="article-list-item-title">${article.title}</h4>
            <p class="article-list-item-summary">${article.summary}</p>
            <div class="article-list-item-footer">
                ${metaHtml}
                ${tagsHtml}
            </div>
        </div>
    </a>
    `;
}

// Fungsi untuk merender daftar artikel berdasarkan filter
function renderArticlesList(filter = 'all') {
    const listContainer = document.getElementById('articles-list');
    if (!listContainer) {
        console.error('Article list container not found!');
        return;
    }

    // Filter data
    const articlesToRender = (filter === 'all')
        ? articlesData
        : articlesData.filter(article => article.category === filter);

    let articlesHtml = '';
    if (articlesToRender.length > 0) {
        articlesHtml = articlesToRender.map(createArtikelListItem).join('');
    } else {
        articlesHtml = '<p class="text-center text-secondary py-3">Tidak ada artikel dalam kategori ini.</p>';
    }

    // Animasi fade out sebelum render ulang
    listContainer.style.opacity = '0';
    // Tidak perlu set transisi di sini jika sudah ada di CSS

    setTimeout(() => {
        listContainer.innerHTML = articlesHtml;
        listContainer.style.opacity = '1'; // Kembalikan opacity

        // Re-inisialisasi ScrollReveal
        if (typeof sr !== 'undefined') {
            sr.reveal('.article-list-item', { interval: 80, distance: '40px', delay: 50 }); // Delay kecil
        }
    }, 250); // Durasi sedikit lebih pendek dari blog?
}

// Fungsi untuk membuat dan merender tombol filter artikel
function renderArticleCategoryFilters() {
    const filterContainer = document.getElementById('category-filters-articles');
    if (!filterContainer) return;

    const categories = [...new Set(articlesData.map(article => article.category).filter(cat => cat))];

    let filterButtonsHtml = '<button class="btn filter-btn active" data-category="all">// Semua Kategori</button>';
    categories.forEach(category => {
        const formattedCategory = `// ${category}`;
        filterButtonsHtml += `
            <button class="btn filter-btn" data-category="${category}">${formattedCategory}</button>
        `;
    });

    filterContainer.innerHTML = filterButtonsHtml;

    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-btn')) {
            const selectedCategory = event.target.getAttribute('data-category');
            if (selectedCategory === currentArticleFilter) return;

            currentArticleFilter = selectedCategory;

            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            renderArticlesList(currentArticleFilter);
        }
    });
}

// Panggil saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderArticleCategoryFilters(); // Render filter dulu
    renderArticlesList(currentArticleFilter); // Render daftar awal
}); 