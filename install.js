// Clean PWA Installation Handler (No Useless Alerts)
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
    <div style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4CAF50;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      z-index: 1000;
      font-family: 'Vazirmatn', sans-serif;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      animation: slideIn 0.5s, fadeOut 0.5s 2.5s forwards;
    ">
      نصب با موفقیت انجام شد!
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
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
    style.remove();
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