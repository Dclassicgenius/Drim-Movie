import { ChangeEvent, useRef, useState, useEffect } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  text?: string;
  time?: boolean;
  step: number;
}

export function RangeSlider({
  min,
  max,
  text,
  time,
  step = 1,
}: RangeSliderProps) {
  const [value, setValue] = useState(min);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
    toggleTooltip();
  };

  const toggleTooltip = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShowTooltip(true);
    timeoutId.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const calculateTooltipPosition = () => {
    if (!sliderRef.current) return 0;
    const rangeWidth = sliderRef.current.clientWidth;
    const rangeValue = value - min;
    const rangeMax = max - min;
    const positionPercentage = (rangeValue / rangeMax) * 100;
    return (positionPercentage / 100) * rangeWidth;
  };

  const renderTicks = () => {
    const tickCount = (max - min) / step + 1;
    const tickPositions = Array.from(
      { length: tickCount },
      (_, i) => i * step + min
    );
    return tickPositions.map((tick, index) => (
      <div
        key={index}
        className="absolute h-2 w-0.5 bg-gray-400 top-0"
        style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
      ></div>
    ));
  };

  return (
    <div className="group relative">
      <div className="relative">
        {/* {renderTicks()} */}
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={toggleTooltip}
          onTouchStart={toggleTooltip}
          className="w-full accent-sky-500 rounded-lg appearance-none h-2 bg-sky-500 cursor-pointer  "
          step={step}
        />
        <span
          className={`absolute top-[-30px] left-0 transition-transform duration-300 rounded bg-gray-800 p-2 text-xs text-white ${
            showTooltip ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={{
            transform: `translateX(${calculateTooltipPosition()}px)`,
          }}
        >
          {!time
            ? `${text} ${value} - ${max}`
            : `${value} ${text} - ${max} ${text}`}
        </span>
      </div>
    </div>
  );
}
