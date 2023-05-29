export interface CircularProgressBarProps {
  score: number;
  radius?: number;
}

export function CircularProgressBar({
  score,
  radius = 20,
}: CircularProgressBarProps) {
  const percentage = Math.round((score / 10) * 100);
  const progressColor =
    percentage >= 85
      ? "#48BB78"
      : percentage >= 75 && percentage <= 84
      ? "#68D391"
      : percentage >= 65 && percentage <= 74
      ? "#FACC15"
      : percentage >= 50 && percentage <= 64
      ? "#4299E1"
      : percentage >= 40 && percentage <= 49
      ? "#E53E3E"
      : "#F56565";

  // const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * ((100 - percentage) / 100);

  return (
    <>
      <div className="relative w-11 h-11 bg-[#081c21] rounded-full">
        <svg className="w-full h-full" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r={radius}
            strokeWidth="4"
            stroke="#E2E8F0"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r={radius}
            strokeWidth="4"
            stroke={progressColor}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90 25 25)"
          />
        </svg>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <p className="text-xs font-bold">
            {percentage > 0 ? percentage + "%" : "NR"}
          </p>
        </div>
      </div>
    </>
  );
}
