const video = document.getElementById('video');
const drawCanvas = document.getElementById('drawCanvas');
const bgCanvas = document.getElementById('bgCanvas');
const uiCanvas = document.getElementById('uiCanvas');

let drawCtx, bgCtx, uiCtx;

let hands;
let cameraRunning = false;
let isDrawing = false;
let isErasing = false;
let currentColor = '#dc143c';
let brushSize = 15;
let opacity = 1.0;
let symmetryEnabled = true;
let symmetryLines = 4;
let glowEnabled = true;
let lastX = 0, lastY = 0;
let canvasWidth = 800, canvasHeight = 600;
let drawingHistory = [];

let leftHandLandmarks = null;
let rightHandLandmarks = null;
let currentGesture = '';
let lastTwoFingerDistance = 0;
let lastRightHandPos = null;
let lastLeftHandPos = null;
let isProcessing = false;
let drawScale = 1;
let drawRotation = 0;
let strokeHistory = [];

let redrawTimeout = null;
let frameCount = 0;