(() => {
  "use strict";

  /* ============================================================
     News cards — auto-scrolling card row (JS animation over a
     duplicated list, paused on hover, supports drag/swipe).
     ============================================================ */

  const NEWS = [
    { title: "Update Patch 2.10.5 Dirilis", tag: "JGVRP · Update" },
    { title: "Event Akhir Pekan: Balap Liar", tag: "JGRP · Event" },
    { title: "Maintenance Server Terjadwal", tag: "Pengumuman" },
    { title: "Rekrutmen Staff Dibuka", tag: "Komunitas" },
    { title: "Perubahan Sistem Ekonomi", tag: "JGVRP · Update" },
    { title: "Turnamen Balap Mingguan", tag: "JGRP · Event" },
    { title: "Kolaborasi Komunitas Baru", tag: "Komunitas" },
    { title: "Giveaway Server Spesial", tag: "Pengumuman" },
  ];

  const track = document.getElementById("newsTrack");

  function buildCard(news, i) {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="news-card-media" style="background:linear-gradient(135deg, hsl(${
        i * 45
      },65%,42%), hsl(${i * 45 + 60},65%,30%))">
        <span class="news-card-badge">JG</span>
        <span class="news-card-play">Baca berita &gt;</span>
      </div>
      <div class="news-card-info">
        <p class="news-card-title">${news.title}</p>
        <p class="news-card-tag">${news.tag}</p>
      </div>
    `;
    return card;
  }

  // render the list twice back-to-back for seamless looping
  [...NEWS, ...NEWS].forEach((news, i) => {
    track.appendChild(buildCard(news, i % NEWS.length));
  });

  // JS-based drag and auto-scroll
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId;
  let isHovered = false;

  function animateTrack() {
    if (!isDragging && !isHovered) {
      currentTranslate -= 0.8; // auto-scroll speed
      checkBounds();
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
    animationId = requestAnimationFrame(animateTrack);
  }

  function checkBounds() {
    const halfWidth = track.scrollWidth / 2;
    // prevent division by zero or NaN issues before layout
    if (!halfWidth) return; 

    if (Math.abs(currentTranslate) >= halfWidth) {
      currentTranslate += halfWidth;
    } else if (currentTranslate > 0) {
      currentTranslate -= halfWidth;
    }
  }

  track.addEventListener('mouseenter', () => isHovered = true);
  track.addEventListener('mouseleave', () => {
    isHovered = false;
    isDragging = false;
  });

  const dragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    prevTranslate = currentTranslate;
    track.style.transition = 'none';
  };

  const dragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    checkBounds();
    track.style.transform = `translateX(${currentTranslate}px)`;
  };

  const dragEnd = () => {
    isDragging = false;
  };

  track.addEventListener('mousedown', dragStart);
  track.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);

  track.addEventListener('touchstart', dragStart, {passive: true});
  track.addEventListener('touchmove', dragMove, {passive: true});
  track.addEventListener('touchend', dragEnd);
  
  // prevent default image/link drag behavior during our custom drag
  track.addEventListener('dragstart', (e) => e.preventDefault());

  // start animation
  animateTrack();
})();
