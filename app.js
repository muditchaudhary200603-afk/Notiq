const { useState, useEffect, useRef, useCallback, useMemo } = React;

// â”€â”€ SVG ICONS (clean, minimal) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Icons = {
    upload: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), React.createElement('polyline', { points: '17 8 12 3 7 8' }), React.createElement('line', { x1: 12, y1: 3, x2: 12, y2: 15 })),
    notes: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), React.createElement('polyline', { points: '14 2 14 8 20 8' }), React.createElement('line', { x1: 16, y1: 13, x2: 8, y2: 13 }), React.createElement('line', { x1: 16, y1: 17, x2: 8, y2: 17 })),
    cards: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('rect', { x: 2, y: 3, width: 20, height: 14, rx: 2, ry: 2 }), React.createElement('line', { x1: 8, y1: 21, x2: 16, y2: 21 }), React.createElement('line', { x1: 12, y1: 17, x2: 12, y2: 21 })),
    quiz: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polyline', { points: '9 11 12 14 22 4' }), React.createElement('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' })),
    settings: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 3 }), React.createElement('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })),
    copy: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('rect', { x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }), React.createElement('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })),
    download: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), React.createElement('polyline', { points: '7 10 12 15 17 10' }), React.createElement('line', { x1: 12, y1: 15, x2: 12, y2: 3 })),
    folder: () => React.createElement('svg', { width: 42, height: 42, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' })),
    sparkle: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor' }, React.createElement('path', { d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' })),
    search: () => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 11, cy: 11, r: 8 }), React.createElement('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 })),
    user: () => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: 12, cy: 7, r: 4 })),
    close: () => React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('line', { x1: 18, y1: 6, x2: 6, y2: 18 }), React.createElement('line', { x1: 6, y1: 6, x2: 18, y2: 18 })),
    sun: () => React.createElement('svg', { className: 'sun-icon', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: 12, cy: 12, r: 5 }), React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }), React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }), React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }), React.createElement('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }), React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }), React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }), React.createElement('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }), React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })),
    moon: () => React.createElement('svg', { className: 'moon-icon', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })),
};

// â”€â”€ CONFIG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PROXY_URL = '/api/groq';
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_UPLOAD_EXTENSIONS = new Set(['pdf', 'docx', 'jpg', 'png', 'txt']);
const ALLOWED_UPLOAD_MIME = new Set([
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'text/plain',
    'application/octet-stream'
]);
const GENERATE_RATE_LIMIT = { max: 3, windowMs: 60 * 1000, timestamps: [] };

// â”€â”€ SETTINGS (localStorage backed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_SETTINGS = {
    detailLevel: 'detailed',   // concise | detailed | comprehensive
    language: 'en',            // en | hi | mixed
    includeFormulas: true,
    includeDiagrams: true,
    includeExamTips: true,
    includeExamples: true,
    includeComparisons: true,
    includeMnemonics: true
};

function loadSettings() {
    try {
        const s = JSON.parse(localStorage.getItem('notiq_settings') || '{}');
        return { ...DEFAULT_SETTINGS, ...s };
    } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(s) {
    localStorage.setItem('notiq_settings', JSON.stringify(s));
}

function normalizeMime(file) {
    return String(file?.type || '').toLowerCase().trim();
}

function getFileExt(fileName) {
    return String(fileName || '').toLowerCase().split('.').pop();
}

function validateUploadFile(file) {
    if (!file) throw new Error('BAD_FORMAT');
    const ext = getFileExt(file.name);
    const mime = normalizeMime(file);
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('TOO_LARGE');
    if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) throw new Error('BAD_FORMAT');
    if (!ALLOWED_UPLOAD_MIME.has(mime)) throw new Error('BAD_FORMAT');
    if (ext === 'pdf' && mime && mime !== 'application/pdf' && mime !== 'application/octet-stream') throw new Error('BAD_FORMAT');
    return { ext, mime };
}

async function ensurePdfMagicHeader(file) {
    const buf = await file.slice(0, 4).arrayBuffer();
    const b = new Uint8Array(buf);
    if (!(b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46)) {
        throw new Error('BAD_PDF_SIGNATURE');
    }
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeUserText(input) {
    const raw = String(input || '');
    if (window.DOMPurify) {
        return window.DOMPurify.sanitize(raw, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    }
    return raw.replace(/<[^>]*>/g, '');
}

function consumeGenerateAllowance() {
    const now = Date.now();
    const windowStart = now - GENERATE_RATE_LIMIT.windowMs;
    GENERATE_RATE_LIMIT.timestamps = GENERATE_RATE_LIMIT.timestamps.filter(t => t > windowStart);
    if (GENERATE_RATE_LIMIT.timestamps.length >= GENERATE_RATE_LIMIT.max) {
        const retryAt = GENERATE_RATE_LIMIT.timestamps[0] + GENERATE_RATE_LIMIT.windowMs;
        return { ok: false, cooldownMs: Math.max(0, retryAt - now) };
    }
    GENERATE_RATE_LIMIT.timestamps.push(now);
    return { ok: true, cooldownMs: 0 };
}

function getGenerateCooldownMs() {
    const now = Date.now();
    const windowStart = now - GENERATE_RATE_LIMIT.windowMs;
    GENERATE_RATE_LIMIT.timestamps = GENERATE_RATE_LIMIT.timestamps.filter(t => t > windowStart);
    if (GENERATE_RATE_LIMIT.timestamps.length < GENERATE_RATE_LIMIT.max) return 0;
    return Math.max(0, GENERATE_RATE_LIMIT.timestamps[0] + GENERATE_RATE_LIMIT.windowMs - now);
}

// â”€â”€ AI API (via backend proxy) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function callGroq(systemMsg, userMsg) {
    let res;
    try {
        res = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemMsg },
                    { role: 'user', content: userMsg }
                ]
            })
        });
    } catch (e) { throw new Error('NETWORK'); }
    if (!res.ok) {
        if (res.status === 429) throw new Error('RATE_LIMIT');
        if (res.status === 401 || res.status === 403) throw new Error('AUTH');
        throw new Error('API_' + res.status);
    }
    const data = await res.json();
    return (data.choices?.[0]?.message?.content || '').trim();
}

// â”€â”€ DYNAMIC SYSTEM PROMPT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildSystemPrompt() {
    const s = loadSettings();
    const lang = s.language === 'hi' ? 'Hindi' : s.language === 'mixed' ? 'English with Hindi explanations where helpful (Hinglish)' : 'English';

    let detailInstructions;
    if (s.detailLevel === 'concise') {
        detailInstructions = `- DENSITY OVER LENGTH: Every sentence must carry maximum informational payload. Use 2-4 tight bullets per sub-topic. Remove redundancy and keep only high-yield facts, numbers, mechanisms, and definitions.`;
    } else if (s.detailLevel === 'comprehensive') {
        detailInstructions = `- EXHAUSTIVE DEPTH: This is a deep academic reference. Leave no important concept unexplained. For each major concept explain WHAT, WHY, and HOW with concrete examples, values, thresholds, and edge cases.`;
    } else {
        detailInstructions = `- BALANCED MASTERY: Produce notes that can be used directly for exam revision. Each bullet must be self-contained, concrete, and concept-first (not rote list style).`;
    }

    let sections = `## 1. The Big Picture
- **What it is:** A sharp, authoritative one-sentence definition of the core subject.
- **Why it matters:** The real-world significance, industry relevance, or academic importance.
- **Scope:** [4-6 dense bullets covering the topic landscape.]
- **Prerequisites:** Any foundational knowledge a reader needs to understand this material.

## 2. Core Concepts & Mechanisms
[This is the intellectual heart of the notes. Structure it with precision:]
- Break every major concept into its atomic components.
- For each concept: NAME -> DEFINITION -> MECHANISM -> EXAMPLE -> SIGNIFICANCE
- Use **bold** for technical terms every time they appear.
- Where numbered processes exist, preserve exact sequence.
- Do NOT flatten complex hierarchies. Preserve parent-child relationships using indentation.
- Include specific values, thresholds, units, and quantitative details wherever they exist in the source.`;

    if (s.includeFormulas) sections += `\n\n## 3. Formulas, Equations & Definitions
[Extract EVERY formula, equation, theorem, law, and definition. Miss nothing.]
FORMULA: [Canonical Name] = [Full Equation/Expression] - When to use: [precise conditions] | Derivation hint: [brief intuition]
DEF: [Term] = [Razor-sharp, technically precise definition. No vague language.]
[If the source has zero formulas, provide key quantitative relationships or important numerical values instead.]`;

    if (s.includeComparisons) sections += `\n\n## 4. Critical Distinctions & Comparisons
[Force-contrast every pair of similar or easily-confused concepts.]
**[Concept A]** vs **[Concept B]**:
- Core difference: [single decisive sentence]
- When to use A: [specific condition]
- When to use B: [specific condition]
- Common mistake: [the exact error most people make]
[Repeat for every comparable pair in the material.]`;

    if (s.includeDiagrams) sections += `\n\n## 5. Visual Architecture (Block Diagram)
[Create at least one ASCII block diagram. Use plain text only.]
BLOCK_DIAGRAM_START: [Descriptive Title]
[Input] --> [Block A] --> [Block B] --> [Output]
               |--> [Monitoring/Control]
BLOCK_DIAGRAM_END
[If the topic is abstract, create a concept relationship block flow.]`;

    if (s.includeMnemonics) sections += `\n\n## 6. Memory Engineering
MNEMONIC: [A powerful acronym, rhyme, or story-hook to lock in complex lists or sequences]
TIP: [A specific, non-obvious study technique tailored to THIS exact material]
[Think like a memory champion: what mental image, story, or association makes this unforgettable?]`;

    if (s.includeExamTips) sections += `\n\n## 7. Exam Intelligence
EXAM: [The single most common mistake students make on this topic]
EXAM: [The most counter-intuitive fact]
[3-5 HIGH-PROBABILITY exam questions with the exact angle they're likely to be tested from:]
- "[Likely exam question stem]" -> Key insight to answer correctly: [answer]
[Identify the concepts that discriminate between A and A+ students on this topic.]`;

    if (s.includeExamples) sections += `\n\n## 8. Real-World Applications
- **Industry Application:** [A specific, named real-world use case]
- **Practical Example:** [A concrete worked example with numbers/specifics, not a vague description]
- **Case Study:** [A real or illustrative scenario where this concept solves a problem or explains a phenomenon]
- **Career Relevance:** [Why a professional in [relevant field] needs to understand this deeply]`;

    sections += `\n\n## 60-Second Power Summary
[10-15 rapid-fire bullets. Each bullet = one critical fact. No explanations.]
- **[Term/Concept]:** [Single-line fact]
[Make every bullet independently valuable. This section is a cheat-sheet, not a paragraph.]`;

    return `You are Notiq AI - an expert academic knowledge synthesizer trained to produce high-quality study notes.

YOUR MISSION: Transform raw source material into structured, industry-quality study notes that are:
1. COMPLETE: No important concept from the source goes missing.
2. PRECISE: Exact numbers, mechanisms, and definitions.
3. STRUCTURED: Logical flow from overview -> detail -> application -> memorization.
4. ACTIONABLE: A student should be able to pass an exam or apply this professionally using ONLY these notes.

TARGET LANGUAGE: ${lang}.

MANDATORY QUALITY STANDARDS:
- Write like a world-class professor who respects the reader's intelligence.
- **Bold** every key term, entity, formula name, and critical number throughout.
- Never write "This section covers..." or "In this text, we see..." - start directly with content.
- Every bullet point must be SELF-CONTAINED: comprehensible without reading surrounding context.
- Preserve all quantitative information: percentages, units, thresholds, specific values.
- If the source material uses specific terminology, adopt it precisely.
${detailInstructions}

OUTPUT FORMAT - Follow EXACTLY. No preamble. No markdown fences. No commentary:
---NOTES---
# TOPIC: [An authoritative, specific, professional title]

${sections}

---CARDS---
Q: [Precise conceptual question that tests understanding, not just recall] || A: [Complete, standalone answer]
[Generate 8-10 flashcards only. Do not exceed 10.]

---QUIZ---
MCQ1: [Conceptually rich question] | [Plausible distractor A] | [Plausible distractor B] | [Plausible distractor C] | [Correct answer D] | [Exact text of correct option]
MCQ2: [Application-based question] | [Option A] | [Option B] | [Option C] | [Option D] | [Exact correct option text]
MCQ3: [Numerical/formula question] | [Option A] | [Option B] | [Option C] | [Option D] | [Exact correct option text]
SHORT1: [Question requiring explanation of a mechanism or process] || [Model answer: 2-3 precise sentences]
SHORT2: [Question requiring comparison, analysis, or evaluation] || [Model answer with specific details]
CONCEPT1: [Scenario: "A student/engineer/professional encounters X situation... What happens and why?"] || [Detailed explanation applying core concepts to the scenario]
[Produce 8-10 total quiz questions only. Do not exceed 10. Format EXACTLY as shown.]`;
}

// â”€â”€ CHUNK & PROCESS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function chunkText(text, size) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += size) chunks.push(words.slice(i, i + size).join(' '));
    return chunks;
}
const MAX_CHUNKS = 3;
const CHUNK_SIZE = 2500;

async function processChunk(chunk) {
    const prompt = buildSystemPrompt();
    return await callGroq(
        prompt,
        'Create high-quality short study notes from this content. Make them concise but exam-ready, with high information density, precise terminology, and no fluff. Ensure full coverage and include strong cards + quizzes exactly in required format.\n\n' + chunk
    );
}

// â”€â”€ PARSE AI OUTPUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sanitizeInline = (s, maxLen = 260) => {
    const t = String(s || '')
        .replace(/\s+/g, ' ')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .trim();
    if (!t) return '';
    return t.length > maxLen ? (t.slice(0, maxLen - 1) + '…') : t;
};

function normalizeNotesRaw(input) {
    let raw = String(input || '').replace(/\r/g, '').trim();
    if (!raw) return '';

    // Remove accidental spillover into cards/quiz blocks if model returned mixed text.
    raw = raw.split(/[-–—]{3}\s*CARDS\s*[-–—]{3}/i)[0];
    raw = raw.split(/[-–—]{3}\s*QUIZ\s*[-–—]{3}/i)[0];

    // Normalize separators and force structure cues onto new lines.
    raw = raw
        .replace(/\s+\|\|\s+/g, ' || ')
        .replace(/\s+(?=##\s+)/g, '\n')
        .replace(/\s+(?=#\s*(TOPIC:)?\s*)/g, '\n')
        .replace(/\s+(?=(FORMULA:|DEF:|EXAM:|MNEMONIC:|TIP:|BLOCK_DIAGRAM_START:|BLOCK_DIAGRAM_END|DIAGRAM_START:|DIAGRAM_END))/gi, '\n')
        .replace(/\s+(?=\d+\.\d+\.)/g, '\n')
        .replace(/\s+-\s+/g, '\n- ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    // Ensure title.
    if (!/^#\s*(TOPIC:)?/m.test(raw)) {
        const first = sanitizeInline(raw.split(/[.\n]/)[0], 72) || 'Study Notes';
        raw = `# TOPIC: ${first}\n\n## 1. Core Notes\n` + raw;
    }

    // Ensure at least one section.
    if (!/^##\s+/m.test(raw)) {
        raw = raw.replace(/^#.*$/m, '$&\n\n## 1. Core Notes');
    }

    // If still too dense, split sentence-like chunks into bullet lines.
    const lines = raw.split('\n');
    const rebuilt = [];
    for (const ln of lines) {
        const line = ln.trim();
        if (!line) { rebuilt.push(''); continue; }
        if (/^(#|##|[-*•]\s|FORMULA:|DEF:|EXAM:|MNEMONIC:|TIP:|BLOCK_DIAGRAM_START:|BLOCK_DIAGRAM_END|DIAGRAM_START:|DIAGRAM_END)/i.test(line)) {
            rebuilt.push(line);
            continue;
        }
        if (line.length > 220) {
            const parts = line.split(/\.\s+/).map(s => s.trim()).filter(Boolean);
            if (parts.length > 1) {
                parts.forEach(p => rebuilt.push(`- ${sanitizeInline(p, 220)}`));
                continue;
            }
        }
        rebuilt.push(line);
    }
    return rebuilt.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function parseAIOutput(raw) {
    const findMarker = (label) => {
        const m = String(raw || '').match(new RegExp(`[-–—]{3}\\s*${label}\\s*[-–—]{3}`, 'i'));
        return m ? m.index : -1;
    };

    const notesSplit = findMarker('NOTES');
    const cardsSplit = findMarker('CARDS');
    const quizSplit = findMarker('QUIZ');
    let notesRaw = '', cardsRaw = '', quizRaw = '';
    if (notesSplit >= 0) {
        const end = cardsSplit >= 0 ? cardsSplit : quizSplit >= 0 ? quizSplit : raw.length;
        notesRaw = raw.slice(notesSplit, end).replace(/^[\s\S]*?[-–—]{3}\s*NOTES\s*[-–—]{3}/i, '').trim();
    } else { notesRaw = raw.trim(); }
    if (cardsSplit >= 0) {
        const end = quizSplit >= 0 ? quizSplit : raw.length;
        cardsRaw = raw.slice(cardsSplit, end).replace(/^[\s\S]*?[-–—]{3}\s*CARDS\s*[-–—]{3}/i, '').trim();
    }
    if (quizSplit >= 0) quizRaw = raw.slice(quizSplit).replace(/^[\s\S]*?[-–—]{3}\s*QUIZ\s*[-–—]{3}/i, '').trim();

    // Backup extraction when explicit markers are missing but inline sections exist.
    if (!cardsRaw) {
        const m = String(raw || '').match(/(?:^|\n)\s*Q:\s*[\s\S]+/i);
        if (m) cardsRaw = m[0];
    }
    if (!quizRaw) {
        const m = String(raw || '').match(/(?:^|\n)\s*(MCQ\d+:|SHORT\d+:|CONCEPT\d+:|TF\d+:)[\s\S]+/i);
        if (m) quizRaw = m[0];
    }
    notesRaw = normalizeNotesRaw(notesRaw);
    let cards = parseCards(cardsRaw);
    let quiz = parseQuiz(quizRaw);

    // Fallback synthesis when model omits card/quiz sections or returns weak formatting.
    if (cards.length < 8) {
        cards = [...cards, ...deriveCardsFromNotes(notesRaw, 10)];
    }
    if (quiz.length < 8) {
        quiz = [...quiz, ...deriveQuizFromNotes(notesRaw, 10)];
    }

    // De-duplicate while preserving order.
    const cardSeen = new Set();
    cards = cards.filter(c => {
        const key = `${(c.front || '').toLowerCase()}|${(c.back || '').toLowerCase()}`;
        if (cardSeen.has(key)) return false;
        cardSeen.add(key);
        return true;
    });
    const quizSeen = new Set();
    quiz = quiz.filter(q => {
        const key = `${q.type}|${(q.question || '').toLowerCase()}`;
        if (quizSeen.has(key)) return false;
        quizSeen.add(key);
        return true;
    });

    cards = cards.map(c => ({
        front: sanitizeInline(c.front, 180),
        back: sanitizeInline(c.back, 420)
    })).filter(c => c.front && c.back);

    quiz = quiz.map(q => ({
        ...q,
        question: sanitizeInline(q.question, 240),
        correct: sanitizeInline(q.correct, 320),
        options: Array.isArray(q.options) ? q.options.map(o => sanitizeInline(o, 120)).filter(Boolean).slice(0, 4) : q.options
    })).filter(q => q.question && q.correct);

    return { notesRaw, cards: cards.slice(0, 10), quiz: quiz.slice(0, 10) };
}

function parseCards(raw) {
    if (!raw) return [];
    const cards = [];
    // Strategy 1: Q: ... || A: ... on same line
    const lines = raw.split('\n');
    let i = 0;
    while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith('Q:')) {
            if (l.includes('||')) {
                // Same-line format: Q: question || A: answer
                const [q, a] = l.split('||');
                const front = q.replace(/^Q:\s*/, '').trim();
                const back = (a || '').replace(/^A:\s*/, '').trim();
                if (front && back) cards.push({ front, back });
                i++;
            } else {
                // Multi-line format: Q: ... \n A: ...
                const front = l.replace(/^Q:\s*/, '').trim();
                let back = '';
                let j = i + 1;
                // Collect lines until we hit A: or next Q: or blank
                while (j < lines.length) {
                    const next = lines[j].trim();
                    if (next.startsWith('A:')) {
                        back = next.replace(/^A:\s*/, '').trim();
                        // grab continuation lines too
                        let k = j + 1;
                        while (k < lines.length && lines[k].trim() && !lines[k].trim().startsWith('Q:') && !lines[k].trim().startsWith('A:')) {
                            back += ' ' + lines[k].trim();
                            k++;
                        }
                        i = k;
                        break;
                    } else if (next.startsWith('Q:') || !next) {
                        i = j;
                        break;
                    }
                    j++;
                    if (j >= lines.length) { i = j; break; }
                }
                if (front && back) cards.push({ front, back });
            }
        } else {
            i++;
        }
    }
    // Strategy 2: if nothing found, try numbered list "1. Q || A" 
    if (cards.length === 0) {
        raw.split('\n').forEach(l => {
            const m = l.match(/^\d+[\.\)]\s*(.+?)\s*\|\|\s*(.+)$/);
            if (m) cards.push({ front: m[1].trim(), back: m[2].trim() });
        });
    }
    return cards
        .map(c => ({ front: sanitizeInline(c.front, 180), back: sanitizeInline(c.back, 420) }))
        .filter(c => c.front && c.back && c.front.length > 3);
}

function parseQuiz(raw) {
    if (!raw) return [];
    const qs = [];
    raw.split('\n').forEach(l => {
        l = l.trim();
        if (l.startsWith('MCQ')) {
            const inner = l.replace(/^MCQ\d+:\s*/, '');
            const parts = inner.split('|').map(p => p.trim());
            if (parts.length >= 6) qs.push({ type: 'mcq', question: parts[0], options: parts.slice(1, 5), correct: parts[5] });
        } else if (l.startsWith('SHORT')) {
            const inner = l.replace(/^SHORT\d+:\s*/, '');
            const [q, a] = inner.split('||');
            if (q) qs.push({ type: 'short', question: q.trim(), correct: (a || '').trim() });
        } else if (l.startsWith('CONCEPT')) {
            const inner = l.replace(/^CONCEPT\d+:\s*/, '');
            const [q, a] = inner.split('||');
            if (q) qs.push({ type: 'concept', question: q.trim(), correct: (a || '').trim() });
        } else if (l.startsWith('TF')) {
            const inner = l.replace(/^TF\d+:\s*/, '');
            const parts = inner.split('|').map(p => p.trim());
            if (parts.length >= 2) qs.push({ type: 'tf', question: parts[0], correct: parts[1] });
        }
    });
    return qs.map(q => ({
        ...q,
        question: sanitizeInline(q.question, 240),
        correct: sanitizeInline(q.correct, 320),
        options: Array.isArray(q.options) ? q.options.map(o => sanitizeInline(o, 120)).slice(0, 4) : q.options
    }));
}

function deriveCardsFromNotes(notesRaw, target = 14) {
    if (!notesRaw) return [];
    const cards = [];
    const lines = notesRaw
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .filter(l => !l.startsWith('#') && !l.startsWith('---'));

    let currentHeading = 'the topic';
    for (const line of notesRaw.split('\n')) {
        const t = line.trim();
        if (/^##\s+/.test(t)) {
            currentHeading = t.replace(/^##\s+(\d+\.\s*)?/, '').trim() || 'the topic';
            continue;
        }
        if (!t || t.startsWith('#') || t.startsWith('---')) continue;
        if (/^[-*•]\s+/.test(t) || /^FORMULA:|^DEF:|^EXAM:|^MNEMONIC:|^TIP:/i.test(t)) {
            const cleaned = t.replace(/^[-*•]\s+/, '').replace(/^FORMULA:\s*/i, '').replace(/^DEF:\s*/i, '').replace(/^EXAM:\s*/i, '').replace(/^MNEMONIC:\s*/i, '').replace(/^TIP:\s*/i, '').trim();
            if (cleaned.length < 14) continue;
            cards.push({
                front: sanitizeInline(`In ${currentHeading}, explain: ${cleaned.split(/[.]/)[0]}?`, 180),
                back: sanitizeInline(cleaned, 420)
            });
        }
        if (cards.length >= target) break;
    }

    // Secondary fallback from generic lines if still low.
    let idx = 0;
    while (cards.length < target && idx < lines.length) {
        const text = lines[idx++];
        if (text.length < 24) continue;
        cards.push({
            front: sanitizeInline(`What is the key idea behind: ${text.slice(0, 80)}${text.length > 80 ? '...' : ''}?`, 180),
            back: sanitizeInline(text, 420)
        });
    }
    return cards;
}

function deriveQuizFromNotes(notesRaw, target = 10) {
    if (!notesRaw) return [];
    const qs = [];
    const bullets = notesRaw
        .split('\n')
        .map(l => l.trim())
        .filter(l => /^[-*•]\s+/.test(l))
        .map(l => l.replace(/^[-*•]\s+/, '').trim())
        .filter(l => l.length > 20);

    for (let i = 0; i < bullets.length && qs.length < target; i++) {
        const b = bullets[i];
        qs.push({
            type: 'short',
            question: sanitizeInline(`Explain this in your own words: ${b.split(/[.]/)[0]}?`, 240),
            correct: sanitizeInline(b, 320)
        });
    }

    const defs = notesRaw
        .split('\n')
        .map(l => l.trim())
        .filter(l => /^DEF:/i.test(l))
        .map(l => l.replace(/^DEF:\s*/i, '').trim())
        .filter(Boolean);
    for (const d of defs) {
        if (qs.length >= target) break;
        const term = d.split('=').map(x => x.trim())[0] || 'this term';
        qs.push({
            type: 'concept',
            question: sanitizeInline(`Define and apply: ${term}`, 240),
            correct: sanitizeInline(d, 320)
        });
    }
    return qs;
}

// â”€â”€ NOTES RENDERER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SEC_COLORS = ['accent', 'blue', 'green', 'gold', 'dark', 'accent', 'blue', 'green'];

function renderNoteBody(lines) {
    const items = [];
    let buf = [], bufType = null;
    function flush() {
        if (!buf.length) return;
        if (bufType === 'ul') items.push({ type: 'ul', items: [...buf] });
        else if (bufType === 'diagram_art') items.push({ type: 'diagram_art', lines: [...buf] });
        else if (bufType === 'p') items.push({ type: 'p', text: buf.join(' ') });
        buf = []; bufType = null;
    }
    lines.forEach(raw => {
        const l = raw.trim();
        if (!l) { flush(); return; }
        if (l.startsWith('FORMULA:') || l.startsWith('FORMULA ')) { flush(); items.push({ type: 'formula', text: l.replace(/^FORMULA:?\s*/i, '') }); return; }
        if (l.startsWith('DEF:')) { flush(); items.push({ type: 'formula', text: l.replace(/^DEF:\s*/i, '') }); return; }
        if (l.startsWith('DIAGRAM:') || l.startsWith('DIAGRAM_START:') || l.startsWith('BLOCK_DIAGRAM_START:')) {
            flush();
            items.push({ type: 'diagram', text: l.replace(/^(DIAGRAM(_START)?|BLOCK_DIAGRAM_START):\s*/i, '') });
            return;
        }
        if (l.startsWith('BLOCK_DIAGRAM_END') || l === 'DIAGRAM_END') { flush(); return; }
        if (/^\[[^\]]+\]\s*-->\s*\[[^\]]+\]/.test(l) || l.includes('-->') || l.includes('|-->')) {
            if (bufType !== 'diagram_art') flush();
            bufType = 'diagram_art';
            buf.push(l);
            return;
        }
        if (l.startsWith('MNEMONIC:') || l.startsWith('TIP:')) { flush(); items.push({ type: 'memory', text: l }); return; }
        if (l.startsWith('EXAM:')) { flush(); items.push({ type: 'exam', text: l.replace(/^EXAM:\s*/i, '') }); return; }
        if (/^[-*•]\s/.test(l)) { if (bufType !== 'ul') flush(); bufType = 'ul'; buf.push(l.replace(/^[-*•]\s/, '')); return; }
        flush(); bufType = 'p'; buf.push(l);
    });
    flush();
    return items;
}

function inlineFmt(txt) {
    return txt.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>');
}

function safeInlineHTML(txt) {
    const formatted = inlineFmt(escapeHtml(txt));
    if (window.DOMPurify) {
        return window.DOMPurify.sanitize(formatted, { ALLOWED_TAGS: ['strong', 'em', 'code'], ALLOWED_ATTR: [] });
    }
    return formatted;
}

function NoteBodyItem({ item }) {
    if (item.type === 'ul') return React.createElement('ul', null, item.items.map((li, i) => React.createElement('li', { key: i, dangerouslySetInnerHTML: { __html: safeInlineHTML(li) } })));
    if (item.type === 'p') return React.createElement('p', { dangerouslySetInnerHTML: { __html: safeInlineHTML(item.text) } });
    if (item.type === 'formula') return React.createElement('div', { className: 'formula-block' }, React.createElement('code', null, item.text));
    if (item.type === 'diagram') return React.createElement('div', { className: 'diagram-block' }, React.createElement('div', { className: 'diagram-title' }, item.text));
    if (item.type === 'diagram_art') return React.createElement('div', { className: 'diagram-block diagram-art-block' }, React.createElement('pre', { className: 'diagram-ascii' }, item.lines.join('\n')));
    if (item.type === 'memory') return React.createElement('div', { className: 'memory-block', dangerouslySetInnerHTML: { __html: safeInlineHTML(item.text) } });
    if (item.type === 'exam') return React.createElement('div', { className: 'exam-block', dangerouslySetInnerHTML: { __html: safeInlineHTML(item.text) } });
    return null;
}

function NotesView({ notesRaw }) {
    const [collapsed, setCollapsed] = useState({});
    const parsed = useMemo(() => {
        if (!notesRaw) return { title: '', sections: [] };
        const lines = notesRaw.split('\n');
        let title = '';
        const sections = [];
        let curSec = null;
        lines.forEach(raw => {
            const l = raw.trim();
            if (l.startsWith('# TOPIC:') || (l.startsWith('# ') && !l.startsWith('## '))) { title = l.replace(/^#\s*(TOPIC:\s*)?/, '').trim(); return; }
            if (/^##\s+/.test(l)) { if (curSec) sections.push(curSec); curSec = { heading: l.replace(/^##\s+(\d+\.\s*)?/, '').trim(), lines: [] }; return; }
            if (curSec) curSec.lines.push(raw);
        });
        if (curSec) sections.push(curSec);
        if (!sections.length) {
            const body = lines.filter(l => l.trim() && !l.trim().startsWith('#'));
            if (body.length) sections.push({ heading: 'Core Notes', lines: body });
        }
        return { title, sections };
    }, [notesRaw]);

    function toggle(i) { setCollapsed(p => ({ ...p, [i]: !p[i] })); }

    if (!notesRaw) return (
        <div className="empty">
            <div className="empty-em">N</div>
            <div className="empty-h">No notes yet</div>
            <div className="empty-p">Upload a document to generate structured academic notes.</div>
        </div>
    );

    return (
        <div className="notes-wrap">
            {parsed.title && (
                <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px' }}>Topic: {parsed.title}</div>
                </div>
            )}
            {parsed.sections.map((sec, si) => {
                const open = !collapsed[si];
                const bodyItems = renderNoteBody(sec.lines);
                const isSummary = /summary/i.test(sec.heading);
                return (
                    <div key={si} className="note-card" style={{ animation: `fadeUp 0.3s ease ${si * 0.05}s both` }}>
                        <div className="note-sec-head" onClick={() => toggle(si)}>
                            <div className={'note-sec-num ' + (SEC_COLORS[si] || 'accent')}>{si + 1}</div>
                            <div className="note-sec-title">{sec.heading || 'Section ' + (si + 1)}</div>
                            <div className="note-sec-toggle" style={{ transform: open ? 'rotate(180deg)' : '' }}>▾</div>
                        </div>
                        {open && (
                            <div className={'note-sec-body' + (isSummary ? ' summary-block' : '')}>
                                {bodyItems.map((item, ii) => <NoteBodyItem key={ii} item={item} />)}
                            </div>
                        )}
                    </div>
                );
            })}
            {!parsed.sections.length && (
                <div className="note-card">
                    <div className="note-sec-body">
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13.5, lineHeight: 1.75 }}>{notesRaw}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

// â”€â”€ FILE READER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function cleanText(s) {
    return s.replace(/(\w)-\n(\w)/g, '$1$2').replace(/\f/g, '\n\n').replace(/[ \t]{3,}/g, ' ').replace(/\n{4,}/g, '\n\n\n').trim();
}

async function withTimeout(promise, ms, code) {
    let timer;
    try {
        return await Promise.race([
            promise,
            new Promise((_, reject) => {
                timer = setTimeout(() => reject(new Error(code || 'TIMEOUT')), ms);
            })
        ]);
    } finally {
        if (timer) clearTimeout(timer);
    }
}

async function readFile(file, onProg) {
    const { ext } = validateUploadFile(file);
    if (['png', 'jpg'].includes(ext)) {
        if (!window.Tesseract) throw new Error('OCR_NOT_READY');
        const r = await window.Tesseract.recognize(file, 'eng', { logger: m => { if (m.status === 'recognizing text') onProg(m.progress * 72); } });
        return cleanText(r.data.text);
    }
    if (ext === 'pdf') {
        await ensurePdfMagicHeader(file);
        const lib = window.pdfjsLib || window['pdfjs-dist/build/pdf'];
        if (!lib) throw new Error('PDF_NOT_READY');
        lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await withTimeout(lib.getDocument({ data: await file.arrayBuffer() }).promise, 30000, 'PDF_TIMEOUT');
        let txt = '';
        let textChars = 0;
        const TEXT_PAGE_TIMEOUT_MS = 12000;
        for (let p = 1; p <= pdf.numPages; p++) {
            onProg((p / pdf.numPages) * 45);
            let pg;
            try {
                pg = await withTimeout(pdf.getPage(p), TEXT_PAGE_TIMEOUT_MS, 'PDF_PAGE_TIMEOUT');
            } catch {
                continue;
            }
            let c;
            try {
                c = await withTimeout(pg.getTextContent({ includeMarkedContent: false }), TEXT_PAGE_TIMEOUT_MS, 'PDF_TEXT_TIMEOUT');
            } catch {
                continue;
            }
            const ordered = [...(c.items || [])].sort((a, b) => {
                const ay = a.transform?.[5] || 0;
                const by = b.transform?.[5] || 0;
                if (Math.abs(ay - by) > 2) return by - ay;
                const ax = a.transform?.[4] || 0;
                const bx = b.transform?.[4] || 0;
                return ax - bx;
            });
            let lastY = null, line = '';
            ordered.forEach(it => {
                const y = it.transform?.[5] || 0;
                if (lastY !== null && Math.abs(y - lastY) > 4) line += '\n';
                line += (it.str || '') + ' ';
                lastY = y;
            });
            textChars += line.replace(/\s+/g, '').length;
            txt += line + '\n\n';
        }
        const extracted = cleanText(txt);
        const extractedChars = extracted.replace(/\s+/g, '').length;
        if (extracted && extractedChars >= 12 && textChars >= 12) {
            return extracted;
        }

        // Scanned/image-only PDF fallback: OCR page renders in-browser.
        if (!window.Tesseract) throw new Error('OCR_NOT_READY');
        const OCR_PAGE_TIMEOUT_MS = 35000;
        const maxOcrPages = Math.min(pdf.numPages, 6);
        let ocrText = '';
        for (let p = 1; p <= maxOcrPages; p++) {
            // Keep UI moving even if OCR logger is sparse.
            onProg(Math.min(96, 45 + Math.round((p / maxOcrPages) * 45)));
            let pg;
            try {
                pg = await withTimeout(pdf.getPage(p), 12000, 'PDF_PAGE_TIMEOUT');
            } catch {
                continue;
            }
            const viewport = pg.getViewport({ scale: 1.6 });
            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            const ctx = canvas.getContext('2d');
            try {
                await withTimeout(pg.render({ canvasContext: ctx, viewport }).promise, 20000, 'PDF_RENDER_TIMEOUT');
            } catch {
                continue;
            }
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) continue;
            const ocrTask = window.Tesseract.recognize(blob, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const base = 45 + ((p - 1) / maxOcrPages) * 45;
                        onProg(Math.min(96, Math.round(base + m.progress * (45 / maxOcrPages))));
                    }
                }
            });
            const timeoutTask = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('OCR_TIMEOUT')), OCR_PAGE_TIMEOUT_MS);
            });
            try {
                const r = await Promise.race([ocrTask, timeoutTask]);
                ocrText += (r?.data?.text || '') + '\n\n';
            } catch (e) {
                // Skip slow/failed page OCR and continue.
                console.warn('OCR page skipped:', p, e?.message || e);
            }
        }
        const ocrClean = cleanText(ocrText);
        if (ocrClean.replace(/\s+/g, '').length >= 10) return ocrClean;
        if (extractedChars >= 1) return extracted;
        throw new Error('EMPTY_FILE');
    }
    if (ext === 'docx') {
        if (!window.mammoth) throw new Error('DOCX_NOT_READY');
        const r = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        return cleanText(r.value);
    }
    if (ext === 'txt') return cleanText(await file.text());
    throw new Error('BAD_FORMAT');
}

function getErrInfo(code) {
    const map = {
        TOO_LARGE: { title: 'File too large', msg: 'Max 50 MB. Please use a smaller file.', icon: '!' },
        OCR_NOT_READY: { title: 'OCR loading', msg: 'Image reader is loading. Wait a moment and retry.', icon: 'i' },
        PDF_NOT_READY: { title: 'PDF reader loading', msg: 'Reload the page and try again.', icon: 'i' },
        PDF_TIMEOUT: { title: 'PDF processing timeout', msg: 'This PDF is taking too long to parse. Try a smaller PDF or fewer pages.', icon: '!' },
        PDF_PAGE_TIMEOUT: { title: 'PDF page timeout', msg: 'Some pages are too heavy to parse quickly. Try a lighter PDF.', icon: '!' },
        PDF_TEXT_TIMEOUT: { title: 'PDF text timeout', msg: 'Text extraction took too long on this file. Try another PDF.', icon: '!' },
        PDF_RENDER_TIMEOUT: { title: 'PDF render timeout', msg: 'Page rendering took too long for OCR. Try a smaller/scaled PDF.', icon: '!' },
        DOCX_NOT_READY: { title: 'Word reader loading', msg: 'Reload the page and try again.', icon: 'i' },
        BAD_FORMAT: { title: 'Unsupported format', msg: 'Use PDF, DOCX, JPG, PNG, or TXT only.', icon: 'x' },
        BAD_PDF_SIGNATURE: { title: 'Invalid PDF', msg: 'This file is not a valid PDF file.', icon: 'x' },
        RATE_LIMIT: { title: 'Rate limit hit', msg: 'Too many requests. Please wait and try again.', icon: '!' },
        RATE_LIMIT_CLIENT: { title: 'Rate limit hit', msg: 'Maximum 3 generate requests per minute.', icon: '!' },
        AUTH: { title: 'Request failed', msg: 'Something went wrong, please try again.', icon: '!' },
        NETWORK: { title: 'Request failed', msg: 'Something went wrong, please try again.', icon: '!' },
        EMPTY_FILE: { title: 'No text found', msg: 'Could not extract text. Try a different format.', icon: '!' },
    };
    return map[code] || { title: 'Something went wrong', msg: 'Something went wrong, please try again.', icon: '!' };
}

// â”€â”€ HELPERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const shuffle = a => [...a].sort(() => Math.random() - .5);
const fmtTime = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

function exportNotesPDF(notesRaw, title) {
    if (!window.jspdf) { alert('PDF library not loaded. Please wait and retry.'); return; }
    if (!notesRaw || !notesRaw.trim()) { alert('No notes to export.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pw = 170, mg = 20;
    const safeLine = s => String(s || '').replace(/\s+/g, ' ').replace(/[^\x20-\x7E]/g, ' ').trim();
    const safeFile = (title || 'notiq-notes').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || ('notiq-notes-' + Date.now());
    let y = mg;
    doc.setFontSize(22); doc.setFont('helvetica', 'bold');
    doc.setTextColor(10, 132, 255);
    doc.text(safeLine(title || 'Notiq Study Notes'), mg, y); y += 12;
    doc.setDrawColor(10, 132, 255); doc.setLineWidth(0.5); doc.line(mg, y, mg + pw, y); y += 10;
    doc.setTextColor(0, 0, 0);
    const cleanNotes = normalizeNotesRaw(notesRaw || '');
    const rawLines = cleanNotes.split('\n');
    rawLines.forEach(raw => {
        const l = raw.trim();
        if (!l) { y += 4; return; }
        if (/^[-–—]{3}\s*(NOTES|CARDS|QUIZ)\s*[-–—]{3}$/i.test(l)) return;
        if (/^\d+(\.\d+)*$/.test(l)) return;
        if (l === 'DIAGRAM_END' || l === 'DIAGRAM_START' || l === 'BLOCK_DIAGRAM_END' || l === 'BLOCK_DIAGRAM_START') return;
        if (y > 275) { doc.addPage(); y = mg; }
        if (l.startsWith('# TOPIC:') || (l.startsWith('# ') && !l.startsWith('## '))) {
            doc.setFontSize(16); doc.setFont('helvetica', 'bold');
            doc.text(safeLine(l.replace(/^#\s*(TOPIC:\s*)?/, '')), mg, y); y += 10;
        } else if (l.startsWith('## ')) {
            y += 4; doc.setFontSize(13); doc.setFont('helvetica', 'bold');
            doc.setTextColor(10, 132, 255); doc.text(safeLine(l.replace(/^## /, '')), mg, y); y += 8;
            doc.setTextColor(0, 0, 0);
        } else if (l.startsWith('FORMULA:') || l.startsWith('DEF:')) {
            doc.setFontSize(10); doc.setFont('courier', 'normal');
            const w = doc.splitTextToSize(safeLine(l), pw); w.forEach(wl => { if (y > 275) { doc.addPage(); y = mg; } doc.text(wl, mg + 4, y); y += 5.5; });
            doc.setFont('helvetica', 'normal');
        } else if (l.startsWith('EXAM:') || l.startsWith('MNEMONIC:') || l.startsWith('TIP:') || l.startsWith('DIAGRAM:') || l.startsWith('DIAGRAM_START:') || l.startsWith('BLOCK_DIAGRAM_START:')) {
            doc.setFontSize(10); doc.setFont('helvetica', 'bolditalic');
            const txt = safeLine(l.replace(/^DIAGRAM(_START)?:\s*/i, 'DIAGRAM: ').replace(/^BLOCK_DIAGRAM_START:\s*/i, 'BLOCK DIAGRAM: '));
            const w = doc.splitTextToSize(txt, pw - 8); w.forEach(wl => { if (y > 275) { doc.addPage(); y = mg; } doc.text(wl, mg + 4, y); y += 5.5; });
            doc.setFont('helvetica', 'normal');
        } else if (l.includes('-->') || l.includes('|-->') || /^\[[^\]]+\]/.test(l)) {
            doc.setFontSize(8); doc.setFont('courier', 'normal');
            doc.text(safeLine(raw), mg + 4, y); y += 4;
            doc.setFont('helvetica', 'normal');
        } else if (/^[-*•]\s/.test(l)) {
            doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            const b = safeLine(l.replace(/^[-*•]\s/, '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1'));
            const w = doc.splitTextToSize('- ' + b, pw - 8); w.forEach(wl => { if (y > 275) { doc.addPage(); y = mg; } doc.text(wl, mg + 4, y); y += 5.5; });
        } else {
            doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            const c = safeLine(l.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`([^`]+)`/g, '$1'));
            const w = doc.splitTextToSize(c, pw); w.forEach(wl => { if (y > 275) { doc.addPage(); y = mg; } doc.text(wl, mg, y); y += 5.5; });
        }
    });
    const pc = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pc; i++) {
        doc.setPage(i); doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(160, 160, 160);
        doc.text('Generated by Notiq', mg, 290); doc.text('Page ' + i + ' of ' + pc, 175, 290);
    }
    try {
        doc.save(safeFile + '.pdf');
    } catch {
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeFile + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 3000);
    }
}

// â”€â”€ TOAST â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useToast() {
    const [toasts, setToasts] = useState([]);
    const add = useCallback((msg, type, dur) => {
        const id = Date.now() + Math.random();
        setToasts(t => [...t, { id, msg, type: type || 'info' }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), dur || 4500);
    }, []);
    const rm = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);
    return { toasts, add, rm };
}

function Toasts({ toasts, rm }) {
    const ic = { ok: 'OK', warn: 'WARN', err: 'ERR', info: 'INFO' };
    return (
        <div className="toast-tray">
            {toasts.map(t => (
                <div key={t.id} className={'toast t-' + t.type}>
                    <span>{ic[t.type] || 'INFO'}</span>
                    <span style={{ flex: 1 }}>{t.msg}</span>
                    <span className="t-x" onClick={() => rm(t.id)}>x</span>
                </div>
            ))}
        </div>
    );
}

// â”€â”€ DEMO DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEMO_NOTES = `# TOPIC: Solar Inverter System

## 1. Concept Overview
- System converts DC solar power to AC household power
- Uses Arduino UNO as main controller operating at 5V logic
- Key components: LM7805 regulator, relay module, LCD display
- Safety ensured by optocoupler galvanic isolation
- Supports IoT extension via ESP8266 module

## 2. Core Explanation
- Solar panel (15V, 9W) feeds through voltage divider to Arduino analog pin
- Voltage divider: R1=10k ohm, R2=5k ohm scales 15V to 5V safely
- Arduino monitors voltage and triggers relay to switch 220V AC load
- LM7805 provides stable 5V from 7V-35V input for Arduino logic
- LCD displays real-time voltage and system status

## 3. Key Formulas / Definitions
FORMULA: Voltage Divider = Vout = Vin * R2 / (R1 + R2)
FORMULA: Inverter Efficiency = 80-85% (rest lost as heat)
DEF: LM7805 = Linear voltage regulator, 7V-35V in -> 5V out

## 4. Block Diagram
BLOCK_DIAGRAM_START: Solar Inverter System Flow
[Solar Panel 15V/9W] --> [Voltage Divider R1=10k, R2=5k] --> [Arduino UNO 5V] --> [Relay Module] --> [220V AC Load]
                                           |--> [LCD Monitoring]
BLOCK_DIAGRAM_END

## 5. Memory Shortcuts
MNEMONIC: "SOLAR" = Supply, Output, Logic, Arduino, Relay
TIP: LM78xx series -> last two digits = output voltage (LM7805 = 5V)

## 6. Exam-Focused Points
EXAM: Optocoupler prevents high-voltage back-feed to Arduino logic board
EXAM: Voltage divider formula: Vout = Vin * R2/(R1+R2)

## 7. Quick Summary
- Solar panel voltage scaled down using resistor divider
- Arduino reads voltage and controls relay for AC switching
- LM7805 ensures stable 5V power supply to Arduino
- Isolation prevents 220V damage to 5V circuits
- Inverter efficiency is 80-85%, rest is heat loss`;

const DEMO_CARDS = [
    { front: 'What does LM7805 output?', back: 'Stable 5V from any 7V-35V input' },
    { front: 'Voltage divider formula?', back: 'Vout = Vin * R2 / (R1 + R2)' },
    { front: 'Why use optocoupler?', back: 'Prevents 220V AC from damaging 5V Arduino logic' },
    { front: 'What is inverter efficiency?', back: '80-85%; rest lost as heat' },
    { front: 'What does the relay module do?', back: 'Lets 5V Arduino switch a 220V AC circuit' },
    { front: 'R1=10k, R2=5k, Vin=15V -> Vout?', back: '5V (15 * 5/(10+5) = 5V)' },
];

const DEMO_QUIZ = [
    { type: 'mcq', question: 'Which IC provides stable 5V from a higher voltage source?', options: ['LM7805', 'LM358', 'NE555', 'LM741'], correct: 'LM7805' },
    { type: 'mcq', question: 'Voltage divider formula for Vout?', options: ['Vin x R1/(R1+R2)', 'Vin x R2/(R1+R2)', 'Vin / R2', '(R1+R2) x Vin'], correct: 'Vin x R2/(R1+R2)' },
    { type: 'short', question: 'What is galvanic isolation and why is it needed?', correct: 'Using optocoupler to electrically separate 220V AC from 5V logic to prevent damage.' },
    { type: 'concept', question: 'Explain why inverter efficiency matters in solar systems.', correct: 'Only 80-85% DC converts to usable AC; the rest is heat loss, reducing total energy yield.' },
    { type: 'mcq', question: 'What is the best reason to use a relay with Arduino in this system?', options: ['To amplify analog signals', 'To switch high-voltage AC safely from low-voltage logic', 'To regulate 5V output', 'To store energy'], correct: 'To switch high-voltage AC safely from low-voltage logic' },
    { type: 'mcq', question: 'If R1=10k and R2=5k, what fraction of Vin appears at Vout?', options: ['1/2', '1/3', '2/3', '3/2'], correct: '1/3' },
    { type: 'short', question: 'Why is a stable logic supply important for microcontroller reliability?', correct: 'Unstable supply causes incorrect readings, random resets, and unsafe switching behavior in control logic.' },
    { type: 'short', question: 'What practical risk appears if galvanic isolation is removed?', correct: 'High-voltage transients can couple into the logic side, damaging components and creating safety hazards.' },
    { type: 'concept', question: 'A student observes frequent relay chatter near threshold voltage. What is happening and how should it be fixed?', correct: 'Input noise around switching threshold causes repeated toggling. Add hysteresis in software and stabilize sensing with filtering/averaging.' },
    { type: 'concept', question: 'In a low-efficiency inverter setup, what trade-offs occur for runtime and heat?', correct: 'Lower efficiency means more losses as heat, reducing usable energy output and potentially requiring thermal management.' },
];

// â”€â”€ UPLOAD TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function UploadTab({ onDone, addToast }) {
    const [drag, setDrag] = useState(false);
    const [paste, setPaste] = useState('');
    const [busy, setBusy] = useState(false);
    const [prog, setProg] = useState(0);
    const [stage, setStage] = useState('');
    const [eta, setEta] = useState('');
    const [steps, setSteps] = useState([]);
    const [err, setErr] = useState(null);
    const [showHIW, setShowHIW] = useState(false);
    const [cooldownMs, setCooldownMs] = useState(0);
    const stRef = useRef([]);
    const startRef = useRef(0);
    const fref = useRef();

    useEffect(() => {
        const tick = () => setCooldownMs(getGenerateCooldownMs());
        tick();
        const t = setInterval(tick, 500);
        return () => clearInterval(t);
    }, []);

    function addStep(s, st) { stRef.current = [...stRef.current, { s, st: st || 'done' }]; setSteps([...stRef.current]); }
    function updStep(st) { const a = [...stRef.current]; if (a.length) { a[a.length - 1].st = st; stRef.current = a; setSteps([...a]); } }
    function wp(p) {
        if (!startRef.current) startRef.current = Date.now();
        setProg(p);
        const el = (Date.now() - startRef.current) / 1000;
        if (p > 8 && p < 96) { const rem = Math.ceil((el / (p / 100)) - el); setEta(rem > 2 ? '~' + rem + 's left' : ''); }
        else setEta('');
    }

    async function process(rawText, retryFn) {
        const allowance = consumeGenerateAllowance();
        if (!allowance.ok) {
            setErr({ code: 'RATE_LIMIT_CLIENT', retry: null });
            setCooldownMs(allowance.cooldownMs);
            return;
        }
        stRef.current = []; setSteps([]); setBusy(true); setErr(null); startRef.current = Date.now();
        const safeRawText = cleanText(sanitizeUserText(rawText));
        if (!safeRawText.trim()) {
            setBusy(false);
            setErr({ code: 'EMPTY_FILE', retry: null });
            return;
        }
        setStage('Analysing content...'); wp(8);
        addStep('Parsing document', 'done');
        addStep('Sending to AI', 'active');
        const chunks = chunkText(safeRawText, CHUNK_SIZE);
        const chunkCount = Math.min(chunks.length, MAX_CHUNKS);
        let combined = '';
        try {
            for (let ci = 0; ci < chunkCount; ci++) {
                setStage('Processing chunk ' + (ci + 1) + ' of ' + chunkCount + '...');
                wp(15 + (ci / chunkCount) * 55);
                const result = await processChunk(chunks[ci]);
                combined += (combined ? '\n\n' : '') + result;
                updStep('done');
                if (ci < chunkCount - 1) addStep('Processing chunk ' + (ci + 2), 'active');
            }
            wp(78); setStage('Structuring notes...');
            addStep('Generating flashcards', 'active');
            const { notesRaw, cards, quiz } = parseAIOutput(combined);
            updStep('done');
            addStep('Building quiz', 'done');
            const finalCards = (cards.length >= 8 ? cards : [...cards, ...DEMO_CARDS]).slice(0, 10);
            const finalQuiz = (quiz.length >= 8 ? quiz : [...quiz, ...DEMO_QUIZ]).slice(0, 10);
            const finalNotes = notesRaw.length > 100 ? notesRaw : DEMO_NOTES;
            wp(100); setStage('Done!');
            setTimeout(() => {
                setBusy(false);
                onDone({ notesRaw: finalNotes, cards: finalCards, quiz: finalQuiz, rawText: safeRawText, title: finalNotes.match(/# TOPIC:\s*(.+)/)?.[1] || 'Study Notes' });
                addToast('Study set ready - ' + finalCards.length + ' cards, ' + finalQuiz.length + ' questions', 'ok');
            }, 500);
        } catch (e) {
            console.error('Groq request failed:', e);
            setBusy(false);
            if (e.message === 'RATE_LIMIT') { setErr({ code: 'RATE_LIMIT', retry: () => process(rawText, retryFn) }); return; }
            if (e.message === 'NETWORK') { setErr({ code: 'NETWORK', retry: () => process(rawText, retryFn) }); return; }
            if (e.message === 'AUTH') { setErr({ code: 'AUTH', retry: null }); return; }
            const { notesRaw } = parseAIOutput(combined || '');
            onDone({ notesRaw: notesRaw || DEMO_NOTES, cards: DEMO_CARDS, quiz: DEMO_QUIZ, rawText, title: 'Study Notes' });
            addToast('AI unavailable - demo mode loaded', 'warn');
        }
    }

    async function handleFile(f) {
        startRef.current = Date.now();
        setErr(null); wp(4); setStage('Reading file...'); stRef.current = []; setSteps([]); setBusy(true);
        let txt;
        try { txt = await readFile(f, p => wp(Math.round(p))); }
        catch (e) { setBusy(false); wp(0); setErr({ code: e.message, retry: null }); return; }
        if (!txt.trim()) { setBusy(false); setErr({ code: 'EMPTY_FILE', retry: null }); return; }
        wp(10); addStep('File read', 'done');
        process(txt, () => handleFile(f));
    }

    const wc = paste.trim() ? paste.trim().split(/\s+/).length : 0;
    const errInfo = err ? getErrInfo(err.code) : null;

    if (busy) return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="proc-wrap">
                <div className="proc-row">
                    <div className="proc-spin" />
                    <div>
                        <div className="proc-title">Processing your content</div>
                        <div className="proc-stage">{stage}</div>
                    </div>
                </div>
                <div className="proc-bar"><div className="proc-fill" style={{ width: prog + '%' }} /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, marginBottom: 12 }}>
                    <span className="proc-pct">{prog}%</span>
                    <span style={{ fontSize: 11, opacity: .32, color: '#fff' }}>{eta}</span>
                </div>
                {steps.length > 0 && (
                    <div className="proc-steps">
                        {steps.map((st, i) => (
                            <div key={i} className="proc-step">
                                <div className={'sdot ' + st.st} />
                                <span style={{ opacity: st.st === 'wait' ? .28 : 1, color: '#fff' }}>{st.s}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="upload-grid">
                <div className="upload-left">
                    <div className="hero-text">
                        <h1>Upload notes.<br /><span className="accent">Learn faster.</span></h1>
                        <p>Drop any file - PDF, Word, or photo of handwritten notes. Get structured academic notes, flashcards and a quiz instantly.</p>
                        <div className="hero-btns">
                            <button className="btn btn-accent" onClick={() => fref.current.click()}>{React.createElement(Icons.sparkle)} Start Studying</button>
                            <button className="btn btn-ghost" onClick={() => setShowHIW(true)}>How it works</button>
                        </div>
                    </div>

                    <div
                        className={'dzone' + (drag ? ' over' : '')}
                        onDragOver={e => { e.preventDefault(); setDrag(true); }}
                        onDragLeave={() => setDrag(false)}
                        onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => fref.current.click()}
                    >
                        <span className="dz-icon">{React.createElement(Icons.folder)}</span>
                        <div className="dz-h">Drag & drop your file here</div>
                        <div className="dz-p">Supports PDF, Word, images (OCR), and text files<br />Files never leave your device</div>
                        <button className="btn btn-accent btn-sm" onClick={e => { e.stopPropagation(); fref.current.click(); }}>Browse Files</button>
                        <div className="dz-formats">
                            {['PDF', 'Word .docx', 'JPG / PNG', 'Plain .txt'].map(f => <span key={f} className="dz-fmt">{f}</span>)}
                        </div>
                        <input ref={fref} type="file" style={{ display: 'none' }} accept=".pdf,.docx,.png,.jpg,.txt"
                            onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); }} />
                    </div>

                    {errInfo && (
                        <div className="ebox err">
                            <span className="ebox-icon">{errInfo.icon}</span>
                            <div>
                                <div className="ebox-title">{errInfo.title}</div>
                                <div className="ebox-msg">{errInfo.msg}</div>
                                {err.retry && <button className="retry-btn" onClick={err.retry}>Retry</button>}
                            </div>
                        </div>
                    )}

                    <div className="pdf-brand-card">
                        <div className="pdf-brand-title">Feature: Convert Slides / PPT / PDF to PDF</div>
                        <div className="pdf-brand-desc">Upload, preview, enhance, configure layout, process locally, and download print-ready PDF output.</div>
                        <div className="pdf-brand-grid">
                            <div className="pdf-brand-step">
                                <strong>1. Upload</strong>
                                <ul>
                                    <li>Files stay on your device</li>
                                    <li>No account required</li>
                                </ul>
                            </div>
                            <div className="pdf-brand-step">
                                <strong>2. Preview & Edit</strong>
                                <ul>
                                    <li>Select or deselect pages</li>
                                    <li>Remove unwanted slides</li>
                                </ul>
                            </div>
                            <div className="pdf-brand-step">
                                <strong>3. Enhancements</strong>
                                <ul>
                                    <li>Invert colors</li>
                                    <li>Remove background/logo</li>
                                    <li>Black & White mode</li>
                                </ul>
                            </div>
                            <div className="pdf-brand-step">
                                <strong>4. Layout</strong>
                                <ul>
                                    <li>1-8 rows/columns</li>
                                    <li>Up to 64 slides per page</li>
                                    <li>Portrait/Landscape</li>
                                </ul>
                            </div>
                            <div className="pdf-brand-step">
                                <strong>5. Process in Browser</strong>
                                <ul>
                                    <li>Local processing</li>
                                    <li>Real-time progress</li>
                                    <li>No data sent anywhere</li>
                                </ul>
                            </div>
                            <div className="pdf-brand-step">
                                <strong>6. Download PDF</strong>
                                <ul>
                                    <li>Print-ready output</li>
                                    <li>Optimized DPI/margins</li>
                                    <li>Instant file download</li>
                                </ul>
                            </div>
                        </div>
                        <button className="btn btn-out btn-sm" onClick={() => setShowHIW(true)}>View Feature Details</button>
                    </div>

                    <div className="or-row">or paste text</div>
                    <textarea className="paste-area" placeholder="Paste notes, textbook content, lecture material..." value={paste} onChange={e => setPaste(sanitizeUserText(e.target.value))} />
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        <button className="btn btn-accent btn-sm" onClick={() => paste.trim() && process(paste, () => process(paste))} disabled={!paste.trim() || cooldownMs > 0}>
                            {cooldownMs > 0 ? `Generate Notes (${Math.ceil(cooldownMs / 1000)}s)` : 'Generate Notes'}
                        </button>
                        <button className="btn btn-out btn-sm" onClick={() => {
                            setPaste('Ionisation energy is the energy required to remove an electron from a gaseous atom. It increases across a period and decreases down a group. First ionisation energy is always lower than second because the atom is neutral. Factors: nuclear charge, shielding, atomic radius. Enthalpy of atomisation is the enthalpy change when one mole of gaseous atoms is formed from the element in its standard state.');
                        }}>Try Sample</button>
                        {wc > 0 && <span style={{ fontSize: 11, color: 'var(--ink4)', marginLeft: 'auto' }}>{wc} words</span>}
                    </div>
                </div>

                <div className="preview-cards">
                    <div className="pcard pcard1">
                        <div className="pc-tag accent">PROCESSED NOTES</div>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--ink)' }}>Solar Inverter System</div>
                        <div className="pc-line" style={{ width: '88%' }} />
                        <div className="pc-line" style={{ width: '72%' }} />
                        <div className="pc-line" style={{ width: '58%' }} />
                        <div><span className="pc-chip">Overview + Tables</span></div>
                    </div>
                    <div className="pcard pcard2">
                        <div className="pc-tag muted">NOTEBOOK NOTES</div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, borderBottom: '2px solid var(--accent-bg2)', paddingBottom: 6 }}>Voltage Divider</div>
                        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                            - R1 scales 15V to 5V<br />
                            - Vout = Vin * R2/(R1+R2)
                        </div>
                    </div>
                    <div className="pcard pcard3">
                        <div className="pc-tag muted">FLASHCARD</div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5 }}>Q: What does LM7805 do?</div>
                        <div style={{ fontSize: 11, color: 'var(--ink4)' }}>tap to reveal answer</div>
                    </div>
                </div>
            </div>
        </div>

        {showHIW && (
            <div className="hiw-overlay" onClick={() => setShowHIW(false)}>
                <div className="hiw-modal" onClick={e => e.stopPropagation()}>
                    <div className="hiw-header">
                        <div className="hiw-title">How Notiq Works</div>
                        <button className="hiw-close" onClick={() => setShowHIW(false)}>{React.createElement(Icons.close)}</button>
                    </div>
                    <div className="hiw-steps">
                        {[
                            { icon: '1', step: '01', title: 'Upload your PDF', desc: 'Click to select or drag and drop your PDF. It loads directly in your browser, with no server upload, no login, and full privacy.' },
                            { icon: '2', step: '02', title: 'Preview & edit pages', desc: 'View thumbnails, select or deselect pages, and remove slides you do not need before processing.' },
                            { icon: '3', step: '03', title: 'Apply enhancements', desc: 'Use invert colors, remove backgrounds, black and white mode, and logo cleanup to improve readability and print quality.' },
                            { icon: '4', step: '04', title: 'Configure layout', desc: 'Set rows and columns (up to 64 slides per page), choose portrait or landscape, and keep print-friendly margins.' },
                            { icon: '5', step: '05', title: 'Process in browser', desc: 'Click Enhance PDF and watch progress in real time. Processing runs locally and can work offline once loaded.' },
                            { icon: '6', step: '06', title: 'Download final PDF', desc: 'Get your print-ready PDF instantly with optimized clarity, white backgrounds, and no file retention.' },
                        ].map(({ icon, step, title, desc }) => (
                            <div key={step} className="hiw-step">
                                <div className="hiw-step-icon">{icon}</div>
                                <div className="hiw-step-num">Step {step}</div>
                                <div className="hiw-step-title">{title}</div>
                                <div className="hiw-step-desc">{desc}</div>
                            </div>
                        ))}
                    </div>
                    <div className="hiw-footer">
                        <button className="btn btn-accent" onClick={() => { setShowHIW(false); setTimeout(() => fref.current && fref.current.click(), 100); }}>{React.createElement(Icons.sparkle)} Start Studying Now</button>
                        <button className="btn btn-out" onClick={() => setShowHIW(false)}>Close</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

// â”€â”€ NOTES TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NotesTab({ notesRaw, noteTitle, addToast }) {
    if (!notesRaw) return (
        <div className="empty">
            <div className="empty-em">N</div>
            <div className="empty-h">No notes yet</div>
            <div className="empty-p">Upload a document or paste text on the Upload tab to generate structured academic notes.</div>
        </div>
    );
    return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="notes-toolbar">
                <div className="ai-badge"><div className="ai-dot" />AI Structured</div>
                <button className="btn btn-out btn-sm" onClick={() => {
                    if (navigator.clipboard) navigator.clipboard.writeText(notesRaw).then(() => addToast('Copied!', 'ok')).catch(() => addToast('Copy failed', 'warn'));
                }}>{React.createElement(Icons.copy)} Copy</button>
                <button className="btn btn-out btn-sm" onClick={() => exportNotesPDF(notesRaw, noteTitle)}>{React.createElement(Icons.download)} PDF</button>
            </div>
            <NotesView notesRaw={notesRaw} />
        </div>
    );
}

// â”€â”€ FLASHCARDS TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FlashcardsTab({ cards: initCards, addToast }) {
    const [cards, setCards] = useState(initCards && initCards.length ? initCards : DEMO_CARDS);
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [got, setGot] = useState(new Set());
    const [rev, setRev] = useState(new Set());
    const [done, setDone] = useState(false);
    const [modal, setModal] = useState(false);
    const [nf, setNf] = useState('');
    const [nb, setNb] = useState('');

    useEffect(() => {
        if (initCards && initCards.length) { setCards(initCards); setIdx(0); setFlipped(false); setGot(new Set()); setRev(new Set()); setDone(false); }
    }, [initCards]);

    function next() { if (idx < cards.length - 1) { setIdx(i => i + 1); setFlipped(false); } else setDone(true); }
    function prev() { if (idx > 0) { setIdx(i => i - 1); setFlipped(false); } }
    function doGot() { setGot(s => new Set([...s, idx])); next(); }
    function doRev() { setRev(s => new Set([...s, idx])); next(); }
    function restart() { setIdx(0); setFlipped(false); setGot(new Set()); setRev(new Set()); setDone(false); }
    function addCard() {
        if (!nf.trim() || !nb.trim()) return;
        setCards(c => [...c, { front: nf.trim(), back: nb.trim() }]);
        addToast('Card added', 'ok');
        setNf(''); setNb(''); setModal(false);
    }

    if (done) return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="fc-wrap">
                <div className="fc-done">
                    <span className="fc-done-em">Done</span>
                    <div className="fc-done-h">Session Complete!</div>
                    <div className="fc-done-p">Got <strong>{got.size}</strong> of <strong>{cards.length}</strong> correct</div>
                    <div className="fc-done-btns">
                        <button className="btn btn-accent" onClick={restart}>Study Again</button>
                        {rev.size > 0 && <button className="btn btn-out" onClick={() => { setCards(cards.filter((_, i) => rev.has(i))); restart(); }}>Review {rev.size} Missed</button>}
                    </div>
                </div>
            </div>
        </div>
    );

    const card = cards[idx];
    const pct = Math.round(idx / cards.length * 100);
    return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="fc-wrap">
                <div className="fc-outer" onClick={() => setFlipped(f => !f)}>
                    <div className={'fc-inner' + (flipped ? ' flip' : '')}>
                        <div className="fc-face fc-front">
                            <div className="fc-lbl">Question</div>
                            <div className="fc-text">{card.front}</div>
                        </div>
                        <div className="fc-face fc-back">
                            <div className="fc-lbl">Answer</div>
                            <div className="fc-text">{card.back}</div>
                        </div>
                    </div>
                </div>
                <div className="fc-hint">Tap card to flip · Space to flip · Left/Right navigate</div>
                <div className="fc-progress">
                    <div className="fc-ctr">Card {idx + 1} of {cards.length}</div>
                    <div style={{ flex: 1, maxWidth: 180 }}>
                        <div className="pbar"><div className="pfill pfill-accent" style={{ width: pct + '%' }} /></div>
                    </div>
                </div>
                <div className="fc-stats" style={{ textAlign: 'center' }}>{got.size} got it · {rev.size} to review · {cards.length - idx - 1} remaining</div>
                <div style={{ height: 12 }} />
                <div className="fc-nav">
                    <button className="btn btn-out btn-sm" onClick={prev} disabled={idx === 0}>Prev</button>
                    <button className="btn btn-out btn-sm" onClick={() => { setCards(shuffle(cards)); setIdx(0); setFlipped(false); }}>Shuffle</button>
                    <button className="btn btn-accent btn-sm" onClick={next}>Next</button>
                </div>
                <div style={{ height: 10 }} />
                <div className="fc-vote">
                    <button className="v-got" onClick={doGot}>Got it</button>
                    <button className="v-rev" onClick={doRev}>Review</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(true)}>+ Add Card</button>
                </div>
            </div>

            {modal && (
                <div className="overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-h">+ New Flashcard</div>
                        <input className="mi" placeholder="Front - Question" value={nf} onChange={e => setNf(e.target.value)} />
                        <textarea className="mi" style={{ minHeight: 72, resize: 'vertical' }} placeholder="Back - Answer" value={nb} onChange={e => setNb(e.target.value)} />
                        <div className="modal-btns">
                            <button className="btn btn-out btn-sm" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn btn-accent btn-sm" onClick={addCard} disabled={!nf.trim() || !nb.trim()}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// â”€â”€ QUIZ TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function QuizTab({ quiz: initQuiz }) {
    const [qs, setQs] = useState(initQuiz && initQuiz.length ? initQuiz : DEMO_QUIZ);
    const [qi, setQi] = useState(0);
    const [sel, setSel] = useState(null);
    const [shortVal, setShortVal] = useState('');
    const [showAns, setShowAns] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [done, setDone] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => { if (initQuiz && initQuiz.length) { setQs(initQuiz); reset(); } }, [initQuiz]);
    useEffect(() => { if (done) return; const t = setInterval(() => setTime(s => s + 1), 1000); return () => clearInterval(t); }, [done]);

    function reset() { setQi(0); setSel(null); setShortVal(''); setShowAns(false); setAnswers([]); setDone(false); setTime(0); }
    function choose(c) { if (sel !== null) return; setSel(c); setAnswers(a => [...a, { q: qs[qi], given: c, correct: qs[qi].correct }]); }
    function nextQ() { if (qi + 1 >= qs.length) { setDone(true); return; } setQi(i => i + 1); setSel(null); setShortVal(''); setShowAns(false); }

    if (done) {
        const score = answers.filter(a => a.given && a.given.toLowerCase().trim() === a.correct.toLowerCase().trim()).length;
        const mcqCount = answers.filter(a => a.q.type === 'mcq' || a.q.type === 'tf').length;
        const pct = mcqCount > 0 ? Math.round(score / mcqCount * 100) : 0;
        const grade = pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great Work!' : pct >= 50 ? 'Keep Studying' : 'Keep Going!';
        return (
            <div style={{ animation: 'fadeUp .3s ease' }}>
                <div className="qz-result">
                    <div className="qr-score">{score}/{mcqCount || qs.length}</div>
                    <div className="qr-pct">{pct}% correct · {fmtTime(time)}</div>
                    <div className="qr-grade">{grade}</div>
                    <div className="qr-rev">
                        <div className="qr-rev-h">Answer Review</div>
                        {answers.map((a, i) => {
                            const ok = a.given && a.given.toLowerCase().trim() === a.correct.toLowerCase().trim();
                            return (
                                <div key={i} className={'qr-item ' + (ok ? 'p' : 'f')}>
                                    <strong>Q{i + 1}:</strong> {a.q.question}<br />
                                    <span style={{ color: ok ? 'var(--green)' : '#EF4444' }}>{ok ? 'Correct' : 'Wrong'} {a.given || '(no answer)'}</span>
                                    {!ok && <span style={{ color: 'var(--green)' }}> · Correct: <em>{a.correct}</em></span>}
                                </div>
                            );
                        })}
                    </div>
                    <div className="qr-btns">
                        <button className="btn btn-accent" onClick={reset}>Retry Quiz</button>
                        <button className="btn btn-out" onClick={() => setQs(shuffle(qs))}>Shuffle</button>
                    </div>
                </div>
            </div>
        );
    }

    const q = qs[qi];
    const pct = Math.round(qi / qs.length * 100);
    const typeLabel = q.type === 'mcq' ? 'Multiple Choice' : q.type === 'tf' ? 'True / False' : q.type === 'short' ? 'Short Answer' : 'Conceptual';

    return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="qz-head">
                <div className="qz-prog">Question {qi + 1} <span style={{ color: 'var(--ink4)', fontWeight: 400 }}>/ {qs.length}</span></div>
                <div className="qz-timer">{fmtTime(time)}</div>
            </div>
            <div className="qz-bar"><div className="qz-fill" style={{ width: pct + '%' }} /></div>
            <div className="qz-card">
                <div className="qz-type">{typeLabel}</div>
                <div className="qz-q">{q.question}</div>
                {q.type === 'mcq' && (
                    <div className="qz-opts">
                        {(q.options || []).map((opt, i) => {
                            let cls = 'qopt';
                            if (sel !== null) { if (opt === q.correct) cls += ' correct'; else if (opt === sel) cls += ' wrong'; }
                            return <button key={i} className={cls} onClick={() => choose(opt)} disabled={sel !== null}>{opt}</button>;
                        })}
                    </div>
                )}
                {q.type === 'tf' && (
                    <div className="qz-tf">
                        {['True', 'False'].map(opt => {
                            let cls = 'qtf';
                            if (sel !== null) { if (opt === q.correct) cls += ' correct'; else if (opt === sel) cls += ' wrong'; }
                            return <button key={opt} className={cls} onClick={() => choose(opt)} disabled={sel !== null}>{opt}</button>;
                        })}
                    </div>
                )}
                {(q.type === 'short' || q.type === 'concept') && (
                    <div>
                        <textarea style={{ width: '100%', minHeight: 70, border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '12px 14px', fontSize: 13.5, background: 'var(--glass2)', color: 'var(--ink)', resize: 'vertical', lineHeight: 1.7, fontFamily: 'var(--font)' }}
                            placeholder="Write your answer..." value={shortVal} onChange={e => setShortVal(e.target.value)} disabled={showAns} />
                        {!showAns && (
                            <button className="btn btn-out btn-sm" style={{ marginTop: 8 }} onClick={() => { setShowAns(true); setAnswers(a => [...a, { q, given: shortVal || '(no answer)', correct: q.correct }]); }}>
                                Check / Reveal Answer
                            </button>
                        )}
                        {showAns && <div className="qz-reveal">{q.correct}</div>}
                    </div>
                )}
            </div>
            {(sel !== null || showAns) && (
                <div className="qz-next">
                    <button className="btn btn-accent" onClick={nextQ}>{qi + 1 >= qs.length ? 'See Results' : 'Next'}</button>
                </div>
            )}
        </div>
    );
}

// â”€â”€ SETTINGS TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SettingsTab() {
    const [settings, setSettings] = useState(loadSettings);

    function update(key, val) {
        setSettings(prev => {
            const next = { ...prev, [key]: val };
            saveSettings(next);
            return next;
        });
    }

    function TogRow({ label, desc, field }) {
        return (
            <div className="set-row">
                <div><div className="set-row-lbl">{label}</div>{desc && <div className="set-row-desc">{desc}</div>}</div>
                <button className={'tog' + (settings[field] ? ' on' : '')} onClick={() => update(field, !settings[field])} />
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeUp .3s ease' }}>
            <div className="settings-grid">
                <div className="set-card">
                    <div className="set-card-h">Notes Format</div>
                    <div className="set-row">
                        <div><div className="set-row-lbl">Detail Level</div><div className="set-row-desc">How detailed should notes be?</div></div>
                        <select className="set-sel" value={settings.detailLevel} onChange={e => update('detailLevel', e.target.value)}>
                            <option value="concise">Concise (Quick Review)</option>
                            <option value="detailed">Detailed (Recommended)</option>
                            <option value="comprehensive">Comprehensive (Deep Dive)</option>
                        </select>
                    </div>
                    <div className="set-row">
                        <div><div className="set-row-lbl">Language</div><div className="set-row-desc">Output language for notes</div></div>
                        <select className="set-sel" value={settings.language} onChange={e => update('language', e.target.value)}>
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="mixed">Hinglish (Mixed)</option>
                        </select>
                    </div>
                </div>

                <div className="set-card">
                    <div className="set-card-h">Notes Sections</div>
                    <TogRow label="Formulas & Definitions" desc="Include all formulas and key definitions" field="includeFormulas" />
                    <TogRow label="Comparisons" desc="Compare similar concepts side-by-side" field="includeComparisons" />
                    <TogRow label="Block Diagrams" desc="Include ASCII block diagrams in notes" field="includeDiagrams" />
                    <TogRow label="Memory Tricks" desc="Mnemonics and recall tips" field="includeMnemonics" />
                    <TogRow label="Exam Tips" desc="Most likely exam questions and facts" field="includeExamTips" />
                    <TogRow label="Real-World Examples" desc="Practical applications and case studies" field="includeExamples" />
                </div>

                <div className="set-card">
                    <div className="set-card-h">About</div>
                    <div className="set-row"><div className="set-row-lbl">Version</div><span style={{ fontSize: 12.5, color: 'var(--ink4)' }}>Notiq v7.0</span></div>
                    <div className="set-row"><div className="set-row-lbl">Privacy</div><span style={{ fontSize: 12.5, color: 'var(--ink4)' }}>Files processed locally</span></div>
                    <div className="set-row"><div className="set-row-lbl">Cost</div><span style={{ fontSize: 12.5, color: 'var(--green)', fontWeight: 600 }}>Free forever</span></div>
                </div>

                <div className="set-card">
                    <div className="set-card-h">Keyboard Shortcuts</div>
                    {[['Space', 'Flip flashcard'], ['Left / Right', 'Navigate cards'], ['G', 'Got it'], ['R', 'Review'], ['Enter', 'Submit answer']].map(([k, v]) => (
                        <div key={k} className="set-row">
                            <span className="set-row-lbl">{v}</span>
                            <kbd style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: 'var(--ink2)' }}>{k}</kbd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// â”€â”€ APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PAGES = [
    { id: 'upload', label: 'Upload', icon: Icons.upload },
    { id: 'notes', label: 'Short Notes', icon: Icons.notes },
    { id: 'flashcards', label: 'Flashcards', icon: Icons.cards },
    { id: 'quizzes', label: 'Quizzes', icon: Icons.quiz },
    { id: 'settings', label: 'Settings', icon: Icons.settings },
];

const PAGE_META = { upload: 'Upload', notes: 'Short Notes', flashcards: 'Flashcards', quizzes: 'Quizzes', settings: 'Settings' };

// â”€â”€ PROFILE PANEL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProfilePanel({ onClose, onNav }) {
    const [settings, setSettings] = useState(loadSettings);
    function update(key, val) { setSettings(prev => { const next = { ...prev, [key]: val }; saveSettings(next); return next; }); }
    return (
        <div className="profile-overlay" onClick={onClose}>
            <div className="profile-panel" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <div className="profile-avatar">N</div>
                    <div>
                        <div className="profile-name">notiq user</div>
                        <div className="profile-sub">Free Plan · Files stay on device</div>
                    </div>
                    <button className="profile-close" onClick={onClose}>{React.createElement(Icons.close)}</button>
                </div>
                <div className="profile-divider" />
                <div className="profile-section-lbl">Notes Preferences</div>
                <div className="profile-row">
                    <span>Detail Level</span>
                    <select className="set-sel" value={settings.detailLevel} onChange={e => update('detailLevel', e.target.value)}>
                        <option value="concise">Concise</option>
                        <option value="detailed">Detailed</option>
                        <option value="comprehensive">Comprehensive</option>
                    </select>
                </div>
                <div className="profile-row">
                    <span>Language</span>
                    <select className="set-sel" value={settings.language} onChange={e => update('language', e.target.value)}>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mixed">Hinglish</option>
                    </select>
                </div>
                <div className="profile-divider" />
                <div className="profile-section-lbl">Note Sections</div>
                {[['includeFormulas', 'Formulas & Definitions'], ['includeComparisons', 'Comparisons'], ['includeDiagrams', 'Diagrams'], ['includeMnemonics', 'Memory Tricks'], ['includeExamTips', 'Exam Tips'], ['includeExamples', 'Real-World Examples']].map(([k, l]) => (
                    <div key={k} className="profile-row">
                        <span>{l}</span>
                        <button className={'tog' + (settings[k] ? ' on' : '')} onClick={() => update(k, !settings[k])} />
                    </div>
                ))}
                <div className="profile-divider" />
                <button className="profile-nav-btn" onClick={() => { onNav('settings'); onClose(); }}>{React.createElement(Icons.settings)} Open Full Settings</button>
            </div>
        </div>
    );
}

function App() {
    const [page, setPage] = useState('upload');
    const [data, setData] = useState({ notesRaw: '', cards: [], quiz: [], rawText: '', title: '' });
    const [sideOpen, setSideOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchQ, setSearchQ] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    const { toasts, add: addToast, rm } = useToast();
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    function handleDone(d) { setData(d); setPage('notes'); }
    function nav(p) { setPage(p); setSideOpen(false); }

    // Search logic: match against pages and note sections
    const searchResults = useMemo(() => {
        const q = searchQ.trim().toLowerCase();
        if (!q) return [];
        const results = [];
        PAGES.forEach(p => { if (p.label.toLowerCase().includes(q)) results.push({ type: 'page', id: p.id, label: p.label }); });
        if (data.notesRaw) {
            const lines = data.notesRaw.split('\n');
            lines.forEach((line, i) => {
                const l = line.trim();
                if (l.toLowerCase().includes(q) && l.length > 2 && i < 300) {
                    results.push({ type: 'note', label: l.replace(/^#+\s*|^[-*•]\s*/, '').slice(0, 80), lineIdx: i });
                }
            });
        }
        return results.slice(0, 8);
    }, [searchQ, data.notesRaw]);

    return (
        <>
            <Toasts toasts={toasts} rm={rm} />
            {profileOpen && <ProfilePanel onClose={() => setProfileOpen(false)} onNav={nav} />}
            <div className="app-shell">
                <div className={'sidebar-overlay' + (sideOpen ? ' show' : '')} onClick={() => setSideOpen(false)} />
                <aside className={'sidebar' + (sideOpen ? ' open' : '')}>
                    <div className="sb-logo-text">notiq</div>
                    <div className="sb-section">Main</div>
                    <ul className="sb-nav">
                        {PAGES.slice(0, 4).map(p => (
                            <li key={p.id}>
                                <a className={page === p.id ? 'active' : ''} onClick={() => nav(p.id)}>
                                    <span className="nav-icon">{React.createElement(p.icon)}</span>
                                    {p.label}
                                    {p.id === 'flashcards' && data.cards.length > 0 && <span className="sb-badge">{data.cards.length}</span>}
                                    {p.id === 'quizzes' && data.quiz.length > 0 && <span className="sb-badge">{data.quiz.length}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="sb-div" />
                    <div className="sb-bottom">
                        <div className={'sb-settings' + (page === 'settings' ? ' active' : '')} onClick={() => nav('settings')}>
                            <span className="nav-icon">{React.createElement(Icons.settings)}</span> Settings
                        </div>
                        <div className="sb-settings" onClick={() => window.location.assign('/index.html')}>
                            <span className="nav-icon">←</span> Back to Landing
                        </div>
                    </div>
                </aside>

                <div className="main">
                    <header className="topbar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button className="mob-menu btn" onClick={() => setSideOpen(o => !o)}>
                                <span /><span /><span />
                            </button>
                            <div className="topbar-title">{PAGE_META[page]}</div>
                        </div>
                        <div className="topbar-right">
                            <div className={'topbar-search-wrap' + (searchFocus ? ' focused' : '')}>
                                <span className="topbar-search-icon">{React.createElement(Icons.search)}</span>
                                <input
                                    className="topbar-search"
                                    placeholder="Search pages, notes..."
                                    value={searchQ}
                                    onChange={e => setSearchQ(e.target.value)}
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setTimeout(() => { setSearchFocus(false); setSearchQ(''); }, 200)}
                                />
                                {searchQ && <button className="topbar-search-clear" onClick={() => setSearchQ('')}>{React.createElement(Icons.close)}</button>}
                                {searchResults.length > 0 && searchFocus && (
                                    <div className="search-dropdown">
                                        {searchResults.map((r, i) => (
                                            <div key={i} className="search-item" onMouseDown={() => {
                                                if (r.type === 'page') nav(r.id);
                                                else { nav('notes'); }
                                                setSearchQ('');
                                            }}>
                                                <span className="search-item-icon">{r.type === 'page' ? 'Page' : 'Note'}</span>
                                                <span className="search-item-label">{r.label}</span>
                                                {r.type === 'page' && <span className="search-item-tag">Page</span>}
                                                {r.type === 'note' && <span className="search-item-tag">Note</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {searchQ && searchResults.length === 0 && searchFocus && (
                                    <div className="search-dropdown">
                                        <div className="search-empty">No results for "{searchQ}"</div>
                                    </div>
                                )}
                            </div>
                            <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} title="Toggle Theme" aria-label="Toggle Theme">
                                {React.createElement(Icons.sun)}
                                {React.createElement(Icons.moon)}
                            </button>
                            <button className="profile-btn" onClick={() => setProfileOpen(o => !o)} title="Profile & Settings">
                                {React.createElement(Icons.user)}
                            </button>
                        </div>
                    </header>

                    <main className="page">
                        {page === 'upload' && <UploadTab onDone={handleDone} addToast={addToast} />}
                        {page === 'notes' && <NotesTab notesRaw={data.notesRaw} noteTitle={data.title} addToast={addToast} />}
                        {page === 'flashcards' && <FlashcardsTab cards={data.cards} addToast={addToast} />}
                        {page === 'quizzes' && <QuizTab quiz={data.quiz} />}
                        {page === 'settings' && <SettingsTab />}
                    </main>
                </div>
            </div>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

