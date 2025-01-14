document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', async () => {
    const currentWindow = await chrome.windows.getCurrent();
    chrome.sidePanel.open({ windowId: currentWindow.id });
  });
});
