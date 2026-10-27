const giftButton = document.getElementById("giftButton");
const tapHint = document.getElementById("tapHint");
const floatingHearts = document.getElementById("floatingHearts");
const heartButton = document.getElementById("heartButton");
const toast = document.getElementById("toast");
const musicButton = document.getElementById("musicButton");
const birthdaySong = document.getElementById("birthdaySong");

if (giftButton) {
  giftButton.addEventListener("click", () => {
    giftButton.classList.add("opened");
    giftButton.disabled = true;
    tapHint.textContent = "Opening your surprise...";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      window.location.assign("surprise.html");
      return;
    }

    setTimeout(() => {
      document.body.classList.add("leaving");
      setTimeout(() => window.location.assign("surprise.html"), 500);
    }, 1500);
  });
}

if (heartButton) {
  heartButton.addEventListener("click", () => {
    burstHearts(28);
    showToast("Sending Lang a whole lot of love. 💗");
  });
}

if (musicButton) {
  musicButton.addEventListener("click", async () => {
    if (birthdaySong.paused) {
      try {
        await birthdaySong.play();
        musicButton.textContent = "♫ Pause our song";
        musicButton.setAttribute("aria-pressed", "true");
      } catch (error) {
        showToast("Add your song as music/our-song.mp3 first. ♡");
      }
    } else {
      birthdaySong.pause();
      musicButton.textContent = "♫ Play our song";
      musicButton.setAttribute("aria-pressed", "false");
    }
  });
}

function burstHearts(amount) {
  if (!floatingHearts) return;

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.35 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 22}px`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    floatingHearts.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// A few subtle hearts appear when the page first loads.
window.addEventListener("load", () => {
  if (floatingHearts) setTimeout(() => burstHearts(8), 700);
});
