import { useState } from "react";
import CalcButton from "./CalcButton";
import CalcDisplay from "./CalcDisplay";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operator) {
      const currentValue = parseFloat(previousValue);
      let result: number;

      switch (operator) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "×":
          result = currentValue * inputValue;
          break;
        case "÷":
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      const resultString = String(parseFloat(result.toFixed(10)));
      setDisplay(resultString);
      setPreviousValue(resultString);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    let result: number;

    switch (operator) {
      case "+":
        result = currentValue + inputValue;
        break;
      case "-":
        result = currentValue - inputValue;
        break;
      case "×":
        result = currentValue * inputValue;
        break;
      case "÷":
        result = inputValue !== 0 ? currentValue / inputValue : 0;
        break;
      default:
        result = inputValue;
    }

    const resultString = String(parseFloat(result.toFixed(10)));
    setDisplay(resultString);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: "AC", type: "function" as const, action: clear },
    { label: "±", type: "function" as const, action: toggleSign },
    { label: "%", type: "function" as const, action: inputPercent },
    { label: "÷", type: "operator" as const, action: () => performOperation("÷") },
    { label: "7", type: "number" as const, action: () => inputDigit("7") },
    { label: "8", type: "number" as const, action: () => inputDigit("8") },
    { label: "9", type: "number" as const, action: () => inputDigit("9") },
    { label: "×", type: "operator" as const, action: () => performOperation("×") },
    { label: "4", type: "number" as const, action: () => inputDigit("4") },
    { label: "5", type: "number" as const, action: () => inputDigit("5") },
    { label: "6", type: "number" as const, action: () => inputDigit("6") },
    { label: "-", type: "operator" as const, action: () => performOperation("-") },
    { label: "1", type: "number" as const, action: () => inputDigit("1") },
    { label: "2", type: "number" as const, action: () => inputDigit("2") },
    { label: "3", type: "number" as const, action: () => inputDigit("3") },
    { label: "+", type: "operator" as const, action: () => performOperation("+") },
    { label: "0", type: "number" as const, action: () => inputDigit("0"), wide: true },
    { label: ".", type: "number" as const, action: inputDecimal },
    { label: "=", type: "operator" as const, action: calculate },
  ];

  return (
    <div className="w-full max-w-sm mx-auto animate-slide-up">
      <div className="glass-effect rounded-[2.5rem] p-6 shadow-2xl">
        <CalcDisplay value={display} />
        
        <div className="grid grid-cols-4 gap-3 mt-6">
          {buttons.map((btn, index) => (
            <CalcButton
              key={index}
              label={btn.label}
              type={btn.type}
              onClick={btn.action}
              wide={btn.wide}
              isActive={operator === btn.label && waitingForOperand}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
