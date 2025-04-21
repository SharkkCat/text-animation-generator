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
        // We need fewer total frames for faster speeds to match the preview perception
        let totalFrames;
        
        // Base frames for quality levels
        const baseFramesHigh = 24;
        const baseFramesMed = 16;
        const baseFramesLow = 12;
        
        // Adjustment based on speed - we want fewer frames for higher speeds
        // to better match how the preview handles speed (fewer frames, each with more progress)
        // Speed is 1-10, with 5 being medium
        const speedFactor = Math.sqrt(animationSpeed / 5); // Non-linear scaling
        
        if (options.quality === 'high') {
            // High quality with speed adjustment
            totalFrames = Math.max(20, Math.round(baseFramesHigh * speedFactor));
        } else if (options.quality === 'medium') {
            // Medium quality with speed adjustment
            totalFrames = Math.max(15, Math.round(baseFramesMed * speedFactor));
        } else {
            // Low quality with speed adjustment
            totalFrames = Math.max(10, Math.round(baseFramesLow * speedFactor));
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
        
        // Apply a much more aggressive compensation factor to better match the perceived speed in the preview
        // Preview runs in real-time with adaptive frame rates, but GIFs have fixed delays
        const speedCompensation = 0.3; // 70% faster than previous attempt (was 0.6)
        
        // Base delay at medium speed (5) - drastically reduced
        const baseDelay = 50 * speedCompensation; // ~15ms at speed 5
        
        // Adjust delay inversely proportional to speed
        // Speed 1 (slowest): ~75ms 
        // Speed 5 (medium): ~15ms
        // Speed 10 (fastest): ~8ms
        
        // Calculate the final delay
        const delay = Math.round(baseDelay * (5 / speed));
        
        // Ensure we don't go below browser minimum for GIF (usually ~10ms)
        return Math.max(10, delay);
    }
} 