function loadPattern(type) {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const size = Math.min(canvasWidth, canvasHeight) * 0.25;
    
    clearCanvas();
    
    const patterns = {
        flower: generateFlowerPattern(cx, cy, size),
        snowflake: generateSnowflakePattern(cx, cy, size),
        spiral: generateSpiralPattern(cx, cy, size),
        circle: generateCirclePattern(cx, cy, size),
        diamond: generateDiamondPattern(cx, cy, size),
        star: generateStarPattern(cx, cy, size)
    };
    
    const pattern = patterns[type] || generateFlowerPattern(cx, cy, size);
    
    pattern.forEach(line => {
        strokeHistory.push({
            type: 'line',
            x1: line.x1,
            y1: line.y1,
            x2: line.x2,
            y2: line.y2,
            color: currentColor,
            brushSize: brushSize,
            opacity: opacity,
            symmetry: 1,
            glow: glowEnabled
        });
    });
    
    redrawCanvas();
    saveDrawingState();
}

function generateFlowerPattern(cx, cy, size) {
    const lines = [];
    const petals = 8;
    for (let i = 0; i < petals; i++) {
        const angle = (Math.PI * 2 / petals) * i;
        const innerR = size * 0.3;
        const outerR = size;
        
        const x1 = cx + innerR * Math.cos(angle);
        const y1 = cy + innerR * Math.sin(angle);
        const x2 = cx + outerR * Math.cos(angle);
        const y2 = cy + outerR * Math.sin(angle);
        lines.push({ x1, y1, x2, y2 });
        
        const cpAngle = angle + Math.PI / petals;
        const cpR = size * 0.7;
        const cpX = cx + cpR * Math.cos(cpAngle);
        const cpY = cy + cpR * Math.sin(cpAngle);
        
        for (let j = 0; j < 5; j++) {
            const t1 = j / 5;
            const t2 = (j + 1) / 5;
            const bx1 = (1 - t1) * (1 - t1) * x1 + 2 * (1 - t1) * t1 * cpX + t1 * t1 * x2;
            const by1 = (1 - t1) * (1 - t1) * y1 + 2 * (1 - t1) * t1 * cpY + t1 * t1 * y2;
            const bx2 = (1 - t2) * (1 - t2) * x1 + 2 * (1 - t2) * t2 * cpX + t2 * t2 * x2;
            const by2 = (1 - t2) * (1 - t2) * y1 + 2 * (1 - t2) * t2 * cpY + t2 * t2 * y2;
            lines.push({ x1: bx1, y1: by1, x2: bx2, y2: by2 });
        }
    }
    return lines;
}

function generateSnowflakePattern(cx, cy, size) {
    const lines = [];
    const arms = 6;
    for (let i = 0; i < arms; i++) {
        const angle = (Math.PI * 2 / arms) * i;
        
        const x1 = cx;
        const y1 = cy;
        const x2 = cx + size * Math.cos(angle);
        const y2 = cy + size * Math.sin(angle);
        lines.push({ x1, y1, x2, y2 });
        
        for (let j = 1; j <= 3; j++) {
            const r = size * (j / 4);
            const px = cx + r * Math.cos(angle);
            const py = cy + r * Math.sin(angle);
            
            const bx1 = px + r * 0.3 * Math.cos(angle + Math.PI / 2);
            const by1 = py + r * 0.3 * Math.sin(angle + Math.PI / 2);
            const bx2 = px + r * 0.3 * Math.cos(angle - Math.PI / 2);
            const by2 = py + r * 0.3 * Math.sin(angle - Math.PI / 2);
            lines.push({ x1: bx1, y1: by1, x2: px, y2: py });
            lines.push({ x1: bx2, y1: by2, x2: px, y2: py });
        }
    }
    return lines;
}

function generateSpiralPattern(cx, cy, size) {
    const lines = [];
    const turns = 3;
    const points = 120;
    let lastX = cx, lastY = cy;
    
    for (let i = 1; i <= points; i++) {
        const t = i / points;
        const angle = t * Math.PI * 2 * turns;
        const r = size * t;
        
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        lines.push({ x1: lastX, y1: lastY, x2: x, y2: y });
        lastX = x;
        lastY = y;
    }
    return lines;
}

function generateCirclePattern(cx, cy, size) {
    const lines = [];
    const circles = 5;
    
    for (let i = 1; i <= circles; i++) {
        const r = size * (i / circles);
        const points = 60;
        let lastX = cx + r, lastY = cy;
        
        for (let j = 1; j <= points; j++) {
            const angle = (j / points) * Math.PI * 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            lines.push({ x1: lastX, y1: lastY, x2: x, y2: y });
            lastX = x;
            lastY = y;
        }
    }
    
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const x1 = cx - size * Math.cos(angle);
        const y1 = cy - size * Math.sin(angle);
        const x2 = cx + size * Math.cos(angle);
        const y2 = cy + size * Math.sin(angle);
        lines.push({ x1, y1, x2, y2 });
    }
    return lines;
}

function generateDiamondPattern(cx, cy, size) {
    const lines = [];
    const layers = 4;
    
    for (let i = 1; i <= layers; i++) {
        const s = size * (i / layers);
        const points = [
            { x: cx, y: cy - s },
            { x: cx + s, y: cy },
            { x: cx, y: cy + s },
            { x: cx - s, y: cy }
        ];
        
        for (let j = 0; j < 4; j++) {
            const p1 = points[j];
            const p2 = points[(j + 1) % 4];
            lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
        }
    }
    
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI * 2 / 4) * i + Math.PI / 4;
        const x1 = cx;
        const y1 = cy;
        const x2 = cx + size * Math.cos(angle);
        const y2 = cy + size * Math.sin(angle);
        lines.push({ x1, y1, x2, y2 });
    }
    return lines;
}

function generateStarPattern(cx, cy, size) {
    const lines = [];
    const points = 8;
    
    for (let i = 0; i < points; i++) {
        const angle1 = (Math.PI * 2 / points) * i;
        const angle2 = (Math.PI * 2 / points) * (i + points / 2);
        
        const x1 = cx + size * Math.cos(angle1);
        const y1 = cy + size * Math.sin(angle1);
        const x2 = cx + size * Math.cos(angle2);
        const y2 = cy + size * Math.sin(angle2);
        lines.push({ x1, y1, x2, y2 });
        
        const innerR = size * 0.4;
        const ix = cx + innerR * Math.cos(angle1);
        const iy = cy + innerR * Math.sin(angle1);
        lines.push({ x1: cx, y1: cy, x2: ix, y2: iy });
    }
    
    for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 / points) * i + Math.PI / points;
        const x1 = cx + size * 0.5 * Math.cos(angle);
        const y1 = cy + size * 0.5 * Math.sin(angle);
        const x2 = cx + size * 0.7 * Math.cos(angle);
        const y2 = cy + size * 0.7 * Math.sin(angle);
        lines.push({ x1, y1, x2, y2 });
    }
    return lines;
}

function generateSymmetry() {
    const pattern = generatePattern(canvasWidth / 2, canvasHeight / 2, 80);
    saveDrawingState();

    for (let i = 0; i < symmetryLines; i++) {
        const angle = (Math.PI * 2 / symmetryLines) * i;
        drawRotatedPattern(pattern, canvasWidth / 2, canvasHeight / 2, angle);
    }
}

function generatePattern(cx, cy, size) {
    const points = [];
    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i;
        const r = size * (0.5 + 0.5 * Math.sin(i * Math.PI / 6));
        points.push({
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        });
    }
    return points;
}

function drawRotatedPattern(pattern, cx, cy, angle) {
    drawCtx.save();
    drawCtx.strokeStyle = currentColor;
    drawCtx.lineWidth = brushSize;
    drawCtx.lineCap = 'round';

    for (let i = 0; i < pattern.length; i++) {
        const p1 = pattern[i];
        const p2 = pattern[(i + 1) % pattern.length];

        const x1 = cx + (p1.x - cx) * Math.cos(angle) - (p1.y - cy) * Math.sin(angle);
        const y1 = cy + (p1.x - cx) * Math.sin(angle) + (p1.y - cy) * Math.cos(angle);
        const x2 = cx + (p2.x - cx) * Math.cos(angle) - (p2.y - cy) * Math.sin(angle);
        const y2 = cy + (p2.x - cx) * Math.sin(angle) + (p2.y - cy) * Math.cos(angle);

        drawCtx.beginPath();
        drawCtx.moveTo(x1, y1);
        drawCtx.lineTo(x2, y2);
        drawCtx.stroke();
    }

    drawCtx.restore();
}