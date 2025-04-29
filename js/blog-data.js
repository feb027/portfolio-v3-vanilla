const blogPostsData = [
    {
        id: 1,
        title: "Judul Postingan Pertama",
        summary: "Ini adalah ringkasan singkat dari postingan blog pertama. Anda bisa menulis beberapa kalimat di sini.",
        link: "#", // Ganti dengan link sebenarnya nanti (misal: post1.html)
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg", // Ganti dengan path gambar jika ada: "assets/blog/image1.jpg"
        category: "Web Dev", // Contoh kategori
        content: `
            <p>Ini adalah paragraf pertama dari isi lengkap <strong>Postingan Pertama</strong>.</p>
            <p>Anda bisa menambahkan lebih banyak paragraf, gambar, daftar, atau elemen HTML lainnya di sini sesuai kebutuhan.</p>
            <pre><code class="language-javascript">// Contoh blok kode
function greet(name) {
  console.log(\`Hello, \${name}!\`);\n}\ngreet('World');</code></pre>
            <p>Pastikan Anda menggunakan tag HTML yang sesuai untuk struktur konten Anda.</p>
            <ul>
                <li>Poin penting 1</li>
                <li>Poin penting 2</li>
            </ul>
        `
    },
    {
        id: 2,
        title: "Postingan Blog Kedua",
        summary: "Deskripsi lain untuk postingan blog kedua. Berisi konten yang menarik.",
        link: "#",
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg", // Contoh dengan gambar placeholder
        category: "Tutorial",
        content: `
            <p>Ini adalah konten untuk <strong>Postingan Kedua</strong>.</p>
            <p>Konten ini berfokus pada tutorial. Berikut langkah-langkahnya:</p>
            <ol>
                <li>Langkah pertama</li>
                <li>Langkah kedua</li>
                <li>Langkah ketiga</li>
            </ol>
            <p>Semoga tutorial ini bermanfaat!</p>
        `
    },
    {
        id: 3,
        title: "Postingan Ketiga: Lebih Banyak Teks",
        summary: "Postingan ini tidak memiliki gambar, tetapi memiliki teks yang lebih panjang untuk mengisi ruang. Cocok untuk penjelasan mendalam.",
        link: "#",
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg", 
        category: "Opini",
        content: `
            <p>Ini adalah <strong>Postingan Ketiga</strong> yang isinya lebih panjang dan tidak menampilkan gambar utama.</p>
            <p>Di sini Anda dapat menguraikan opini atau pemikiran mendalam tentang suatu topik. Format teks panjang memungkinkan eksplorasi ide yang lebih detail.</p>
            <blockquote>
                <p>"Kutipan menarik bisa ditambahkan di sini untuk memperkuat argumen atau memberikan perspektif lain."</p>
                <footer>— Sumber Kutipan</footer>
            </blockquote>
            <p>Paragraf penutup untuk merangkum pembahasan.</p>
        `
    },
    {
        id: 4,
        title: "Mengatur Environment Development",
        summary: "Langkah-langkah mudah untuk menyiapkan lingkungan pengembangan lokal Anda.",
        link: "#",
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg",
        category: "Tutorial",
        content: `
            <p>Menyiapkan lingkungan pengembangan yang baik adalah kunci produktivitas. Artikel ini akan membahas langkah-langkahnya.</p>
            <h2>Instalasi Node.js</h2>
            <p>Kunjungi situs resmi Node.js dan unduh versi LTS terbaru...</p>
            <h2>Setup Editor Kode (VS Code)</h2>
            <p>Instal ekstensi penting seperti Prettier, ESLint...</p>
            <pre><code class="language-bash"># Contoh perintah terminal
npm install -g yarn</code></pre>
            <p>Dengan mengikuti langkah-langkah ini, Anda siap untuk mulai coding!</p>
        `
    },
    {
        id: 5,
        title: "Pengenalan CSS Grid Layout",
        summary: "Pelajari dasar-dasar CSS Grid untuk membuat layout web yang kompleks dan responsif dengan mudah.",
        link: "#",
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg", // Tanpa gambar
        category: "Web Dev",
        content: `
            <p>CSS Grid adalah sistem layout dua dimensi yang sangat powerful untuk web.</p>
            <h2>Properti Container Grid</h2>
            <p>Pelajari tentang <code>display: grid</code>, <code>grid-template-columns</code>, <code>grid-template-rows</code>, dan <code>gap</code>.</p>
            <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}</code></pre>
            <h2>Properti Item Grid</h2>
            <p>Pahami cara menempatkan item menggunakan <code>grid-column</code> dan <code>grid-row</code>.</p>
        `
    },
    {
        id: 6,
        title: "Tips Produktivitas untuk Developer",
        summary: "Beberapa tips dan trik untuk meningkatkan fokus dan efisiensi saat bekerja sebagai developer.",
        link: "#",
        date: "28 April 2025",
        image: "./assets/projects/placeholder.jpg",
        category: "Karir",
        content: `
            <p>Menjadi developer produktif membutuhkan lebih dari sekadar skill coding.</p>
            <ul>
                <li><strong>Manajemen Waktu:</strong> Gunakan teknik seperti Pomodoro.</li>
                <li><strong>Automatisasi:</strong> Manfaatkan script dan alias untuk tugas berulang.</li>
                <li><strong>Istirahat Teratur:</strong> Cegah burnout dengan istirhat yang cukup.</li>
                <li><strong>Fokus:</strong> Minimalkan distraksi saat sedang deep work.</li>
            </ul>
            <p>Menerapkan tips ini dapat membantu Anda mencapai lebih banyak.</p>
        `
    },
    {
        id: 7,
        title: "Perbedaan Antara NULL dan UNDEFINED di JavaScript",
        summary: "Penjelasan singkat mengenai dua nilai primitif yang sering membingungkan di JavaScript: null dan undefined.",
        link: "#",
        date: "28 April 2025",
        image: null,
        category: "JavaScript",
        content: `
            <p>Dalam JavaScript, <code>null</code> dan <code>undefined</code> seringkali tampak mirip, tapi memiliki makna semantik yang berbeda.</p>
            <h2>Undefined</h2>
            <p><code>undefined</code> biasanya berarti sebuah variabel telah dideklarasikan tetapi belum diberi nilai.</p>
            <pre><code class="language-javascript">let x;\nconsole.log(x); // undefined</code></pre>
            <h2>Null</h2>
            <p><code>null</code> adalah nilai assignment yang disengaja. Ini mewakili ketiadaan nilai objek secara eksplisit.</p>
            <pre><code class="language-javascript">let y = null;\nconsole.log(y); // null</code></pre>
            <p>Memahami perbedaannya penting untuk debugging dan menulis kode yang bersih.</p>
        `
    }
    // Tambahkan lebih banyak objek postingan di sini
];

export default blogPostsData; 