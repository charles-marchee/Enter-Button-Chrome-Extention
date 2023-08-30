document.addEventListener('DOMContentLoaded', function() {
  // Get references to the toggle switches
  const enterToggle = document.getElementById('enterToggle');
  const autoToggle = document.getElementById('autoToggle');

  // Load initial states from storage
  chrome.storage.sync.get(['enterToggleState', 'autoToggleState'], function(result) {
      enterToggle.checked = result.enterToggleState || false;
      autoToggle.checked = result.autoToggleState || false;
  });

  // Add event listeners to save toggle states when changed
  enterToggle.addEventListener('change', function() {
      const state = enterToggle.checked;
      chrome.storage.sync.set({ 'enterToggleState': state });

      // Display a modern blue notification message
      showNotification('Settings updated. Please reload the page.');
  });

  autoToggle.addEventListener('change', function() {
      const state = autoToggle.checked;
      chrome.storage.sync.set({ 'autoToggleState': state });

      // Display a modern blue notification message
      showNotification('Settings updated. Please reload the page.');
  });
});

// Variable to keep track of the active notification
let activeNotification = null;

// Function to display a modern blue notification
function showNotification(message) {
  // Clear any existing notification
  clearNotification();

  // Create the new notification
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;

  // Apply blue color and other modern styles
  notification.style.backgroundColor = '#2196F3';
  notification.style.color = 'white';
  notification.style.borderRadius = '4px';
  notification.style.padding = '10px';
  notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  notification.style.zIndex = '9999';

  // Append the notification to the body
  document.body.appendChild(notification);

  // Set the active notification
  activeNotification = notification;

  // Automatically remove the notification after a short delay (e.g., 3 seconds)
  setTimeout(function() {
      clearNotification();
  }, 5000); // Adjust the delay as needed
}

// Function to clear the active notification
function clearNotification() {
  if (activeNotification) {
      document.body.removeChild(activeNotification);
      activeNotification = null;
  }
}