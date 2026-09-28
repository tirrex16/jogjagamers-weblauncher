(() => {
  "use strict";

  /* ============================================================
     Modal — bottom sheet that slides up over a blurred backdrop.
     Opened by any element carrying [data-modal-trigger].
     ============================================================ */

  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalTriggers = document.querySelectorAll("[data-modal-trigger]");

  function openModal() {
    modalOverlay.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modalOverlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
