/* ===== EcoPharma — інтерактив ===== */

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  initHeaderScroll();
  initHeroAnimation();
  initAboutAnimation();
  initAboutPageAnimation();
  initNewsAnimation();
  initBranchesAnimation();
  initFaqAnimation();
  initBranchesPage();
  initNewsPage();
  initCart();
  initCatalogFilter();
  initContactForm();
  initFaqAccordion();
  setYear();
});

/* ---------- FAQ Акордеон ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("faq-item--open");

      // Закриваємо всі
      items.forEach((i) => {
        i.classList.remove("faq-item--open");
        const b = i.querySelector(".faq-question");
        if (b) b.setAttribute("aria-expanded", "false");
      });

      // Якщо був закритий — відкриваємо
      if (!isOpen) {
        item.classList.add("faq-item--open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* GSAP-анімація hero: поява тексту + домальовування обведення */
function initHeroAnimation() {
  if (typeof gsap === "undefined") return;
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const circle = document.querySelector(".hero-circle-svg path");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Підготовка обведення (приховуємо лінію)
  let len = 0;
  if (circle) {
    len = circle.getTotalLength();
    gsap.set(circle, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
  }

  if (reduce) return; // поважаємо налаштування зменшеного руху

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 })
    .from(".hero-line", { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.18 }, "-=0.3")
    .from(".hero-desc", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.3")
    .from(".hero-actions", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.45");

  if (circle) {
    tl.to(circle, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3");
  }
}

/* Анімація секції «Про нас» при скролі */
function initAboutAnimation() {
  if (typeof gsap === "undefined") return;
  const about = document.querySelector(".about");
  if (!about) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger: about, start: "top 75%" },
  });

  tl.from("#about .about-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 })
    .from("#about .about-title", { y: 26, autoAlpha: 0, duration: 0.7 }, "-=0.3")
    .from("#about .about-photo", { y: 50, autoAlpha: 0, duration: 0.6, stagger: 0.12 }, "-=0.3")
    .from("#about .about-text", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.25")
    .from("#about .btn-outline-dark", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.4");
}

/* Анімація нової сторінки «Про нас» при скролі */
function initAboutPageAnimation() {
  if (typeof gsap === "undefined") return;
  const page = document.querySelector(".ap-page");
  if (!page) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Анімація вступної секції (Intro)
  const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  introTl.from(".ap-logo-container", { y: 30, autoAlpha: 0, duration: 0.6 })
         .from(".ap-hero-title", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=0.3")
         .from(".ap-hero-img-wrapper", { y: 50, autoAlpha: 0, duration: 0.8 }, "-=0.4");

  // 2. Анімація колонок при скролі
  const rows = document.querySelectorAll(".ap-row");
  rows.forEach((row) => {
    const cols = row.querySelectorAll(".ap-col");
    cols.forEach((col, idx) => {
      gsap.from(col, {
        scrollTrigger: {
          trigger: col,
          start: "top 80%",
        },
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: idx * 0.15,
      });
    });
  });

  // 3. Анімація секції CTA при скролі
  gsap.from(".ap-cta-container > *", {
    scrollTrigger: {
      trigger: ".ap-cta-section",
      start: "top 80%",
    },
    y: 40,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out",
  });
}

/* Анімація секції «Новини» при скролі */
function initNewsAnimation() {
  if (typeof gsap === "undefined") return;
  const block = document.querySelector(".news-block");
  if (!block) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger: block, start: "top 75%" },
  });

  tl.from(".news-head .about-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 })
    .from(".news-title", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.35")
    .from(".news-subtitle", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.4")
    .from(".news-card", { y: 50, autoAlpha: 0, duration: 0.6, stagger: 0.15 }, "-=0.2")
    .from(".news-inner .btn-outline-dark", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.2");

  // Плавна поява великого відео
  gsap.from(".news-video", {
    scrollTrigger: { trigger: ".news-video", start: "top 85%" },
    y: 60,
    autoAlpha: 0,
    duration: 0.9,
    ease: "power3.out",
  });
}

/* Анімація секції «Відділення» при скролі */
function initBranchesAnimation() {
  if (typeof gsap === "undefined") return;
  const block = document.querySelector(".branches");
  if (!block) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger: block, start: "top 75%" },
  });

  tl.from("#branches .about-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 })
    .from(".branches-title", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.35")
    .from(".branches-subtitle", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.4")
    .from(".branches-map-svg", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.2")
    .from(".map-pin", { autoAlpha: 0, duration: 0.4, stagger: 0.1 }, "-=0.25")
    .from("#branches .btn-ghost-white", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.2");
}

/* Анімація секції FAQ при скролі */
function initFaqAnimation() {
  if (typeof gsap === "undefined") return;
  const block = document.querySelector(".faq-section");
  if (!block) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger: block, start: "top 75%" },
  });

  tl.from(".faq-badge", { y: 20, autoAlpha: 0, duration: 0.6 })
    .from(".faq-title", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.35")
    .from(".faq-item", { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
}

/* Сторінка «Наші Відділення»: таби міст + вибір відділення (оновлення карти) */
function initBranchesPage() {
  const page = document.querySelector(".branches-page");
  if (!page) return;

  const tabs = page.querySelectorAll(".bp-tab");
  const panels = page.querySelectorAll(".bp-panel");

  // Перемикання міст
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const city = tab.dataset.city;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.dataset.city === city));
    });
  });

  // Вибір відділення в межах міста → оновлення карти
  panels.forEach((panel) => {
    const cards = panel.querySelectorAll(".bp-card");
    const mapImg = panel.querySelector(".bp-map img");

    cards.forEach((card) => {
      const activate = () => {
        cards.forEach((c) => c.classList.toggle("active", c === card));
        if (mapImg && card.dataset.map) mapImg.src = card.dataset.map;
      };
      card.addEventListener("click", activate);
      const btn = card.querySelector(".bp-map-btn");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          activate();
        });
      }
    });
  });

  // Відкрити місто за хешем (#dnipro тощо)
  const hash = location.hash.replace("#", "");
  if (hash) {
    const tab = page.querySelector(`.bp-tab[data-city="${hash}"]`);
    if (tab) tab.click();
  }
}

/* Сторінка «Новини»: таби категорій + фільтрація сітки */
function initNewsPage() {
  const page = document.querySelector(".news-page");
  if (!page) return;

  const tabs = page.querySelectorAll(".bp-tab");
  const items = page.querySelectorAll(".news-grid-item");

  function applyFilter(category) {
    items.forEach((item) => {
      const show = category === "all" || item.dataset.category === category;
      item.classList.toggle("d-none", !show);
    });
  }

  // Фільтрація сітки при кліку на таб
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetCategory = tab.dataset.category;
      
      // Перемикаємо активний таб
      tabs.forEach((t) => t.classList.toggle("active", t === tab));

      // Застосовуємо фільтр
      applyFilter(targetCategory);
    });
  });

  // Застосувати початковий фільтр для активного таба при завантаженні
  const activeTab = page.querySelector(".bp-tab.active");
  if (activeTab) {
    applyFilter(activeTab.dataset.category);
  }

  // Відкрити категорію за хешем, якщо є (наприклад, #science)
  const hash = location.hash.replace("#", "");
  if (hash) {
    const tab = page.querySelector(`.bp-tab[data-category="${hash}"]`);
    if (tab) tab.click();
  }
}

/* Фіксований хедер → білий одразу при скролі */
function initHeaderScroll() {
  const header = document.querySelector(".hero-header");
  if (!header) return;

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Підсвічування активного пункту меню за поточною сторінкою */
function highlightActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ---------- Кошик (зберігається у localStorage) ---------- */
const CART_KEY = "ecopharma_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.classList.toggle("d-none", count === 0);
}

function initCart() {
  updateCartBadge();

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const cart = getCart();
      const existing = cart.find((i) => i.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      saveCart(cart);
      updateCartBadge();
      showToast(`«${name}» додано до кошика`);
    });
  });
}

/* Невеличке спливаюче повідомлення */
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "position-fixed bottom-0 end-0 p-3";
    container.style.zIndex = "1080";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast align-items-center text-bg-success border-0 show";
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Закрити"></button>
    </div>`;
  container.appendChild(toast);

  toast.querySelector(".btn-close").addEventListener("click", () => toast.remove());
  setTimeout(() => toast.remove(), 2500);
}

/* ---------- Фільтр каталогу за категорією + пошук ---------- */
function initCatalogFilter() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll("[data-category]"));
  const search = document.getElementById("catalog-search");
  const filterButtons = document.querySelectorAll("[data-filter]");

  function apply() {
    const activeBtn = document.querySelector("[data-filter].active");
    const category = activeBtn ? activeBtn.dataset.filter : "all";
    const query = (search?.value || "").trim().toLowerCase();

    let visible = 0;
    cards.forEach((card) => {
      const matchCat = category === "all" || card.dataset.category === category;
      const matchQuery = card.dataset.name.toLowerCase().includes(query);
      const show = matchCat && matchQuery;
      card.closest(".col").classList.toggle("d-none", !show);
      if (show) visible++;
    });

    const empty = document.getElementById("catalog-empty");
    if (empty) empty.classList.toggle("d-none", visible !== 0);
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply();
    });
  });

  search?.addEventListener("input", apply);
}

/* ---------- Валідація форми контактів ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    form.reset();
    form.classList.remove("was-validated");
    document.getElementById("form-success").classList.remove("d-none");
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
