/**
 * IconManager
 * Utility for managing and rendering Material Icons in animations
 */
class IconManager {
    constructor() {
        this.availableIcons = {};
        
        // Direct loading of icons instead of async
        this.registerMaterialIcons();
        
        console.log(`IconManager initialized with ${Object.keys(this.availableIcons).length} icons`);
    }
    
    /**
     * Register Material Icons directly
     */
    registerMaterialIcons() {
        // Add commonly used Material icons
        const commonIcons = [
            // Basic UI elements
            'face', 'favorite', 'home', 'settings', 'star',
            'delete', 'check_circle', 'warning', 'error',
            'mail', 'phone', 'person', 'help', 'info',
            'favorite_border', 'schedule', 'event', 'cloud',
            'search', 'sentiment_satisfied', 'thumb_up',
            
            // Additional icons
            'add', 'close', 'refresh', 'menu', 'more_vert',
            'share', 'send', 'notifications', 'done', 
            'bookmark', 'shopping_cart', 'lock', 'public',
            'access_time', 'attach_file', 'camera', 'edit',
            'location_on', 'mic', 'play_arrow', 'pause', 'stop',
            'brightness_high', 'wb_sunny', 'nightlight', 'flash_on'
        ];
        
        // Register each icon
        commonIcons.forEach(name => {
            this.registerIcon(name, {
                type: 'material',
                name: name,
                render: (ctx, x, y, size, color) => {
                    ctx.save();
                    ctx.font = `${size}px 'Material Icons'`;
                    ctx.fillStyle = color;
                    ctx.textBaseline = 'middle';
                    ctx.fillText(name, x, y);
                    ctx.restore();
                }
            });
        });
    }
    
    /**
     * Get an icon by name
     * @param {string} name - Name of the icon
     * @returns {Object|null} Icon object or null if not found
     */
    getIcon(name) {
        return this.availableIcons[name] || null;
    }
    
    /**
     * Register a new icon
     * @param {string} name - Name for the icon
     * @param {Object} icon - Icon data
     */
    registerIcon(name, icon) {
        this.availableIcons[name] = icon;
    }
    
    /**
     * Get all available icon names
     * @returns {string[]} Array of icon names
     */
    getAvailableIcons() {
        return Object.keys(this.availableIcons);
    }
    
    /**
     * Parse text for icon markers like [icon:name]
     * @param {string} text - Text to parse
     * @returns {Array} Array of text and icon segments
     */
    parseTextWithIcons(text) {
        const iconRegex = /\[icon:([^\]]+)\]/g;
        let result = [];
        let lastIndex = 0;
        let match;
        
        while ((match = iconRegex.exec(text)) !== null) {
            // Add text before the icon
            if (match.index > lastIndex) {
                result.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index)
                });
            }
            
            // Add the icon
            const iconName = match[1];
            if (this.availableIcons[iconName]) {
                result.push({
                    type: 'icon',
                    icon: iconName
                });
            } else {
                // If icon not found, just keep the original text
                result.push({
                    type: 'text',
                    content: match[0]
                });
            }
            
            lastIndex = match.index + match[0].length;
        }
        
        // Add any remaining text
        if (lastIndex < text.length) {
            result.push({
                type: 'text',
                content: text.substring(lastIndex)
            });
        }
        
        return result;
    }
    
    /**
     * Calculate the total length of text with icons for progress calculations
     * @param {string} text - Text with icon markers
     * @returns {number} Effective length for animation purposes
     */
    getTextWithIconsLength(text) {
        const segments = this.parseTextWithIcons(text);
        let length = 0;
        
        segments.forEach(segment => {
            if (segment.type === 'text') {
                length += segment.content.length;
            } else if (segment.type === 'icon') {
                // Count an icon as equivalent to 1 character
                length += 1;
            }
        });
        
        return length;
    }
} 