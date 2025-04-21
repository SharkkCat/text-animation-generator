/**
 * ExportManager
 * Controls the export process for different animation formats
 */
class ExportManager {
    constructor(config, preview) {
        this.config = config;
        this.preview = preview;
        this.engine = null; // Will be set in initialize
        
        // Progress elements
        this.progressBar = document.getElementById('export-progress');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
    }
    
    initialize(engine) {
        this.engine = engine;
        
        // Create exporters
        this.gifExporter = new GifExporter(engine, this.config);
    }
    
    /**
     * Export animation in the selected format
     * @param {string} format - Export format (gif, mp4, webm)
     * @param {string} quality - Export quality (low, medium, high)
     */
    exportAnimation(format, quality) {
        if (!this.engine) {
            console.error('Export failed: Animation engine not initialized');
            return;
        }
        
        // Show progress bar
        this.showProgress(0);
        
        const options = {
            quality: quality,
            format: format
        };
        
        // Call appropriate exporter based on format
        switch (format) {
            case 'gif':
                this.exportGif(options);
                break;
            case 'mp4':
            case 'webm':
                // For the simple first implementation, we'll just show a message
                // that these formats aren't available yet
                alert('Video export will be available in a future update.');
                this.hideProgress();
                break;
            default:
                console.error(`Unsupported export format: ${format}`);
                this.hideProgress();
        }
    }
    
    /**
     * Export animation as GIF
     * @param {object} options - Export options
     */
    exportGif(options) {
        this.gifExporter.export(options, (progress) => {
            this.updateProgress(progress);
        })
        .then(blob => {
            this.completeExport(blob, 'animation.gif');
        })
        .catch(error => {
            console.error('GIF export failed:', error);
            alert('Export failed: ' + error.message);
            this.hideProgress();
        });
    }
    
    /**
     * Complete the export process and trigger download
     * @param {Blob} blob - The exported file blob
     * @param {string} filename - The filename to use
     */
    completeExport(blob, filename) {
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.hideProgress();
        }, 100);
    }
    
    /**
     * Show the progress UI
     * @param {number} value - Initial progress value (0-1)
     */
    showProgress(value) {
        this.progressBar.classList.remove('hidden');
        this.updateProgress(value);
    }
    
    /**
     * Update the progress UI
     * @param {number} value - Progress value (0-1)
     */
    updateProgress(value) {
        const percent = Math.round(value * 100);
        this.progressFill.style.width = `${percent}%`;
        this.progressText.textContent = `Processing: ${percent}%`;
    }
    
    /**
     * Hide the progress UI
     */
    hideProgress() {
        this.progressBar.classList.add('hidden');
    }
} 