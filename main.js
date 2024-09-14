
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('convert-video', (event, { filePath, cropParams }) => {
    const outputPath = 'output.mp4';
    const { startX, startY, width, height } = cropParams;

    const conversion = ffmpeg(filePath)
        .videoFilters(`crop=${width}:${height}:${startX}:${startY}`)
        .save(outputPath);

    // Track progress and send updates to the renderer process
    conversion.on('progress', (progress) => {
        event.reply('conversion-progress', progress.percent);
    });

    // Notify the frontend when the process is complete
    conversion.on('end', () => {
        event.reply('conversion-done', outputPath);
    });
});
