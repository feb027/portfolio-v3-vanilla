import articlesData from './articles-data.js';

function displayArticleNotFound() {
    const contentArea = document.getElementById('article-main-column'); // Target kolom utama
    const notFoundMessage = document.getElementById('article-not-found');
    if (contentArea) {
        // Sembunyikan semua section kecuali pesan error
        const sectionsToHide = contentArea.querySelectorAll('article, section, nav');
        sectionsToHide.forEach(el => el.classList.add('d-none'));
    }
    if (notFoundMessage) notFoundMessage.classList.remove('d-none');
    document.title = "Artikel Tidak Ditemukan - FebnawanFR";
}

// Fungsi untuk render kartu rekomendasi
function createRecommendedArticleCard(article) {
    const detailLink = `article.html?id=${article.id}`;
    const imageHtml = article.image
        ? `<img src="${article.image}" alt="${article.title}" class="img-fluid rounded rec-article-img">`
        : '<div class="rec-article-img-placeholder"></div>';

    return `
    <div class="col-md-6">
        <a href="${detailLink}" class="recommended-article-card">
             ${imageHtml}
            <div class="rec-article-content">
                <h6 class="rec-article-title">${article.title}</h6>
                <small class="text-muted"><i class="ri-calendar-line"></i> ${article.date}</small>
            </div>
        </a>
    </div>
    `;
}

function renderArticleDetails() {
    // 1. Dapatkan ID
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    if (!articleId || isNaN(parseInt(articleId))) {
        displayArticleNotFound();
        return;
    }
    const articleIdNumber = parseInt(articleId);

    // 2. Cari Artikel
    const articleIndex = articlesData.findIndex(a => a.id === articleIdNumber);
    if (articleIndex === -1) {
        displayArticleNotFound();
        return;
    }
    const article = articlesData[articleIndex];

    // 3. Isi Konten Utama
    document.title = `${article.title} - FebnawanFR Artikel`;
    document.querySelector('.article-title').textContent = article.title;
    document.querySelector('.article-date').innerHTML = `<i class="ri-calendar-event-line"></i> ${article.date}`;
    const categoryEl = document.querySelector('.article-category');
    if (article.category) {
        categoryEl.innerHTML = `<i class="ri-price-tag-3-line"></i> ${article.category}`;
        categoryEl.style.display = 'inline-flex';
    } else {
        categoryEl.style.display = 'none';
    }
     const authorEl = document.querySelector('.article-author');
    if (article.author) {
        authorEl.innerHTML = `<i class="ri-user-line"></i> ${article.author}`;
         authorEl.style.display = 'inline-flex';
    } else {
         authorEl.style.display = 'none';
    }

    const imageContainer = document.querySelector('.article-image-container');
    if (article.image) {
        imageContainer.innerHTML = `<img src="${article.image}" alt="${article.title}" class="img-fluid rounded mb-3 article-featured-image">`;
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }

    const bodyEl = document.querySelector('.article-body');
    bodyEl.innerHTML = article.content || '<p>Konten tidak tersedia.</p>';
    // Panggil Prism highlighting
    if (window.Prism) {
        Prism.highlightAllUnder(bodyEl);
    }

    // 4. Setup Tombol Share (contoh sederhana)
    const shareTwitter = document.querySelector('.share-btn.twitter');
    const shareFacebook = document.querySelector('.share-btn.facebook');
    const shareLinkedin = document.querySelector('.share-btn.linkedin');
    const pageUrl = window.location.href;
    const pageTitle = encodeURIComponent(article.title);
    if(shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${pageTitle}`;
    if(shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    if(shareLinkedin) shareLinkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${pageTitle}`;

    // 5. Setup Navigasi Prev/Next
    const prevBtn = document.getElementById('prev-article-btn');
    const nextBtn = document.getElementById('next-article-btn');

    if (articleIndex > 0) { // Ada artikel sebelumnya
        const prevArticle = articlesData[articleIndex - 1];
        prevBtn.href = `article.html?id=${prevArticle.id}`;
        prevBtn.classList.remove('disabled');
    } else {
        prevBtn.classList.add('disabled');
    }

    if (articleIndex < articlesData.length - 1) { // Ada artikel selanjutnya
        const nextArticle = articlesData[articleIndex + 1];
        nextBtn.href = `article.html?id=${nextArticle.id}`;
        nextBtn.classList.remove('disabled');
    } else {
        nextBtn.classList.add('disabled');
    }

    // 6. Setup Rekomendasi Artikel (contoh: 2 artikel lain dari kategori yg sama)
    const recommendedContainer = document.getElementById('recommended-articles-list');
    if (recommendedContainer) {
        const relatedArticles = articlesData.filter(
            a => a.category === article.category && a.id !== article.id
        ).slice(0, 2); // Ambil maks 2

        if (relatedArticles.length > 0) {
            recommendedContainer.innerHTML = relatedArticles.map(createRecommendedArticleCard).join('');
        } else {
            // Cari 2 artikel acak jika tidak ada yg se-kategori
            const otherArticles = articlesData.filter(a => a.id !== article.id).sort(() => 0.5 - Math.random()).slice(0, 2);
             if(otherArticles.length > 0) {
                 recommendedContainer.innerHTML = otherArticles.map(createRecommendedArticleCard).join('');
             } else {
                 recommendedContainer.innerHTML = '<p class="text-secondary">Tidak ada rekomendasi artikel lain saat ini.</p>';
             }
        }
    }

}

document.addEventListener('DOMContentLoaded', renderArticleDetails);

// Get article ID from URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// DOM Elements
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list-display');

// Load comments when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (articleId) {
        loadComments();
    }
});

// Handle comment form submission
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('comment-name').value.trim();
        const comment = document.getElementById('comment-text').value.trim();

        if (!name || !comment) {
            alert('Mohon isi semua field yang diperlukan.');
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append('article_id', articleId);
            formData.append('name', name);
            formData.append('comment', comment);

            const response = await fetch('php/submit_comment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Add new comment to the list
                addCommentToList(data.comment);
                // Reset form
                commentForm.reset();
                // Show success message
                alert(data.message);
            } else {
                alert(data.message || 'Terjadi kesalahan saat mengirim komentar.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim komentar.');
        }
    });
}

// Load comments from server
async function loadComments() {
    try {
        const response = await fetch(`php/get_comments.php?article_id=${articleId}`);
        const data = await response.json();

        if (data.success) {
            displayComments(data.comments);
        } else {
            console.error('Error loading comments:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display comments in the list
function displayComments(comments) {
    if (!commentsList) return;

    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="comment-item"><p class="text-secondary">Belum ada komentar.</p></div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <p><strong>${escapeHtml(comment.name)}:</strong> ${escapeHtml(comment.comment_text)}</p>
            <small class="text-muted">${formatDate(comment.created_at)}</small>
        </div>
    `).join('');
}

// Add a single comment to the list
function addCommentToList(comment) {
    if (!commentsList) return;

    // Remove "no comments" message if it exists
    const noCommentsMsg = commentsList.querySelector('.text-secondary');
    if (noCommentsMsg) {
        noCommentsMsg.parentElement.remove();
    }

    // Create new comment element
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <p><strong>${escapeHtml(comment.name)}:</strong> ${escapeHtml(comment.comment_text)}</p>
        <small class="text-muted">${formatDate(comment.created_at)}</small>
    `;

    // Add to the beginning of the list
    commentsList.insertBefore(commentElement, commentsList.firstChild);
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        if (hours === 0) {
            const minutes = Math.floor(diff / (60 * 1000));
            return `${minutes} menit yang lalu`;
        }
        return `${hours} jam yang lalu`;
    }

    // Less than 7 days
    if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days} hari yang lalu`;
    }

    // Otherwise show full date
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 