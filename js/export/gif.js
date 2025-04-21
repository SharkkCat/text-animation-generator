/**
 * GifExporter
 * Handles exporting animations as GIF files
 */
class GifExporter {
    constructor(engine, config) {
        this.engine = engine;
        this.config = config;
    }
    
    /**
     * Export the current animation as a GIF
     * @param {object} options - Export options (quality, etc.)
     * @param {function} onProgress - Progress callback (0-1)
     * @returns {Promise<Blob>} Promise that resolves to a GIF blob
     */
    export(options, onProgress) {
        return new Promise((resolve, reject) => {
            try {
                // Get canvas dimensions
                const width = this.config.getCanvasWidth();
                const height = this.config.getCanvasHeight();
                
                // Create GIF instance
                const gif = new GIF({
                    workers: 2,
                    quality: this.getQualityValue(options.quality),
                    width: width,
                    height: height,
                    workerScript: 'libs/gif.js/gif.worker.js',
                    background: this.config.getBackgroundColor()
                });
                
                // Set up progress handler
                gif.on('progress', progress => {
                    if (onProgress) {
                        onProgress(progress);
                    }
                });
                
                // Add frames to the GIF
                this.addFramesToGif(gif, options);
                
                // Handle completion
                gif.on('finished', blob => {
                    resolve(blob);
                });
                
                // Start rendering
                gif.render();
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Add animation frames to the GIF
     * @param {GIF} gif - The GIF instance
     * @param {object} options - Export options
     */
    addFramesToGif(gif, options) {
        const text = this.config.getText();
        const animationSpeed = this.config.getAnimationSpeed();
        
        // Calculate frame count and step based on quality
        const frameStep = this.getFrameStep(options.quality);
        const frameDelay = this.getFrameDelay(animationSpeed);
        
        // Calculate the number of frames based on speed
        // Faster animations need more frames to appear smooth
        let totalFrames;
        if (options.quality === 'high') {
            totalFrames = Math.max(20, Math.min(100, 20 * (animationSpeed / 5)));
        } else if (options.quality === 'medium') {
            totalFrames = Math.max(15, Math.min(60, 15 * (animationSpeed / 5)));
        } else {
            totalFrames = Math.max(10, Math.min(30, 10 * (animationSpeed / 5)));
        }
        
        // Get original canvas and context
        const originalCanvas = document.getElementById('animation-canvas');
        const originalCtx = originalCanvas.getContext('2d');
        
        // Reset engine to start of animation
        this.engine.resetAnimation();
        
        // Store original background color
        const backgroundColor = this.config.getBackgroundColor();
        
        // Add frames at regular intervals
        for (let i = 0; i <= totalFrames; i++) {
            // Calculate progress for this frame
            const progress = i / totalFrames;
            
            // Clear the original canvas
            originalCtx.fillStyle = backgroundColor;
            originalCtx.fillRect(0, 0, originalCanvas.width, originalCanvas.height);
            
            // Render the frame at the current progress
            this.engine.renderFrameAt(originalCtx, progress);
            
            // Add the frame to the GIF
            gif.addFrame(originalCanvas, { delay: frameDelay, copy: true });
        }
    }
    
    /**
     * Map quality setting to GIF quality value
     * @param {string} quality - Quality setting (low, medium, high)
     * @returns {number} GIF quality value
     */
    getQualityValue(quality) {
        switch (quality) {
            case 'low': return 30;
            case 'high': return 1;
            case 'medium':
            default: return 10;
        }
    }
    
    /**
     * Get frame step size based on quality
     * @param {string} quality - Quality setting (low, medium, high)
     * @returns {number} Step size between frames (0-1)
     */
    getFrameStep(quality) {
        switch (quality) {
            case 'low': return 0.05;
            case 'medium': return 0.025;
            case 'high': return 0.01;
            default: return 0.025;
        }
    }
    
    /**
     * Get frame delay based on animation speed
     * @param {number} speed - Animation speed (1-10)
     * @returns {number} Frame delay in milliseconds
     */
    getFrameDelay(speed) {
        // Convert speed (1-10) to frame delay
        // We need to match the same speed factor used in the animation engine
        // In AnimationEngine: speedFactor = speed / 5
        
        // Base delay at medium speed (5)
        const baseDelay = 100; // 100ms at speed 5
        
        // Adjust delay inversely proportional to speed
        // Speed 1 (slowest): 500ms
        // Speed 5 (medium): 100ms
        // Speed 10 (fastest): 50ms
        return Math.round(baseDelay * (5 / speed));
    }
} 