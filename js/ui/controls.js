/**
 * ControlsManager
 * Manages UI controls for configuring the animation
 */
class ControlsManager {
    constructor(config) {
        this.config = config;
        this.setupEventListeners();
        
        // Try to populate icon dropdown, but it may need to wait for IconManager
        if (window.app && window.app.iconManager) {
            this.populateIconDropdown();
        } else {
            console.warn('IconManager not available yet. Dropdown will be populated later.');
        }
    }
    
    setupEventListeners() {
        // Text content
        document.getElementById('text-content').addEventListener('input', (e) => {
            this.config.setText(e.target.value);
        });
        
        // Font family
        document.getElementById('font-family').addEventListener('change', (e) => {
            this.config.setFont(e.target.value);
        });
        
        // Font size
        document.getElementById('font-size').addEventListener('input', (e) => {
            const size = e.target.value;
            this.config.setFontSize(size);
            document.getElementById('font-size-value').textContent = `${size}px`;
        });
        
        // Text color
        document.getElementById('text-color').addEventListener('input', (e) => {
            this.config.setColor(e.target.value);
        });
        
        // Background color
        document.getElementById('background-color').addEventListener('input', (e) => {
            this.config.setBackgroundColor(e.target.value);
        });
        
        // Animation speed
        document.getElementById('animation-speed').addEventListener('input', (e) => {
            const speed = e.target.value;
            this.config.setAnimationSpeed(speed);
            this.updateSpeedLabel(speed);
        });
        
        // Canvas dimensions
        document.getElementById('canvas-width').addEventListener('input', (e) => {
            this.updateCanvasDimensions();
        });
        
        document.getElementById('canvas-height').addEventListener('input', (e) => {
            this.updateCanvasDimensions();
        });
        
        // Icon insertion
        document.getElementById('insert-icon-button').addEventListener('click', () => {
            this.insertSelectedIcon();
        });
        
        // Add keyboard shortcut for inserting icons (Enter key when dropdown is focused)
        document.getElementById('icon-dropdown').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.insertSelectedIcon();
            }
        });
    }
    
    /**
     * Populate the icon dropdown with available icons
     */
    populateIconDropdown() {
        const dropdown = document.getElementById('icon-dropdown');
        if (!dropdown) {
            console.error('Icon dropdown element not found');
            return;
        }
        
        if (!window.app || !window.app.iconManager) {
            console.error('IconManager not available');
            return;
        }
        
        const iconNames = window.app.iconManager.getAvailableIcons();
        console.log(`Populating dropdown with ${iconNames.length} icons`);
        
        // Clear existing options
        dropdown.innerHTML = '<option value="">-- Select Icon --</option>';
        
        // Add an option for each available icon
        iconNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            dropdown.appendChild(option);
        });
    }
    
    /**
     * Insert the selected icon at cursor position in the text
     */
    insertSelectedIcon() {
        const dropdown = document.getElementById('icon-dropdown');
        if (!dropdown) {
            console.error('Icon dropdown element not found');
            return;
        }
        
        const iconName = dropdown.value;
        if (!iconName) {
            console.warn('No icon selected');
            return;
        }
        
        const textArea = document.getElementById('text-content');
        const cursorPos = textArea.selectionStart;
        const textBefore = textArea.value.substring(0, cursorPos);
        const textAfter = textArea.value.substring(cursorPos);
        
        // Insert icon marker at cursor position
        const iconTag = `[icon:${iconName}]`;
        const newText = textBefore + iconTag + textAfter;
        textArea.value = newText;
        
        // Update config and position cursor after the inserted icon
        this.config.setText(newText);
        const newCursorPos = cursorPos + iconTag.length;
        textArea.setSelectionRange(newCursorPos, newCursorPos);
        textArea.focus();
        
        console.log(`Inserted icon: ${iconName}`);
    }
    
    updateCanvasDimensions() {
        const width = document.getElementById('canvas-width').value;
        const height = document.getElementById('canvas-height').value;
        this.config.setCanvasDimensions(width, height);
    }
    
    updateSpeedLabel(speed) {
        const label = document.getElementById('speed-value');
        if (speed <= 3) {
            label.textContent = 'Slow';
        } else if (speed <= 7) {
            label.textContent = 'Medium';
        } else {
            label.textContent = 'Fast';
        }
    }
    
    updateUI() {
        // Update UI elements with current config values
        document.getElementById('text-content').value = this.config.getText();
        document.getElementById('font-family').value = this.config.getFont();
        
        const fontSize = this.config.getFontSize();
        document.getElementById('font-size').value = fontSize;
        document.getElementById('font-size-value').textContent = `${fontSize}px`;
        
        document.getElementById('text-color').value = this.config.getColor();
        document.getElementById('background-color').value = this.config.getBackgroundColor();
        
        const speed = this.config.getAnimationSpeed();
        document.getElementById('animation-speed').value = speed;
        this.updateSpeedLabel(speed);
        
        document.getElementById('canvas-width').value = this.config.getCanvasWidth();
        document.getElementById('canvas-height').value = this.config.getCanvasHeight();
    }
    
    resetToDefaults() {
        this.config.resetToDefaults();
        this.updateUI();
    }
} 