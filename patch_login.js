const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Remove the completely botched CSS block that mistakenly contains line numbers:
const badCssRegex = /\/\* --- LOGIN MODAL CSS --- \*\/[\s\S]+?@media \(max-width: 480px\) \{[\s\S]+?\}/;
content = content.replace(badCssRegex, '');


// 2. Define the clean, pristine CSS block for the modal:
const cleanCss = `
        /* --- LOGIN MODAL CSS --- */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 200;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .modal-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }

        .login-box {
            position: relative;
            width: 100%;
            max-width: 420px;
            background: var(--white);
            border: 1px solid var(--card-border);
            border-radius: 28px;
            padding: 48px 40px 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            transform: translateY(20px);
            transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
        }

        .modal-overlay.show .login-box {
            transform: translateY(0);
        }

        .modal-close {
            position: absolute;
            top: 24px;
            right: 24px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--card);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--ink3);
            transition: all 0.2s;
            font-size: 20px;
        }

        .modal-close:hover {
            background: #e5e5ea;
            color: var(--ink);
        }

        .login-logo {
            font-size: 18px;
            font-weight: 300;
            letter-spacing: 4px;
            color: var(--ink);
            text-decoration: none;
            display: block;
            margin-bottom: 32px;
        }

        .login-h1 {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: var(--ink);
            margin-bottom: 8px;
        }

        .login-sub {
            font-size: 14px;
            color: var(--ink3);
            line-height: 1.6;
            margin-bottom: 32px;
        }

        .btn-google {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: var(--white);
            border: 1.5px solid var(--card-border);
            border-radius: 14px;
            padding: 14px 20px;
            font-size: 14.5px;
            font-weight: 600;
            color: var(--ink2);
            font-family: var(--font);
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
            text-decoration: none;
        }

        .btn-google:hover {
            border-color: #d1d1d6;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            transform: translateY(-1px);
        }

        .btn-google.loading {
            opacity: 0.7;
            pointer-events: none;
        }

        .google-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }

        .divider {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 24px 0;
            color: var(--ink4);
            font-size: 12px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--card-border);
        }

        .form-group {
            margin-bottom: 14px;
        }

        .form-label {
            display: block;
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink2);
            margin-bottom: 6px;
            letter-spacing: 0.2px;
            text-align: left;
        }

        .form-input {
            width: 100%;
            padding: 12px 14px;
            border: 1.5px solid var(--card-border);
            border-radius: 12px;
            font-size: 14px;
            font-family: var(--font);
            color: var(--ink);
            background: var(--bg);
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-bg);
        }

        .btn-email {
            width: 100%;
            padding: 13px;
            background: var(--accent);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 14.5px;
            font-weight: 700;
            font-family: var(--font);
            cursor: pointer;
            margin-top: 6px;
            transition: all 0.2s;
        }

        .btn-email:hover {
            background: var(--accent2);
            transform: translateY(-1px);
        }

        .btn-email.loading {
            opacity: 0.7;
            pointer-events: none;
        }

        .login-footer {
            margin-top: 28px;
            font-size: 12px;
            color: var(--ink4);
            text-align: center;
            line-height: 1.7;
        }

        .login-footer a {
            color: var(--ink3);
        }

        .status-box {
            display: none;
            background: var(--accent-bg);
            border: 1px solid rgba(0, 122, 255, 0.2);
            border-radius: 14px;
            padding: 16px 18px;
            margin-top: 16px;
            font-size: 13.5px;
            color: var(--accent);
            line-height: 1.6;
            text-align: left;
        }

        .status-box.show {
            display: block;
        }

        .toast {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--ink);
            color: #fff;
            padding: 12px 20px;
            border-radius: 100px;
            font-size: 13px;
            font-weight: 500;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 300;
            white-space: nowrap;
            pointer-events: none;
        }

        .toast.show {
            opacity: 1;
        }

        .toast.error {
            background: #FF3B30;
        }

        @media (max-width: 480px) {
            .login-box {
                padding: 36px 24px 30px;
                border-radius: 22px;
            }

            .login-h1 {
                font-size: 22px;
            }
        }
`;

// Insert clean CSS before </style>
content = content.replace('</style>', cleanCss + '\n    </style>');

// 3. Define the Modal HTML structure to inject before </body>
const modalHtml = `
    <!-- LOGIN MODAL DYNAMIC OVERLAY -->
    <div id="loginModalOverlay" class="modal-overlay">
        <div class="login-box">
            <button class="modal-close" id="modalCloseBtn">&times;</button>
            <a class="login-logo" href="#">notiq</a>
            <h1 class="login-h1">Welcome back</h1>
            <p class="login-sub">Sign in to access your study materials across all your devices.</p>

            <!-- Google Sign In -->
            <button class="btn-google" id="googleBtn">
                <svg class="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </button>

            <div class="divider">or sign in with email</div>

            <!-- Email Magic Link Form -->
            <div class="form-group">
                <label class="form-label">Email address</label>
                <input class="form-input" type="email" id="emailInput" placeholder="you@example.com" />
            </div>
            <button class="btn-email" id="emailBtn">Send Magic Link</button>
            <div class="status-box" id="statusBox">
                📬 Magic link sent! Check your email and click the link to sign in.
            </div>

            <p class="login-footer">
                By continuing, you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.<br>
                All files are processed locally.
            </p>
        </div>
    </div>

    <div class="toast" id="toast"></div>

    <!-- Supabase JS SDK for Landing Page Modal Auth -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script>
        // Supabase configuration
        const SUPABASE_URL = window.__SUPABASE_URL__ || 'https://wjlyczzrhloayklbprmc.supabase.co';
        const SUPABASE_ANON_KEY = window.__SUPABASE_ANON_KEY__ || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbHljenpyaGxvYXlrbGJwcm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMDM4ODYsImV4cCI6MjA4Nzg3OTg4Nn0.tV1sdNzEx6x_OGE0dIKwXrbubU0Iu2NQRge2Anj-6ks';

        let supabaseClient, isLoggedIn = false;
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (e) {
            console.warn('Supabase JS not initialized properly:', e.message);
        }

        // Global check session
        async function verifySessionOnLoad() {
            if (!supabaseClient) return;
            try {
                 const { data } = await supabaseClient.auth.getSession();
                 if (data?.session) {
                     isLoggedIn = true;
                     // Optional: change button text "Start Studying" -> "Go to App"
                 }
            } catch (e) {}
        }
        verifySessionOnLoad();

        // Handle OAuth Callback on index.html
        if (window.location.hash.includes('access_token')) {
            supabaseClient?.auth.getSession().then(({ data }) => {
                if (data?.session) window.location.replace('/app.html');
            });
        }

        // Modal Logic
        const overlay = document.getElementById('loginModalOverlay');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        
        function openLoginModal() {
            // IF ALREADY LOGGED IN -> send straight to app
            if(isLoggedIn) {
                window.location.assign('/app.html');
                return;
            }
            overlay.classList.add('show');
        }

        function closeLoginModal() {
            overlay.classList.remove('show');
        }

        if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeLoginModal);
        
        // Close on clicking outside the box
        overlay.addEventListener('click', (e) => {
             if(e.target === overlay) closeLoginModal();
        });


        // Auth Toast Logic
        function showAuthToast(msg, isError = false) {
            const t = document.getElementById('toast');
            t.textContent = msg;
            t.className = 'toast show' + (isError ? ' error' : '');
            setTimeout(() => t.classList.remove('show'), 3500);
        }

        // Action Logic
        const googleBtn = document.getElementById('googleBtn');
        const emailBtn = document.getElementById('emailBtn');
        const emailInput = document.getElementById('emailInput');

        if(googleBtn) {
            googleBtn.addEventListener('click', async () => {
                if (!supabaseClient || SUPABASE_URL.includes('YOUR_PROJECT')) {
                    showAuthToast('⚠️ Supabase not configured — see setup guide', true);
                    return;
                }
                googleBtn.classList.add('loading');
                googleBtn.textContent = 'Redirecting…';
                try {
                    const { error } = await supabaseClient.auth.signInWithOAuth({
                        provider: 'google',
                        options: { redirectTo: window.location.origin + '/app.html' }
                    });
                    if (error) throw error;
                } catch (e) {
                    showAuthToast('Sign-in failed: ' + e.message, true);
                    googleBtn.classList.remove('loading');
                    googleBtn.innerHTML = \`<svg class="google-icon" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Continue with Google\`;
                }
            });
        }

        async function triggerEmail() {
             const email = emailInput.value.trim();
             if (!email || !email.includes('@')) { showAuthToast('Enter a valid email', true); return; }
             if (!supabaseClient || SUPABASE_URL.includes('YOUR_PROJECT')) {
                 showAuthToast('⚠️ Supabase not configured — see setup guide', true);
                 return;
             }
             emailBtn.classList.add('loading');
             emailBtn.textContent = 'Sending…';
             try {
                 const { error } = await supabaseClient.auth.signInWithOtp({
                     email,
                     options: { emailRedirectTo: window.location.origin + '/app.html' }
                 });
                 if (error) throw error;
                 document.getElementById('statusBox').classList.add('show');
                 showAuthToast('✓ Magic link sent!');
             } catch (e) {
                 showAuthToast('Error: ' + e.message, true);
             }
             emailBtn.classList.remove('loading');
             emailBtn.textContent = 'Send Magic Link';
        }

        if(emailBtn) {
            emailBtn.addEventListener('click', triggerEmail);
        }
        
        if(emailInput) {
             emailInput.addEventListener('keydown', e => {
                 if (e.key === 'Enter') triggerEmail();
             });
        }

        // Attach Modal Flow to all existing "Start Studying" / "Upload" links dynamically
        document.querySelectorAll('a[href="/app.html"]').forEach(btn => {
             btn.addEventListener('click', (e) => {
                 e.preventDefault();
                 openLoginModal();
             });
        });

    </script>
</body>
`;

content = content.replace('</body>', modalHtml);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully patched index.html with login modal logic and sanitized CSS.');
