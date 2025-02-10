const ProgressCircle = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative h-12 w-12">
      {/* Background circle */}
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        {/* Foreground circle */}
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#024739"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle