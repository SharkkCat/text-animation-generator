# File Structure

```
text-animation-generator/
├── index.html            # Main application entry point
├── favicon.ico           # Site favicon
├── README.md             # Project documentation
├── LICENSE.md            # License information
├── css/
│   ├── styles.css        # Main styles
│   ├── controls.css      # Styles for UI controls
│   └── animations.css    # CSS animations for UI elements
├── js/
│   ├── app.js            # Application initialization
│   ├── ui/
│   │   ├── controls.js   # UI control event handlers
│   │   ├── preview.js    # Preview area functionality
│   │   └── export.js     # Export UI interaction
│   ├── animation/
│   │   ├── engine.js     # Core animation logic
│   │   ├── renderer.js   # Canvas rendering functions
│   │   └── timing.js     # Animation timing utilities
│   ├── export/
│   │   ├── gif.js        # GIF export functionality
│   │   └── video.js      # Video export functionality
│   └── utils/
│       ├── fonts.js      # Font loading and management
│       ├── icons.js      # Icon handling utilities
│       └── config.js     # Configuration management
├── libs/
│   ├── gif.js/           # GIF generation library
│   └── canvas-capture/   # Video capture library
├── assets/
│   ├── fonts/            # Custom font files (if needed)
│   └── icons/            # Icon assets
└── examples/             # Example configurations
    ├── simple.json       # Simple text animation example
    ├── with-icons.json   # Text with icons example
    └── multiline.json    # Multiline text example
```

## Key Files and Their Purpose

### HTML Files
- `index.html`: The single page containing the entire application, including the control panel, preview area, and export options.

### CSS Files
- `styles.css`: Global styles, layout, and responsive design rules
- `controls.css`: Styles specific to UI controls like sliders, buttons, and inputs
- `animations.css`: CSS animations used for UI feedback and transitions

### JavaScript Files

#### Core Application
- `app.js`: Initializes the application, sets up event listeners, and coordinates between modules

#### UI Module
- `controls.js`: Manages UI controls and form elements
- `preview.js`: Handles the preview canvas and real-time animation display
- `export.js`: Controls the export UI and initiates export processes

#### Animation Module
- `engine.js`: Core animation logic, frame calculation, and animation loop
- `renderer.js`: Canvas rendering functions for text and icons
- `timing.js`: Utilities for timing, delays, and animation speed

#### Export Module
- `gif.js`: Handles conversion of animation frames to GIF format
- `video.js`: Manages video format exports

#### Utilities
- `fonts.js`: Font loading, verification, and management
- `icons.js`: Icon loading and positioning utilities
- `config.js`: Animation configuration handling and validation

### Libraries
Third-party libraries for specialized functionality:
- `gif.js`: For creating animated GIFs
- `canvas-capture`: For recording canvas animations as video

### Assets
- `fonts/`: Any custom font files needed for the application
- `icons/`: Vector or raster icons that can be included in animations

### Examples
Sample configuration files to demonstrate different animation styles and capabilities 