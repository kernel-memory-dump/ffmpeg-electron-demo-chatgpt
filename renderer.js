const { ipcRenderer } = require('electron');
const fileInput = document.getElementById('fileInput');
const videoPreview = document.getElementById('videoPreview');
const convertBtn = document.getElementById('convertBtn');
const statusText = document.getElementById('status');
const cropCanvas = document.getElementById('cropCanvas');
const progressBar = document.getElementById('progressBar');
let filePath = '';
let startX, startY, endX, endY, videoWidth, videoHeight;

// Progress bar setup
progressBar.max = 100;
progressBar.value = 0;

// Update canvas dimensions when video is loaded
videoPreview.addEventListener('loadedmetadata', () => {
   videoWidth = videoPreview.videoWidth;
   videoHeight = videoPreview.videoHeight;
   cropCanvas.width = videoPreview.offsetWidth;
   cropCanvas.height = videoPreview.offsetHeight;
});

// Handle file selection and load video
fileInput.addEventListener('change', (event) => {
   const file = event.target.files[0];
   filePath = file.path;
   videoPreview.src = URL.createObjectURL(file);
});

// Track mouse events for cropping
cropCanvas.addEventListener('mousedown', (e) => {
   startX = e.offsetX;
   startY = e.offsetY;
});
cropCanvas.addEventListener('mousemove', (e) => {
   if (e.buttons !== 1) return;
   const ctx = cropCanvas.getContext('2d');
   ctx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
   ctx.strokeStyle = 'red';
   endX = e.offsetX;
   endY = e.offsetY;
   ctx.strokeRect(startX, startY, endX - startX, endY - startY);
});
cropCanvas.addEventListener('mouseup', () => {
   const cropWidth = endX - startX;
   const cropHeight = endY - startY;
   statusText.textContent = `Selected Crop Area: (${startX}, ${startY}) to (${endX}, ${endY})`;
});

// Handle the convert button click
convertBtn.addEventListener('click', () => {
   if (!filePath) {
      statusText.textContent = 'Please upload a file!';
      return;
   }
   const displayWidth = cropCanvas.width;
   const displayHeight = cropCanvas.height;

   // Scale crop coordinates to match the actual video resolution
   const scaleX = videoWidth / displayWidth;
   const scaleY = videoHeight / displayHeight;

   const scaledStartX = Math.round(startX * scaleX);
   const scaledStartY = Math.round(startY * scaleY);
   const scaledWidth = Math.round((endX - startX) * scaleX);
   const scaledHeight = Math.round((endY - startY) * scaleY);

   statusText.textContent = 'Converting...';
   progressBar.value = 0;

   const cropParams = {
      startX: scaledStartX,
      startY: scaledStartY,
      width: scaledWidth,
      height: scaledHeight
   };

   ipcRenderer.send('convert-video', { filePath, cropParams });
});

// Update progress as the conversion happens
ipcRenderer.on('conversion-progress', (event, percent) => {
   progressBar.value = percent;
   statusText.textContent = `Converting... ${Math.round(percent)}% complete`;
});

// Notify the user when conversion is done
ipcRenderer.on('conversion-done', (event, outputPath) => {
   progressBar.value = 100;
   statusText.textContent = `Conversion completed! File saved at ${outputPath}`;
});
