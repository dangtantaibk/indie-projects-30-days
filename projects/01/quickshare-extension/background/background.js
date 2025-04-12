// Function to get current tab info
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// Function to check if we can execute scripts on this tab
function canExecuteOnTab(tab) {
  return tab.url && !tab.url.startsWith('chrome://') && 
         !tab.url.startsWith('chrome-extension://') &&
         !tab.url.startsWith('edge://') &&
         !tab.url.startsWith('about:');
}

// Function that will be injected into the page to copy text
function copyTextToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
  
  document.body.removeChild(textarea);
  return success;
}

// Function to copy text using background script fallback
async function copyInBackground(text) {
  // Create a temporary offscreen document
  const offscreenUrl = chrome.runtime.getURL('popup/popup.html');
  try {
    await chrome.offscreen.createDocument({
      url: offscreenUrl,
      reasons: ['CLIPBOARD'],
      justification: 'Write text to clipboard'
    });
    
    return await chrome.offscreen.executeScript({
      func: copyTextToClipboard,
      args: [text]
    });
  } finally {
    await chrome.offscreen.closeDocument();
  }
}

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  // Get current tab info
  const tab = await getCurrentTab();
  if (!tab) return;

  let textToCopy = '';
  
  // Format the text based on command
  switch (command) {
    case 'copy-plain':
      textToCopy = `${tab.title} - ${tab.url}`;
      break;
    case 'copy-markdown':
      textToCopy = `[${tab.title}](${tab.url})`;
      break;
    case 'copy-html':
      textToCopy = `<a href="${tab.url}">${tab.title}</a>`;
      break;
  }

  // Copy the text if we have something to copy
  if (textToCopy) {
    try {
      let success = false;

      if (canExecuteOnTab(tab)) {
        // Try to copy using content script first
        const [{result}] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: copyTextToClipboard,
          args: [textToCopy]
        });
        success = result;
      } else {
        // If we can't inject script, try using the background fallback
        try {
          success = await copyInBackground(textToCopy);
        } catch (err) {
          console.error('Background copy failed:', err);
          success = false;
        }
      }

      // Show success/failure notification
      chrome.action.setBadgeText({ 
        text: success ? '✓' : '❌'
      });
      setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
      }, 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
      chrome.action.setBadgeText({ text: '❌' });
      setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
      }, 1000);
    }
  }
});

// On installation
chrome.runtime.onInstalled.addListener(() => {
  // Set badge background color
  chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
});