/**
 * TimingManager
 * Manages timing for animations
 */
class TimingManager {
    constructor() {
        this.lastFrameTime = 0;
    }
    
    /**
     * Reset the timer
     */
    reset() {
        this.lastFrameTime = 0;
    }
    
    /**
     * Calculate time delta between frames
     * @param {number} timestamp - Current timestamp
     * @returns {number} Time delta in milliseconds
     */
    getDeltaTime(timestamp) {
        if (this.lastFrameTime === 0) {
            this.lastFrameTime = timestamp;
            return 0;
        }
        
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        return deltaTime;
    }
    
    /**
     * Convert animation speed (1-10 scale) to a normalized factor
     * @param {number} speed - Animation speed (1-10)
     * @returns {number} Speed factor
     */
    getSpeedFactor(speed) {
        // Map speed 1-10 to a multiplier
        // Speed 1 = 0.2x speed
        // Speed 5 = 1.0x speed
        // Speed 10 = 2.0x speed
        return 0.2 + (speed - 1) * 0.2;
    }
    
    /**
     * Calculate the progress increment based on time and speed
     * @param {number} deltaTime - Time since last frame in ms
     * @param {number} speed - Animation speed (1-10)
     * @param {number} textLength - Length of text to animate
     * @returns {number} Progress increment
     */
    calculateProgressIncrement(deltaTime, speed, textLength) {
        const speedFactor = this.getSpeedFactor(speed);
        const baseRate = 5; // Characters per second at speed 5
        const charsPerMs = (baseRate * speedFactor) / 1000;
        
        // Progress increment is proportional to deltaTime and inversely proportional to textLength
        return (deltaTime * charsPerMs) / Math.max(1, textLength);
    }
} 