import { cn } from "@/lib/utils";

interface CalcButtonProps {
  label: string;
  type: "number" | "operator" | "function";
  onClick: () => void;
  wide?: boolean;
  isActive?: boolean;
}

const CalcButton = ({ label, type, onClick, wide, isActive }: CalcButtonProps) => {
  const baseClasses = "calc-button h-[72px] select-none cursor-pointer";
  
  const typeClasses = {
    number: "calc-button-number",
    operator: cn(
      "calc-button-operator",
      isActive && "ring-2 ring-foreground/20 bg-calc-operator-hover"
    ),
    function: "calc-button-function",
  };

  return (
    <button
      className={cn(
        baseClasses,
        typeClasses[type],
        wide && "col-span-2"
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default CalcButton;
