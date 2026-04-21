// ═══════════════════════════════════════════
// NOTARY — Header + Hero JS
// ═══════════════════════════════════════════

(function () {
    'use strict';

    // ── DOM refs ──────────────────────────────
    const header        = document.getElementById('header');
    const navDropBtn    = document.querySelector('.js-nav-btn');
    const navMenu       = document.getElementById('navMenu');
    const navDrop       = document.getElementById('navDrop');
    const burger        = document.querySelector('.js-burger');
    const mobNav        = document.getElementById('mobNav');
    const modalBg       = document.getElementById('modalBg');
    const modalTriggers = document.querySelectorAll('.js-modal');
    const modalClose    = document.querySelector('.js-modal-close');

    // ── Header shadow on scroll ───────────────
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow =
                window.scrollY > 6
                    ? '0 2px 24px rgba(0,0,0,.32)'
                    : 'none';
        }, { passive: true });
    }

    // ── Nav Dropdown ──────────────────────────
    if (navDropBtn && navMenu && navDrop) {

        navDropBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            const isOpen = navMenu.classList.toggle('open');
            navDropBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Закриття при кліку поза меню
        document.addEventListener('click', (e) => {
            if (!navDrop.contains(e.target)) {
                navMenu.classList.remove('open');
                navDropBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Закриття при кліку на пункт
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navDropBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navDropBtn.setAttribute('aria-expanded', 'false');
                navDropBtn.focus();
            }
        });
    }

    // ── Burger / mobile nav ───────────────────
    if (burger && mobNav) {

        burger.addEventListener('click', () => {
            const isOpen = burger.classList.toggle('open');

            mobNav.classList.toggle('open', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            mobNav.setAttribute('aria-hidden', String(!isOpen));
        });

        // Закриття по кліку на лінк
        mobNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                mobNav.classList.remove('open');

                burger.setAttribute('aria-expanded', 'false');
                mobNav.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // ── Modal ─────────────────────────────────
    function openModal() {
        if (!modalBg) return;
        modalBg.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalBg) return;
        modalBg.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalTriggers.length) {
        modalTriggers.forEach(btn =>
            btn.addEventListener('click', openModal)
        );
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBg) {
        modalBg.addEventListener('click', (e) => {
            if (e.target === modalBg) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBg && modalBg.classList.contains('open')) {
            closeModal();
        }
    });

})();


// ═══════════════════════════════════════════
// SERVICES v2 — services2.js
// ═══════════════════════════════════════════

(function () {
    'use strict';

    // ── Accordion ─────────────────────────────
    document.querySelectorAll('.js-scrow').forEach(btn => {

        const sub = btn.nextElementSibling;
        if (!sub || !sub.classList.contains('sc__sub')) return;

        btn.addEventListener('click', () => {
            const isOpen = sub.classList.contains('sc__sub--open');

            const rows = btn.closest('.sc__rows');

            // Закрити інші
            if (rows) {
                rows.querySelectorAll('.sc__row--open').forEach(r => {
                    if (r !== btn) {
                        r.classList.remove('sc__row--open');
                        r.setAttribute('aria-expanded', 'false');

                        const s = r.nextElementSibling;
                        if (s && s.classList.contains('sc__sub')) {
                            s.classList.remove('sc__sub--open');
                        }
                    }
                });
            }

            // toggle
            btn.classList.toggle('sc__row--open', !isOpen);
            btn.setAttribute('aria-expanded', String(!isOpen));
            sub.classList.toggle('sc__sub--open', !isOpen);
        });
    });

    // ── Swiper ────────────────────────────────
    const swiper = new Swiper('.reviews__slider', {
        slidesPerView: 3,        // Рівно 3 в ряд
        spaceBetween: 30,       // Відступ між ними
        loop: true,             // По колу

        navigation: {
            nextEl: '.reviews__btn--next',
            prevEl: '.reviews__btn--prev',
        },

        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });



    (function () {
        'use strict';

        const video = document.querySelector('.visit__video');
        const playBtn = document.querySelector('.visit__play-btn');

        if (!video || !playBtn) return;

        // Спільна функція для перемикання станів
        const togglePlay = (e) => {
            // Запобігаємо стандартним діям браузера, які можуть заважати кліку
            if (e) e.preventDefault();

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        };

        // Обробник для кнопки
        playBtn.addEventListener('click', togglePlay);

        // Обробник для самого відео
        video.addEventListener('click', togglePlay);

        // події самого відео для керування видимістю кнопки
        video.addEventListener('play', () => {
            playBtn.style.opacity = '0';
            playBtn.style.visibility = 'hidden';
        });

        video.addEventListener('pause', () => {
            playBtn.style.opacity = '1';
            playBtn.style.visibility = 'visible';
        });
    })();


})();


