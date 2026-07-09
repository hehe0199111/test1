function updateUI() {
    if (cameraRunning) {
        document.getElementById('detectionStatus').textContent = '✓ 运行中';
        document.getElementById('detectionStatus').style.color = '#00ff00';
    }
}

function animate() {
    uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    
    if (cameraRunning && video.readyState === video.HAVE_ENOUGH_DATA) {
        bgCtx.save();
        bgCtx.translate(canvasWidth, 0);
        bgCtx.scale(-1, 1);
        bgCtx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
        bgCtx.restore();
    }
    
    if (rightHandLandmarks) {
        drawHandSkeleton(rightHandLandmarks, uiCtx, '#ff1493');
    }
    if (leftHandLandmarks) {
        drawHandSkeleton(leftHandLandmarks, uiCtx, '#00ffff');
    }

    updateUI();
    frameCount++;
    if (cameraRunning && !isProcessing && hands && frameCount % 2 === 0) {
        isProcessing = true;
        hands.send({image: video}).then(() => {
            isProcessing = false;
        }).catch(err => {
            isProcessing = false;
        });
    }

    requestAnimationFrame(animate);
}

function drawHandSkeleton(landmarks, ctx, color) {
    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [5, 6], [6, 7], [7, 8],
        [0, 9], [9, 10], [10, 11], [11, 12],
        [0, 13], [13, 14], [14, 15], [15, 16],
        [0, 17], [17, 18], [18, 19], [19, 20]
    ];

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (const [start, end] of connections) {
        const p1 = landmarks[start];
        const p2 = landmarks[end];

        ctx.beginPath();
        ctx.moveTo(p1.x * canvasWidth, p1.y * canvasHeight);
        ctx.lineTo(p2.x * canvasWidth, p2.y * canvasHeight);
        ctx.stroke();
    }

    for (let i = 0; i < landmarks.length; i++) {
        const p = landmarks[i];
        ctx.fillStyle = i === 8 ? '#ffff00' : color;
        ctx.beginPath();
        ctx.arc(p.x * canvasWidth, p.y * canvasHeight, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}