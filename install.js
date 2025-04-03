// Complete PWA Installation Handler with iOS Fix
let deferredPrompt;
const installBtnIds = ['installButton', 'installButton2'];

// 1. Enhanced Installation Detection with iOS Fix
async function isPWAInstalled() {
  // Standard checks
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const localStorageFlag = localStorage.getItem('pwa-installed') === 'true';
  
  // iOS-specific check
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isIOSPWA = window.navigator.standalone;
  
  // Android-specific check
  let isAndroidPWA = false;
  if (window.navigator.getInstalledRelatedApps) {
    try {
      const relatedApps = await window.navigator.getInstalledRelatedApps();
      isAndroidPWA = relatedApps.length > 0;
    } catch (e) {
      console.log('Related apps check failed', e);
    }
  }

  // Special handling for iOS refresh issue
  if (isIOS) {
    if (isIOSPWA) {
      localStorage.setItem('pwa-installed', 'true');
      return true;
    }
    return localStorageFlag;
  }

  return isStandalone || isAndroidPWA || localStorageFlag;
}

// 2. Popup Messages (unchanged)
function showPopup(message, isSuccess = true) {
  /* ... (keep existing popup code) ... */
}

// 3. Button Visibility Management with iOS Fix
async function manageInstallButtons() {
  const installed = await isPWAInstalled();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      // Special case: Don't show install button on iOS if already installed
      const shouldShow = !installed && (deferredPrompt || isIOS);
      
      btn.style.display = shouldShow ? 'flex' : 'none';
      btn.style.visibility = shouldShow ? 'visible' : 'hidden';
      
      // iOS-specific button text
      if (isIOS) {
        btn.textContent = 'برای نصب، از گزینه "اشتراک گذاری" سپس "Add to Home Screen" استفاده کنید';
      }
    }
  });
}

// 4. Installation Flow with iOS Handling
async function showInstallPrompt() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    showPopup('در iOS، لطفاً از منوی اشتراک گذاری استفاده کنید', false);
    return;
  }

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
  await manageInstallButtons();
}

// 5. Event Listeners (with iOS detection)
window.addEventListener('beforeinstallprompt', (e) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return; // Skip on iOS
  
  e.preventDefault();
  deferredPrompt = e;
  manageInstallButtons();
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwa-installed', 'true');
  showPopup('اپلیکیشن با موفقیت نصب شد!');
  manageInstallButtons();
});

// 6. Initialization with iOS Special Handling
document.addEventListener('DOMContentLoaded', async () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Setup install buttons
  installBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = showInstallPrompt;
      btn.style.transition = 'all 0.3s ease';
      
      if (isIOS) {
        btn.style.display = 'flex'; // Always show on iOS with instructions
      }
    }
  });

  // Initial check
  await manageInstallButtons();
  
  // More frequent checks for iOS
  const checkInterval = setInterval(manageInstallButtons, isIOS ? 1000 : 2000);
  
  // Clear flag if uninstalled
  window.addEventListener('beforeunload', () => {
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.removeItem('pwa-installed');
    }
  });
});

// Service Worker Communication (unchanged)
if ('serviceWorker' in navigator) {
  /* ... (keep existing service worker code) ... */
}