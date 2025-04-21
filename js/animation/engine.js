/**
 * AnimationEngine
 * Core animation functionality for the text animation generator
 */
class AnimationEngine {
    constructor(config, renderer, timingManager) {
        this.config = config;
        this.renderer = renderer;
        this.timingManager = timingManager;
        
        this.progress = 0;
        this.lastTimestamp = 0;
    }
    
    /**
     * Reset the animation to initial state
     */
    resetAnimation() {
        this.progress = 0;
        this.lastTimestamp = 0;
    }
    
    /**
     * Advance animation by one frame
     * @returns {boolean} True if animation is complete
     */
    advanceFrame() {
        const now = performance.now();
        let deltaTime = 0;
        
        if (this.lastTimestamp > 0) {
            deltaTime = now - this.lastTimestamp;
        }
        
        this.lastTimestamp = now;
        
        // Calculate how much to advance based on speed
        const speedFactor = this.config.getAnimationSpeed() / 5; // Normalize speed (1-10 range)
        const progressIncrement = (deltaTime / 1000) * speedFactor;
        
        // Update progress
        this.progress = Math.min(1, this.progress + progressIncrement);
        
        // Return true if animation is complete
        return this.progress >= 1;
    }
    
    /**
     * Render the current animation frame
     * @param {CanvasRenderingContext2D} ctx - Canvas context to render to
     */
    renderFrame(ctx) {
        // Get current configuration
        const text = this.config.getText();
        const font = this.config.getFont();
        const fontSize = this.config.getFontSize();
        const color = this.config.getColor();
        const canvas = ctx.canvas;
        
        // Configure renderer options
        const options = {
            font: font,
            fontSize: fontSize,
            color: color,
            x: canvas.width / 2,
            y: canvas.height / 2,
            align: 'center',
            baseline: 'middle'
        };
        
        // Save the original context
        const originalCtx = this.renderer.ctx;
        
        // Temporarily set the renderer's context to the provided context
        this.renderer.ctx = ctx;
        
        // Render the text with current progress
        this.renderer.renderAnimatedText(text, this.progress, options);
        
        // Restore the original context
        this.renderer.ctx = originalCtx;
    }
    
    /**
     * Render a specific frame at given progress
     * @param {CanvasRenderingContext2D} ctx - Canvas context to render to
     * @param {number} progress - Animation progress (0-1)
     */
    renderFrameAt(ctx, progress) {
        const oldProgress = this.progress;
        this.progress = Math.max(0, Math.min(1, progress));
        this.renderFrame(ctx);
        this.progress = oldProgress;
    }
    
    /**
     * Get the total animation duration in milliseconds
     * @returns {number} Animation duration
     */
    getAnimationDuration() {
        const text = this.config.getText();
        const speedFactor = this.config.getAnimationSpeed();
        
        // Calculate duration based on text length and speed
        let textLength = text.length;
        
        // If there's an icon manager available, use its text length calculation
        if (window.app && window.app.iconManager) {
            textLength = window.app.iconManager.getTextWithIconsLength(text);
        }
        
        // Base duration with speed adjustment
        const baseDuration = 3000; // 3 seconds for average text
        const speedAdjustment = 10 / speedFactor; // Inverse relationship with speed
        
        return baseDuration * (textLength / 20) * speedAdjustment;
    }
} 