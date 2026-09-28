(() => {
  "use strict";

  /* ============================================================
     NAVBAR — hover-expand flyout (mirrors apple.com globalnav:
     mouseenter opens immediately, mouseleave closes after a short
     delay so moving from link to panel doesn't collapse it).
     ============================================================ */

  const navbar = document.getElementById("navbar");
  const curtain = document.getElementById("navCurtain");
  const flyoutItems = document.querySelectorAll(".navbar-item.has-flyout");

  const CLOSE_DELAY = 120; // ms — matches the real value apple.com uses
  let closeTimer = null;

  function openFlyout(item) {
    clearTimeout(closeTimer);
    flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
    item.classList.add("flyout-active");
    navbar.classList.add("flyout-open");
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
      navbar.classList.remove("flyout-open");
    }, CLOSE_DELAY);
  }

  flyoutItems.forEach((item) => {
    item.addEventListener("mouseenter", () => openFlyout(item));
    item.addEventListener("mouseleave", scheduleClose);

    const link = item.querySelector(".navbar-link");
    link.addEventListener("focus", () => {
      if (!navbar.classList.contains("mobile-open")) openFlyout(item);
    });

    // tap-to-toggle: needed on mobile, where there is no hover —
    // the submenu becomes an inline accordion under its trigger.
    link.addEventListener("click", (e) => {
      if (!navbar.classList.contains("mobile-open")) return;
      e.preventDefault();
      const isActive = item.classList.contains("flyout-active");
      flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
      if (!isActive) item.classList.add("flyout-active");
    });
  });

  navbar.addEventListener("focusout", (e) => {
    if (!navbar.contains(e.relatedTarget)) {
      flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
      navbar.classList.remove("flyout-open");
    }
  });

  curtain.addEventListener("mouseenter", () => {
    flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
    navbar.classList.remove("flyout-open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
      navbar.classList.remove("flyout-open");
    }
  });

  /* ---- mobile hamburger ---- */

  const hamburger = document.getElementById("navHamburger");
  hamburger.addEventListener("click", () => {
    const open = navbar.classList.toggle("mobile-open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("modal-open", open);
    if (!open) flyoutItems.forEach((el) => el.classList.remove("flyout-active"));
  });

  /* ============================================================
     Theme-aware navbar (light on light sections, dark on dark
     sections) driven by IntersectionObserver — no scroll listener.
     ============================================================ */

  const themedBlocks = document.querySelectorAll("[data-theme]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const theme = entry.target.dataset.theme;
        navbar.classList.toggle("navbar-dark", theme === "dark");
        navbar.classList.toggle("navbar-light", theme === "light");
      });
    },
    { rootMargin: `-${44 + 1}px 0px -85% 0px`, threshold: 0 }
  );

  themedBlocks.forEach((block) => navObserver.observe(block));
})();
