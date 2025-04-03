// Custom PWA Installation Handler with Success Popup
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Check if app is already installed
function isPWAInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         navigator.standalone ||
         (window.navigator.standalone !== undefined && window.navigator.standalone);
}

// 2. Success Popup Function
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
  
  // Add animation styles
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
  
  // Remove after animation completes
  setTimeout(() => {
    popup.remove();
    style.remove();
  }, 3000);
}

// 3. Manage install buttons visibility
function manageInstallButtons() {
  const shouldHide = isPWAInstalled();
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (shouldHide) {
        btn.style.display = 'none';
        btn.style.visibility = 'hidden';
      } else {
        btn.style.display = 'flex';
        btn.style.visibility = 'visible';
      }
    }
  });
}

// 4. Detect if the device is iOS
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream;
}

// 5. Show iOS installation guideline modal
function showIosInstallModal() {
  const modal = document.getElementById('iosInstallModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

// 6. Close iOS installation guideline modal
function closeIosInstallModal() {
  const modal = document.getElementById('iosInstallModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 7. Custom install prompt
function showCustomInstallPrompt() {
  // Check if the device is iOS
  if (isIOS()) {
    // Show the iOS installation guideline modal
    showIosInstallModal();
  } else if (deferredPrompt) {
    // For non-iOS devices, directly trigger the installation prompt
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        showSuccessPopup();
        manageInstallButtons();
      }
      deferredPrompt = null;
    });
  }
}

// 8. Event Listeners
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show your install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = 'flex';
      btn.onclick = showCustomInstallPrompt;
    }
  });
});

window.addEventListener('appinstalled', () => {
  showSuccessPopup();
  manageInstallButtons();
});

// 9. Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set up your install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = showCustomInstallPrompt;
    }
  });
  
  // Set up the close button for the iOS modal
  const closeIosModalBtn = document.getElementById('closeIosModal');
  if (closeIosModalBtn) {
    closeIosModalBtn.onclick = closeIosInstallModal;
  }
  
  // Initial check
  manageInstallButtons();
});