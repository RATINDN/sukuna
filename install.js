// Smart PWA Installation Handler
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Real-time Installation Check
async function isPWAInstalled() {
  // Check multiple indicators
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (navigator.standalone) return true;
  
  // Modern Android detection
  if (window.navigator.getInstalledRelatedApps) {
    const apps = await window.navigator.getInstalledRelatedApps();
    return apps.length > 0;
  }
  
  return false;
}

// 2. Dynamic Button Management
async function manageInstallButtons() {
  const installed = await isPWAInstalled();
  const showButtons = !installed && deferredPrompt;
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = showButtons ? 'flex' : 'none';
      btn.style.visibility = showButtons ? 'visible' : 'hidden';
    }
  });
}

// 3. Installation Flow
async function showInstallPrompt() {
  if (!deferredPrompt) return;
  
  try {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      showSuccessPopup();
    }
  } finally {
    deferredPrompt = null;
    manageInstallButtons();
  }
}

// 4. Enhanced Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  showSuccessPopup();
  manageInstallButtons();
});

// 5. Advanced Monitoring
let lastKnownState = null;

async function checkPWAState() {
  const currentState = await isPWAInstalled();
  
  // Only update if state changed
  if (currentState !== lastKnownState) {
    lastKnownState = currentState;
    manageInstallButtons();
  }
}

// 6. Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Setup buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = showInstallPrompt;
  });

  // Real-time monitoring (every 2 seconds)
  setInterval(checkPWAState, 2000);
  
  // Initial check
  checkPWAState();
});