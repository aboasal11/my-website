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
