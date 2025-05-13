import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const formatNumber = (num: number) => {
    const str = num.toString();
    if (num >= 10000) {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return str;
  };

  useEffect(() => {
    const calculateSecondsSinceMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      return 86400 - (hours * 3600 + minutes * 60 + currentSeconds);
    };

    // Update immediately
    setSeconds(calculateSecondsSinceMidnight());

    // Update every second
    const interval = setInterval(() => {
      setSeconds(calculateSecondsSinceMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check system preference for dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h1 className="label">You Just Have</h1>
        <div className="timer">{formatNumber(seconds)}</div>
        <h1 className="label">Seconds Left</h1>
      </div>
    </div>
  );
}

export default App;
