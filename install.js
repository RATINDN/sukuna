let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Installation Check
function isPWAInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         navigator.standalone ||
         (window.navigator.standalone !== undefined && window.navigator.standalone);
}

// 2. Detect if the device is iOS
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// 3. Success Popup
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

// 4. Show a guide for iOS users
function showIOSInstallGuide() {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div class="pwa-install-guide" style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2196F3;
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
      animation: slideIn 0.5s ease-out;
      -webkit-font-smoothing: antialiased;
    ">
      <!-- Info Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
      <!-- Message -->
      <span style="flex: 1; text-align: center; font-size: 16px;">
        برای نصب، روی دکمه اشتراک‌گذاری در سافاری ضربه بزنید و "Add to Home Screen" را انتخاب کنید.
      </span>
      <!-- Close Button -->
      <button id="closeGuide" style="
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

  document.body.appendChild(popup);

  // Close button functionality
  const closeButton = popup.querySelector('#closeGuide');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      popup.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => popup.remove(), 300);
    });
  }
}

// 5. Button Visibility Management
function manageInstallButtons() {
  const shouldHide = isPWAInstalled() || (!deferredPrompt && !isIOS());

  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = shouldHide ? 'none' : 'flex';
      btn.style.visibility = shouldHide ? 'hidden' : 'visible';
    }
  });
}

// 6. Installation Flow
function showInstallPrompt() {
  if (isIOS()) {
    showIOSInstallGuide();
    return;
  }

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

// 7. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  showSuccessPopup();
  manageInstallButtons();
});

// 8. Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Setup install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = showInstallPrompt;
  });

  // Initial check
  manageInstallButtons();

  // Periodic checks
  setInterval(manageInstallButtons, 1000);
});