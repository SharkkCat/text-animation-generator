/**
 * PreviewManager
 * Manages the animation preview canvas
 */
class PreviewManager {
    constructor(animationEngine) {
        this.animationEngine = animationEngine;
        this.config = animationEngine.config;
        this.canvas = document.getElementById('animation-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Animation state
        this.isPlaying = false;
        this.animationFrameId = null;
        this.isLooping = false;
        
        // Initialize canvas
        this.updateCanvasSize();
        
        // Setup playback control listeners
        this.setupPlaybackControls();
    }
    
    /**
     * Get the canvas element
     * @returns {HTMLCanvasElement} The canvas element
     */
    getCanvas() {
        return this.canvas;
    }
    
    /**
     * Get the canvas context
     * @returns {CanvasRenderingContext2D} The canvas context
     */
    getContext() {
        return this.ctx;
    }
    
    /**
     * Update canvas dimensions based on config
     */
    updateCanvasSize() {
        this.canvas.width = this.config.getCanvasWidth();
        this.canvas.height = this.config.getCanvasHeight();
        
        // Set canvas CSS dimensions to maintain aspect ratio
        const container = document.querySelector('.canvas-container');
        const maxWidth = container.clientWidth;
        
        if (this.canvas.width > maxWidth) {
            const scale = maxWidth / this.canvas.width;
            this.canvas.style.width = `${maxWidth}px`;
            this.canvas.style.height = `${this.canvas.height * scale}px`;
        } else {
            this.canvas.style.width = `${this.canvas.width}px`;
            this.canvas.style.height = `${this.canvas.height}px`;
        }
    }
    
    /**
     * Reset the canvas to empty state with background color
     */
    resetCanvas() {
        this.updateCanvasSize(); // Ensure canvas size is current
        
        // Clear canvas
        this.ctx.fillStyle = this.config.getBackgroundColor();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Setup playback control event listeners
     */
    setupPlaybackControls() {
        // Play/Pause button
        document.getElementById('play-pause-button').addEventListener('click', () => {
            if (this.isPlaying) {
                this.pauseAnimation();
            } else {
                this.playAnimation();
            }
        });
        
        // Restart button
        document.getElementById('restart-button').addEventListener('click', () => {
            this.restartAnimation();
        });
        
        // Loop button
        document.getElementById('loop-button').addEventListener('click', () => {
            this.toggleLoop();
        });
    }
    
    /**
     * Play the animation
     */
    playAnimation() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        document.getElementById('play-pause-button').textContent = 'Pause';
        
        // Start animation loop
        this.animate();
    }
    
    /**
     * Pause the animation
     */
    pauseAnimation() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        document.getElementById('play-pause-button').textContent = 'Play';
        
        // Cancel animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    /**
     * Restart the animation
     */
    restartAnimation() {
        // Pause and reset animation
        this.pauseAnimation();
        this.animationEngine.resetAnimation();
        
        // Render the first frame
        this.renderCurrentFrame();
        
        // If it was playing, start again
        if (this.isPlaying) {
            this.playAnimation();
        }
    }
    
    /**
     * Toggle animation looping
     */
    toggleLoop() {
        this.isLooping = !this.isLooping;
        document.getElementById('loop-button').textContent = `Loop: ${this.isLooping ? 'On' : 'Off'}`;
    }
    
    /**
     * Reset playback controls to default state
     */
    resetPlaybackControls() {
        this.isPlaying = false;
        document.getElementById('play-pause-button').textContent = 'Play';
    }
    
    /**
     * Animation loop
     */
    animate() {
        // Render current frame
        this.renderCurrentFrame();
        
        // Advance animation
        const isComplete = this.animationEngine.advanceFrame();
        
        // Handle animation completion
        if (isComplete) {
            if (this.isLooping) {
                this.animationEngine.resetAnimation();
            } else {
                this.pauseAnimation();
                return;
            }
        }
        
        // Continue animation loop if playing
        if (this.isPlaying) {
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        }
    }
    
    /**
     * Render the current frame of the animation
     */
    renderCurrentFrame() {
        this.resetCanvas();
        this.animationEngine.renderFrame(this.ctx);
    }
} 