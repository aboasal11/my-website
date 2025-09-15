// Main interactive behaviors: smooth scroll, sticky header, theme toggle, reveals, filters, form validation

(function(){
    // Helpers
    const qs = s => document.querySelector(s);
    const qsa = s => Array.from(document.querySelectorAll(s));

    // Smooth scrolling for nav links
    qsa('header .nvagation a').forEach(a=>{
        a.addEventListener('click', e=>{
            e.preventDefault();
            const id = a.getAttribute('href');
            if(!id || id === '#') return;
            const el = document.querySelector(id);
            if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        });
    });

    // Sticky header on scroll
    const header = qs('header');
    const scrollTopBtn = qs('#scrollTop');
    const onScroll = ()=>{
        if(window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if(window.scrollY > 300) scrollTopBtn.style.display = 'block'; else scrollTopBtn.style.display = 'none';
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Scroll-to-top
    scrollTopBtn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

    // Theme toggle with localStorage
    const themeToggle = qs('#theme-toggle');
    const current = localStorage.getItem('theme');
    if(current === 'dark') document.body.classList.add('dark'), themeToggle.textContent = '☀️';
    function toggleTheme(){
        const isDark = document.body.classList.toggle('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', toggleTheme);

    // --- Internationalization (i18n) ---
    const translations = {
        en: {
            hero_title: "Hello i'm Mohammed Asal <br><span>Ethical Hacker</span>",
            hero_span: 'Ethical Hacker',
            hero_sub: 'Your security is my mission',
            cta_work: 'See My work',
            services_title: 'Services',
            services_sub: 'What I offer',
            svc_web: 'Web Security',
            svc_web_desc: 'Comprehensive web application security assessments and secure design reviews.',
            svc_bug: 'Bug Bounty',
            svc_bug_desc: 'Responsible vulnerability discovery and coordinated disclosure through bounty programs.',
            svc_pentest: 'Penetration Testing',
            svc_pentest_desc: 'Hands-on pentests simulating real-world attacks to find exploitable weaknesses.',
            svc_consult: 'Cybersecurity Consulting',
            svc_consult_desc: 'Strategy, policy, and remediation guidance to build resilient security programs.',
            projects_title: 'Projects',
            projects_sub: 'Selected work',
            filter_all: 'All',
            filter_web: 'Web Security',
            filter_tools: 'Tools',
            proj_1_title: 'Web App Harden',
            proj_1_desc: 'Full-stack hardening and vulnerability remediation for a high-traffic web application.',
            proj_2_title: 'Recon Toolkit',
            proj_2_desc: 'A developer-friendly reconnaissance toolkit used for triage and asset discovery.',
            proj_3_title: 'API Security Audit',
            proj_3_desc: 'Identified broken auth and improved token handling for a microservices API.',
            proj_4_title: 'Phishing Simulator',
            proj_4_desc: 'Internal tool to help train staff and measure risk through simulated campaigns.',
            proj_view: 'View Details',
            contact_title: 'Contact',
            contact_sub: "Let's work together",
            label_name: 'Name',
            label_email: 'Email',
            label_message: 'Message',
            btn_send: 'Send Message',
            connect_title: 'Connect',
            connect_sub: 'Find me on social media or send an email.',
            form_err_name: 'Please enter your name.',
            form_err_email: 'Please enter a valid email.',
            form_err_message: 'Please write a message.',
            form_success: 'Message sent — thank you!',
            form_network: 'Network error — please try again later.'
        },
        ar: {
            hero_title: `مرحبًا أنا محمد عسل <br><span>هاكر أخلاقي</span>`,
            hero_span: 'هاكر أخلاقي',
            hero_sub: 'أمنك مهمتي',
            cta_work: 'عرض أعمالي',
            services_title: 'الخدمات',
            services_sub: 'ما أقدمه',
            svc_web: 'أمن الويب',
            svc_web_desc: 'تقييمات شاملة لأمن تطبيقات الويب ومراجعات التصميم الآمن.',
            svc_bug: 'صيد الثغرات',
            svc_bug_desc: 'اكتشاف الثغرات وإبلاغ منسق بطريقة مسؤولة.',
            svc_pentest: 'اختبار الاختراق',
            svc_pentest_desc: 'اختبارات عملية تحاكي هجمات العالم الحقيقي للعثور على نقاط الضعف.',
            svc_consult: 'استشارات الأمن السيبراني',
            svc_consult_desc: 'استراتيجية وسياسات وإرشادات للتصحيح لبناء برامج أمنية قوية.',
            projects_title: 'المشاريع',
            projects_sub: 'أعمال مختارة',
            filter_all: 'الكل',
            filter_web: 'أمن الويب',
            filter_tools: 'أدوات',
            proj_1_title: 'تحصين تطبيق الويب',
            proj_1_desc: 'تحصين كامل للتطبيق وإصلاح الثغرات لتطبيق عالي الحركة.',
            proj_2_title: 'أداة الاستطلاع',
            proj_2_desc: 'أداة استطلاع للمطورين لاكتشاف الأصول وتقييمها.',
            proj_3_title: 'تدقيق أمان API',
            proj_3_desc: 'اكتشاف مشاكل المصادقة وتحسين التعامل مع الرموز.',
            proj_4_title: 'محاكي الاصطياد',
            proj_4_desc: 'أداة داخلية لتدريب الموظفين وقياس المخاطر.',
            proj_view: 'عرض التفاصيل',
            contact_title: 'اتصل',
            contact_sub: 'دعنا نعمل معًا',
            label_name: 'الاسم',
            label_email: 'البريد الإلكتروني',
            label_message: 'الرسالة',
            btn_send: 'إرسال الرسالة',
            connect_title: 'تواصل',
            connect_sub: 'تواصل معي على وسائل التواصل الاجتماعي أو أرسل رسالة بريد إلكتروني.',
            form_err_name: 'الرجاء إدخال اسمك.',
            form_err_email: 'الرجاء إدخال بريد إلكتروني صحيح.',
            form_err_message: 'الرجاء كتابة رسالة.',
            form_success: 'تم إرسال الرسالة — شكرًا لك!',
            form_network: 'خطأ في الشبكة — حاول مرة أخرى لاحقًا.'
        },
        de: {
            hero_title: "Hallo, ich bin Mohammed Asal <br><span>Ethical Hacker</span>",
            hero_span: 'Ethical Hacker',
            hero_sub: 'Ihre Sicherheit ist meine Mission',
            cta_work: 'Meine Arbeit ansehen',
            services_title: 'Dienstleistungen',
            services_sub: 'Was ich anbiete',
            svc_web: 'Web-Sicherheit',
            svc_web_desc: 'Umfassende Sicherheitsbewertungen für Webanwendungen und sichere Design-Reviews.',
            svc_bug: 'Bug-Bounty',
            svc_bug_desc: 'Verantwortliche Entdeckung von Schwachstellen und koordinierte Meldung.',
            svc_pentest: 'Penetrationstests',
            svc_pentest_desc: 'Praktische Penetrationstests, die reale Angriffe simulieren, um Schwachstellen zu finden.',
            svc_consult: 'Cybersicherheitsberatung',
            svc_consult_desc: 'Strategie, Richtlinien und Behebungsberatung zum Aufbau robuster Sicherheitsprogramme.',
            projects_title: 'Projekte',
            projects_sub: 'Ausgewählte Arbeiten',
            filter_all: 'Alle',
            filter_web: 'Web-Sicherheit',
            filter_tools: 'Tools',
            proj_1_title: 'Web App Härtung',
            proj_1_desc: 'Full-Stack-Härtung und Schwachstellenbehebung für eine vielgenutzte Webanwendung.',
            proj_2_title: 'Recon Toolkit',
            proj_2_desc: 'Ein entwicklerfreundliches Erkundungs-Toolkit zur Triage und Asset-Erkennung.',
            proj_3_title: 'API-Sicherheitsprüfung',
            proj_3_desc: 'Erkennung fehlerhafter Authentifizierung und Verbesserung der Token-Verarbeitung.',
            proj_4_title: 'Phishing-Simulator',
            proj_4_desc: 'Internes Tool zum Schulen von Mitarbeitern und Messen des Risikos.',
            proj_view: 'Details ansehen',
            contact_title: 'Kontakt',
            contact_sub: 'Lass uns zusammenarbeiten',
            label_name: 'Name',
            label_email: 'E-Mail',
            label_message: 'Nachricht',
            btn_send: 'Nachricht senden',
            connect_title: 'Verbinden',
            connect_sub: 'Finde mich in sozialen Medien oder sende eine E-Mail.',
            form_err_name: 'Bitte geben Sie Ihren Namen ein.',
            form_err_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            form_err_message: 'Bitte schreiben Sie eine Nachricht.',
            form_success: 'Nachricht gesendet — danke!',
            form_network: 'Netzwerkfehler — bitte versuchen Sie es später erneut.'
        },
        ja: {
            hero_title: 'こんにちは、私はモハメド・アサルです <br><span>エシカルハッカー</span>',
            hero_span: 'エシカルハッカー',
            hero_sub: 'あなたのセキュリティが私の使命です',
            cta_work: '作品を見る',
            services_title: 'サービス',
            services_sub: '提供内容',
            svc_web: 'ウェブセキュリティ',
            svc_web_desc: 'ウェブアプリの包括的なセキュリティ評価と安全な設計レビュー。',
            svc_bug: 'バグバウンティ',
            svc_bug_desc: '脆弱性の発見と責任ある報告。',
            svc_pentest: 'ペネトレーションテスト',
            svc_pentest_desc: '実際の攻撃を模した実践的なテストで脆弱性を発見します。',
            svc_consult: 'サイバーセキュリティコンサルティング',
            svc_consult_desc: '戦略、ポリシー、修復ガイダンス。',
            projects_title: 'プロジェクト',
            projects_sub: '選択された作品',
            filter_all: 'すべて',
            filter_web: 'ウェブセキュリティ',
            filter_tools: 'ツール',
            proj_1_title: 'Webアプリの強化',
            proj_1_desc: '高トラフィックなWebアプリの強化と脆弱性修正。',
            proj_2_title: 'Reconツールキット',
            proj_2_desc: '資産発見とトリアージのためのツール。',
            proj_3_title: 'APIセキュリティ監査',
            proj_3_desc: '認証の不備を特定し、トークン処理を改善しました。',
            proj_4_title: 'フィッシングシミュレータ',
            proj_4_desc: '従業員のトレーニングとリスク評価のための内部ツール。',
            proj_view: '詳細を見る',
            contact_title: 'お問い合わせ',
            contact_sub: '一緒に仕事をしましょう',
            label_name: '名前',
            label_email: 'メール',
            label_message: 'メッセージ',
            btn_send: '送信',
            connect_title: 'つながる',
            connect_sub: 'ソーシャルメディアで見つけるか、メールを送ってください。',
            form_err_name: '名前を入力してください。',
            form_err_email: '有効なメールアドレスを入力してください。',
            form_err_message: 'メッセージを入力してください。',
            form_success: 'メッセージが送信されました — ありがとうございます！',
            form_network: 'ネットワークエラー — 後でもう一度お試しください。'
        }
    };

    const langSelect = qs('#lang-select');
    const savedLang = localStorage.getItem('lang') || 'en';
    langSelect.value = savedLang;

    function applyTranslations(lang){
        const map = translations[lang] || translations.en;
        qsa('[data-i18n]').forEach(el=>{
            const key = el.getAttribute('data-i18n');
            if(!key) return;
            const v = map[key];
            if(v === undefined) return;
            if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
                el.placeholder = v;
            } else if(el.tagName.toLowerCase() === 'select'){
                // ignore
            } else {
                el.innerHTML = v;
            }
        });
        // RTL handling for Arabic
        if(lang === 'ar'){
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.lang = lang;
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
        localStorage.setItem('lang', lang);
    }

    langSelect.addEventListener('change', (e)=> applyTranslations(e.target.value));
    // apply initially
    applyTranslations(savedLang);

    // Intersection Observer for reveal on scroll
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if(e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
        });
    }, {threshold:0.12});
    qsa('[data-animate]').forEach(el=> io.observe(el));

    // Project filtering
    const filterBtns = qsa('.filter-btn');
    const projectCards = qsa('.project-card');
    filterBtns.forEach(btn=> btn.addEventListener('click', ()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        projectCards.forEach(card=>{
            if(cat === 'all' || card.dataset.category === cat) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }));

    // Contact form validation + POST to server endpoint
    const form = qs('#contact-form');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const name = qs('#name').value.trim();
        const email = qs('#email').value.trim();
        const message = qs('#message').value.trim();
        let ok = true;
        const setErr = (field, text)=>{
            const el = qs(`.error[data-for="${field}"]`);
            if(el) el.textContent = text;
        };
        setErr('name',''); setErr('email',''); setErr('message','');
        if(!name){ setErr('name','Please enter your name.'); ok=false; }
        if(!email){ setErr('email','Please enter your email.'); ok=false; }
        else if(!emailRegex.test(email)){ setErr('email','Please enter a valid email.'); ok=false; }
        if(!message){ setErr('message','Please write a message.'); ok=false; }
        if(!ok) return;

        const submitBtn = form.querySelector('.submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        try {
            const res = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json().catch(()=>({ ok: res.ok }));
            if(res.ok && data.ok !== false){
                qs('#form-success').textContent = 'Message sent — thank you!';
                form.reset();
            } else {
                const err = data && data.error ? data.error : 'Failed to send message';
                qs('#form-success').textContent = `Error: ${err}`;
            }
        } catch(err){
            qs('#form-success').textContent = 'Network error — please try again later.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            setTimeout(()=> qs('#form-success').textContent = '', 6000);
        }
    });

    // Enhance keyboard accessibility for filter buttons
    filterBtns.forEach(btn=> btn.addEventListener('keydown', e=>{
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    }));

})();
