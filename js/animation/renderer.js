/**
 * TextRenderer
 * Handles rendering text to the canvas with animation
 */
class TextRenderer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    
    /**
     * Render animated text to the canvas based on progress
     * @param {string} text - The text to render
     * @param {number} progress - Animation progress from 0 to 1
     * @param {object} options - Rendering options
     */
    renderAnimatedText(text, progress, options) {
        if (!text) return;
        
        const defaultOptions = {
            font: 'Arial, sans-serif',
            fontSize: 36,
            color: '#000000',
            x: 0,
            y: 0,
            align: 'left',
            baseline: 'top',
            noCursor: false
        };
        
        // Merge default options with provided options
        const opts = { ...defaultOptions, ...options };
        
        // Parse text to separate regular text from icons
        const iconManager = window.app.iconManager;
        const parsedContent = iconManager.parseTextWithIcons(text);
        
        // Calculate the total content length for progress calculation
        const totalLength = iconManager.getTextWithIconsLength(text);
        const visibleLength = Math.floor(totalLength * progress);
        
        // Set text properties for measuring
        this.ctx.font = `${opts.fontSize}px ${opts.font}`;
        
        // Handle alignment by first measuring total width
        let totalWidth = 0;
        if (opts.align === 'center' || opts.align === 'right') {
            parsedContent.forEach(segment => {
                if (segment.type === 'text') {
                    totalWidth += this.ctx.measureText(segment.content).width;
                } else if (segment.type === 'icon') {
                    totalWidth += opts.fontSize; // Icon width is roughly equal to font size
                }
            });
        }
        
        // Calculate starting X position based on alignment
        let startX = opts.x;
        if (opts.align === 'center') {
            startX -= totalWidth / 2;
        } else if (opts.align === 'right') {
            startX -= totalWidth;
        }
        
        // Render each segment with progress consideration
        let currentX = startX;
        let currentLength = 0;
        let reachedLimit = false;
        
        for (const segment of parsedContent) {
            if (reachedLimit) break;
            
            if (segment.type === 'text') {
                // Calculate how much of this text segment to show
                const segmentLength = segment.content.length;
                const remainingLength = visibleLength - currentLength;
                let visibleSegmentLength = Math.min(segmentLength, remainingLength);
                
                if (visibleSegmentLength <= 0) {
                    reachedLimit = true;
                    break;
                }
                
                const visibleText = segment.content.substring(0, visibleSegmentLength);
                
                // Render visible text
                this.ctx.font = `${opts.fontSize}px ${opts.font}`;
                this.ctx.fillStyle = opts.color;
                this.ctx.textBaseline = opts.baseline;
                this.ctx.fillText(visibleText, currentX, opts.y);
                
                // Update position and length counters
                currentX += this.ctx.measureText(visibleText).width;
                currentLength += visibleSegmentLength;
                
                // Check if we've reached the length limit
                if (currentLength >= visibleLength) {
                    reachedLimit = true;
                }
                
            } else if (segment.type === 'icon') {
                // Only render the icon if we haven't exceeded the visible length
                if (currentLength < visibleLength) {
                    const icon = iconManager.getIcon(segment.icon);
                    if (icon) {
                        // Calculate Y position based on baseline
                        let iconY;
                        if (opts.baseline === 'top') {
                            iconY = opts.y + opts.fontSize/2;
                        } else if (opts.baseline === 'middle') {
                            iconY = opts.y;
                        } else {
                            // For 'bottom', 'alphabetic', etc.
                            iconY = opts.y - opts.fontSize/3;
                        }
                        icon.render(this.ctx, currentX, iconY, opts.fontSize, opts.color);
                        currentX += opts.fontSize;
                        currentLength += 1; // Count icon as one character
                    }
                } else {
                    reachedLimit = true;
                }
            }
        }
    }
    
    /**
     * Render multiline text to the canvas
     * @param {string} text - The text to render
     * @param {object} options - Rendering options
     */
    renderMultilineText(text, options) {
        const lines = text.split('\n');
        const lineHeight = options.fontSize * 1.2; // Default line height
        
        lines.forEach((line, index) => {
            const y = options.y + (index * lineHeight);
            
            // Handle icons in each line
            const iconManager = window.app.iconManager;
            const parsedContent = iconManager.parseTextWithIcons(line);
            let currentX = options.x;
            
            parsedContent.forEach(segment => {
                if (segment.type === 'text') {
                    this.ctx.font = `${options.fontSize}px ${options.font}`;
                    this.ctx.fillText(segment.content, currentX, y);
                    currentX += this.ctx.measureText(segment.content).width;
                } else if (segment.type === 'icon') {
                    const icon = iconManager.getIcon(segment.icon);
                    if (icon) {
                        // Calculate Y position based on text position
                        // For multiline text, we need to adjust based on typical baseline
                        const iconY = y + (options.fontSize/3);
                        icon.render(this.ctx, currentX, iconY, options.fontSize, options.color);
                        currentX += options.fontSize;
                    }
                }
            });
        });
    }
    
    /**
     * Render a cursor at the specified position - this method is disabled
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {object} options - Rendering options
     */
    renderCursor(x, y, options) {
        // Cursor rendering disabled
        // No more vertical lines
    }
} 