// This script manages the installation prompt for the PWA
let deferredPrompt;

// Listen for the beforeinstallprompt event to show custom install UI
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e; // Save the event for later use

    // Show the custom install banner
    const installBanner = document.getElementById('installBanner');
    if (installBanner) {
        installBanner.style.display = 'block';
    }
});

// Handle the "Install" button click
document.getElementById('installButton').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null; // Clear the saved event
        });
    }
});

// Handle the "Later" button click
document.getElementById('dismissButton').addEventListener('click', () => {
    const installBanner = document.getElementById('installBanner');
    if (installBanner) {
        installBanner.style.display = 'none'; // Hide the banner
    }
});
