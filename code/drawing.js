function processDrawing() {
    if (!rightHandLandmarks) return;

    const indexTip = rightHandLandmarks[8];
    const x = indexTip.x * canvasWidth;
    const y = indexTip.y * canvasHeight;

    if (isPinching(rightHandLandmarks) && !isFist(rightHandLandmarks)) {
        isDrawing = true;
        drawStroke(x, y);
    } else {
        isDrawing = false;
        lastX = 0;
        lastY = 0;
    }
}

function drawStroke(x, y) {
    if (lastX === 0) lastX = x;
    if (lastY === 0) lastY = y;

    const color = isErasing ? '#ffffff' : currentColor;
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    
    strokeHistory.push({
        type: 'line',
        x1: lastX,
        y1: lastY,
        x2: x,
        y2: y,
        color: color,
        brushSize: brushSize,
        opacity: opacity,
        symmetry: symmetryEnabled ? symmetryLines : 1,
        glow: glowEnabled
    });

    const inverseScale = 1 / drawScale;
    
    drawCtx.save();
    drawCtx.translate(cx, cy);
    drawCtx.rotate(drawRotation);
    drawCtx.scale(drawScale, drawScale);
    drawCtx.translate(-cx, -cy);
    
    drawCtx.save();
    drawCtx.strokeStyle = color;
    drawCtx.lineWidth = brushSize * inverseScale;
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.globalAlpha = opacity;
    
    drawCtx.beginPath();
    drawCtx.moveTo(lastX, lastY);
    drawCtx.lineTo(x, y);
    drawCtx.stroke();
    drawCtx.restore();
    
    if (symmetryEnabled && symmetryLines > 1) {
        for (let i = 1; i < symmetryLines; i++) {
            const angle = (Math.PI * 2 / symmetryLines) * i;
            const sx1 = cx + (lastX - cx) * Math.cos(angle) - (lastY - cy) * Math.sin(angle);
            const sy1 = cy + (lastX - cx) * Math.sin(angle) + (lastY - cy) * Math.cos(angle);
            const sx2 = cx + (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle);
            const sy2 = cy + (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle);
            
            drawCtx.save();
            drawCtx.strokeStyle = color;
            drawCtx.lineWidth = brushSize * inverseScale;
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
            drawCtx.globalAlpha = opacity;
            
            drawCtx.beginPath();
            drawCtx.moveTo(sx1, sy1);
            drawCtx.lineTo(sx2, sy2);
            drawCtx.stroke();
            drawCtx.restore();
        }
    }
    
    drawCtx.restore();

    lastX = x;
    lastY = y;
    
    saveDrawingState();
}

function redrawCanvas() {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    
    drawCtx.fillStyle = '#0a0a0a';
    drawCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    drawCtx.save();
    drawCtx.translate(cx, cy);
    drawCtx.rotate(drawRotation);
    drawCtx.scale(drawScale, drawScale);
    drawCtx.translate(-cx, -cy);
    
    const inverseScale = 1 / drawScale;
    
    strokeHistory.forEach(stroke => {
        if (stroke.type === 'line') {
            drawCtx.save();
            drawCtx.strokeStyle = stroke.color;
            drawCtx.lineWidth = stroke.brushSize * inverseScale;
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
            drawCtx.globalAlpha = stroke.opacity;
            
            drawCtx.beginPath();
            drawCtx.moveTo(stroke.x1, stroke.y1);
            drawCtx.lineTo(stroke.x2, stroke.y2);
            drawCtx.stroke();
            drawCtx.restore();
            
            if (stroke.symmetry > 1) {
                for (let i = 1; i < stroke.symmetry; i++) {
                    const angle = (Math.PI * 2 / stroke.symmetry) * i;
                    const sx1 = cx + (stroke.x1 - cx) * Math.cos(angle) - (stroke.y1 - cy) * Math.sin(angle);
                    const sy1 = cy + (stroke.x1 - cx) * Math.sin(angle) + (stroke.y1 - cy) * Math.cos(angle);
                    const sx2 = cx + (stroke.x2 - cx) * Math.cos(angle) - (stroke.y2 - cy) * Math.sin(angle);
                    const sy2 = cy + (stroke.x2 - cx) * Math.sin(angle) + (stroke.y2 - cy) * Math.cos(angle);
                    
                    drawCtx.save();
                    drawCtx.strokeStyle = stroke.color;
                    drawCtx.lineWidth = stroke.brushSize * inverseScale;
                    drawCtx.lineCap = 'round';
                    drawCtx.lineJoin = 'round';
                    drawCtx.globalAlpha = stroke.opacity;
                    
                    drawCtx.beginPath();
                    drawCtx.moveTo(sx1, sy1);
                    drawCtx.lineTo(sx2, sy2);
                    drawCtx.stroke();
                    drawCtx.restore();
                }
            }
        }
    });
    
    drawCtx.restore();
}

function drawLine(x1, y1, x2, y2, color, size, alpha) {
    drawCtx.save();
    drawCtx.strokeStyle = color;
    drawCtx.lineWidth = size;
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.globalAlpha = alpha;

    if (glowEnabled) {
        drawCtx.shadowBlur = size * 2;
        drawCtx.shadowColor = color;
    }

    drawCtx.beginPath();
    drawCtx.moveTo(x1, y1);
    drawCtx.lineTo(x2, y2);
    drawCtx.stroke();

    drawCtx.restore();
}

function drawGlow(x, y, color, size) {
    drawCtx.save();
    drawCtx.fillStyle = color;
    drawCtx.globalAlpha = 0.3 * opacity;
    drawCtx.shadowBlur = size * 3;
    drawCtx.shadowColor = color;
    drawCtx.beginPath();
    drawCtx.arc(x, y, size, 0, Math.PI * 2);
    drawCtx.fill();
    drawCtx.restore();
}

function saveDrawingState() {
    if (drawingHistory.length > 50) drawingHistory.shift();
    if (drawingHistory.length === 0 || drawingHistory[drawingHistory.length - 1] !== drawCanvas.toDataURL()) {
        drawingHistory.push(drawCanvas.toDataURL());
    }
}

function undoDrawing() {
    if (drawingHistory.length > 1) {
        drawingHistory.pop();
        const img = new Image();
        img.src = drawingHistory[drawingHistory.length - 1];
        img.onload = () => {
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            drawCtx.drawImage(img, 0, 0);
        };
    }
}

function clearCanvas() {
    drawCtx.fillStyle = '#0a0a0a';
    drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    strokeHistory = [];
    drawingHistory = [];
    lastX = 0;
    lastY = 0;
    drawScale = 1;
    drawRotation = 0;
    saveDrawingState();
}