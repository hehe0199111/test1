async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        });
        
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                canvasWidth = video.videoWidth || 800;
                canvasHeight = video.videoHeight || 600;
                video.play().then(() => {
                    cameraRunning = true;
                    drawCanvas.width = bgCanvas.width = uiCanvas.width = canvasWidth;
                    drawCanvas.height = bgCanvas.height = uiCanvas.height = canvasHeight;
                    drawCtx = drawCanvas.getContext('2d', { willReadFrequently: true });
                    bgCtx = bgCanvas.getContext('2d');
                    uiCtx = uiCanvas.getContext('2d');
                    console.log('视频元素:', video);
                    console.log('视频元素样式:', getComputedStyle(video));
                    console.log('视频元素可见性:', video.offsetParent);
                    console.log('视频元素尺寸:', video.offsetWidth, 'x', video.offsetHeight);
                    console.log('视频元素实际尺寸:', video.videoWidth, 'x', video.videoHeight);
                    console.log('canvas-wrapper尺寸:', document.querySelector('.canvas-wrapper').offsetWidth, 'x', document.querySelector('.canvas-wrapper').offsetHeight);
                    console.log('canvas-container尺寸:', document.querySelector('.canvas-container').offsetWidth, 'x', document.querySelector('.canvas-container').offsetHeight);
                    resolve();
                }).catch(err => {
                    throw new Error('视频播放失败: ' + err.message);
                });
            };
        });
    } catch (error) {
        throw new Error('摄像头访问失败: ' + error.message);
    }
}

function setupCanvases() {
    drawCanvas.width = bgCanvas.width = uiCanvas.width = canvasWidth;
    drawCanvas.height = bgCanvas.height = uiCanvas.height = canvasHeight;
    
    saveDrawingState();
}

async function setupMediaPipe() {
    if (!window.Hands) {
        throw new Error('MediaPipe Hands 库未加载，请检查网络连接');
    }

    return new Promise((resolve, reject) => {
        hands = new window.Hands({
            locateFile: (file) => file
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 0,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults(onHandsResults);
        
        hands.initialize().then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}