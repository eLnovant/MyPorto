export const profile = {
    name: "Muhammad Farid Donovant",
    title: "Mahasiswa Informatika",
    nim: "24EO10021",
    birthplace: "Jambi Timur, Kota Jambi, Jambi",
    domicile: "Kesugihan Kidul, Desa Gligir, Kecamatan Kesugihan, Kabupaten Cilacap, Jawa Tengah",
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
        keywords: ["halo", "hai", "hello", "hi", "hey", "pagi", "siang", "sore", "malam", "assalamualaikum", "salam"],
        answer: "Halo! Ada yang bisa saya bantu? Tanyakan soal skill, project, pengalaman, atau kontak saya ya."
    },
    {
        keywords: ["siapa", "nama", "profil", "about", "kamu", "farid"],
        answer: "Saya Muhammad Farid Donovant, mahasiswa Informatika NIM 24EO10021 di UNUGHA Cilacap. Asal: Jambi Timur, Kota Jambi. Berdomisili: Kesugihan Kidul, Desa Gligir, Cilacap. Saya passion di teknologi, coding, dan pengembangan web."
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
        answer: "Berdomisili di Kesugihan Kidul, Desa Gligir, Kecamatan Kesugihan, Kabupaten Cilacap. Asal: Jambi Timur, Kota Jambi. Kuliah di UNUGHA Cilacap. Remote-friendly untuk kerja/magang."
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
    },
    {
        keywords: ["motivasi", "semangat", "quote", "kutipan", "inspirasi", "move on"],
        answer: "\"Kode yang kamu tulis hari ini adalah fondasi masa depanmu. Jangan takut error, error itu guru terbaik.\" — Stay hungry, stay foolish. Konsisten > intensif."
    },
    {
        keywords: ["roadmap", "belajar", "learning path", "cara belajar", "mulai dari mana", "pemula"],
        answer: "Roadmap saya: 1) HTML/CSS/JS solid → 2) React + TypeScript → 3) Backend (Node/Express) → 4) Database (PostgreSQL/MongoDB) → 5) DevOps (Docker, CI/CD) → 6) System Design. Fokus 1 skill sampai mahir baru lanjut."
    },
    {
        keywords: ["debug", "error", "bug", "masalah", "stuck", "bingung", "ngoding error"],
        answer: "Debug tips: 1) Baca error message pelan-pelan → 2) Console.log di setiap step → 3) Isolate problem (buat minimal repo) → 4) Cek StackOverflow/GitHub Issues → 5) Istirahat 15 menit, sering kelar sendiri. Rubber duck debugging works!"
    },
    {
        keywords: ["portofolio", "portfolio", "buat portfolio", "tips portfolio", "personal branding"],
        answer: "Portfolio tips: 1) Showcase 3-5 project terbaik, bukan semua → 2) Live demo + GitHub link wajib → 3) Ceritakan problem → solution → tech stack → 4) Design clean, mobile-first → 5) Update tiap bulan. Portfolio ini contohnya (terminal, games, easter eggs)."
    },
    {
        keywords: ["freelance", "freelancer", "sampingan", "project sampingan", "upwork", "fiverr"],
        answer: "Freelance: Mulai dari platform kecil (Sribu, Projects.co.id), bangun rating. Kommunikasi jelas > skill teknis. Kontrak & DP wajib. Jangan undervalue — rate minimal $15-20/jam untuk junior. Portfolio & testimoni adalah aset utama."
    },
    {
        keywords: ["magang", "internship", "msib", "kampus merdeka", "pkkmb", "kp"],
        answer: "Magang/MSIB: Apply早 (Januari-Maret untuk semester genap). Siapkan: CV 1 halaman, portfolio live, GitHub rapi, cover letter custom per perusahaan. Interview: jujur soal skill, tunjukkan project, tanya tech stack mereka. UNUGHA biasanya punya program KP/MSIB — tanya prodi."
    },
    {
        keywords: ["github", "git", "commit", "push", "pull request", "open source", "contribution"],
        answer: "Git workflow: 1) Branch per fitur (feature/nama-fitur) → 2) Commit pesan jelas (feat: add login page) → 3) PR dengan deskripsi & screenshot → 4) Code review → 5) Merge ke main. Open source: cari label 'good first issue' di repo populer. Kontribusi docs juga counts!"
    },
    {
        keywords: ["react", "nextjs", "vue", "svelte", "framework", "frontend framework"],
        answer: "Rekomendasi: React (job market paling banyak) → Next.js (fullstack, SEO ready). Vue lebih gentle learning curve. Svelte ringan tapi job kurang. Pelajari 1 dulu sampai mahir (hooks, state management, routing) baru bandingin."
    },
    {
        keywords: ["backend", "api", "rest", "graphql", "nodejs", "express", "nestjs", "golang", "python django"],
        answer: "Backend stack: Node.js + Express (mudah mulai) → NestJS (structure enterprise) → Go (performance) → Python Django/FastAPI (AI/ML ready). Belajar: REST API design, auth (JWT), database relation, caching (Redis), testing."
    },
    {
        keywords: ["database", "sql", "postgresql", "mysql", "mongodb", "nosql", "prisma", "orm"],
        answer: "Database: PostgreSQL (recommended, powerful, free) → MySQL (widely used). NoSQL: MongoDB (flexible schema). ORM: Prisma (type-safe, DX terbaik) → Drizzle (lightweight). Belajar: indexing, normalization, transaction, migration."
    },
    {
        keywords: ["docker", "kubernetes", "devops", "ci/cd", "deployment", "vercel", "netlify", "aws", "cloud"],
        answer: "DevOps basics: Docker (containerize app) → Docker Compose (local multi-container) → CI/CD (GitHub Actions) → Deploy ke Vercel/Netlify (frontend) + Railway/Render/DigitalOcean (backend). Kubernetes belakangan kalau butuh scaling."
    },
    {
        keywords: ["typescript", "type safety", "type", "interface", "generic", "ts"],
        answer: "TypeScript: Wajib 2024+. Manfaat: catch bug compile-time, autocomplete, refactor aman. Pelajari: basic types, interface vs type, generics, utility types (Partial, Pick, Omit), strict mode. Migration JS→TS: rename .js→.ts, fix error satu-satu."
    },
    {
        keywords: ["testing", "jest", "vitest", "cypress", "playwright", "unit test", "e2e test", "tdd"],
        answer: "Testing: Unit (Jest/Vitest) → Integration → E2E (Playwright/Cypress). TDD: tulis test dulu → code → refactor. Coverage target 70%+ critical path. Testing library: React Testing Library. Mock external API (MSW)."
    },
    {
        keywords: ["css", "tailwind", "styled-components", "css modules", "sass", "animation", "responsive"],
        answer: "Styling: Tailwind (utility-first, cepat, konsisten) → CSS Modules (scoped, zero-runtime) → Styled Components (CSS-in-JS). Belajar: Flexbox/Grid master, custom properties, container queries, prefers-reduced-motion, dark mode. Animasi: Framer Motion / CSS keyframes."
    },
    {
        keywords: ["performance", "optimasi", "lazy load", "bundle size", "core web vitals", "lcp", "cls", "fid"],
        answer: "Performance: 1) Code splitting (dynamic import) → 2) Image optimization (WebP, lazy load, blur placeholder) → 3) Bundle analyzer (webpack-bundle-analyzer) → 4) Caching headers → 5) Preload critical resources. Core Web Vitals: LCP <2.5s, CLS <0.1, FID <100ms."
    },
    {
        keywords: ["security", "keamanan", "xss", "csrf", "sql injection", "auth", "jwt", "oauth", "https"],
        answer: "Security basics: 1) HTTPS everywhere → 2) Sanitize input (DOMPurify) → 3) CSP headers → 4) HttpOnly + Secure cookies → 5) Rate limiting API → 6) JWT short expiry + refresh token → 7) Dependency audit (npm audit). Jangan simpan secret di frontend!"
    },
    {
        keywords: ["soft skill", "komunikasi", "teamwork", "leadership", "presentasi", "public speaking", "negosiasi"],
        answer: "Soft skill > hard skill untuk career growth: 1) Komunikasi teknis ke non-teknis → 2) Documentasi jelas (README, ADR) → 3) Code review constructive → 4) Mint feedback rutin → 5) Presentasi demo tiap sprint. Toastmasters/community membantu public speaking."
    },
    {
        keywords: ["burnout", "stres", "capek", "work life balance", "wlb", "mental health", "istirahat"],
        answer: "Anti-burnout: 1) Pomodoro (25/5) → 2) Offline jam 21:00 → 3) Olahraga 3x/minggu → 4) Hobby non-coding → 5) Tidur 7-8 jam → 6) Sabtu/Minggu no coding (kalau bisa). Ingat: marathon, bukan sprint. Mental health = code quality."
    },
    {
        keywords: ["gaji", "salary", "negotiation", "nego gaji", "market rate", "junior developer", "fresh graduate"],
        answer: "Salary negotiation: Research market (Glassdoor, Levels.fyi, LinkedIn, grup Discord). Junior Jakarta: 8-15jt, Remote: $1-3k. Negosiasi: berikan range, justifikasi dengan skill/project. Benefit: insurance, learning budget, WFH flexibility, annual leave. Jangan takut counter offer."
    },
    {
        keywords: ["ai", "artificial intelligence", "machine learning", "ml", "llm", "chatgpt", "copilot", "cursor", "vscode ai"],
        answer: "AI tools untuk dev: GitHub Copilot (code completion), Cursor (AI-first IDE), ChatGPT (debug, explain, refactor), Vercel v0 (UI generation). Tips: treat AI sebagai pair programmer, selalu review output, jangan copy-paste blindly. Prompt engineering skill penting 2024+."
    },
    {
        keywords: ["opensource", "open source", "kontribusi", "contribution", "maintainer", "issue", "pr"],
        answer: "Open source: 1) Pilih project yang dipakai daily → 2) Baca CONTRIBUTING.md → 3) Start kecil (typo, docs, test) → 4) Buka issue dulu sebelum PR besar → 5) Responsive review feedback. Manfaat: portfolio nyata, network, belajar codebase besar, swag. First timer friendly: EddieHub, FirstContributions."
    },
    {
        keywords: ["mentor", "mentorship", "bimbingan", "tanya jawab", "diskusi", "komunitas", "discord", "forum"],
        answer: "Cari mentor: 1) Senior di kerja/magang → 2) Komunitas (Discord: DevIndonesia, ID-React, ID-NodeJS, Hacktiv8 alumni) → 3) LinkedIn DM sopan (siapkan pertanyaan spesifik) → 4) Twitter/Threads tech community. Jadi mentee yang baik: prepared, respect waktu, action-oriented, feedback loop."
    },
    {
        keywords: ["side project", "side hustle", "produk sendiri", "saas", "micro saas", "startup", "mvp", "validasi ide"],
        answer: "Side project: 1) Solve own problem dulu → 2) MVP 2 minggu (no auth, no payment, manual dulu) → 3) Deploy → 4) Share ke komunitas → 5) Kumpulkan feedback → 6) Iterate. Tools: Next.js + Supabase + Vercel = fullstack gratis. Validasi: orang mau bayar/beli sebelum build full."
    },
    {
        keywords: ["cv tips", "resume tips", "linkedin", "profile linkedin", "ats", "recruiter", "hrd", "interview"],
        answer: "CV/LinkedIn: 1) 1 halaman (fresh grad) → 2) Quantify: \"Optimasi query DB 40% faster\" bukan \"Membuat query\" → 3) Keywords dari JD (React, TypeScript, PostgreSQL) → 4) LinkedIn: headline = role + skill, about = story, skills = 20+ endorsed → 5) Portfolio link di header. ATS scan: format simpel, no kolom, file PDF."
    },
    {
        keywords: ["senior", "senior developer", "career growth", "promosi", "naik level", "tech lead", "engineering manager"],
        answer: "Junior → Senior: 1) Ownership end-to-end (design → deploy → monitor) → 2) Mentoring junior → 3) Tech decision (trade-off dokumentasi) → 4) Cross-team collaboration → 5) Business impact awareness. Timeline: 3-5 tahun. Tech lead = technical + people. EM = people + strategy. Pilih track."
    }
];

export const blogPosts = [
    {
        slug: "membangun-portofolio-cyberpunk",
        title: "Membangun Portofolio Cyberpunk dengan Vanilla JS",
        date: "2024-12-15",
        excerpt: "Cerita di balik pembuatan portofolio interaktif ini — dari konsep terminal, matrix rain, hingga easter egg HESOYAM.",
        tags: ["JavaScript", "CSS", "Portfolio", "Creative Coding"],
        content: `# Membangun Portofolio Cyberpunk dengan Vanilla JS

Saat memutuskan bikin portofolio, saya pengen beda. Bukan cuma daftar project statis, tapi **pengalaman interaktif** yang ngebuktikan skill coding langsung.

## Konsep: Terminal sebagai UI Utama

Terminal bukan cuma aksesoris — it's the main interface. Semua fitur diakses lewat command:

\`\`\`bash
$ help           # Lihat semua command
$ play snake     # Main snake di terminal
$ hack target    # Hacker typer animation
$ chat           # AI chatbot
$ hire farid     # Langsung buka email
\`\`\`

## Tech Stack Minimalis

- **Vanilla JS** (ES Modules) — no framework overhead
- **CSS Custom Properties** — theming dinamis (dark/light/rave)
- **Canvas API** — matrix rain, hologram 3D, games
- **Web Audio API** — synth music, UI sounds
- **Vercel** — deploy gratis, edge network

## Fitur Favorit: Easter Eggs

\`\`\`bash
$ sudo hack      # Red alert + audio alarm
$ color red      # Ganti warna matrix
$ rave           # Hue-rotate full screen
Konami code (HESOYAM) → GTA money cheat visual
\`\`\`

## Lessons Learned

1. **Performance matters** — IntersectionObserver untuk pause animasi off-screen
2. **Accessibility** — prefers-reduced-motion, keyboard nav, ARIA labels
3. **Mobile first** — Touch controls untuk games, responsive terminal
4. **Fun > Perfect** — User ingat experience, bukan code quality

## Next Steps

- Blog section (marked.js ready)
- Project detail pages untuk SEO
- Visitor counter
- RSS feed

---

*Portfolio live: [my-porto-hazel.vercel.app](https://my-porto-hazel.vercel.app)*
*Source: [github.com/Novant/portfolio](https://github.com/Novant/portfolio)*`
    },
    {
        slug: "terminal-based-portfolio",
        title: "Kenapa Terminal-Based Portfolio?",
        date: "2024-11-20",
        excerpt: "Alasan saya memilih interface terminal untuk portofolio — UX, personal branding, dan technical showcase sekaligus.",
        tags: ["UX Design", "Portfolio", "Terminal", "Personal Branding"],
        content: `# Kenapa Terminal-Based Portfolio?

Banyak yang tanya: "Kenapa bikin terminal? Kan ribet."

Jawabannya simple: **Differentiation + Proof of Skill**.

## 1. First Impression = Technical Competence

Recruiter buka portofolio → lihat terminal → **langsung tahu** saya comfortable dengan CLI, bash, JS event handling, Canvas API, Web Audio. No need to read "Skills: JavaScript 85%".

## 2. Memorable Experience

Standard portfolio: scroll → baca → tutup.
Terminal portfolio: **interact** → main game → coba command → share ke teman → "Wah keren ini!"

Retention rate jauh lebih tinggi.

## 3. Personal Branding: "Hacker/Cyberpunk"

Niche branding. Bukan "Junior Frontend Dev" tapi "Creative Coder yang suka bikin hal unik". Memudahin positioning di pasar kerja.

## 4. Playground untuk Eksperimen

Terminal jadi sandbox:
- Test Web Audio API (synth)
- Eksperimen Canvas 3D (hologram)
- Voice Recognition API
- Service Worker offline
- Semua tanpa setup build tool

## 5. Conversation Starter

Interview: *"Walk me through your portfolio"*
Saya: *"Coba ketik \`play snake\` di terminal"*

Instant demo skill + personality.

---

**Trade-off**: Tidak SEO-friendly untuk content-heavy. Solusi: tambah blog section + project pages (sedang WIP).

*Your portfolio should reflect YOU. Mine reflects: curious, playful, technical.*`
    },
    {
        slug: "belajar-javascript-2024",
        title: "Roadmap Belajar JavaScript 2024: Dari Nol ke Hireable",
        date: "2024-10-10",
        excerpt: "Panduan step-by-step belajar JavaScript modern berdasarkan pengalaman nyata — fokus apa yang benar-benar dipakai di industri.",
        tags: ["JavaScript", "Roadmap", "Learning", "Career"],
        content: `# Roadmap Belajar JavaScript 2024

Banyak yang stuck di *tutorial hell*. Ini roadmap yang saya pakai & rekomendasikan:

## Phase 1: Fundamentals (2-3 minggu)
- Variables, types, operators
- Functions (arrow, closure, hoisting)
- Array/Object methods (map, filter, reduce, spread)
- Async JS: Promise, async/await, fetch
- DOM manipulation & Events

**Project**: Todo list dengan localStorage

## Phase 2: Modern JS (2 minggu)
- ES6+ features (destructuring, modules, optional chaining)
- NPM & package.json
- Build tools: Vite (cepat, simpel)
- Linting: ESLint + Prettier
- Git workflow: branch, commit convention, PR

**Project**: Weather app pakai API publik

## Phase 3: React Ecosystem (3-4 minggu)
- Components, props, state, hooks
- React Router v6
- State management: Context → Zustand/Redux Toolkit
- Forms: React Hook Form + Zod
- Testing: Vitest + React Testing Library

**Project**: Dashboard admin (CRUD + auth mock)

## Phase 4: TypeScript (2 minggu)
- Basic types, interface, generics
- Utility types (Partial, Pick, Omit, Record)
- Strict mode, type narrowing
- Migrate JS project ke TS

**Project**: Rewrite project Phase 3 ke TypeScript

## Phase 5: Backend Basics (2 minggu)
- Node.js + Express / Fastify
- REST API design
- Database: PostgreSQL + Prisma ORM
- Auth: JWT + HttpOnly cookies
- Deployment: Railway/Render + Vercel

**Project**: Fullstack app (FE + BE + DB)

## Phase 6: Production Ready (Ongoing)
- Docker basics
- CI/CD: GitHub Actions
- Monitoring: Sentry, LogRocket
- Performance: Lighthouse, Web Vitals
- Security: CSP, rate limiting, input validation

## Tips Anti-Tutorial Hell

1. **Build > Watch** — Stop nonton, mulai ketik
2. **Break things** — Error = belajar
3. **Read docs** — MDN, React docs, TypeScript handbook
4. **Join community** — Discord DevIndonesia, Twitter tech
5. **Consistency** — 1 jam/hari > 7 hari/minggu

---

*Saya follow roadmap ini, 6 bulan lalu fresh grad, sekarang siap apply junior dev. Kamu juga bisa.*`
    },
    {
        slug: "debugging-skill-paling-penting",
        title: "Debugging: Skill Paling Penting yang Jarang Dipelajari",
        date: "2024-09-05",
        excerpt: "Mengapa debugging lebih penting dari algoritma, dan teknik-teknik praktis yang bisa dipakai sehari-hari.",
        tags: ["Debugging", "Problem Solving", "Productivity", "Tips"],
        content: `# Debugging: Skill Paling Penting yang Jarang Dipelajari

Sekolah mengajarkan *cara menulis kode*. Industri butuh *cara memperbaiki kode yang rusak*.

## Mental Model Debugging

\`\`\`
Bug → Reproduce → Isolate → Hypothesize → Test → Fix → Verify → Prevent
\`\`\`

Jangan lompat ke "Fix" sebelum "Reproduce" & "Isolate".

## Teknik Praktis

### 1. Console.log Strategic
\`\`\`js
// ❌ console.log('here')
// ✅ console.log({ userId, userData, timestamp: Date.now() })
// ✅ console.table(users) // untuk array of objects
// ✅ console.trace() // stack trace
\`\`\`

### 2. Binary Search Debugging
Kode 1000 baris error? Comment 50% → test → narrow down ke 1 fungsi.

### 3. Rubber Duck Debugging
Jelaskan kode ke mainan/TEMAN/SENDIRI. Sering nemu bug saat narasi.

### 4. Git Bisect
\`\`\`bash
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# Git otomatis cari commit yang introduce bug
\`\`\`

### 5. DevTools Mastery
- **Sources tab**: Breakpoints, watch expressions, call stack
- **Network tab**: Failed requests, payload, timing
- **Performance tab**: Flame chart, long tasks
- **Console**: \$0 (selected element), \$_ (last result)

## Common Bug Patterns

| Pattern | Ciri | Fix |
|---------|------|-----|
| Race condition | Intermittent, timing-dependent | Async/await, mutex, state machine |
| Memory leak | Tab lambat lama dibuka | Cleanup listeners, WeakMap, null refs |
| Stale closure | Event handler pakai nilai lama | Dependency array, useRef |
| Type mismatch | Runtime error, bukan compile | TypeScript strict mode |

## Debugging Mindset

1. **Curiosity > Frustration** — "Kenapa ini happens?" bukan "Kenapa ini broken?!"
2. **Assume nothing** — Verify every assumption
3. **Document findings** — Future you akan berterima kasih
4. **Pair debug** — Dua kepala > satu kepala

---

*Debugging bukan ngerjain error. Debugging adalah memahami sistem lebih dalam dari siapa pun.*`
    }
];

import { terminalCommands } from './terminalCommands.js';

export { terminalCommands };
