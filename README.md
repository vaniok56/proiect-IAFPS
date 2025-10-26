# Text Syllabification and Transliteration Web Application

A single-page web application that performs syllabification and transliteration on text content.

## Features

- **Syllabify**: Separates text into syllables using Spanish syllabification rules
- **Transliterate**: Converts special characters to their Latin equivalents using comprehensive replacement rules
- **Undo (Ctrl+Z)**: Revert to previous text states with full history support
- **Auto-load**: Automatically loads content from `lyrics.txt` on page load
- **Visual Feedback**: Modern UI with animations and status indicators

## How to Use

### Option 1: Local HTTP Server (Recommended)

1. Open a terminal in the project directory
2. Start a local server:
   ```bash
   python3 -m http.server 8080
   ```
   Or for Python 2:
   ```bash
   python -m SimpleHTTPServer 8080
   ```
3. Open your browser and navigate to: `http://localhost:8080/index.html`

### Option 2: Direct File Opening

Simply open `index.html` in your web browser. Note: Some browsers may restrict file loading for security reasons.

## Workflow

1. **Load the page**: The application automatically loads lyrics from `lyrics.txt`
2. **Click "Syllabify"**: This processes the text and separates it into syllables
   - The "Transliterate" button becomes enabled after this step
3. **Click "Transliterate"**: This converts special characters using replacement rules
4. **Use "Undo"**: Revert any changes (or press Ctrl+Z / Cmd+Z)

## File Structure

```
├── index.html              # Main HTML structure
├── script_example.js       # Application logic
├── syllable-separator.js   # Syllabification library
├── replacements.js         # Character replacement mappings
├── lyrics.txt             # Initial text content
└── README.md              # This file
```

## Technical Details

### Syllabification
- Uses the `Separator` function from `syllable-separator.js`
- Implements Spanish syllabification rules
- Handles complex vowel and consonant groups

### Transliteration
- Character-by-character replacement
- Supports multiple character sets:
  - Latin extended characters
  - Greek alphabet
  - Cyrillic alphabet
  - Arabic script
  - And many more (2000+ replacement rules)

### Undo Functionality
- Maintains a history stack of up to 50 states
- Keyboard shortcut: Ctrl+Z (Cmd+Z on Mac)
- Visual feedback on undo operations

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires a modern browser with ES6 support.

## Customization

### Changing Initial Text
Edit `lyrics.txt` to change the text that loads on startup.

### Modifying Replacement Rules
Edit `replacements.js` to add, remove, or modify character replacements.

### Styling
All CSS is inline in `index.html` for easy customization.

## Troubleshooting

**Issue**: Lyrics don't load
- **Solution**: Ensure `lyrics.txt` is in the same directory and you're using an HTTP server

**Issue**: Transliterate button stays disabled
- **Solution**: You must click "Syllabify" first before transliteration is available

**Issue**: Undo doesn't work
- **Solution**: Make sure you've performed at least one operation (syllabify or transliterate)

## License

This project uses the syllable-separator.js library which may have its own license terms.

## Credits

- Syllable separation: Based on Spanish syllabification rules
- Character mappings: Comprehensive transliteration database
