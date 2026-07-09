# 非遗剪纸手势交互绘图系统 - 使用指南

## 📋 系统功能

这是一个基于 MediaPipe 手部识别的非遗剪纸绘图系统，支持以下核心功能：

### 1. 🎨 手势识别功能

| 手势 | 功能 | 颜色 |
|------|------|------|
| ✊ **握拳** | 切换为镂空模式 | 黑色 (#000000) |
| ✋ **摊手** | 切换为填充模式 | 红色 (#dc143c) |
| ✌️ **捏合** | 开始/停止绘制 | 当前色 |
| ☝️ **双指** | 缩放和旋转图案 | - |

### 2. 🖌️ 绘图功能

- **单指绘制**：用右手食指的捏合手势绘制剪纸轮廓
- **对称模式**：实时生成传统对称剪纸图案（2-8 折对称）
- **双指操作**：双手靠近可以进行缩放和旋转操作
- **发光效果**：笔画具有实时发光效果

### 3. 🎭 传统剪纸效果

- **对称剪纸**：自动沿中心轴生成对称图案
- **镂空与填充**：
  - 握拳：纯黑色镂空效果
  - 摊手：红色纯色填充
- **传统配色**：深红、紫红、橙红、金色等非遗传统色

### 4. 💾 导出功能

- **PNG 导出**：保存为高分辨率 PNG 图像
- **SVG 导出**：保存为矢量格式（可无限缩放）

## 🚀 快速开始

### 1. 打开程序
在浏览器中打开 `hand-art-2.html` 文件

### 2. 允许摄像头访问
首次运行会提示允许摄像头访问权限，点击"允许"

### 3. 等待识别
页面左侧显示 "✓ 运行中" 表示系统已准备好

### 4. 开始创作

**基础绘制步骤：**
1. 用右手做**捏合手势**（拇指+食指接近）开始绘制
2. 手指移动时会在画布上绘制线条
3. 张开手指停止绘制
4. 系统会自动在对称轴上生成对称图案

## 🎯 高级技巧

### 切换绘画模式

```
握拳 3 秒  → 镂空模式（黑色）
摊手 3 秒  → 填充模式（红色）
```

### 调整效果参数

**左侧控制面板：**
- 笔刷大小：2-80px
- 不透明度：0-100%
- 对称线数：2-8 折
- 开启/关闭发光效果

### 生成对称纹样

1. 点击"生成对称"按钮
2. 系统会自动生成梅花形对称图案
3. 可设置对称线数来改变对称倍数

### 快速操作

| 操作 | 效果 |
|------|------|
| 清除 | 清空当前画布 |
| 撤销 | 撤销上一步操作 |
| 保存 PNG | 导出为图像文件 |
| 保存 SVG | 导出为矢量文件 |

## 🎨 颜色选择

点击右侧面板的四个圆形颜色按钮选择：
- 🔴 深红（#dc143c）- 传统剪纸红
- 💜 紫红（#ff1493）- 装饰色
- 🟠 橙红（#ff4500）- 鲜艳色
- 🟡 金色（#ffd700）- 贵族色

## 💡 创意建议

### 创作传统纹样

1. **梅花纹**
   - 设置对称线数为 4
   - 用小笔刷绘制

2. **双龙纹**
   - 使用 2 折对称（中心对称）
   - 绘制龙形轮廓

3. **福字剪纸**
   - 设置对称线数为 4
   - 手绘福字笔画

4. **蝴蝶纹**
   - 使用 2 折对称
   - 绘制蝴蝶翅膀

### 叠加效果

1. 先用黑色绘制镂空主体
2. 再用红色绘制装饰纹样
3. 可用金色描边或添加细节

## ⚙️ 技术规格

- **手部识别**：MediaPipe Hands（21 个关键点检测）
- **渲染方式**：HTML5 Canvas 实时绘制
- **绘图精度**：根据摄像头分辨率自适应
- **支持**：所有现代浏览器（Chrome、Firefox、Safari、Edge）

## 🐛 故障排除

### 摄像头无法访问
- 检查浏览器权限设置
- 确保允许了摄像头访问
- 尝试重新加载页面

### 手势识别不准确
- 确保手部清晰可见
- 光线充足
- 手部距离摄像头 30-60cm 最佳

### 绘图卡顿
- 减少对称线数
- 关闭发光效果
- 关闭浏览器中的其他标签页

## 📱 设备要求

- **摄像头**：前置摄像头（1280×720 或更高分辨率）
- **浏览器**：支持 WebRTC 和 Canvas API
- **网络**：需要联网下载 MediaPipe 库

## 🎓 学习资源

了解更多关于 MediaPipe 的信息：
- https://mediapipe.dev/

## 📦 依赖说明

### 核心依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| MediaPipe Hands | 0.10.x | 手部关键点检测和手势识别 |
| MediaPipe Tasks Vision | CDN | 计算机视觉模型推理 |
| WebRTC | 浏览器内置 | 摄像头视频流获取 |
| HTML5 Canvas | 浏览器内置 | 实时绘图和渲染 |

### 外部资源（CDN）

程序运行时会自动从 CDN 加载以下资源：
- `https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js`
- `https://cdn.jsdelivr.net/npm/@mediapipe/camera/camera.js`

### Python 依赖（可选）

用于启动本地 HTTP 服务器：
- Python 3.x
- `http.server`（内置模块）
- `mediapipe`（可选，用于 Python 开发）

## �️ 环境依赖安装步骤

### 1. Python 环境安装

#### Windows 系统

```powershell
# 检查 Python 版本（需要 3.6+）
python --version

# 如果未安装，从官网下载安装：https://www.python.org/downloads/
# 安装时勾选 "Add Python to PATH"
```

#### macOS / Linux 系统

```bash
# 检查 Python 版本（需要 3.6+）
python3 --version

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3 python3-pip

# macOS (使用 Homebrew)
brew install python3
```

### 2. 安装项目依赖

```bash
# 进入项目目录
cd 工作坊

# 使用 pip 安装依赖
pip install -r requirements.txt

# 或者使用 python -m pip（推荐，确保安装到当前解释器）
python -m pip install -r requirements.txt
```

### 3. 验证安装

```bash
# 验证 Python 环境和标准库模块
python -c "import http.server, socketserver, mimetypes; print('✓ Python 环境验证成功')"
```

## 📊 数据集获取方式

本项目无需额外下载数据集，所有模型文件已包含在项目目录中：

### 模型文件清单

| 文件 | 大小 | 获取方式 |
|------|------|----------|
| `hands.js` | ~200KB | 项目自带 |
| `hands.binarypb` | ~2.5MB | 项目自带 |
| `hand_landmark_lite.tflite` | ~3.5MB | 项目自带 |
| `hands_solution_wasm_bin.js` | ~150KB | 项目自带 |
| `hands_solution_wasm_bin.wasm` | ~1.2MB | 项目自带 |
| `hands_solution_simd_wasm_bin.js` | ~150KB | 项目自带 |
| `hands_solution_simd_wasm_bin.wasm` | ~1.5MB | 项目自带 |
| `hands_solution_packed_assets.data` | ~500KB | 项目自带 |
| `hands_solution_packed_assets_loader.js` | ~50KB | 项目自带 |

### 模型更新

如需更新模型文件，可从以下官方渠道获取：

1. **MediaPipe Hands GitHub 仓库**
   - https://github.com/google/mediapipe/tree/master/mediapipe/solutions/hands

2. **CDN 资源**
   - `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.10.0/`

## 🚀 运行启动命令

### 方式一：使用项目自带服务器（推荐）

```bash
# Windows PowerShell
cd 工作坊
python server.py

# macOS / Linux
cd 工作坊
python3 server.py
```

启动后在浏览器访问：`http://localhost:8000/hand-art.html`

### 方式二：使用 Python 内置服务器

```bash
# Windows PowerShell
cd 工作坊
python -m http.server 8000

# macOS / Linux
cd 工作坊
python3 -m http.server 8000
```

启动后在浏览器访问：`http://localhost:8000/hand-art.html`

### 方式三：使用其他 HTTP 服务器

#### Node.js (http-server)

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
cd 工作坊
http-server -p 8000 -c-1
```

#### PHP 内置服务器

```bash
cd 工作坊
php -S localhost:8000
```

### 启动成功验证

服务器启动成功后，终端会显示类似以下信息：

```
Server running at http://localhost:8000/hand-art.html
```

打开浏览器访问后，页面会显示：
- ✅ 加载模型...
- ✅ 点击按钮启动摄像头
- ✅ 运行中

## 💻 硬件适配说明

### 摄像头要求

| 设备类型 | 最低配置 | 推荐配置 |
|----------|----------|----------|
| **分辨率** | 640×480 | 1280×720 或更高 |
| **帧率** | 30fps | 60fps |
| **类型** | USB 摄像头 / 内置摄像头 | USB 高清摄像头 / 手机前置摄像头 |
| **接口** | USB 2.0 | USB 3.0 / USB-C |

### CPU 要求

| 场景 | 最低配置 | 推荐配置 |
|------|----------|----------|
| **手势识别** | 双核 CPU @ 1.5GHz | 四核 CPU @ 2.0GHz 或更高 |
| **对称绘制** | 双核 CPU @ 2.0GHz | 四核 CPU @ 2.5GHz 或更高 |
| **发光效果** | 四核 CPU @ 2.0GHz | 六核 CPU @ 3.0GHz 或更高 |

### GPU 加速

本项目使用浏览器内置的 WebGL 进行 GPU 加速渲染，支持以下配置：

- **Windows**: NVIDIA / AMD / Intel 集成显卡（支持 OpenGL 2.0+）
- **macOS**: macOS 10.10+ 自带 GPU 加速
- **Linux**: 需安装正确的显卡驱动

### 内存要求

| 配置 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **RAM** | 2GB | 4GB 或更高 |
| **浏览器缓存** | 512MB | 1GB 或更高 |

### 移动设备适配

| 设备类型 | 最低配置 | 推荐配置 |
|----------|----------|----------|
| **iOS** | iPhone 8 或更高 | iPhone 11 或更高 |
| **Android** | Android 8.0 或更高 | Android 10 或更高 |
| **内存** | 3GB | 4GB 或更高 |

## 🐛 常见报错解决方案

### 1. Python 命令找不到

**错误信息**：
```
'python' 不是内部或外部命令，也不是可运行的程序
```

**解决方案**：

```powershell
# Windows - 检查 Python 是否添加到 PATH
python3 --version

# 如果 python3 可用，使用 python3 代替
python3 server.py

# 或者添加 Python 到环境变量
# 控制面板 → 系统 → 高级系统设置 → 环境变量 → Path → 添加 Python 安装目录
```

### 2. 依赖安装失败

**错误信息**：
```
ERROR: Could not find a version that satisfies the requirement xxx
```

**解决方案**：

```powershell
# 更新 pip
python -m pip install --upgrade pip

# 使用国内镜像源（推荐）
python -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 或使用阿里云镜像
python -m pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
```

### 3. 摄像头权限被拒绝

**错误信息**：
```
Permission denied
NotAllowedError: Permission denied
```

**解决方案**：

#### Chrome 浏览器
1. 点击地址栏左侧的锁图标 🔒
2. 在弹出菜单中找到"摄像头"权限
3. 选择"允许"
4. 刷新页面

#### Firefox 浏览器
1. 点击地址栏左侧的盾牌图标 🛡️
2. 选择"允许"摄像头访问
3. 刷新页面

#### Safari 浏览器
1. 点击 Safari 菜单 → 设置 → 网站
2. 选择"摄像头"选项
3. 将当前网站设为"允许"

### 4. MediaPipe 模型加载失败

**错误信息**：
```
MediaPipe Hands 库未加载，请检查网络连接
Failed to load resource: net::ERR_CONNECTION_TIMED_OUT
```

**解决方案**：

```
1. 检查网络连接是否正常
2. 尝试切换网络（如从 WiFi 切换到手机热点）
3. 检查防火墙是否阻止了 CDN 访问
4. 确保能访问：https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js

# 如果网络受限，可使用离线模型
# 确保项目目录中包含以下文件：
# - hands.js
# - hands.binarypb
# - hand_landmark_lite.tflite
# - hands_solution_wasm_bin.js/.wasm
# - hands_solution_simd_wasm_bin.js/.wasm
# - hands_solution_packed_assets.data
# - hands_solution_packed_assets_loader.js
```

### 5. 页面显示空白或无法加载

**错误信息**：
```
Failed to load module script
CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**解决方案**：

```powershell
# ❌ 错误方式：直接双击 HTML 文件
# ✅ 正确方式：使用 HTTP 服务器

# 启动本地服务器
cd 工作坊
python server.py

# 然后在浏览器访问
# http://localhost:8000/hand-art.html
```

### 6. 手势识别不准确或延迟

**错误现象**：
- 手势识别延迟严重
- 绘制线条卡顿
- 手部骨架闪烁

**解决方案**：

```
1. **检查光线条件**
   - 确保光线充足，避免逆光
   - 避免手部阴影

2. **调整摄像头距离**
   - 最佳距离：30-60cm
   - 确保手部完整出现在画面中

3. **降低画面分辨率**
   - 在 setupCamera() 函数中调整分辨率设置
   - 降低对称线数（控制面板中设置）

4. **关闭其他占用资源的程序**
   - 关闭多余浏览器标签页
   - 关闭视频播放软件
   - 关闭后台下载任务

5. **启用硬件加速**
   - 浏览器设置 → 系统 → 启用硬件加速
```

### 7. 端口被占用

**错误信息**：
```
OSError: [WinError 10048] 通常每个套接字地址(协议/网络地址/端口)只允许使用一次。
Address already in use
```

**解决方案**：

```powershell
# Windows - 查找占用端口的进程
netstat -ano | findstr :8000

# 终止占用进程（将 PID 替换为实际进程号）
taskkill /F /PID <PID>

# 使用其他端口启动
python server.py  # 修改 server.py 中的 PORT 变量
# 或直接使用不同端口
python -m http.server 8080
```

### 8. WebAssembly 加载失败

**错误信息**：
```
Failed to compile wasm module
Uncaught (in promise) RuntimeError: abort(...)
```

**解决方案**：

```
1. 检查浏览器是否支持 WebAssembly
   - Chrome 57+、Firefox 52+、Safari 11+、Edge 16+

2. 清除浏览器缓存
   - Ctrl+Shift+Delete (Windows)
   - Cmd+Shift+Delete (macOS)

3. 尝试使用其他浏览器
   - Chrome 通常兼容性最好

4. 检查服务器 MIME 类型配置
   - .wasm 文件需要设置为 application/wasm
   - 使用项目自带的 server.py 可自动配置
```

### 9. 绘制时出现锯齿或模糊

**错误现象**：
- 绘制的线条有锯齿
- 缩放后图案模糊

**解决方案**：

```
1. **关闭发光效果**
   - 在控制面板中取消勾选"发光效果"

2. **调整笔刷大小**
   - 使用较小的笔刷绘制细节

3. **使用 SVG 导出**
   - SVG 是矢量格式，可无限缩放而不失真
   - 点击"保存 SVG"按钮导出

4. **提高摄像头分辨率**
   - 确保摄像头设置为最高分辨率
```

### 10. 撤销功能失效

**错误现象**：
- 点击撤销按钮无反应
- 撤销后画面错乱

**解决方案**：

```
1. **保存当前状态**
   - 清除画布后重新开始绘制

2. **减少撤销历史记录**
   - 系统默认保留最近 50 步操作
   - 过多历史记录可能导致性能问题

3. **刷新页面**
   - ```
刷新后重新开始绘制
```

## 📤 导出依赖清单

### 完整文件清单

部署或导出本项目时，需要包含以下所有文件：

#### 📁 核心文件（必须）

| 文件 | 类型 | 大小 | 说明 |
|------|------|------|------|
| `hand-art.html` | HTML | ~60KB | 主页面文件 |
| `code/config.js` | JS | ~2KB | 全局状态配置 |
| `code/camera.js` | JS | ~6KB | 摄像头和MediaPipe设置 |
| `code/gestures.js` | JS | ~8KB | 手势检测逻辑 |
| `code/drawing.js` | JS | ~15KB | 绘图引擎 |
| `code/patterns.js` | JS | ~12KB | 图案生成函数 |
| `code/export.js` | JS | ~3KB | PNG/SVG导出功能 |
| `code/ui.js` | JS | ~5KB | 动画循环和UI绘制 |
| `code/main.js` | JS | ~6KB | 初始化入口 |
| `code/hands.js` | JS | ~200KB | MediaPipe Hands库 |
| `server.py` | Python | ~1KB | 本地HTTP服务器 |
| `requirements.txt` | TXT | ~1KB | 依赖说明 |

#### 🤖 模型文件（必须）

| 文件 | 类型 | 大小 | 说明 |
|------|------|------|------|
| `hands.binarypb` | 模型 | ~2.5MB | 手部检测模型 |
| `hand_landmark_lite.tflite` | 模型 | ~3.5MB | 手部关键点轻量模型 |
| `hands_solution_wasm_bin.js` | WASM | ~150KB | WebAssembly编译文件 |
| `hands_solution_wasm_bin.wasm` | WASM | ~1.2MB | WebAssembly二进制 |
| `hands_solution_simd_wasm_bin.js` | WASM | ~150KB | SIMD优化WebAssembly |
| `hands_solution_simd_wasm_bin.wasm` | WASM | ~1.5MB | SIMD优化二进制 |
| `hands_solution_packed_assets.data` | 数据 | ~500KB | 打包资源文件 |
| `hands_solution_packed_assets_loader.js` | JS | ~50KB | 资源加载器 |

#### 📄 文档和配置（可选）

| 文件 | 说明 |
|------|------|
| `README.md` | 项目说明文档 |
| `LICENSE` | MIT许可证 |
| `.gitignore` | Git忽略配置 |
| `.vscode/settings.json` | VS Code配置 |

### 目录结构

```
工作坊/
├── hand-art.html              # 主页面
├── server.py                  # Python服务器
├── requirements.txt           # 依赖说明
├── README.md                  # 项目文档
├── LICENSE                    # 许可证
├── .gitignore                 # Git配置
├── .vscode/
│   └── settings.json          # VS Code配置
├── code/                      # JavaScript模块
│   ├── config.js
│   ├── camera.js
│   ├── gestures.js
│   ├── drawing.js
│   ├── patterns.js
│   ├── export.js
│   ├── ui.js
│   ├── main.js
│   └── hands.js
└── *.tflite / *.wasm / *.data # 模型文件
```

### 导出文件总大小

| 类别 | 文件数 | 总大小 |
|------|--------|--------|
| 核心文件 | 12 | ~245KB |
| 模型文件 | 8 | ~9.6MB |
| 文档配置 | 4 | ~10KB |
| **总计** | **24** | **~9.9MB** |

### 导出步骤

#### 方式一：完整导出

```bash
# Windows PowerShell
Compress-Archive -Path 工作坊 -DestinationPath 手剪纸系统.zip

# macOS / Linux
zip -r 手剪纸系统.zip 工作坊
```

#### 方式二：最小化导出（仅运行所需）

```bash
# 复制必要文件到输出目录
mkdir 手剪纸系统
cp hand-art.html 手剪纸系统/
cp -r code/ 手剪纸系统/
cp hands.binarypb 手剪纸系统/
cp hand_landmark_lite.tflite 手剪纸系统/
cp hands_solution_*.js 手剪纸系统/
cp hands_solution_*.wasm 手剪纸系统/
cp hands_solution_packed_assets.* 手剪纸系统/
cp server.py 手剪纸系统/
cp requirements.txt 手剪纸系统/
```

### 依赖关系图

```
hand-art.html
├── code/config.js          # 全局变量
│   └── code/camera.js      # 摄像头设置
│       └── code/gestures.js # 手势检测
│           └── code/drawing.js # 绘图引擎
│               └── code/patterns.js # 图案生成
│                   └── code/export.js # 导出功能
│                       └── code/ui.js # UI渲染
│                           └── code/main.js # 初始化
└── code/hands.js           # MediaPipe库
    ├── hands.binarypb      # 检测模型
    ├── hand_landmark_lite.tflite # 关键点模型
    ├── hands_solution_wasm_bin.js/.wasm
    ├── hands_solution_simd_wasm_bin.js/.wasm
    └── hands_solution_packed_assets.data/loader.js
```

## 🚀 部署说明

### 方式一：本地开发服务器（推荐）

#### 1. 使用 Python HTTP 服务器

```bash
cd 工作坊
python server.py
```

然后在浏览器中访问：`http://localhost:8000/hand-art.html`

#### 2. 使用 Python 内置服务器

```bash
cd 工作坊
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000/hand-art.html`

### 方式二：直接打开（不推荐）

直接双击 `hand-art.html` 文件在浏览器中打开。

⚠️ **注意**：某些浏览器可能会因为跨域限制而无法加载 MediaPipe 模型文件，导致初始化失败。

### 方式三：部署到 Web 服务器

#### 1. 静态文件部署

将以下文件上传到您的 Web 服务器：
- `hand-art.html`
- `code/config.js`
- `code/camera.js`
- `code/gestures.js`
- `code/drawing.js`
- `code/patterns.js`
- `code/export.js`
- `code/ui.js`
- `code/main.js`
- `code/hands.js`
- `hands.binarypb`
- `hand_landmark_lite.tflite`
- `hands_solution_wasm_bin.js`
- `hands_solution_wasm_bin.wasm`
- `hands_solution_simd_wasm_bin.js`
- `hands_solution_simd_wasm_bin.wasm`
- `hands_solution_packed_assets.data`
- `hands_solution_packed_assets_loader.js`

#### 2. 服务器配置

确保服务器正确设置以下 MIME 类型：

| 文件扩展名 | MIME 类型 |
|------------|-----------|
| `.wasm` | `application/wasm` |
| `.tflite` | `application/octet-stream` |
| `.binarypb` | `application/octet-stream` |
| `.data` | `application/octet-stream` |

#### 3. Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/workshop;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~* \.(wasm|tflite|binarypb|data)$ {
        add_header Content-Type application/octet-stream;
    }
    
    location ~* \.wasm$ {
        add_header Content-Type application/wasm;
    }
}
```

### 方式四：Docker 部署（可选）

```bash
# 创建 Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
# 构建并运行
docker build -t hand-art .
docker run -p 80:80 hand-art
```

## 📄 文件说明

### 核心文件

| 文件 | 说明 |
|------|------|
| `hand-art.html` | 主程序文件（包含 HTML、CSS） |
| `server.py` | Python HTTP 服务器（支持正确的 MIME 类型） |
| `requirements.txt` | 依赖说明文件 |
| `LICENSE` | MIT 许可证 |
| `.gitignore` | Git 忽略配置 |
| `README.md` | 项目说明文档 |

### JavaScript 模块文件（位于 `code/` 目录）

| 文件 | 说明 |
|------|------|
| `code/config.js` | 全局状态变量声明（画布、上下文、手势状态等） |
| `code/camera.js` | 摄像头访问和 MediaPipe 设置 |
| `code/gestures.js` | 手势检测逻辑（握拳、摊手、捏合、双指操作） |
| `code/drawing.js` | 绘图引擎（笔画绘制、对称绘制、撤销/清除） |
| `code/patterns.js` | 图案生成函数（花瓣、雪花、螺旋、圆环等） |
| `code/export.js` | PNG/SVG 导出功能 |
| `code/ui.js` | 动画循环和手部骨架绘制 |
| `code/main.js` | 初始化入口点和事件监听设置 |
| `code/hands.js` | MediaPipe Hands JavaScript 库 |

### MediaPipe 模型文件

| 文件 | 说明 |
|------|------|
| `hands.binarypb` | 手部检测模型 |
| `hand_landmark_lite.tflite` | 手部关键点轻量模型 |
| `hands_solution_wasm_bin.js/.wasm` | WebAssembly 编译文件 |
| `hands_solution_simd_wasm_bin.js/.wasm` | SIMD 优化的 WebAssembly 文件 |
| `hands_solution_packed_assets.data` | 打包资源文件 |
| `hands_solution_packed_assets_loader.js` | 资源加载器 |

---

**祝您创作愉快！** ✂️✨🎨
