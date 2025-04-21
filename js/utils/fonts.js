/**
 * FontManager
 * Manages font loading and selection
 */
class FontManager {
    constructor() {
        this.loadedFonts = [];
        this.defaultFonts = [
            'Arial, sans-serif',
            '\'Times New Roman\', serif',
            '\'Courier New\', monospace',
            'Georgia, serif',
            'Verdana, sans-serif',
            '\'Comic Sans MS\', cursive'
        ];
    }
    
    /**
     * Check if a font is available in the browser
     * @param {string} fontName - Name of the font to check
     * @returns {boolean} Whether the font is loaded
     */
    isFontLoaded(fontName) {
        return this.loadedFonts.includes(fontName) || this.defaultFonts.includes(fontName);
    }
    
    /**
     * Get array of all available fonts
     * @returns {string[]} Array of available font names
     */
    getAvailableFonts() {
        return [...this.defaultFonts, ...this.loadedFonts];
    }
    
    /**
     * Create a font preview element
     * @param {string} fontName - Name of the font
     * @returns {HTMLElement} Preview element
     */
    createFontPreview(fontName) {
        const preview = document.createElement('span');
        preview.style.fontFamily = fontName;
        preview.textContent = 'Aa';
        return preview;
    }
    
    /**
     * Populate a dropdown with available fonts
     * @param {HTMLSelectElement} selectElement - The select element to populate
     */
    populateFontDropdown(selectElement) {
        // Clear existing options
        selectElement.innerHTML = '';
        
        // Add available fonts
        this.getAvailableFonts().forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font.split(',')[0].replace(/'/g, '');
            option.style.fontFamily = font;
            selectElement.appendChild(option);
        });
    }
} 