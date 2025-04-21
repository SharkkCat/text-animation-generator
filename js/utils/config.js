/**
 * AnimationConfig
 * Manages the configuration for the animation
 */
class AnimationConfig {
    constructor() {
        // Default values
        this.text = "Hello World!";
        this.font = "Arial, sans-serif";
        this.fontSize = 36;
        this.color = "#000000";
        this.backgroundColor = "#ffffff";
        this.animationSpeed = 5; // 1-10 scale
        this.canvasWidth = 800;
        this.canvasHeight = 400;
    }
    
    // Text content
    setText(text) {
        this.text = text || this.text;
    }
    
    getText() {
        return this.text;
    }
    
    // Font family
    setFont(font) {
        this.font = font || this.font;
    }
    
    getFont() {
        return this.font;
    }
    
    // Font size
    setFontSize(size) {
        this.fontSize = parseInt(size) || this.fontSize;
    }
    
    getFontSize() {
        return this.fontSize;
    }
    
    // Text color
    setColor(color) {
        this.color = color || this.color;
    }
    
    getColor() {
        return this.color;
    }
    
    // Background color
    setBackgroundColor(color) {
        this.backgroundColor = color || this.backgroundColor;
    }
    
    getBackgroundColor() {
        return this.backgroundColor;
    }
    
    // Animation speed (1-10)
    setAnimationSpeed(speed) {
        this.animationSpeed = parseInt(speed) || this.animationSpeed;
    }
    
    getAnimationSpeed() {
        return this.animationSpeed;
    }
    
    // Canvas dimensions
    setCanvasDimensions(width, height) {
        this.canvasWidth = parseInt(width) || this.canvasWidth;
        this.canvasHeight = parseInt(height) || this.canvasHeight;
    }
    
    getCanvasWidth() {
        return this.canvasWidth;
    }
    
    getCanvasHeight() {
        return this.canvasHeight;
    }
    
    // Reset to default values
    resetToDefaults() {
        this.text = "Hello World!";
        this.font = "Arial, sans-serif";
        this.fontSize = 36;
        this.color = "#000000";
        this.backgroundColor = "#ffffff";
        this.animationSpeed = 5;
        this.canvasWidth = 800;
        this.canvasHeight = 400;
    }
    
    // Save configuration as JSON
    toJSON() {
        return {
            text: this.text,
            font: this.font,
            fontSize: this.fontSize,
            color: this.color,
            backgroundColor: this.backgroundColor,
            animationSpeed: this.animationSpeed,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight
        };
    }
    
    // Load configuration from JSON
    fromJSON(json) {
        if (!json) return;
        
        this.text = json.text || this.text;
        this.font = json.font || this.font;
        this.fontSize = json.fontSize || this.fontSize;
        this.color = json.color || this.color;
        this.backgroundColor = json.backgroundColor || this.backgroundColor;
        this.animationSpeed = json.animationSpeed || this.animationSpeed;
        this.canvasWidth = json.canvasWidth || this.canvasWidth;
        this.canvasHeight = json.canvasHeight || this.canvasHeight;
    }
} 