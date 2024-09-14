# Video Cropper FFMPEG 100% generated with a single ChatGPT o1-preview prompt

This is a desktop application built with **Electron** and **FFmpeg** that allows users to visually select a crop area from the video before converting, and progress is displayed during the conversion process.

## Features
- **Video Preview**: Load an MP4 file and preview it within the app.
- **Crop Selection**: Manually select the area of the video to crop by dragging a selection box.
- **Progress Tracking**: A progress bar indicates the conversion process in real-time.
- **Cropping with Scaling**: The crop area is scaled correctly to match the original video resolution.

## How to Install and Run the App

### Prerequisites
- **Node.js**: Install Node.js (https://nodejs.org/)
- **FFmpeg**: Install FFmpeg on your system and make sure it is accessible from the command line (https://ffmpeg.org/download.html).

### Steps to Run the Project
1. Clone the repository or download the project files.
   ```bash
   git clone https://github.com/your-username/video-converter-app.git
   cd video-converter-app
   ```

2. Install the dependencies using npm:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

### Building the App (Optional)
To package the app into a distributable format:
1. Install **electron-builder**:
   ```bash
   npm install --save-dev electron-builder
   ```

2. Build the app:
   ```bash
   npm run build
   ```

This will generate an installer for the app in the `dist` directory.

## Usage Instructions
1. **Load a video**: Click the "Choose File" button to upload an MP4 video.
2. **Crop the video**: Drag on the video preview to select the portion of the video you'd like to crop.
3. **Convert**: Click the large "Convert" button to start the conversion process. The progress bar will display the status, and the app will notify you when the conversion is complete.

## Dependencies
- **Electron**: Provides the framework for building a cross-platform desktop application.
- **FFmpeg**: Used to handle video conversion and cropping.
- **fluent-ffmpeg**: A Node.js wrapper for FFmpeg, making it easier to work with video processing.

## Known Issues
- Ensure FFmpeg is properly installed and added to your system’s PATH.
- Video preview and crop selection work best with MP4 videos only.

## License
This project is licensed under the MIT License.

## Acknowledgements
This app was generated with the assistance of **ChatGPT**, an AI language model by OpenAI, which provided code snippets, explanations, and project structure.
