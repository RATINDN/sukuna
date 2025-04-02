// Reliable PWA Installation Handler
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Enhanced Installation Check
function isPWAInstalled() {
  // Check all possible installation indicators
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone ||
    (window.navigator.getInstalledRelatedApps && 
      window.navigator.getInstalledRelatedApps().then(apps => apps.length > 0)) ||
    localStorage.getItem('pwa-installed') === 'true'
  );
}

// 2. Button Management
function manageInstallButtons() {
  const shouldHide = isPWAInstalled();
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (shouldHide) {
        btn.style.display = 'none';
        btn.style.visibility = 'hidden';
      } else {
        btn.style.display = deferredPrompt ? 'flex' : 'none';
        btn.style.visibility = deferredPrompt ? 'visible' : 'hidden';
      }
    }
  });
}

// 3. Installation Flow
function showInstallPrompt() {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true'); // Persistent flag
      showSuccessPopup();
    }
    deferredPrompt = null;
    manageInstallButtons();
  });
}

// 4. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwa-installed', 'true'); // Android needs this
  showSuccessPopup();
  manageInstallButtons();
});

// 5. Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Setup buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = showInstallPrompt;
  });
  
  // Check every second (for Android quirks)
  setInterval(manageInstallButtons, 1000);
  
  // Clear flag if uninstalled (for debugging)
  window.addEventListener('beforeunload', () => {
    if (!isPWAInstalled()) {
      localStorage.removeItem('pwa-installed');
    }
  });
});