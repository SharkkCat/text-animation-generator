/**
 * Main Application
 * Initializes and coordinates all components
 */
class App {
    constructor() {
        // Make app instance globally available
        window.app = this;
        
        // Initialize components
        this.initializeComponents();
        this.setupEventListeners();
        
        // Debug - verify icons are loaded
        console.log('Available icons:', this.iconManager.getAvailableIcons());
    }
    
    initializeComponents() {
        // Configuration
        this.config = new AnimationConfig();
        
        // Canvas setup
        const canvas = document.getElementById('animation-canvas');
        this.ctx = canvas.getContext('2d');
        
        // Icon management - initialize first
        this.iconManager = new IconManager();
        
        // Font loader
        this.fontManager = new FontManager();
        
        // Animation components
        this.renderer = new TextRenderer(this.ctx);
        this.timingManager = new TimingManager();
        this.animationEngine = new AnimationEngine(this.config, this.renderer, this.timingManager);
        
        // UI components - initialize after icon and font managers
        this.previewManager = new PreviewManager(this.animationEngine);
        this.controlsManager = new ControlsManager(this.config);
        
        // Export modules
        this.gifExporter = new GifExporter(this.animationEngine, this.config);
        this.videoExporter = new VideoExporter(this.animationEngine, this.config);
        this.exportManager = new ExportManager(this.config, this.previewManager);
        this.exportManager.initialize(this.animationEngine);
    }
    
    setupEventListeners() {
        // Preview button
        document.getElementById('preview-button').addEventListener('click', () => {
            this.animationEngine.resetAnimation();
            this.previewManager.playAnimation();
        });
        
        // Reset button
        document.getElementById('reset-button').addEventListener('click', () => {
            this.controlsManager.resetToDefaults();
            this.animationEngine.resetAnimation();
            this.previewManager.resetPlaybackControls();
            this.previewManager.renderCurrentFrame();
        });
        
        // Export button
        document.getElementById('export-button').addEventListener('click', () => {
            const format = document.getElementById('export-format').value;
            const quality = document.getElementById('export-quality').value;
            this.exportManager.exportAnimation(format, quality);
        });
    }
}

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 