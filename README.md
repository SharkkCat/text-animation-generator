# Text Animation Generator

A lightweight browser-based tool for creating animated text that spells out character by character. The tool also supports icons, custom fonts, and exports to GIF or video formats.

## Features

- **Text Animation Control**: Define text content, dimensions, speed, and style
- **Font Customization**: Choose from various fonts and sizes
- **Icon Integration**: Add icons alongside your text
- **Animation Preview**: See your animation in real-time before exporting
- **Export Options**: Save your animation as GIF or common video formats
- **Fully Client-Side**: Runs entirely in the browser with no server dependencies

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/text-animation-generator.git
   cd text-animation-generator
   ```

2. Open `index.html` in your browser, or serve it with a local server:
   ```
   # Using Python's built-in server
   python -m http.server
   
   # Or with Node.js
   npx serve
   ```

3. Access the tool at `http://localhost:8000` (or the port provided by your server)

## Usage

1. **Set Text**: Enter the text you want to animate in the text input field
2. **Customize Appearance**: Select font, size, and colors using the control panel
3. **Adjust Animation**: Set the animation speed and any special effects
4. **Preview**: Watch the preview to verify your animation looks correct
5. **Export**: Choose your preferred format (GIF/MP4/WebM) and export your animation

## Browser Compatibility

The Text Animation Generator works in modern browsers that support the Canvas API:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Development

This project follows a modular structure to make it easy to understand and extend.

For more detailed information, refer to:
- [Technical Architecture](technical-architecture.md)
- [File Structure](file-structure.md)
- [Implementation Approach](implementation-approach.md)

## Dependencies

The only external dependencies are:

- [gif.js](https://github.com/jnordberg/gif.js) - For GIF generation
- [CanvasCapture.js](https://github.com/amandaghassaei/canvas-capture) - For video export

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 