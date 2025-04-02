// Complete PWA Installation Handler for iOS and Android
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Detect iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// 2. Check if app is installed
function isPWAInstalled() {
  // For iOS
  if (isIOS() && navigator.standalone) return true;
  
  // For Android/Desktop
  return window.matchMedia('(display-mode: standalone)').matches;
}

// 3. Show iOS Installation Instructions
function showIOSInstallInstructions() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: 'Vazirmatn', sans-serif;
      padding: 20px;
      text-align: center;
    ">
      <h2>نصب اپلیکیشن در iOS</h2>
      <ol style="text-align: right; direction: rtl;">
        <li>از نوار پایین صفحه، دکمه "اشتراک گذاری" را انتخاب کنید</li>
        <li>گزینه "Add to Home Screen" را انتخاب نمایید</li>
        <li>در مرحله بعد روی "Add" کلیک کنید</li>
      </ol>
      <button style="
        padding: 10px 20px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        margin-top: 20px;
        font-size: 16px;
      ">متوجه شدم</button>
    </div>
  `;
  
  modal.querySelector('button').onclick = () => modal.remove();
  document.body.appendChild(modal);
}

// 4. Success Popup
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
    ">
      نصب با موفقیت انجام شد!
    </div>
  `;
  
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3000);
}

// 5. Manage install buttons
function manageInstallButtons() {
  const shouldHide = isPWAInstalled();
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = shouldHide ? 'none' : 'flex';
      btn.style.visibility = shouldHide ? 'hidden' : 'visible';
    }
  });
}

// 6. Handle installation
function handleInstallation() {
  if (isIOS()) {
    showIOSInstallInstructions();
  } else if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        showSuccessPopup();
      }
      deferredPrompt = null;
    });
  } else {
    alert('برای نصب، از منوی مرورگر استفاده کنید');
  }
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

// 8. Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Setup install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = handleInstallation;
    }
  });
  
  // Initial check
  manageInstallButtons();
  
  // Check periodically (every 2 seconds)
  setInterval(manageInstallButtons, 2000);
});