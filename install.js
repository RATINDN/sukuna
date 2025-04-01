let deferredPrompt;

// ایجاد پیام موفقیت
const successMessage = document.createElement('div');
successMessage.textContent = 'نصب با موفقیت انجام شد';
successMessage.style.cssText = `
  position: fixed;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  transition: top 0.3s ease-in-out;
  z-index: 1000;
  font-family: 'Vazirmatn', sans-serif;
`;
document.body.appendChild(successMessage);

// نمایش پیام موفقیت
function showSuccess() {
  successMessage.style.top = '20px';
  setTimeout(() => successMessage.style.top = '-100px', 3000);
}

// تشخیص پیشرفته وضعیت PWA
function checkPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         navigator.standalone ||
         document.referrer.includes('android-app://') ||
         localStorage.getItem('pwa-installed') === 'true';
}

// به‌روزرسانی دکمه‌ها
function updateButtons() {
  const buttons = document.querySelectorAll('#installButton, #installButton2');
  const isInstalled = checkPWA();
  
  buttons.forEach(btn => {
    btn.style.display = isInstalled ? 'none' : 'flex';
  });
}

// رویدادهای اصلی
window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwa-installed', 'true');
  showSuccess();
  updateButtons();
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  updateButtons();
});

// هندلر نصب
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true');
        showSuccess();
      }
      updateButtons();
    });
  }
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#installButton, #installButton2').forEach(btn => {
    btn.addEventListener('click', installPWA);
  });

  // سیستم نظارت ترکیبی
  const observer = new MutationObserver(updateButtons);
  observer.observe(document.body, { subtree: true, childList: true });
  
  setInterval(() => {
    if (!checkPWA()) localStorage.removeItem('pwa-installed');
    updateButtons();
  }, 1000);
});