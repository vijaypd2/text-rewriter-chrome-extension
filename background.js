const apiKey = ""; // Replace with your actual API key
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

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
  }

}


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rewriteText",
    title: "Rewrite Selected Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "rewriteText" && info.selectionText) {
    // Call Gemini API with selected text
    // const rewrittenText = await callGeminiAPI(info.selectionText);
    // await callGeminiAPI(info.selectionText);
    const rewrittenText = await generateContent(info.selectionText);
    // const rewrittenText = info.selectionText;
    chrome.storage.local.set({ rewrittenText }, () => {
      console.log("Rewritten text saved to local storage.");
    });
    chrome.action.openPopup();

    // Send the rewritten text to content script for popup
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   func: displayPopup,
    //   args: [rewrittenText]
    // });
  }
});

async function generateContent(text) { 
  try {
    const response = await fetch(apiUrl, {
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

// Function to call Gemini API
// async function callGeminiAPI(text) {
//   const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Replace with actual API URL
//   const response = await fetch(apiUrl, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   const data = await response.json();
//   console.log(data);
//   return data.rewrittenText; // Replace with actual API response structure
// }

// Function to display popup
// function displayPopup(text) {
//   alert(`Rewritten Text: ${text}`);
// }
