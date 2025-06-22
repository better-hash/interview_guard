import { useState, useEffect, useRef } from 'react';

interface AttentionMonitorProps {
  onWarning: (warning: string) => void;
}

const AttentionMonitor: React.FC<AttentionMonitorProps> = ({ onWarning }) => {
  const [isActive, setIsActive] = useState(true);
  const [lastActive, setLastActive] = useState<Date>(new Date());
  const inactivityTimer = useRef<number | null>(null);
  const visibilityTimer = useRef<number | null>(null);
  const inactivityThreshold = 10000; // 10 seconds
  
  // Monitor window focus/blur events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onWarning('Switched to another window or tab');
        setIsActive(false);
      } else {
        setIsActive(true);
        setLastActive(new Date());
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Check visibility periodically
    const checkVisibility = setInterval(() => {
      if (document.hidden) {
        setIsActive(false);
      }
    }, 1000);
    
    visibilityTimer.current = checkVisibility;
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (visibilityTimer.current) {
        clearInterval(visibilityTimer.current);
      }
    };
  }, [onWarning]);
  
  // Monitor user activity (mouse and keyboard)
  useEffect(() => {
    const resetInactivityTimer = () => {
      setIsActive(true);
      setLastActive(new Date());
    };
    
    const handleActivity = () => {
      resetInactivityTimer();
    };
    
    // Events to monitor
    const events = [
      'mousemove', 
      'mousedown', 
      'keypress', 
      'scroll', 
      'touchstart'
    ];
    
    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    // Check for inactivity
    const checkInactivity = setInterval(() => {
      const now = new Date();
      const timeSinceLastActive = now.getTime() - lastActive.getTime();
      
      if (timeSinceLastActive > inactivityThreshold) {
        setIsActive(false);
        onWarning('Long period of inactivity detected');
      }
    }, 5000);
    
    inactivityTimer.current = checkInactivity;
    
    return () => {
      // Cleanup event listeners
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (inactivityTimer.current) {
        clearInterval(inactivityTimer.current);
      }
    };
  }, [lastActive, onWarning]);
  
  return (
    <div className="attention-monitor">
      <h3>Attention Monitoring</h3>
      <div className="status">
        <div className={`status-indicator ${isActive ? 'status-active' : 'status-warning'}`}></div>
        <span>{isActive ? 'Active' : 'Potentially Distracted'}</span>
      </div>
      <div className="last-active">
        Last Active: {lastActive.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AttentionMonitor; 