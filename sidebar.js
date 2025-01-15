console.log('Sidebar script loaded');

document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    const inputArea = document.getElementById('input-area');

    // Function to add a message to the chat interface
    function addMessageToChat(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
    }

    // Function to add an image preview to the input area
    function addImagePreview(imageData) {
        clearPreview();

        const imagePreview = document.createElement('img');
        imagePreview.src = imageData;
        imagePreview.style.maxWidth = '50px';
        imagePreview.style.maxHeight = '50px';
        imagePreview.id = 'image-preview';
        inputArea.insertBefore(imagePreview, messageInput);
    }

    // Function to add a file preview to the input area
    function addFilePreview(fileName) {
        clearPreview();

        const filePreview = document.createElement('div');
        filePreview.textContent = '📎 ' + fileName;
        filePreview.id = 'file-preview';
        inputArea.insertBefore(filePreview, messageInput);
    }

    // Function to clear the preview area
    function clearPreview() {
        const imagePreview = document.getElementById('image-preview');
        const filePreview = document.getElementById('file-preview');

        if (imagePreview) {
            imagePreview.remove();
        }
        if (filePreview) {
            filePreview.remove();
        }
    }

    // Handle pasting items from clipboard
    messageInput.addEventListener('paste', (event) => {
        const items = (event.clipboardData || window.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    addImagePreview(event.target.result);
                };
                reader.readAsDataURL(blob);
            } else {
                const fileName = item.getAsFile() ? item.getAsFile().name : 'file';
                addFilePreview(fileName);
            }
        }
    });

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Message received in sidebar:', request);

        // Handle messages based on their content
        if (request.type === 'addMessage') {
            addMessageToChat(request.message);
        }
    });

    // Clear the preview when the input is cleared
    messageInput.addEventListener('input', () => {
        if (messageInput.value === '') {
            clearPreview();
        }
    });
});
