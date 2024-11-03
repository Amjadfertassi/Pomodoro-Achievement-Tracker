// src/Timer.tsx

import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(25 * 60); // default to 25 minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<number>(25); // in minutes

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // type for the interval
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleStart = () => {
    setTime(customTime * 60); // set time in seconds
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(customTime * 60);
  };

  const formatTime = (time: number): string => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Pomodoro Timer</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">{formatTime(time)}</h2>
      <input
        type="number"
        value={customTime}
        onChange={(e) => setCustomTime(Number(e.target.value))}
        min="1"
        max="60"
        className="mt-4 w-16 p-2 border border-gray-300 rounded-md text-center"
      />
      <button
        onClick={handleStart}
        disabled={isActive}
        className={`mt-4 px-4 py-2 text-white font-semibold rounded-md ${isActive ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        Start
      </button>
      <button
        onClick={handleReset}
        className="mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
