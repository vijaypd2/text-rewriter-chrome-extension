document.getElementById('saveButton').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (apiKey) {
      // Save the API key to Chrome's storage
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        alert('API Key saved successfully!');
      });
    } else {
      alert('Please enter a valid API key.');
    }
  });
  