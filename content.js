let bubble = null;

// Function to create the bubble
function createBubble() {
  bubble = document.createElement('div');
  bubble.id = 'floating-bubble';
  bubble.style.position = 'fixed';
  bubble.style.bottom = '20px';
  bubble.style.right = '20px';
  bubble.style.width = '50px';
  bubble.style.height = '50px';
  bubble.style.backgroundColor = 'green';
  bubble.style.borderRadius = '50%';
  bubble.style.display = 'flex';
  bubble.style.justifyContent = 'center';
  bubble.style.alignItems = 'center';
  bubble.style.zIndex = '10000';
  bubble.style.cursor = 'pointer';

  // Replace icon with robot emoji
  bubble.innerHTML = '🤖';
  bubble.style.fontSize = '30px';

  bubble.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'addMessage', message: 'New message from bubble!' });
  });

  document.body.appendChild(bubble);
}

// Function to remove the bubble
function removeBubble() {
  if (bubble) {
    document.body.removeChild(bubble);
    bubble = null;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleBubble') {
    if (bubble) {
      removeBubble();
    } else {
      createBubble();
    }
  }
});
