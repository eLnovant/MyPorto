export const profile = {
    name: "Muhammad Farid Donovant",
    title: "Mahasiswa Informatika",
    nim: "24EO10021",
    birthplace: "Jambi Timur, Kota Jambi, Jambi",
    domicile: "Kesugihan, Kabupaten Cilacap, Jawa Tengah",
    birthdate: "2006-02-07",
    email: "ridt2all.done@gmail.com",
    phone: "+62 877 5546 6436",
    instagram: "@el_novant",
    github: "https://github.com/Novant",
    portfolio: "https://my-porto-hazel.vercel.app/",
    bio: "Pelajar S1 Informatika di Universitas Nahdlatul Ulama Al-Ghazali (UNUGHA) Cilacap yang berdedikasi, berfokus pada pembangunan perisian/web dan teknologi maklumat. Mempunyai latar belakang kemahiran komunikasi, kepimpinan, serta penyelesaian masalah yang baik. Berminat untuk terus mengembangkan kemahiran teknikal dan menyumbang dalam projek pembangunan teknologi.",
    education: [
        {
            period: "2024 – Sekarang",
            institution: "Universitas Nahdlatul Ulama Al-Ghazali (UNUGHA) Cilacap",
            degree: "S1 Informatika",
            description: "Belajar fullstack development, algoritma, database, jaringan, dan pengembangan web modern."
        },
        {
            period: "2021 – 2025",
            institution: "Pondok Pesantren Miftahul Jannah Sikampuh Kroya",
            degree: "Pendidikan Pesantren",
            description: "Pendidikan karakter, kepemimpinan, manajemen waktu, dan disiplin tinggi."
        },
        {
            period: "2021 – 2024",
            institution: "SMA Negeri 2 Kroya",
            degree: "IPS (Ilmu Pengetahuan Sosial)",
            description: "Dasar-dasar ilmu sosial, organisasi, dan keterampilan komunikasi."
        }
    ],
    experience: [
        {
            period: "Mei 2024 – Juli 2024",
            company: "Kopi Cuan",
            position: "Waiters",
            description: "Bertanggung jawab melayani pelanggan, mencatat dan menghantar pesanan, serta memastikan kebersihan dan ketertiban kawasan kerja. Mengembangkan kemahiran komunikasi interpersonal, pengurusan masa, dan perkhidmatan pelanggan."
        }
    ],
    goals: [
        "Menjadi Software Engineer & Hardware Engineer",
        "Membangun startup sendiri",
        "Bekerja di perusahaan teknologi besar"
    ],
    hobbies: [
        "Ngoding",
        "Main game",
        "Membaca di semua platform",
        "Olahraga: renang, minisoccer, basket"
    ],
    favorites: {
        makanan: "Udang Saus Padang",
        warna: "Hitam",
        film: "Horor",
        buku: "Atomic Habits"
    }
};

export const skills = [
    { name: "⚡ JavaScript", level: 85, category: "technical" },
    { name: "🌐 HTML & CSS", level: 90, category: "technical" },
    { name: "⚛️ React", level: 75, category: "technical" },
    { name: "📘 TypeScript", level: 70, category: "technical" },
    { name: "🎨 Tailwind CSS", level: 80, category: "technical" },
    { name: "🐍 Python", level: 70, category: "technical" },
    { name: "🗄️ SQL / Database", level: 65, category: "technical" },
    { name: "⚙️ Git & Version Control", level: 75, category: "technical" },
    { name: "🎨 UI/UX Design", level: 60, category: "technical" },
    { name: "📊 Microsoft Excel", level: 80, category: "office" },
    { name: "📝 Microsoft Word", level: 85, category: "office" },
    { name: "📈 Microsoft PowerPoint", level: 75, category: "office" },
    { name: "📧 Microsoft Outlook", level: 70, category: "office" },
    { name: "📋 Google Workspace (Docs, Sheets, Slides)", level: 80, category: "office" },
    { name: "🗂️ Data Entry & Administrasi", level: 75, category: "office" },
    { name: "📅 Manajemen Jadwal & Kalender", level: 70, category: "office" },
    { name: "🧠 Problem Solving", level: 80, category: "soft" },
    { name: "🤝 Team Work", level: 85, category: "soft" },
    { name: "🗣️ Public Speaking", level: 85, category: "soft" },
    { name: "👑 Leadership", level: 80, category: "soft" },
    { name: "💬 Communication", level: 85, category: "soft" },
    { name: "⏰ Time Management", level: 80, category: "soft" }
];

export const projects = [
    {
        id: 1,
        title: "Cyberpunk Portfolio",
        description: "Website portofolio interaktif dengan tema Hacker Terminal, dilengkapi dengan easter eggs, mini-games (Snake, Pong), terminal emulator, chatbot AI, matrix rain, dan animasi cyberpunk. Merancang dan membangunkan laman web portfolio responsif untuk memaparkan profil, latar belakang pendidikan, dan hasil kerja.",
        tech: "HTML, CSS, Vanilla JS, Web Audio API, Canvas API, Vercel Deployment",
        category: "web",
        link_demo: "https://my-porto-hazel.vercel.app/",
        link_git: "https://github.com/Novant/portfolio",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Terminal-Based OS Simulator",
        description: "Simulator sistem operasi berbasis terminal dengan command system, file system virtual, mini-games, voice recognition, network analyzer, dan self-destruct sequence.",
        tech: "JavaScript, Web Speech API, Canvas, LocalStorage",
        category: "web",
        link_demo: "https://terminal-os.vercel.app",
        link_git: "https://github.com/Novant/terminal-os",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Task Manager App",
        description: "Aplikasi manajemen tugas real-time dengan drag-and-drop, kategori, prioritas, reminder, dan sinkronisasi offline-first menggunakan IndexedDB.",
        tech: "React, TypeScript, IndexedDB, Tailwind CSS",
        category: "app",
        link_demo: "https://task-manager-app.vercel.app",
        link_git: "https://github.com/Novant/task-manager",
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "E-Commerce Mini",
        description: "Platform e-commerce sederhana dengan keranjang belanja, checkout, integrasi payment gateway simulasi, dan dashboard admin.",
        tech: "Next.js, Prisma, PostgreSQL, Stripe API",
        category: "web",
        link_demo: "https://ecommerce-mini.vercel.app",
        link_git: "https://github.com/Novant/ecommerce-mini",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
    }
];

export const faq = [
    {
        keywords: ["siapa", "nama", "profil", "about", "kamu", "farid"],
        answer: "Saya Muhammad Farid Donovant, mahasiswa Informatika NIM 24EO10021 di UNUGHA Cilacap, tinggal di Jambi. Saya passion di teknologi, coding, dan pengembangan web."
    },
    {
        keywords: ["skill", "keahlian", "bisa", "teknologi", "stack", "bahasa"],
        answer: "Skill teknis: JavaScript (85%), HTML/CSS (90%), React (75%), TypeScript (70%), Tailwind (80%), Python (70%), SQL (65%), Git (75%). Soft skills: Problem Solving (80%), Team Work (85%), Public Speaking (85%), Leadership (80%). Office: Excel, Word, PowerPoint, Google Workspace."
    },
    {
        keywords: ["project", "proyek", "portfolio", "github", "repository"],
        answer: "Project: Cyberpunk Portfolio (ini), Terminal OS Simulator, Task Manager App (React/TS), E-Commerce Mini (Next.js). Semua di GitHub: github.com/Novant. Portfolio live: my-porto-hazel.vercel.app"
    },
    {
        keywords: ["kontak", "email", "wa", "whatsapp", "hubungi", "hire", "pekerjaan", "magang", "internship"],
        answer: "Email: ridt2all.done@gmail.com | WhatsApp: +62 877 5546 6436 | Instagram: @el_novant | Portfolio: my-porto-hazel.vercel.app. Siap untuk magang/freelance/full-time!"
    },
    {
        keywords: ["tujuan", "goal", "cita", "masa depan", "impian"],
        answer: "Target: Jadi Software & Hardware Engineer, bangun startup sendiri, kerja di big tech company. Step by step!"
    },
    {
        keywords: ["hobi", "suka", "favorit", "main", "game", "olahraga"],
        answer: "Hobi: Ngoding, main game, baca buku (platform manapun), olahraga (renang, minisoccer, basket). Favorit: Udang saus padang, warna hitam, film horor, buku Atomic Habits."
    },
    {
        keywords: ["pendidikan", "sekolah", "kuliah", "universitas", "nim", "jurusan"],
        answer: "S1 Informatika UNUGHA Cilacap (2024-sekarang), NIM 24EO10021. Sebelumnya: Pondok Pesantren Miftahul Jannah (2021-2025), SMA Negeri 2 Kroya IPS (2021-2024)."
    },
    {
        keywords: ["lokasi", "alamat", "dimana", "tinggal", "asal", "jambi", "cilacap"],
        answer: "Tinggal di Jambi Timur, Kota Jambi, Jambi. Kuliah di UNUGHA Cilacap. Remote-friendly untuk kerja/magang."
    },
    {
        keywords: ["cv", "resume", "download", "lamaran"],
        answer: "CV bisa di-download via tombol [DOWNLOAD_RESUME.PDF] di section 'Tentang Saya' atau minta langsung via email/WA."
    },
    {
        keywords: ["terminal", "cmd", "command", "hacker", "snake", "pong", "game", "easter egg"],
        answer: "Terminal bisa dibuka dengan tombol >_ atau tekan ` (backtick). Command: help, play snake, play pong, hack target, analyze network, rave, color, hire farid, chat, dll. Coba sendiri!"
    },
    {
        keywords: ["pengalaman", "kerja", "magang", "waiters", "kopi", "cuan"],
        answer: "Pengalaman kerja: Waiters di Kopi Cuan (Mei-Juli 2024). Bertanggung jawab melayani pelanggan, mencatat pesanan, menjaga kebersihan. Mengembangkan komunikasi interpersonal & time management."
    }
];

import { terminalCommands } from './terminalCommands.js';

export { terminalCommands };