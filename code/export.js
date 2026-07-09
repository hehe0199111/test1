function savePNG() {
    const link = document.createElement('a');
    link.download = `剪纸-${Date.now()}.png`;
    link.href = drawCanvas.toDataURL('image/png');
    link.click();
}

function saveSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", canvasWidth);
    svg.setAttribute("height", canvasHeight);
    svg.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);

    const bgRect = document.createElementNS(svgNS, "rect");
    bgRect.setAttribute("width", canvasWidth);
    bgRect.setAttribute("height", canvasHeight);
    bgRect.setAttribute("fill", "#1a1a2e");
    svg.appendChild(bgRect);

    const imgData = drawCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 128) {
            const pixelIndex = i / 4;
            const x = pixelIndex % canvasWidth;
            const y = Math.floor(pixelIndex / canvasWidth);

            const rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", "1");
            rect.setAttribute("height", "1");
            rect.setAttribute("fill", `rgb(${data[i]},${data[i+1]},${data[i+2]})`);
            svg.appendChild(rect);
        }
    }

    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `剪纸-${Date.now()}.svg`;
    link.click();
}