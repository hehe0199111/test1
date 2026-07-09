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

## 🚀 部署说明

### 方式一：本地开发服务器（推荐）

#### 1. 使用 Python HTTP 服务器

```bash
cd 工作坊
python server.py
```

然后在浏览器中访问：`http://localhost:8000/hand-art-2.html`

#### 2. 使用 Python 内置服务器

```bash
cd 工作坊
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000/hand-art-2.html`

### 方式二：直接打开（不推荐）

直接双击 `hand-art-2.html` 文件在浏览器中打开。

⚠️ **注意**：某些浏览器可能会因为跨域限制而无法加载 MediaPipe 模型文件，导致初始化失败。

### 方式三：部署到 Web 服务器

#### 1. 静态文件部署

将以下文件上传到您的 Web 服务器：
- `hand-art-2.html`
- `hands.js`
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
| `hand-art-2.html` | 主程序文件（包含 HTML、CSS、JavaScript） |
| `server.py` | Python HTTP 服务器（支持正确的 MIME 类型） |
| `LICENSE` | MIT 许可证 |
| `.gitignore` | Git 忽略配置 |
| `README.md` | 项目说明文档 |

### MediaPipe 模型文件

| 文件 | 说明 |
|------|------|
| `hands.js` | MediaPipe Hands JavaScript 库 |
| `hands.binarypb` | 手部检测模型 |
| `hand_landmark_lite.tflite` | 手部关键点轻量模型 |
| `hands_solution_wasm_bin.js/.wasm` | WebAssembly 编译文件 |
| `hands_solution_simd_wasm_bin.js/.wasm` | SIMD 优化的 WebAssembly 文件 |
| `hands_solution_packed_assets.data` | 打包资源文件 |
| `hands_solution_packed_assets_loader.js` | 资源加载器 |

---

**祝您创作愉快！** ✂️✨🎨
