const buildApiUrl = (apiKey) => {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
};

const buildRequestData = (text, tone) => {
  if (!tone || tone === "") {
    tone = "Keep the tone technical.";
  }
  return {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `I am a software engineer. Please rewrite the following text to correct all grammar and typographical errors while keeping the overall tone consistent with the tone described below. Ensure the rewritten version is clear, concise, and engaging, with no more than a 15% increase in length compared to the input.
            Tone: "${tone}" Text to Rewrite: "${text}" Note: The rewritten text should adhere strictly to the specified tone.`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  };
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rewriteText",
    title: "Rewrite selected text using T(re)",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  await removeFromLocalStorage("rewrittenText");
  if (info.menuItemId === "rewriteText" && info.selectionText) {
    const savedTone = await getFromLocalStorage("promptTone");
    const rewrittenText = await generateContent(info.selectionText, savedTone);

    chrome.storage.local.set({ rewrittenText }, () => {
      console.log("Rewritten text saved to local storage.");
    });
    chrome.action.openPopup();
  }
});

function getApiKeyFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("geminiApiKey", (data) => {
      if (chrome.runtime.lastError) {
        reject(new Error("Error retrieving API key from storage"));
      } else {
        resolve(data.geminiApiKey);
      }
    });
  });
}

async function generateContent(text, tone) {
  try {
    // Retrieve the API key using Promise
    const apiKey = await getApiKeyFromStorage();

    if (!apiKey) {
      console.log("API key not found");
      return;
    }

    const response = await fetch(buildApiUrl(apiKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildRequestData(text, tone)),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text).rewritten_text;
  } catch (error) {
    console.error(error);
    console.error("Error generating content:", error);
  }
}

function removeFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

function getFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(data[key]);
      }
    });
  });
}
