import { useState, useEffect } from 'react';
import './App.css';
import FaceDetection from './components/FaceDetection';
import AttentionMonitor from './components/AttentionMonitor';

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  
  const startMonitoring = () => {
    setIsMonitoring(true);
    setSessionStartTime(new Date());
    setWarnings([]);
  };
  
  const stopMonitoring = () => {
    setIsMonitoring(false);
  };
  
  const addWarning = (warning: string) => {
    setWarnings(prev => [...prev, `${new Date().toLocaleTimeString()}: ${warning}`]);
  };
  
  return (
    <div className="container">
      <h1>面试监控系统</h1>
      
      <div className="controls">
        {!isMonitoring ? (
          <button className="start-button" onClick={startMonitoring}>开始监控</button>
        ) : (
          <button className="stop-button" onClick={stopMonitoring}>停止监控</button>
        )}
      </div>
      
      {isMonitoring && (
        <div className="monitoring-area">
          <FaceDetection onWarning={addWarning} />
          <AttentionMonitor onWarning={addWarning} />
        </div>
      )}
      
      {warnings.length > 0 && (
        <div className="warnings">
          <h2>警告记录</h2>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
      
      {sessionStartTime && isMonitoring && (
        <div className="session-info">
          开始时间: {sessionStartTime.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default App;
