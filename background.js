const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

const buildApiUrl = (apiKey) => {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
};

const buildRequestData = (text) => {
  return {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `I am a software engineer. Please rewrite the following text to correct all grammar and typographical errors while keeping the overall tone of the input. Ensure the rewritten version is clear, concise, and engaging, with no more than a 15% increase in length compared to the input:"${text}"`,
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
    title: "Rewrite Selected Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "rewriteText" && info.selectionText) {
    const rewrittenText = await generateContent(info.selectionText);

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

async function generateContent(text) {
  try {
    // Retrieve the API key using Promise
    const apiKey = await getApiKeyFromStorage();
    console.log(`here: ${apiKey}`);

    if (!apiKey) {
      console.log("API key not found");
      return;
    }

    const response = await fetch(buildApiUrl(apiKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildRequestData(text)),
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
