const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// Replace the root variables
const newRoot = ":root {\n" +
  "  --bg: #FBFBFD;\n" +
  "  --bg-flat: #FBFBFD;\n" +
  "  --glass: rgba(255, 255, 255, 0.7);\n" +
  "  --glass2: rgba(255, 255, 255, 0.9);\n" +
  "  --glass-border: rgba(0, 0, 0, 0.05);\n" +
  "  --glass-border2: rgba(0, 0, 0, 0.1);\n" +
  "  --white: #FFFFFF;\n" +
  "  --ink: #000000;\n" +
  "  --ink2: #1C1C1E;\n" +
  "  --ink3: #86868b;\n" +
  "  --ink4: #a1a1a6;\n" +
  "  --accent: #007AFF;\n" +
  "  --accent2: #005bb5;\n" +
  "  --accent-bg: rgba(0, 122, 255, 0.1);\n" +
  "  --accent-bg2: rgba(0, 122, 255, 0.15);\n" +
  "  --green: #34C759;\n" +
  "  --green-bg: rgba(52, 199, 89, 0.1);\n" +
  "  --blue: #007AFF;\n" +
  "  --blue-bg: rgba(0, 122, 255, 0.1);\n" +
  "  --gold: #FF9500;\n" +
  "  --gold-bg: rgba(255, 149, 0, 0.08);\n" +
  "  --purple: #AF52DE;\n" +
  "  --purple-bg: rgba(175, 82, 222, 0.08);\n" +
  "  --shadow: 0 4px 24px rgba(0, 0, 0, 0.04);\n" +
  "  --shadow2: 0 8px 40px rgba(0, 0, 0, 0.06);\n" +
  "  --shadow3: 0 20px 60px rgba(0, 0, 0, 0.08);\n" +
  "  --blur: blur(24px);\n" +
  "  --font: 'Inter', system-ui, -apple-system, sans-serif;\n" +
  "  --side: 260px;\n" +
  "  --r: 24px;\n" +
  "  --r2: 12px;\n" +
  "  --card-bg: #F2F2F7;\n" +
  "  --card-border: rgba(0, 0, 0, 0.05);\n" +
  "  --card-hover: rgba(0, 0, 0, 0.03);\n" +
  "  --glow-accent: 0 0 40px rgba(0, 122, 255, 0.15);\n" +
  "}";

// Find the old :root block and replace it
css = css.replace(/:root\s*\{[\s\S]*?\}/, newRoot);

// Remove the ambient float backgrounds
css = css.replace(/body::before\s*\{[\s\S]*?\}/, 'body::before { display: none; }');
css = css.replace(/body::after\s*\{[\s\S]*?\}/, 'body::after { display: none; }');

// Clean up some hardcoded backgrounds for the dark theme
css = css.replace(/background:\s*rgba\(15,\s*15,\s*20,\s*0\.85\)/g, 'background: var(--glass2)');
css = css.replace(/background:\s*rgba\(15,\s*15,\s*20,\s*0\.7\)/g, 'background: var(--glass)');
css = css.replace(/border-right:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'border-right: 1px solid var(--glass-border)');
css = css.replace(/border-bottom:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.04\)/g, 'border-bottom: 1px solid var(--glass-border)');

// General dark colors to CSS vars
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.0[0-9]\)/g, 'var(--card-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.1[0-9]?\)/g, 'var(--glass-border2)');
css = css.replace(/rgba\(232,\s*115,\s*74,\s*[0-9.]+\)/g, 'var(--accent-bg)');
css = css.replace(/color:\s*#fff/g, 'color: #ffffff');
css = css.replace(/color:\s*#000/g, 'color: #000000');

// Replace linear gradients focusing on dark mode with light theme standard
css = css.replace(/linear-gradient\(135deg, var\(--ink\), rgba\(255, 255, 255, 0\.7\)\)/g, 'linear-gradient(135deg, var(--ink), var(--ink3))');

// Re-write standard buttons slightly to look more Apple-like
css = css.replace(/\.btn-accent\s*\{[\s\S]*?\}/, ".btn-accent {\n" +
  "background: var(--accent);\n" +
  "color: #fff;\n" +
  "border-radius: 100px;\n" +
  "padding: 14px 28px;\n" +
  "font-size: 14px;\n" +
  "box-shadow: 0 4px 14px rgba(0, 122, 255, 0.3);\n" +
  "position: relative;\n" +
  "overflow: hidden;\n" +
  "z-index: 1;\n" +
  "}");


// Apply overrides block
css += "\n\n/* ADDED BY SCRIPT FOR APPLE-LIKE LIGHT UI */\n" +
  ".sidebar, .topbar { background: var(--glass) !important; backdrop-filter: blur(20px); border-color: var(--glass-border) !important; }\n" +
  ".upload-left, .dzone, .fc-card, .note-card { background: var(--card-bg) !important; border-color: var(--card-border) !important; box-shadow: none !important; }\n" +
  "h1, h2, h3, h4, h5, .note-sec-title { color: var(--ink) !important; font-weight: 700 !important; }\n" +
  ".sb-logo, .sb-nav a { color: var(--ink) !important; }\n" +
  ".sb-nav a:hover, .sb-nav a.active { background: var(--card-hover) !important; color: var(--accent) !important; }\n" +
  ".sb-logo span { color: var(--accent) !important; }\n" +
  ".dzone { background: var(--card-bg) !important; border-color: var(--glass-border2) !important; }\n" +
  ".btn-out { color: var(--ink) !important; border-color: var(--glass-border2) !important; }\n" +
  ".btn-out:hover { background: var(--card-hover) !important; border-color: var(--card-border) !important; }\n" +
  ".upload-grid { background: var(--bg) !important; }\n" +
  ".main { background: var(--bg) !important; }\n" +
  ".app-shell { background: var(--bg) !important; }\n" +
  ".note-sec-head { border-bottom: 1px solid var(--card-border) !important; }\n" +
  ".paste-area { background: var(--white) !important; border-color: var(--card-border) !important; color: var(--ink) !important; }\n" +
  ".pc-tag { background: rgba(0, 122, 255, 0.1) !important; color: var(--accent) !important; }\n" +
  ".pcard { background: var(--white) !important; border-color: var(--card-border) !important; }\n";

fs.writeFileSync('style.css', css);
console.log('Patched style.css');
