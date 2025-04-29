const articlesData = [
    {
        id: 101, // Gunakan range ID berbeda dari blog
        title: "Panduan Lengkap Flexbox",
        summary: "Kuasai layout web modern dengan panduan mendalam tentang CSS Flexbox, propertinya, dan contoh penggunaannya.",
        date: "15 Mei 2025",
        image: "./assets/projects/placeholder.jpg", // Ganti dengan path gambar relevan
        category: "CSS",
        author: "Febnawan F.R.", // Contoh nama penulis
        tags: ["CSS", "Layout", "Frontend"], // Contoh tags
        content: `
            <p>Flexbox, atau Flexible Box Layout, adalah model layout satu dimensi yang dirancang khusus untuk menyusun elemen-elemen dalam sebuah kontainer (flex container) agar lebih efisien dalam mengatur jarak, alignment, dan urutan elemen-elemen tersebut (flex items), bahkan ketika ukurannya tidak diketahui atau dinamis.</p>
            <p>Sebelum Flexbox, developer sering mengandalkan float, table, atau positioning yang terkadang rumit untuk mencapai layout yang diinginkan. Flexbox menyederhanakan banyak tugas layout umum.</p>
            
            <h2>Konsep Dasar Flexbox</h2>
            <p>Ada dua komponen utama dalam Flexbox:</p>
            <ul>
                <li><strong>Flex Container:</strong> Elemen induk yang menampung flex items. Anda mengaktifkan Flexbox dengan mendeklarasikan <code>display: flex;</code> atau <code>display: inline-flex;</code> pada elemen ini.</li>
                <li><strong>Flex Items:</strong> Elemen anak langsung dari flex container.</li>
            </ul>
            <p>Flexbox bekerja berdasarkan dua sumbu utama:</p>
            <ul>
                <li><strong>Main Axis:</strong> Sumbu utama tempat flex items disusun. Arahnya ditentukan oleh properti <code>flex-direction</code> (default: <code>row</code>, dari kiri ke kanan).</li>
                <li><strong>Cross Axis:</strong> Sumbu yang tegak lurus dengan main axis.</li>
            </ul>

            <h2>Properti Container Flex (Flex Container Properties)</h2>
            <p>Properti ini diterapkan pada elemen induk (flex container) untuk mengontrol bagaimana anak-anaknya (flex items) disusun.</p>
            
            <h4>1. <code>display</code></h4>
            <p>Mengaktifkan konteks flex. Nilainya bisa <code>flex</code> (membuat container menjadi block-level) atau <code>inline-flex</code> (membuat container menjadi inline-level).</p>
            <pre><code class="language-css">.container {
  display: flex; /* atau inline-flex */
}</code></pre>

            <h4>2. <code>flex-direction</code></h4>
            <p>Menentukan arah sumbu utama (main axis), yaitu arah penyusunan flex items.</p>
            <ul>
                <li><code>row</code> (default): Item disusun horizontal dari kiri ke kanan.</li>
                <li><code>row-reverse</code>: Item disusun horizontal dari kanan ke kiri.</li>
                <li><code>column</code>: Item disusun vertikal dari atas ke bawah.</li>
                <li><code>column-reverse</code>: Item disusun vertikal dari bawah ke atas.</li>
            </ul>
            <pre><code class="language-css">.container {
  display: flex;
  flex-direction: column;
}</code></pre>

            <h4>3. <code>justify-content</code></h4>
            <p>Mengatur alignment item di sepanjang sumbu utama (main axis). Ini berguna untuk mengatur spasi antar item.</p>
             <ul>
                <li><code>flex-start</code> (default): Item merapat ke awal sumbu utama.</li>
                <li><code>flex-end</code>: Item merapat ke akhir sumbu utama.</li>
                <li><code>center</code>: Item ditengahkan di sumbu utama.</li>
                <li><code>space-between</code>: Item pertama di awal, item terakhir di akhir, spasi didistribusikan merata di antaranya.</li>
                <li><code>space-around</code>: Spasi didistribusikan merata di sekitar item (item di tepi punya setengah spasi dibanding item di tengah).</li>
                <li><code>space-evenly</code>: Spasi didistribusikan merata di antara setiap item dan antara item dengan tepi container.</li>
            </ul>
            <pre><code class="language-css">.container {
  display: flex;
  justify-content: space-between;
}</code></pre>

            <h4>4. <code>align-items</code></h4>
            <p>Mengatur alignment item di sepanjang sumbu silang (cross axis).</p>
            <ul>
                <li><code>stretch</code> (default): Item direntangkan untuk mengisi tinggi/lebar container (tergantung <code>flex-direction</code>).</li>
                <li><code>flex-start</code>: Item merapat ke awal sumbu silang.</li>
                <li><code>flex-end</code>: Item merapat ke akhir sumbu silang.</li>
                <li><code>center</code>: Item ditengahkan di sumbu silang.</li>
                <li><code>baseline</code>: Item disejajarkan berdasarkan baseline teksnya.</li>
            </ul>
            <pre><code class="language-css">.container {
  display: flex;
  height: 200px; /* Perlu tinggi agar align-items terlihat */
  align-items: center;
}</code></pre>

            <h4>5. <code>flex-wrap</code></h4>
            <p>Mengontrol apakah flex items harus pindah baris (wrap) jika tidak cukup ruang dalam satu baris di flex container.</p>
            <ul>
                <li><code>nowrap</code> (default): Item dipaksa dalam satu baris (bisa overflow).</li>
                <li><code>wrap</code>: Item akan pindah ke baris berikutnya jika perlu.</li>
                <li><code>wrap-reverse</code>: Item akan pindah ke baris berikutnya secara terbalik.</li>
            </ul>
            <pre><code class="language-css">.container {
  display: flex;
  flex-wrap: wrap;
}</code></pre>

            <h4>6. <code>align-content</code></h4>
            <p>Mirip <code>justify-content</code> tapi untuk sumbu silang (cross axis), dan hanya berlaku jika ada beberapa baris item (karena <code>flex-wrap: wrap</code>). Mengatur distribusi spasi antar baris.</p>
             <ul>
                <li><code>stretch</code> (default): Baris direntangkan untuk mengisi sisa ruang.</li>
                <li><code>flex-start</code>: Baris merapat ke awal container.</li>
                <li><code>flex-end</code>: Baris merapat ke akhir container.</li>
                <li><code>center</code>: Baris ditengahkan dalam container.</li>
                <li><code>space-between</code>: Baris pertama di awal, terakhir di akhir, spasi merata di antaranya.</li>
                <li><code>space-around</code>: Spasi merata di sekitar setiap baris.</li>
                 <li><code>space-evenly</code>: Spasi merata di antara setiap baris dan tepi container.</li>
            </ul>
            <pre><code class="language-css">.container {
  display: flex;
  flex-wrap: wrap;
  height: 300px; /* Perlu tinggi agar align-content terlihat */
  align-content: space-around;
}</code></pre>

            <h2>Properti Item Flex (Flex Item Properties)</h2>
            <p>Properti ini diterapkan pada elemen anak (flex items) untuk mengontrol perilakunya di dalam flex container.</p>
            <h4>1. <code>order</code></h4>
            <p>Mengubah urutan visual item tanpa mengubah urutan di HTML. Defaultnya 0. Angka lebih kecil tampil lebih dulu.</p>
            <h4>2. <code>flex-grow</code></h4>
            <p>Menentukan kemampuan item untuk membesar (grow) jika ada sisa ruang di container. Nilai berupa angka proporsi (default 0, artinya tidak membesar).</p>
            <h4>3. <code>flex-shrink</code></h4>
            <p>Menentukan kemampuan item untuk mengecil (shrink) jika tidak ada cukup ruang. Nilai berupa angka proporsi (default 1, artinya boleh mengecil).</p>
            <h4>4. <code>flex-basis</code></h4>
            <p>Menentukan ukuran awal item sebelum sisa ruang didistribusikan. Bisa berupa nilai panjang (px, %, em) atau <code>auto</code> (default).</p>
            <h4>5. <code>flex</code> (Shorthand)</h4>
            <p>Cara singkat untuk mengatur <code>flex-grow</code>, <code>flex-shrink</code>, dan <code>flex-basis</code>. Contoh: <code>flex: 0 1 auto;</code> (default).</p>
            <h4>6. <code>align-self</code></h4>
            <p>Memungkinkan satu item memiliki alignment berbeda dari yang diatur oleh <code>align-items</code> pada container.</p>

            <blockquote><p>Dengan memahami properti-properti ini, Anda dapat membuat layout yang kompleks dan responsif dengan lebih mudah menggunakan Flexbox.</p></blockquote>
        `
    },
    {
        id: 102,
        title: "Memulai dengan React Hooks",
        summary: "Pahami konsep dasar React Hooks seperti useState dan useEffect untuk mengelola state dan side effects di functional components.",
        date: "20 Mei 2025",
        image: null, // Tanpa gambar
        category: "JavaScript",
        author: "Febnawan F.R.",
        tags: ["React", "JavaScript", "Hooks"],
        content: `
            <p>React Hooks, diperkenalkan di React 16.8, merevolusi cara kita menulis komponen React. Hooks memungkinkan kita menggunakan state dan fitur React lainnya di functional components, yang sebelumnya hanya bisa dilakukan di class components.</p>
            <p>Ini membuat kode komponen lebih ringkas, mudah dibaca, dan lebih mudah untuk berbagi logika stateful antar komponen.</p>
            
            <h2>Mengapa Hooks?</h2>
            <ul>
                <li><strong>Reusing Stateful Logic:</strong> Sebelum Hooks, pola seperti Render Props dan Higher-Order Components (HOCs) digunakan untuk berbagi logika stateful, tapi bisa menyebabkan "wrapper hell" (banyak lapisan komponen pembungkus). Hooks memungkinkan ekstraksi logika stateful ke dalam fungsi yang bisa digunakan kembali (custom Hooks).</li>
                <li><strong>Complex Components Become Hard to Understand:</strong> Class components seringkali menjadi sangat kompleks karena logika stateful tersebar di berbagai lifecycle methods (<code>componentDidMount</code>, <code>componentDidUpdate</code>, dll.). Hooks memungkinkan kita mengelompokkan logika terkait berdasarkan fitur (misalnya, semua logika untuk fetch data dalam satu <code>useEffect</code>), bukan berdasarkan lifecycle method.</li>
                <li><strong>Classes Confuse Both People and Machines:</strong> Sintaks class JavaScript, penggunaan <code>this</code>, dan keharusan binding method bisa menjadi penghalang bagi pemula dan bahkan membingungkan developer berpengalaman. Functional components dengan Hooks umumnya lebih mudah dipahami.</li>
            </ul>

            <h2>Hook Dasar: <code>useState</code></h2>
            <p>Hook <code>useState</code> adalah hook paling dasar untuk menambahkan state lokal ke functional components. Ia mengembalikan sepasang nilai: state saat ini dan fungsi untuk memperbaruinya.</p>
            <pre><code class="language-javascript">import React, { useState } from 'react';

function Counter() {
  // Deklarasi state variable baru, namanya "count"
  // useState(0) berarti nilai awal count adalah 0
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Anda mengklik {count} kali&lt;/p&gt;
      {/* Saat tombol diklik, panggil setCount untuk memperbarui state */}
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Klik Saya
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
            <p>Penting diingat: Jangan memanggil fungsi <code>setCount</code> (atau fungsi state updater lainnya) langsung di dalam body komponen karena akan menyebabkan render loop tak terbatas. Panggil hanya dari dalam event handler atau <code>useEffect</code>.</p>

            <h2>Hook Dasar: <code>useEffect</code></h2>
            <p>Hook <code>useEffect</code> digunakan untuk menjalankan *side effects* di functional components. Side effects adalah operasi yang berinteraksi dengan dunia luar komponen, seperti:</p>
            <ul>
                <li>Fetch data dari API</li>
                <li>Berlangganan (subscribe) ke event</li>
                <li>Memanipulasi DOM secara langsung</li>
                <li>Mengatur timer (<code>setTimeout</code>, <code>setInterval</code>)</li>
            </ul>
            <p><code>useEffect</code> menerima dua argumen: fungsi callback yang berisi logika side effect, dan array dependensi (opsional).</p>
            <pre><code class="language-javascript">import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Mirip dengan componentDidMount dan componentDidUpdate:
  useEffect(() => {
    // Memperbarui judul dokumen menggunakan broser API
    document.title = 'You clicked ' + count + ' times';
    
    // Cleanup function (opsional)
    // Mirip componentWillUnmount
    return () => {
      console.log('Cleanup effect'); 
      // Contoh: unsubscribe dari event atau batalkan timer
    };
  }, [count]); // Hanya jalankan ulang effect jika count berubah

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
            <p>Array dependensi sangat penting. Jika Anda tidak menyertakannya, effect akan berjalan setelah *setiap* render. Jika Anda menyertakan array kosong (<code>[]</code>), effect hanya akan berjalan sekali setelah render pertama (mirip <code>componentDidMount</code>). Jika Anda menyertakan variabel state atau props di dalamnya, effect hanya akan berjalan ulang jika nilai variabel/props tersebut berubah.</p>

            <h2>Aturan Hooks</h2>
            <p>Ada dua aturan penting saat menggunakan Hooks:</p>
            <ol>
                <li><strong>Hanya panggil Hooks di level teratas fungsi komponen Anda.</strong> Jangan panggil Hooks di dalam loop, kondisi, atau fungsi bersarang.</li>
                <li><strong>Hanya panggil Hooks dari functional components React atau custom Hooks.</strong> Jangan panggil dari fungsi JavaScript biasa.</li>
            </ol>
            <p>Aturan ini memastikan bahwa Hooks selalu dipanggil dalam urutan yang sama setiap kali komponen dirender, yang penting bagi React untuk dapat melacak state Hooks dengan benar.</p>
            
            <p>Ini baru pengenalan dasar. Masih banyak Hooks lain yang disediakan React (seperti <code>useContext</code>, <code>useReducer</code>, <code>useCallback</code>, <code>useMemo</code>, <code>useRef</code>) dan konsep custom Hooks yang sangat powerful.</p>
        `
    },
    {
        id: 103,
        title: "Keamanan Dasar Aplikasi Web",
        summary: "Pelajari beberapa ancaman keamanan umum pada aplikasi web seperti XSS dan SQL Injection, serta cara pencegahannya.",
        date: "25 Mei 2025",
        image: "./assets/projects/placeholder.jpg",
        category: "Keamanan",
        author: "Febnawan F.R.",
        tags: ["Security", "WebDev", "Best Practice"],
        content: `
            <p>Keamanan aplikasi web bukanlah fitur tambahan yang bisa dipasang belakangan, melainkan aspek fundamental yang harus diperhatikan sejak awal pengembangan. Mengabaikan keamanan dapat berakibat fatal, mulai dari pencurian data pengguna hingga pengambilalihan sistem.</p>
            <p>Artikel ini akan membahas dua ancaman paling umum dan berbahaya: Cross-Site Scripting (XSS) dan SQL Injection, serta langkah-langkah dasar untuk mencegahnya.</p>
            
            <h2>1. Cross-Site Scripting (XSS)</h2>
            <p>XSS adalah jenis serangan injeksi kode di mana penyerang menyuntikkan skrip berbahaya (biasanya JavaScript) ke dalam situs web yang dipercaya oleh korban. Skrip ini kemudian dieksekusi di browser korban, memungkinkan penyerang mencuri informasi sensitif (seperti cookie sesi), mengarahkan korban ke situs berbahaya, atau melakukan tindakan lain atas nama korban.</p>
            
            <h4>Jenis-jenis XSS:</h4>
            <ul>
                <li><strong>Stored XSS:</strong> Skrip berbahaya disimpan secara permanen di server target (misalnya, dalam database komentar atau postingan forum) dan dieksekusi setiap kali pengguna lain melihat konten tersebut.</li>
                <li><strong>Reflected XSS:</strong> Skrip berbahaya "dipantulkan" dari server web sebagai bagian dari respons terhadap permintaan korban (misalnya, dalam hasil pencarian atau pesan error). Skrip dikirim melalui link yang dibuat khusus.</li>
                <li><strong>DOM-based XSS:</strong> Kerentanan ada di sisi klien (client-side code). Skrip berbahaya memanipulasi Document Object Model (DOM) di browser korban untuk dieksekusi.</li>
            </ul>

            <h4>Pencegahan XSS:</h4>
            <ul>
                <li><strong>Sanitasi Input:</strong> Validasi dan bersihkan semua data yang diterima dari pengguna atau sumber eksternal sebelum disimpan atau ditampilkan. Jangan pernah mempercayai input pengguna.</li>
                <li><strong>Escaping Output:</strong> Saat menampilkan data yang berasal dari pengguna ke dalam HTML, pastikan untuk melakukan escaping terhadap karakter-karakter khusus HTML (seperti <code>&lt;</code>, <code>&gt;</code>, <code>&</code>, <code>"</code>, <code>'</code>). Banyak framework template modern melakukan ini secara otomatis, tetapi penting untuk memverifikasinya. Gunakan fungsi seperti <code>htmlspecialchars()</code> di PHP atau metode escaping yang sesuai di bahasa/framework Anda.</li>
                <li><strong>Content Security Policy (CSP):</strong> Gunakan header HTTP CSP untuk mendefinisikan sumber konten yang diperbolehkan (skrip, gambar, stylesheet, dll.) untuk dimuat oleh browser. Ini dapat secara signifikan mengurangi dampak serangan XSS.</li>
                <li><strong>HttpOnly Cookies:</strong> Atur flag <code>HttpOnly</code> pada cookie sesi Anda untuk mencegah JavaScript mengaksesnya, sehingga mempersulit pencurian sesi melalui XSS.</li>
            </ul>
            <pre><code class="language-html">
Contoh Output Escaping (Sederhana):
&lt;div&gt;{{ userData | escape }}&lt;/div&gt; 

Contoh CSP Header (Sederhana):
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com;
</code></pre>

            <h2>2. SQL Injection (SQLi)</h2>
            <p>SQL Injection adalah teknik serangan di mana penyerang memanipulasi query SQL standar yang digunakan oleh aplikasi untuk berinteraksi dengan database. Dengan menyuntikkan kode SQL berbahaya, penyerang dapat melewati mekanisme otentikasi, mengakses data sensitif, memodifikasi atau menghapus data, dan bahkan mengambil alih kendali server database.</p>

            <h4>Contoh Kerentanan (Sangat Disederhanakan):</h4>
            <p>Misalkan query untuk login adalah:</p>
            <code>SELECT * FROM users WHERE username = '$username' AND password = '$password';</code>
            <p>Jika penyerang memasukkan <code>' OR '1'='1</code> sebagai username dan password apa saja, query menjadi:</p>
            <code>SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '...';</code>
            <p>Karena <code>'1'='1'</code> selalu benar, kondisi WHERE menjadi benar, dan penyerang bisa login tanpa password yang valid (tergantung logika aplikasi).</p>

            <h4>Pencegahan SQL Injection:</h4>
            <ul>
                <li><strong>Prepared Statements (Parametrized Queries):</strong> Ini adalah metode pertahanan paling efektif. Alih-alih menggabungkan input pengguna langsung ke dalam string query, gunakan placeholder (?) atau parameter bernama (:name) dalam query Anda. Database engine kemudian akan menangani input pengguna secara terpisah dari logika query, mencegahnya diinterpretasikan sebagai kode SQL.</li>
                <li><strong>Stored Procedures:</strong> Meskipun tidak secara inheren aman, stored procedures yang ditulis dengan baik dapat membantu membatasi jenis query yang dapat dijalankan aplikasi. Namun, tetap penting menggunakan parameter di dalamnya.</li>
                <li><strong>Escaping Input (Kurang Direkomendasikan):</strong> Melakukan escaping pada karakter khusus SQL dalam input pengguna. Metode ini lebih rentan kesalahan daripada prepared statements dan tidak direkomendasikan sebagai pertahanan utama.</li>
                <li><strong>Least Privilege Principle:</strong> Berikan hak akses database seminimal mungkin kepada akun yang digunakan oleh aplikasi web Anda. Jangan gunakan akun root atau admin untuk operasi sehari-hari.</li>
                <li><strong>Validasi Input:</strong> Selalu validasi tipe, format, dan panjang data input sebelum digunakan dalam query.</li>
            </ul>
             <pre><code class="language-php">// Contoh Prepared Statement (PHP PDO)
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $userInput]);
$user = $stmt->fetch();</code></pre>

            <blockquote><p>Selalu gunakan Prepared Statements sebagai garis pertahanan utama terhadap SQL Injection. Jangan pernah membangun query SQL dengan menggabungkan string input pengguna secara langsung.</p></blockquote>
            
            <p>XSS dan SQL Injection hanyalah dua dari banyak ancaman keamanan web. Penting untuk terus belajar tentang praktik keamanan terbaru, menggunakan framework yang aman, dan melakukan pengujian keamanan secara teratur.</p>
        `
    }
    // Tambahkan artikel lain di sini
];

export default articlesData;
