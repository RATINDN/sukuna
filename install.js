let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('Install prompt is ready!');
  
  // Get both buttons
  const installButton = document.getElementById('installButton');
  const installButton2 = document.getElementById('installButton2');
  
  // Add click event listener to both buttons if they exist
  if (installButton) {
    installButton.style.display = 'flex';
    installButton.addEventListener('click', handleInstallClick);
  }
  
  if (installButton2) {
    installButton2.style.display = 'flex';
    installButton2.addEventListener('click', handleInstallClick);
  }
});

// Common click handler for both buttons
function handleInstallClick() {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
}