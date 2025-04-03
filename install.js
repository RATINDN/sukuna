let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Installation Check
function isPWAInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         navigator.standalone ||
         (window.navigator.standalone !== undefined && window.navigator.standalone);
}

// 2. Success Popup
function showSuccessPopup() {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div class="pwa-install-success" style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      z-index: 1000;
      font-family: 'Vazirmatn', sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 90%;
      width: 400px;
      animation: slideIn 0.5s ease-out, fadeOut 0.5s 2.5s forwards;
      -webkit-font-smoothing: antialiased;
    ">
      <!-- Checkmark Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg>
      <!-- Message -->
      <span style="flex: 1; text-align: center; font-size: 16px;">
        نصب با موفقیت انجام شد!
      </span>
      <!-- Close Button -->
      <button id="closePopup" style="
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0 5px;
      ">
        ✕
      </button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { top: -50px; opacity: 0; }
      to { top: 20px; opacity: 1; }
    }
    @keyframes fadeOut {
      to { opacity: 0; visibility: hidden; }
    }
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .pwa-install-success {
        width: 90%;
        padding: 12px 20px;
        font-size: 14px;
      }
      .pwa-install-success svg {
        width: 20px;
        height: 20px;
      }
    }
    /* iOS-specific adjustments (safe area for notch) */
    @supports (padding-top: env(safe-area-inset-top)) {
      .pwa-install-success {
        padding-top: calc(20px + env(safe-area-inset-top));
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(popup);

  // Close button functionality
  const closeButton = popup.querySelector('#closePopup');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      popup.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => popup.remove(), 300);
    });
  }

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => popup.remove(), 500);
    }
  }, 3000);
}

// 3. Button Visibility Management
function manageInstallButtons() {
  const shouldHide = isPWAInstalled() || !deferredPrompt;

  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = shouldHide ? 'none' : 'flex';
      btn.style.visibility = shouldHide ? 'hidden' : 'visible';
    }
  });
}

// 4. Installation Flow (No Useless Alerts)
function showInstallPrompt() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      showSuccessPopup();
    }
    deferredPrompt = null;
    manageInstallButtons();
  });
}

// 5. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  showSuccessPopup();
  manageInstallButtons();
});

// 6. Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Setup install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = showInstallPrompt;
  });

  // Initial check
  manageInstallButtons();

  // Periodic checks (optional)
  setInterval(manageInstallButtons, 1000);
});