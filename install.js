// Custom PWA Installation Handler
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2']; // Your button IDs

// 1. Check if app is already installed
function isPWAInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         navigator.standalone ||
         (window.navigator.standalone !== undefined && window.navigator.standalone);
}

// 2. Manage install buttons visibility
function manageInstallButtons() {
  const shouldHide = isPWAInstalled();
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      // Completely remove from DOM if installed
      if (shouldHide) {
        btn.remove();
      } else {
        btn.style.display = 'flex';
        btn.style.visibility = 'visible';
      }
    }
  });
}

// 3. Custom install prompt
function showCustomInstallPrompt() {
  // Your custom UI implementation here
  const confirmed = confirm('نصب اپلیکیشن روی صفحه اصلی؟');
  if (confirmed && deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted install');
        // Hide buttons immediately
        manageInstallButtons();
      }
      deferredPrompt = null;
    });
  }
}

// 4. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show your custom install UI instead of browser's
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = 'flex';
      btn.onclick = showCustomInstallPrompt;
    }
  });
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  manageInstallButtons();
});

// 5. Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set up your install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = showCustomInstallPrompt;
    }
  });
  
  // Initial check
  manageInstallButtons();
  
  // Periodic checks (optional)
  setInterval(manageInstallButtons, 1000);
});