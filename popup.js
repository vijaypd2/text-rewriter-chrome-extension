document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("rewrittenText", (data) => {
      document.getElementById("rewrittenText").value = data.rewrittenText || "No text available.";
    });
  
    document.getElementById("copyButton").addEventListener("click", () => {
      const textArea = document.getElementById("rewrittenText");
      textArea.select();
      document.execCommand("copy");
      alert("Copied to clipboard!");
    });
  });
  