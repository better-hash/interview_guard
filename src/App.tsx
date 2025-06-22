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
      <h1>Interview Monitoring System</h1>
      
      <div className="controls">
        {!isMonitoring ? (
          <button className="start-button" onClick={startMonitoring}>Start Monitoring</button>
        ) : (
          <button className="stop-button" onClick={stopMonitoring}>Stop Monitoring</button>
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
          <h2>Warning Records</h2>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
      
      {sessionStartTime && isMonitoring && (
        <div className="session-info">
          Start Time: {sessionStartTime.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default App;
