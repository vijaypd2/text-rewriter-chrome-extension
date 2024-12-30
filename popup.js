document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("rewrittenText", (data) => {
    document.getElementById("rewrittenText").value =
      data.rewrittenText || "No text available.";
  });

  document.getElementById("copyButton").addEventListener("click", () => {
    const textArea = document.getElementById("rewrittenText");
    textArea.select();
    document.execCommand("copy");
  });

  chrome.storage.local.get("promptTone", (data) => {
    document.getElementById("toneInput").value = data.promptTone || "";
  });

  document.getElementById("saveToneButton").addEventListener("click", () => {
    const toneInput = document.getElementById("toneInput").value;
    chrome.storage.local.set({ promptTone: toneInput }, () => {
      console.log("Prompt tone saved to local storage.");
    });
  });
});
