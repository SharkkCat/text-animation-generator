# User Guide: Text Animation Generator

## Introduction
This guide will help you create beautiful text animations using the Text Animation Generator tool. The tool allows you to create animations where text (and optionally icons) appear character by character, with control over timing, fonts, and export options.

## Getting Started

### Basic Interface
The interface consists of three main sections:
1. **Control Panel**: Where you configure all animation settings
2. **Preview Area**: Where you see your animation in real-time
3. **Export Options**: Where you select and initiate export operations

## Creating Your First Animation

### Step 1: Enter Your Text
1. Find the "Text Content" input field in the Control Panel
2. Type or paste the text you want to animate
3. For multi-line text, use the line break button or press Shift+Enter

### Step 2: Customize Text Appearance
1. **Font Selection**:
   - Choose from the font dropdown menu
   - Common web-safe fonts are available by default
   - You can also use custom fonts if they're installed on your system

2. **Font Size**:
   - Adjust using the font size slider or input field
   - Size is measured in pixels

3. **Text Color**:
   - Click the color picker to select your desired text color
   - You can input specific HEX, RGB, or HSL values if needed

4. **Canvas Dimensions**:
   - Set the width and height of your animation canvas
   - Consider your intended use when selecting dimensions

### Step 3: Configure Animation Settings
1. **Animation Speed**:
   - Adjust the speed slider to control how quickly the text appears
   - Lower values create slower, more dramatic animations
   - Higher values create quicker animations

2. **Animation Style** (if available):
   - Select special effects like fade, bounce, or color transition
   - Each style has its own additional parameters

### Step 4: Preview Your Animation
1. Click the "Preview" button to see your animation
2. Use the playback controls to:
   - Play/Pause the animation
   - Reset to the beginning
   - Loop the animation

3. Make adjustments to any settings as needed and preview again

### Step 5: Export Your Animation
1. Select your preferred export format:
   - **GIF**: Best for simple animations and wide compatibility
   - **MP4**: Better quality and smaller file size
   - **WebM**: Modern format with good compression

2. Configure export options:
   - **Quality**: Higher quality means larger file size
   - **Size**: You can export at the same size as preview or adjust
   - **Frame Rate**: Higher frame rates are smoother but create larger files

3. Click "Export" and wait for the process to complete
4. When finished, you'll be prompted to download your file

## Advanced Features

### Adding Icons
1. Click the "Add Icon" button in the text area
2. Select from the available icon library
3. Position the icon within your text:
   - Icons can be placed before, after, or within text
   - Size and alignment can be adjusted

### Using Custom Fonts
1. Select "Custom Font" from the font dropdown
2. Choose a local font file (.ttf, .otf, .woff, .woff2)
3. The font will be applied to your animation
4. Note: Custom fonts are not embedded in exports, they're rendered as images

### Saving and Loading Configurations
1. You can save your current settings using the "Save Config" button
2. This generates a JSON file with all your settings
3. To load a saved configuration, use the "Load Config" button
4. Browse for your saved JSON file and select it

## Troubleshooting

### Common Issues
1. **Animation appears choppy**:
   - Try reducing the canvas size
   - Simplify the animation (less text, fewer effects)
   - Increase frame delay for smoother appearance

2. **Export takes too long**:
   - Reduce canvas dimensions
   - Lower the quality settings
   - Use fewer frames (higher speed setting)

3. **Text appears cut off**:
   - Increase the canvas width or height
   - Reduce the font size
   - Add line breaks to create multiple lines

### Browser Compatibility
This tool works best in modern browsers. If you encounter issues:
1. Update your browser to the latest version
2. Try a different browser (Chrome, Firefox, Edge, or Safari)
3. Ensure JavaScript is enabled in your browser settings

## Tips for Great Animations

1. **Keep it concise**: Shorter text creates more impactful animations
2. **Mind the speed**: Too fast is hard to read, too slow becomes boring
3. **Consider contrast**: Use colors that stand out against the background
4. **Test different fonts**: Font choice dramatically affects the feel
5. **Export in multiple formats**: Different platforms may require different formats

## Keyboard Shortcuts

- **Space**: Play/Pause preview
- **Ctrl+Z**: Undo last change
- **Ctrl+Shift+Z**: Redo last change
- **Ctrl+S**: Save configuration
- **Ctrl+O**: Open configuration
- **Ctrl+E**: Quick export with current settings 