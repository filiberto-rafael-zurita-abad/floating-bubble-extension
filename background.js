chrome.action.onClicked.addListener(async (tab) => {
  const state = await chrome.storage.local.get('bubbleVisible');
  const isVisible = state.bubbleVisible ?? false;
  await chrome.storage.local.set({ bubbleVisible: !isVisible });
});
