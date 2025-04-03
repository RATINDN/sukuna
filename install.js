// Complete PWA Installation Handler with Popups
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Enhanced Installation Detection
async function isPWAInstalled() {
  // Check all possible installation indicators
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOS = navigator.standalone;
  const localStorageFlag = localStorage.getItem('pwa-installed') === 'true';
  
  // Special check for Android
  let isAndroidPWA = false;
  if (window.navigator.getInstalledRelatedApps) {
    try {
      const relatedApps = await window.navigator.getInstalledRelatedApps();
      isAndroidPWA = relatedApps.length > 0;
    } catch (e) {
      console.log('Related apps check failed', e);
    }
  }

  return isStandalone || isIOS || isAndroidPWA || localStorageFlag;
}

// 2. Beautiful Popup Messages
function showPopup(message, isSuccess = true) {
  // Remove existing popups
  document.querySelectorAll('.pwa-popup').forEach(el => el.remove());
  
  const popup = document.createElement('div');
  popup.className = 'pwa-popup';
  popup.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${isSuccess ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      z-index: 1000;
      font-family: 'Vazirmatn', sans-serif;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      animation: slideIn 0.5s, fadeOut 0.5s 3s forwards;
    ">
      ${message}
    </div>
  `;
  
  // Add animations only once
  if (!document.getElementById('pwa-popup-styles')) {
    const style = document.createElement('style');
    style.id = 'pwa-popup-styles';
    style.textContent = `
      @keyframes slideIn {
        from { top: -50px; opacity: 0; }
        to { top: 20px; opacity: 1; }
      }
      @keyframes fadeOut {
        to { opacity: 0; visibility: hidden; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(popup);
  
  // Auto-remove after animation
  setTimeout(() => {
    popup.remove();
  }, 3500);
}

// 3. Button Visibility Management
async function manageInstallButtons() {
  const installed = await isPWAInstalled();
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      const shouldShow = !installed && deferredPrompt;
      btn.style.display = shouldShow ? 'flex' : 'none';
      btn.style.visibility = shouldShow ? 'visible' : 'hidden';
    }
  });
}

// 4. Installation Flow
async function showInstallPrompt() {
  if (!deferredPrompt) {
    showPopup('امکان نصب در این مرورگر وجود ندارد', false);
    return;
  }

  try {
    const result = await deferredPrompt.prompt();
    if (result.outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true');
      showPopup('نصب با موفقیت انجام شد!');
    } else {
      showPopup('نصب لغو شد', false);
    }
  } catch (error) {
    showPopup('خطا در هنگام نصب', false);
    console.error('Install error:', error);
  }
  
  deferredPrompt = null;
  manageInstallButtons();
}

// 5. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwa-installed', 'true');
  showPopup('اپلیکیشن با موفقیت نصب شد!');
  manageInstallButtons();
});

// 6. Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // Setup install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = showInstallPrompt;
      btn.style.transition = 'all 0.3s ease';
    }
  });

  // Initial check
  await manageInstallButtons();
  
  // Periodic checks (every 2 seconds)
  setInterval(manageInstallButtons, 2000);
  
  // Clear flag if uninstalled
  window.addEventListener('beforeunload', () => {
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.removeItem('pwa-installed');
    }
  });
});

// Service Worker Communication
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data === 'update-pwa-status') {
      manageInstallButtons();
    }
  });
}