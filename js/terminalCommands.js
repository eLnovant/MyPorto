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
  rave                - Activate system-wide color pulse
  play music          - Launch background synthwave beat
  stop music          - Mute background audio stream
  color [color/reset] - Override code-rain canvas tint
  hire farid          - Secure handshake & email author
  about               - Show profile info
  skills              - List all skills
  projects            - List all projects
  contact             - Show contact info
  chat                - Start AI chat session (type 'exit' to quit)
  sudo hack           - Easter egg (try it)`,

    about: (profile) => `PROFILE: ${profile.name}
ROLE: ${profile.title}
NIM: ${profile.nim}
LOCATION: ${profile.location}
BIO: ${profile.bio}
GOALS: ${profile.goals.join("; ")}`,

    skills: (skills) => skills.map(s => `  ${s.name.padEnd(25)} [${"█".repeat(Math.floor(s.level/10))}${"░".repeat(10-Math.floor(s.level/10))}] ${s.level}%`).join("\n"),

    projects: (projects) => projects.map(p => `  [${p.category.toUpperCase()}] ${p.title} - ${p.tech}`).join("\n"),

    contact: (profile) => `EMAIL: ${profile.email}
WHATSAPP: ${profile.phone}
INSTAGRAM: ${profile.instagram}
GITHUB: ${profile.github}`
};