import React from 'react';

interface ATSScoreGaugeProps {
  score: number;
  size?: number;
}

export function ATSScoreGauge({ score, size = 160 }: ATSScoreGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#10b981'; // emerald-500
    if (s >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const getShadowColor = (s: number) => {
    if (s >= 80) return 'rgba(16, 185, 129, 0.2)';
    if (s >= 60) return 'rgba(245, 158, 11, 0.2)';
    return 'rgba(239, 68, 68, 0.2)';
  };

  const color = getColor(score);
  const shadowColor = getShadowColor(score);

  return (
    <div className="relative flex items-center justify-center animate-in zoom-in duration-700" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-zinc-800"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${shadowColor})`
          }}
        />
      </svg>
      {/* Center Content */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tighter text-zinc-100">{score}</span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Score</span>
      </div>
    </div>
  );
}
