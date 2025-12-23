interface CalcDisplayProps {
  value: string;
}

const CalcDisplay = ({ value }: CalcDisplayProps) => {
  const formatDisplay = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    
    if (val.includes(".") && val.endsWith(".")) {
      return val;
    }
    
    if (Math.abs(num) >= 1e9) {
      return num.toExponential(4);
    }
    
    return val;
  };

  const displayValue = formatDisplay(value);
  const fontSize = displayValue.length > 9 ? "text-4xl" : displayValue.length > 6 ? "text-5xl" : "text-6xl";

  return (
    <div className="calc-display p-6 min-h-[120px] flex items-end justify-end">
      <span 
        className={cn(
          "font-light tracking-tight text-foreground transition-all duration-200",
          fontSize
        )}
      >
        {displayValue}
      </span>
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default CalcDisplay;
