import React from "react";

interface TimerProps {
  timeRemaining: string;
  isRunning: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, isRunning }) => {
  const [minutes, seconds] = timeRemaining.split(":").map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const isWarning = totalSeconds <= 300; // Last 5 minutes

  return (
    <div
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
        isWarning ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-full ${
          isRunning
            ? isWarning
              ? "bg-red-500 animate-pulse"
              : "bg-green-500 animate-pulse"
            : "bg-gray-400"
        }`}
      ></div>
      <span>Time: {timeRemaining}</span>
    </div>
  );
};
