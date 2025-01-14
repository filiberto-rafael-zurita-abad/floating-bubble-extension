console.log("Sidebar script loaded");

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in sidebar:", request);

  // Handle messages based on their content
  if (request.type === 'addMessage') {
    addMessageToChat(request.message);
  }
});

// Function to add a message to the chat interface
function addMessageToChat(message) {
  const messagesContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
}
