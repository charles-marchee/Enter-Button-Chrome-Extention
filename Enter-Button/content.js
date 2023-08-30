enterToggle = false;
autoToggle = false;

// Load initial states from storage
chrome.storage.sync.get(['enterToggleState', 'autoToggleState'], function(result) {
  enterToggle = result.enterToggleState;
  autoToggle = result.autoToggleState;
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && enterToggle == true && autoToggle != true) {
    event.preventDefault(); // Prevent the default Enter key behavior
    enterforbutton();
  }
  if (autoToggle == true && enterToggle != true) {
    event.preventDefault(); // Prevent the default Enter key behavior
    enterButtonAuto();
  }
});

function enterforbutton() {
  const sendButton = document.querySelector('button.btn.btn-primary[tabindex="2"]');
      if (sendButton && !sendButton.disabled) {
        sendButton.click();
}};

function enterButtonAuto() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const sendButton = document.querySelector('button.btn.btn-primary[tabindex="2"]');
      if (sendButton && !sendButton.disabled) {
        sendButton.click();
      }
    });
  });

  const observerConfig = { attributes: true, childList: true, subtree: true };

  observer.observe(document.body, observerConfig);
}

