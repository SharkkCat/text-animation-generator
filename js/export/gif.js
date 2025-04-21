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
        
        // Get canvas and context
        const canvas = document.getElementById('animation-canvas');
        const ctx = canvas.getContext('2d');
        
        // Reset engine to start of animation
        this.engine.resetAnimation();
        
        // Add frames at regular intervals
        for (let progress = 0; progress <= 1; progress += frameStep) {
            // Render the frame at this progress point
            this.engine.renderFrameAt(ctx, progress);
            
            // Add the frame to the GIF
            gif.addFrame(canvas, { delay: frameDelay, copy: true });
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
        // Convert speed (1-10) to frame delay (50-200ms)
        // Slower speed = higher delay
        return Math.round(250 - (speed * 20));
    }
} 