function onHandsResults(results) {
    leftHandLandmarks = null;
    rightHandLandmarks = null;

    if (results.multiHandLandmarks && results.multiHandedness) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
            const landmarks = results.multiHandLandmarks[i];
            const handedness = results.multiHandedness[i].label;

            if (handedness === 'Left') {
                leftHandLandmarks = landmarks;
            } else {
                rightHandLandmarks = landmarks;
            }
        }
    }

    detectGestures();
    processDrawing();
}

function detectGestures() {
    currentGesture = '';
    document.querySelectorAll('.gesture-item').forEach(el => el.classList.remove('active'));

    if (rightHandLandmarks) {
        if (isFist(rightHandLandmarks)) {
            currentGesture = 'fist';
            document.getElementById('gesture-fist').classList.add('active');
            isErasing = true;
        } else if (isOpenPalm(rightHandLandmarks)) {
            currentGesture = 'open';
            document.getElementById('gesture-open').classList.add('active');
            isErasing = false;
        } else if (isPinching(rightHandLandmarks)) {
            currentGesture = 'pinch';
            document.getElementById('gesture-pinch').classList.add('active');
            isErasing = false;
        } else {
            currentGesture = 'idle';
            isErasing = false;
        }
    }

    if (leftHandLandmarks && rightHandLandmarks) {
        const distance = getDistance(rightHandLandmarks[9], leftHandLandmarks[9]);
        if (distance < 0.3) {
            currentGesture = 'two-finger';
            document.getElementById('gesture-two').classList.add('active');
            isDrawing = false;
            lastX = 0;
            lastY = 0;
            handleTwoFingerGesture();
        }
        lastTwoFingerDistance = distance;
    }

    document.getElementById('gestureStatus').textContent = currentGesture || '-';
    document.getElementById('modeStatus').textContent = isDrawing ? '✏️ 绘制中' : '⏸️ 暂停';
}

function isFist(landmarks) {
    const fingerTips = [8, 12, 16, 20];
    const wrist = landmarks[0];
    let closedCount = 0;

    for (let tip of fingerTips) {
        const distance = getDistance(wrist, landmarks[tip]);
        if (distance < 0.15) closedCount++;
    }

    return closedCount >= 3;
}

function isOpenPalm(landmarks) {
    const fingerTips = [8, 12, 16, 20];
    const wrist = landmarks[0];
    let openCount = 0;

    for (let tip of fingerTips) {
        const distance = getDistance(wrist, landmarks[tip]);
        if (distance > 0.25) openCount++;
    }

    return openCount >= 3;
}

function isPinching(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const distance = getDistance(thumbTip, indexTip);
    return distance < 0.05;
}

function getDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function handleTwoFingerGesture() {
    const currRight = rightHandLandmarks[9];
    const currLeft = leftHandLandmarks[9];
    
    if (!lastRightHandPos || !lastLeftHandPos) {
        lastRightHandPos = { x: currRight.x, y: currRight.y };
        lastLeftHandPos = { x: currLeft.x, y: currLeft.y };
        return;
    }

    const currDist = getDistance(currRight, currLeft);
    const prevDist = getDistance(lastRightHandPos, lastLeftHandPos);
    
    let needsRedraw = false;
    
    if (prevDist > 0) {
        const scaleFactor = currDist / prevDist;
        if (Math.abs(scaleFactor - 1) > 0.005) {
            drawScale = Math.max(0.1, Math.min(5, drawScale * scaleFactor));
            needsRedraw = true;
        }
    }

    const currAngle = Math.atan2(currRight.y - currLeft.y, currRight.x - currLeft.x);
    const prevAngle = Math.atan2(lastRightHandPos.y - lastLeftHandPos.y, lastRightHandPos.x - lastLeftHandPos.x);
    const angleDiff = currAngle - prevAngle;
    if (Math.abs(angleDiff) > 0.01) {
        drawRotation += angleDiff;
        needsRedraw = true;
    }

    if (needsRedraw) {
        scheduleRedraw();
    }

    lastRightHandPos = { x: currRight.x, y: currRight.y };
    lastLeftHandPos = { x: currLeft.x, y: currLeft.y };
}

function scheduleRedraw() {
    if (redrawTimeout) clearTimeout(redrawTimeout);
    redrawTimeout = setTimeout(() => {
        redrawCanvas();
        redrawTimeout = null;
    }, 16);
}