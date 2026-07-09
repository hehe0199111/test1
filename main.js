async function initialize() {
    try {
        document.getElementById('detectionStatus').textContent = '📦 加载模型...';
        document.getElementById('detectionStatus').style.color = '#ffff00';
        
        await setupMediaPipe();
        
        setupCanvases();
        setupEventListeners();
        
        document.getElementById('detectionStatus').textContent = '🔘 点击按钮启动摄像头';
        document.getElementById('detectionStatus').style.color = '#00ffff';
        
        const startBtn = document.createElement('button');
        startBtn.textContent = '📷 启动摄像头';
        startBtn.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px 40px;font-size:18px;z-index:100;border-radius:12px;background:linear-gradient(135deg,#00ffff,#00ff88);color:#000;font-weight:bold;cursor:pointer;box-shadow:0 0 30px rgba(0,255,255,0.5);';
        startBtn.onclick = async () => {
            startBtn.remove();
            await startCameraAndRun();
        };
        document.querySelector('.canvas-container').appendChild(startBtn);
        
    } catch (error) {
        console.error('初始化失败:', error);
        console.log('window.vision:', window.vision);
        document.getElementById('detectionStatus').textContent = '❌ 初始化失败: ' + error.message;
        document.getElementById('detectionStatus').style.color = '#ff4444';
    }
}

async function startCameraAndRun() {
    try {
        document.getElementById('detectionStatus').textContent = '📷 启动摄像头...';
        document.getElementById('detectionStatus').style.color = '#ffff00';
        
        await setupCamera();
        
        document.getElementById('detectionStatus').textContent = '✓ 运行中';
        document.getElementById('detectionStatus').style.color = '#00ff00';
        
        animate();
    } catch (error) {
        console.error('启动摄像头失败:', error);
        
        if (error.message.includes('Permission denied')) {
            document.getElementById('detectionStatus').textContent = '❌ 摄像头权限被拒绝';
            document.getElementById('detectionStatus').style.color = '#ffaa00';
            alert('摄像头访问被拒绝！\n\n请按照以下步骤操作：\n1. 点击浏览器地址栏左侧的锁图标\n2. 在弹出的菜单中找到摄像头权限\n3. 将权限设置为"允许"\n4. 点击刷新按钮重试');
        } else {
            document.getElementById('detectionStatus').textContent = '❌ 启动失败: ' + error.message;
            document.getElementById('detectionStatus').style.color = '#ff4444';
        }
    }
}

function setupEventListeners() {
    document.getElementById('brushSize').addEventListener('change', (e) => {
        brushSize = parseInt(e.target.value);
        document.getElementById('sizeValue').textContent = brushSize;
    });

    document.getElementById('opacity').addEventListener('change', (e) => {
        opacity = parseInt(e.target.value) / 100;
        document.getElementById('opacityValue').textContent = parseInt(e.target.value);
    });

    document.getElementById('symmetry').addEventListener('change', (e) => {
        symmetryEnabled = e.target.checked;
    });

    document.getElementById('symmetryLines').addEventListener('change', (e) => {
        symmetryLines = parseInt(e.target.value);
        document.getElementById('symmetryValue').textContent = symmetryLines;
    });

    document.getElementById('glow').addEventListener('change', (e) => {
        glowEnabled = e.target.checked;
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentColor = this.dataset.color;
        });
    });
}

initialize();