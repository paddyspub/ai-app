# AI App - WebML & TensorFlow.js

A Next.js application demonstrating Web Machine Learning capabilities with TensorFlow.js and WebML/WebNN integration.

## Features

- **TensorFlow.js Integration**: Run machine learning models directly in the browser
- **WebML/WebNN Support**: Hardware-accelerated neural network inference with polyfill fallback
- **Image Classification Demo**: Upload and classify images using neural networks
- **Interactive Demos**: Multiple components showcasing different ML capabilities
- **Modern UI**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **ML Libraries**: 
  - TensorFlow.js (CPU and WebGL backends)
  - WebNN polyfill for hardware acceleration
- **UI**: React 19, TypeScript, Tailwind CSS
- **Development**: ESLint, TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Demo Components

### 1. TensorFlow.js Basic Demo
- Detects available TensorFlow.js backends
- Creates and runs simple neural network models
- Shows system information and WebML support status

### 2. WebML (WebNN) Demo
- Tests for native WebNN API support
- Falls back to WebNN polyfill when needed
- Demonstrates ML context creation and management

### 3. Image Classification Demo
- Upload images for classification
- Uses TensorFlow.js for browser-based inference
- Processes images with neural networks

## WebML/WebNN Benefits

- **Hardware Acceleration**: Utilizes GPU, NPU, and specialized ML hardware
- **Privacy**: All processing happens locally, no data leaves the device
- **Performance**: Optimized inference with dedicated hardware
- **Cross-platform**: Works across different browsers and platforms

## Browser Compatibility

- **Chrome/Edge**: WebGL backend, experimental WebNN support
- **Firefox**: CPU and WebGL backends
- **Safari**: WebGL backend support
- **All Browsers**: Polyfill fallback ensures compatibility

## Development

### Project Structure

```
ai-app/
├── app/
│   ├── components/          # React components
│   │   ├── ModelDemo.tsx           # TensorFlow.js demo
│   │   ├── WebMLDemo.tsx           # WebML/WebNN demo
│   │   └── ImageClassificationDemo.tsx # Image classification
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
└── next.config.ts           # Next.js configuration
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

The app is configured to:
- Support TensorFlow.js with optimal backend selection
- Handle WebAssembly modules for ML operations
- Provide TypeScript support for WebNN APIs
- Optimize bundle size for ML libraries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Resources

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [WebNN API Specification](https://www.w3.org/TR/webnn/)
- [Next.js Documentation](https://nextjs.org/docs)
- [WebML Community](https://github.com/webmachinelearning)
