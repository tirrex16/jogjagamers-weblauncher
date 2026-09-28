(() => {
  "use strict";

  /* ============================================================
     Donation dropdown — small menu (JGRP / JGVRP) toggled from
     the chapternav, closes on outside click or Escape.
     ============================================================ */

  const donationTrigger = document.getElementById("donationTrigger");
  const donationDropdown = document.getElementById("donationDropdown");

  function positionDonationDropdown() {
    const rect = donationTrigger.getBoundingClientRect();
    donationDropdown.style.left = `${rect.left + rect.width / 2}px`;
    donationDropdown.style.top = `${rect.bottom}px`;
  }

  function closeDonationDropdown() {
    donationDropdown.classList.remove("is-open");
    donationTrigger.setAttribute("aria-expanded", "false");
  }

  donationTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = donationDropdown.classList.toggle("is-open");
    if (isOpen) positionDonationDropdown();
    donationTrigger.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (donationDropdown.classList.contains("is-open")) positionDonationDropdown();
  });
  window.addEventListener(
    "scroll",
    () => {
      if (donationDropdown.classList.contains("is-open")) positionDonationDropdown();
    },
    true
  );

  document.addEventListener("click", (e) => {
    if (!donationDropdown.contains(e.target) && e.target !== donationTrigger) {
      closeDonationDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDonationDropdown();
  });
})();
