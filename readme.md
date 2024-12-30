# Chrome Extension: Rewrite Text with Gemini API

This Chrome extension allows users to rewrite selected text on a webpage using the Gemini API. It's a simple yet powerful tool designed to help users generate improved or rewritten versions of text directly from the browser.

---

## Features

- **Select and Rewrite**: Highlight text on any webpage, right-click, and select the extension from the context menu to rewrite the text using the Gemini API.
- **Custom API Key**: Add and manage your Gemini API key directly from the extension popup.
- **Popup Display**: View the rewritten text in a styled popup and copy it to your clipboard with one click.
- **Persistent Storage**: The rewritten text is temporarily stored in Chrome's local storage for easy access during the session.

---

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click on **Load unpacked** and select the cloned repository folder.
5. The extension will now appear in your extensions list.

---

## How to Use

1. **Set Your API Key**:
   - Click on the extension icon in the toolbar.
   - Enter your Gemini API key in the input field and save it.

2. **Rewrite Text**:
   - Highlight text on any webpage.
   - Right-click and choose the `Rewrite with Gemini` option from the context menu.

3. **View Rewritten Text**:
   - The rewritten text will appear in the extension popup.
   - Copy the rewritten text to your clipboard and paste it wherever you need.

---

## Example Workflow

1. **Before**:
   - Original text: "The quick brown fox jumps over the lazy dog."

2. **After**:
   - Rewritten text: "A speedy brown fox leaps gracefully over a sluggish dog."

### Screenshots

1. **Highlight and Rewrite**:
   ![Highlight Text](./screenshots/highlight.png)

2. **Popup Display**:
   ![Popup Display](./screenshots/popup.png)

3. **API Key Setup**:
   ![API Key Setup](./screenshots/apikey.png)

---

## Folder Structure

```
📁 root
├── manifest.json       # Chrome extension manifest
├── background.js       # Background script for context menu and storage handling
├── content.js          # Content script for interaction with web pages
├── popup.html          # Popup interface HTML
├── popup.js            # Popup script for managing UI interactions
├── styles.css          # Styling for the popup
├── README.md           # Project documentation (this file)
└── screenshots/        # Placeholder for screenshots
```

---

## Technologies Used

- **Chrome Extensions API**: For building browser functionality.
- **JavaScript (ES6)**: For dynamic functionality.
- **HTML & CSS**: For UI and styling.
- **Gemini API**: For text rewriting capabilities.

---

## Contribution

Contributions are welcome! If you have suggestions, bug reports, or new feature ideas, feel free to open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

For any questions or support, please feel free to contact:

- **Name**: [Your Name]
- **Email**: [Your Email]
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

Enjoy rewriting text seamlessly with this Chrome extension!

