// Main Application Logic
(function() {
    'use strict';

    // State management
    let history = [];
    let hasSyllabified = false;

    // DOM elements
    const textArea = document.getElementById('textArea');
    const syllabifyBtn = document.getElementById('syllabifyBtn');
    const transliterateBtn = document.getElementById('transliterateBtn');
    const undoBtn = document.getElementById('undoBtn');
    const charCount = document.getElementById('charCount');
    const statusContainer = document.getElementById('statusContainer');

    // Initialize the app
    function init() {
        loadLyrics();
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.textContent = isLight ? '☀️' : '🌙';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // Event listeners
        syllabifyBtn.addEventListener('click', handleSyllabify);
        transliterateBtn.addEventListener('click', handleTransliterate);
        undoBtn.addEventListener('click', handleUndo);
        
        // Keyboard shortcut for undo (Ctrl+Z or Cmd+Z)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                handleUndo();
            }
        });
        
        // Update character count on input
        textArea.addEventListener('input', () => {
            if (charCountElement) {
                charCountElement.textContent = `${textArea.value.length} characters`;
            }
        });
    }

    // Load lyrics from lyrics.txt file
    function loadLyrics() {
        fetch('lyrics.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load lyrics.txt');
                }
                return response.text();
            })
            .then(text => {
                textArea.value = text;
                updateCharCount();
                saveToHistory(text);
                showStatus('Lyrics loaded successfully!', 'success');
            })
            .catch(error => {
                console.error('Error loading lyrics:', error);
                textArea.value = 'Error loading lyrics.txt. Please ensure the file exists in the same directory.';
                showStatus('Failed to load lyrics.txt', 'warning');
            });
    }

    // Handle Syllabify button click
    function handleSyllabify() {
        const currentText = textArea.value;
        
        if (!currentText.trim()) {
            showStatus('Please enter some text first!', 'warning');
            return;
        }

        try {
            // Use the Separator function from syllable-separator.js
            const syllabified = Separator(currentText);
            
            saveToHistory(textArea.value);
            textArea.value = syllabified;
            updateCharCount();
            
            hasSyllabified = true;
            transliterateBtn.disabled = false;
            
            showStatus('Text syllabified successfully!', 'success');
            
            // Add visual feedback
            syllabifyBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                syllabifyBtn.style.transform = '';
            }, 150);
        } catch (error) {
            console.error('Syllabification error:', error);
            showStatus('Error during syllabification!', 'warning');
        }
    }

    // Handle Transliterate button click
    function handleTransliterate() {
        const currentText = textArea.value;
        
        if (!currentText.trim()) {
            showStatus('Please enter some text first!', 'warning');
            return;
        }

        if (!hasSyllabified) {
            showStatus('Please syllabify the text first!', 'warning');
            return;
        }

        try {
            // Apply character replacements
            const transliterated = applyReplacements(currentText);
            
            saveToHistory(textArea.value);
            textArea.value = transliterated;
            updateCharCount();
            
            showStatus('Text transliterated successfully!', 'success');
            
            // Add visual feedback
            transliterateBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                transliterateBtn.style.transform = '';
            }, 150);
        } catch (error) {
            console.error('Transliteration error:', error);
            showStatus('Error during transliteration!', 'warning');
        }
    }

    // Apply character replacements from replacements.js
    function applyReplacements(text) {
        let result = text;
        
        // Iterate through all replacement rules
        for (const [from, to] of replacements) {
            // Use global replace to replace all occurrences
            result = result.split(from).join(to);
        }
        
        return result;
    }

    // Handle Undo button click
    function handleUndo() {
        if (history.length > 1) {
            // Remove current state
            history.pop();
            
            // Get previous state
            const previousState = history[history.length - 1];
            textArea.value = previousState;
            updateCharCount();
            
            showStatus('Undo successful!', 'info');
            
            transliterateBtn.disabled = true;
            
            // Add visual feedback
            undoBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                undoBtn.style.transform = '';
            }, 150);
        } else {
            showStatus('Nothing to undo!', 'info');
        }
    }

    // Save current state to history
    function saveToHistory(text) {
        history.push(text);
        
        // Limit history size to prevent memory issues
        if (history.length > 50) {
            history.shift();
        }
    }

    // Update character count
    function updateCharCount() {
        const count = textArea.value.length;
        charCount.textContent = `${count.toLocaleString()} character${count !== 1 ? 's' : ''}`;
    }

    // Show status message
    function showStatus(message, type = 'info') {
        // Remove existing status
        statusContainer.innerHTML = '';
        
        // Create new status
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-indicator status-${type}`;
        statusDiv.textContent = message;
        
        statusContainer.appendChild(statusDiv);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.style.opacity = '0';
                statusDiv.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (statusDiv.parentNode) {
                        statusDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();