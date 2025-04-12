document.addEventListener('DOMContentLoaded', () => {
  const copyPlainBtn = document.getElementById('copyPlain');
  const copyMarkdownBtn = document.getElementById('copyMarkdown');
  const copyHTMLBtn = document.getElementById('copyHTML');
  const messageEl = document.getElementById('message');

  const getCurrentTab = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab;
    } catch (error) {
      showError('Could not access current tab');
      return null;
    }
  };

  const showMessage = (text, isError = false) => {
    messageEl.textContent = text;
    messageEl.style.color = isError ? '#f44336' : '#4CAF50';
    messageEl.classList.add('show');
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 2000);
  };

  const showError = (text) => showMessage(text, true);

  const addSuccessAnimation = (button) => {
    button.classList.add('success');
    setTimeout(() => button.classList.remove('success'), 500);
  };

  const copyToClipboard = async (text, button, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      addSuccessAnimation(button);
      showMessage(successMessage);
    } catch (error) {
      showError('Failed to copy to clipboard');
    }
  };

  const copyHandlers = {
    plain: async (button) => {
      const tab = await getCurrentTab();
      if (!tab) return;
      const text = `${tab.title} - ${tab.url}`;
      await copyToClipboard(text, button, 'Copied as text!');
    },

    markdown: async (button) => {
      const tab = await getCurrentTab();
      if (!tab) return;
      const markdown = `[${tab.title}](${tab.url})`;
      await copyToClipboard(markdown, button, 'Copied as markdown!');
    },

    html: async (button) => {
      const tab = await getCurrentTab();
      if (!tab) return;
      const html = `<a href="${tab.url}">${tab.title}</a>`;
      await copyToClipboard(html, button, 'Copied as HTML!');
    }
  };

  // Add click event listeners
  copyPlainBtn.addEventListener('click', () => copyHandlers.plain(copyPlainBtn));
  copyMarkdownBtn.addEventListener('click', () => copyHandlers.markdown(copyMarkdownBtn));
  copyHTMLBtn.addEventListener('click', () => copyHandlers.html(copyHTMLBtn));

  // Listen for keyboard shortcuts from background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'copy-plain') {
      copyHandlers.plain(copyPlainBtn);
    } else if (message.action === 'copy-markdown') {
      copyHandlers.markdown(copyMarkdownBtn);
    } else if (message.action === 'copy-html') {
      copyHandlers.html(copyHTMLBtn);
    }
  });
});