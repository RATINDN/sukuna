// PWA Installation Handler - Complete Solution
let deferredPrompt;
let isPWA = false;
const installButtons = ['installButton', 'installButton2'];
let displayMode = 'browser';

// Advanced PWA Detection
function checkPWAStatus() {
  // Cross-platform detection
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isiOSPWA = navigator.standalone;
  const isChromePWA = window.navigator.getInstalledRelatedApps 
    ? window.navigator.getInstalledRelatedApps().then(apps => apps.length > 0)
    : false;

  return isStandalone || isiOSPWA || isChromePWA;
}

// Display Mode Detection
function detectDisplayMode() {
  displayMode = window.matchMedia('(display-mode: standalone)').matches 
    ? 'standalone' 
    : 'browser';
  
  // iOS specific detection
  if(navigator.standalone) displayMode = 'standalone';
  
  return displayMode;
}

// Monitor Display Changes
function monitorDisplayChanges() {
  // Window resize tracking
  window.addEventListener('resize', checkPWAStatus);
  
  // Page visibility tracking
  document.addEventListener('visibilitychange', () => {
    if(document.visibilityState === 'visible') checkPWAStatus();
  });
  
  // Chrome-specific tracking
  window.matchMedia('(display-mode: standalone)').addListener((e) => {
    displayMode = e.matches ? 'standalone' : 'browser';
    manageInstallButtons();
  });
}

// URL Parameter Check
function checkURLParams() {
  const params = new URLSearchParams(window.location.search);
  if(params.has('pwa')) {
    manageInstallButtons();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Show Success Message
function showSuccessMessage() {
  const msg = document.createElement('div');
  msg.textContent = 'نصب با موفقیت انجام شد';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 25px',
    borderRadius: '5px',
    zIndex: '1000',
    fontFamily: "'Vazirmatn', sans-serif",
    transition: 'top 0.3s ease-in-out'
  });

  document.body.appendChild(msg);
  setTimeout(() => {
    msg.style.top = '-100px';
    setTimeout(() => msg.remove(), 300);
  }, 3000);
}

// Handle Installation
function handleInstall() {
  if(deferredPrompt) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if(isMobile) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        if(choice.outcome === 'accepted') {
          showSuccessMessage();
          window.location.search += '&pwa=true';
        }
        deferredPrompt = null;
      });
    } else {
      // Desktop behavior
      alert('برای نصب اپلیکیشن، در مرورگر خود از گزینه "Install" یا "Add to Home Screen" استفاده کنید');
    }
  }
}

// Manage Install Buttons
function manageInstallButtons() {
  detectDisplayMode();
  
  installButtons.forEach(id => {
    const btn = document.getElementById(id);
    if(!btn) return;
    
    // Apply styles directly
    btn.style.display = displayMode === 'standalone' ? 'none' : 'flex';
    btn.style.visibility = displayMode === 'standalone' ? 'hidden' : 'visible';
    btn.style.opacity = displayMode === 'standalone' ? '0' : '1';
    btn.style.pointerEvents = displayMode === 'standalone' ? 'none' : 'all';
    btn.style.transition = 'all 0.3s ease';
    
    // Remove completely from DOM in PWA mode
    if(displayMode === 'standalone' && btn.parentNode) {
      btn.parentNode.removeChild(btn);
    }
  });
}

// Initialize Everything
function initPWAHandlers() {
  // Set up event listeners
  installButtons.forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', handleInstall);
  });

  // Set up monitoring
  monitorDisplayChanges();
  checkURLParams();
  
  // Initial check
  manageInstallButtons();
  
  // Periodic checks
  setInterval(manageInstallButtons, 1000);
  
  // Mutation observer for dynamic content
  new MutationObserver(manageInstallButtons).observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Event Listeners
window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  isPWA = true;
  manageInstallButtons();
  setTimeout(() => window.location.reload(), 500);
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', initPWAHandlers);

// Final check after everything loads
window.addEventListener('load', () => {
  setTimeout(manageInstallButtons, 3000);
});