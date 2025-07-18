# Interview Guard

Interview monitoring system - A small application for monitoring the attention of interview candidates

## Features

- **Face Detection**: Uses the camera to detect if the candidate's face is in the frame
- **Attention Monitoring**: Detects if the user has switched windows or has been inactive for a long time
- **Warning Records**: Records all possible distractions
- **Real-time Feedback**: Provides real-time visual feedback

## Tech Stack

- TypeScript
- React
- Vite
- face-api.js (for face detection)

## Installation and Running

1. Clone the repository
```bash
git clone <repository-url>
cd interview_guard
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open in browser [http://localhost:5173](http://localhost:5173)

## Usage

1. Click the "Start Monitoring" button to start interview monitoring
2. Make sure camera permissions are granted
3. The system will automatically detect:
   - Whether the face is in the frame
   - Whether you've switched to other windows
   - Whether there has been a long period of inactivity
4. All warnings will be recorded at the bottom of the page
5. Click "Stop Monitoring" to end the session

## Notes

- Camera permission required
- Best used in modern browsers such as Chrome or Edge
- Face detection requires sufficient lighting conditions

## Development

### Project Structure

```
interview_guard/
├── public/
│   └── models/           # Face detection model files
├── src/
│   ├── components/       # React components
│   │   ├── FaceDetection.tsx
│   │   └── AttentionMonitor.tsx
│   ├── hooks/            # Custom React Hooks
│   │   └── usePageVisibility.ts
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry
└── package.json
```

## License

MIT

---

# Interview Guard (中文版)

面试监控系统 - 一个用于监控面试候选人注意力的小型应用

## 功能

- **面部检测**: 使用摄像头检测候选人面部是否在画面中
- **注意力监控**: 检测用户是否切换了窗口或长时间无活动
- **警告记录**: 记录所有可能分心的行为
- **实时反馈**: 提供实时的视觉反馈

## 技术栈

- TypeScript
- React
- Vite
- face-api.js (用于面部检测)

## 安装与运行

1. 克隆仓库
```bash
git clone <repository-url>
cd interview_guard
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:5173](http://localhost:5173)

## 使用方法

1. 点击"开始监控"按钮开始面试监控
2. 确保摄像头权限已授予
3. 系统会自动检测:
   - 面部是否在画面中
   - 是否切换到其他窗口
   - 是否长时间无活动
4. 所有警告会在页面下方记录
5. 点击"停止监控"结束会话

## 注意事项

- 需要摄像头权限
- 最好在Chrome或Edge等现代浏览器中使用
- 面部检测需要足够的光线条件

## 开发

### 项目结构

```
interview_guard/
├── public/
│   └── models/           # 面部检测模型文件
├── src/
│   ├── components/       # React组件
│   │   ├── FaceDetection.tsx
│   │   └── AttentionMonitor.tsx
│   ├── hooks/            # 自定义React Hooks
│   │   └── usePageVisibility.ts
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 应用入口
└── package.json
```

## 许可

MIT
