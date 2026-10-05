export const terminalCommands = {
    help: `AVAILABLE COMMANDS IN THE MAINFRAME:
  help                - Display this directory manual
  clear               - Purge terminal logs screen
  date                - Show current date/time
  whoami              - Display current identity
  play snake          - Initialize FOS SNAKE PROTOCOL
  play pong           - Initialize FOS PONG PROTOCOL
  hack target         - Initiate network mainframe intrusion
  analyze network     - Geolocate server route and trace IP
  enable voice_uplink - Boot vocal control interface
  initiate self-destruct - Begin core purge meltdown (Caution)
  7355608             - Defuse self-destruct sequence
  rave                - Activate system-wide color pulse
  play music          - Launch background synthwave beat
  stop music          - Mute background audio stream
  color [color/reset] - Override code-rain canvas tint
  theme [name]        - Set terminal theme (matrix, amber, mono, hacker)
  hire farid          - Secure handshake & email author
  about               - Show profile info
  skills              - List all skills
  projects            - List all projects
  contact             - Show contact info
  education           - Show education history
  experience          - Show work experience
  chat                - Start AI chat session (type 'exit' to quit)
  sudo hack           - Easter egg (try it)

HIDDEN COMMANDS (classified):
  matrix              - Wake up, Neo...
  coffee              - Emergency caffeine protocol
  hack                - Initiate hack sequence with loading bars
  sudo make me a sandwich - Classic easter egg
  scan                - Deep system port/service scan
  decrypt             - AES-256 brute force decryption

ALIASES:
  ls, dir             - Same as help
  cls                 - Same as clear
  pwd                 - Show current path
  echo [text]         - Print text
  history             - Show command history
  exit                - Close terminal

SHORTCUTS:
  Tab                 - Autocomplete commands (double-tab: list all)
  Ctrl+R              - Search command history (regex)
  Arrow Up/Down       - Navigate history
  Escape              - Close terminal
  \` / F2 / Ctrl+Shift+T - Toggle terminal`,

    about: (profile) => `PROFILE: ${profile.name}
ROLE: ${profile.title}
NIM: ${profile.nim}
BIRTHPLACE: ${profile.birthplace}
DOMICILE: ${profile.domicile}
BIO: ${profile.bio}
GOALS: ${profile.goals.join("; ")}`,

    skills: (skills) => {
        const catMap = {
            technical: "🖥️ WEB & SOFTWARE DEVELOPMENT",
            office: "📊 MICROSOFT OFFICE SUITE & PRODUKTIVITAS",
            soft: "🤝 SOFT SKILLS & KEPEMIMPINAN"
        };
        const grouped = {};
        skills.forEach(s => {
            const cat = catMap[s.category] || "🛠️ KEAHLIAN LAINNYA";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(s);
        });
        
        let result = ["=================== KEAHLIAN / SKILLS ==================="];
        for (const [title, list] of Object.entries(grouped)) {
            result.push(`\n[ ${title} ]`);
            list.forEach(s => {
                const filled = Math.floor(s.level / 10);
                const empty = 10 - filled;
                const bar = "█".repeat(filled) + "░".repeat(empty);
                result.push(`  ${s.name.padEnd(55)} [${bar}] ${s.level}%`);
            });
        }
        return result.join("\n");
    },

    projects: (projects) => projects.map(p => `  [${p.category.toUpperCase()}] ${p.title} - ${p.tech}`).join("\n"),

    contact: (profile) => `EMAIL: ${profile.email}
WHATSAPP: ${profile.phone}
INSTAGRAM: ${profile.instagram}
GITHUB: ${profile.github}
PORTFOLIO: ${profile.portfolio}
BIRTHPLACE: ${profile.birthplace}
DOMICILE: ${profile.domicile}`,

    education: (profile) => profile.education.map(e => `  [${e.period}] ${e.degree} - ${e.institution}\n    ${e.description}`).join("\n"),

    experience: (profile) => profile.experience.map(e => `  [${e.period}] ${e.position} - ${e.company}\n    ${e.description}`).join("\n")
};