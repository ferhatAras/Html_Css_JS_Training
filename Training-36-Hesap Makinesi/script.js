const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let WaitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;

  if (!element.matches("button")) return;

  switch (element.value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "clear":
      clear();
      break;
    default:
      inputNumber(element.value);
      updateDisplay();
  }
});

// if (element.classList.contains("operator")) {
//   // console.log("operator", element.value);
//   handleOperator(element.value);
//   updateDisplay();
//   return;
// }
// if (element.classList.contains("decimal")) {
//   // console.log("decimal", element.value);
//   inputDecimal();
//   updateDisplay();
//   return;
// }
// if (element.classList.contains("clear")) {
//   // console.log("clear", element.value);
//   clear();
//   updateDisplay();
//   return;
// }

// console.log("number", element.value);
// inputNumber(element.value);

function inputNumber(num) {
  if (WaitingForSecondValue) {
    displayValue = num;
    WaitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }

  console.log(displayValue, firstValue, operator, WaitingForSecondValue);
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
}
function handleOperator(Nextoperator) {
  const value = parseFloat(displayValue);

  if (operator && WaitingForSecondValue) {
    operator = Nextoperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }
  WaitingForSecondValue = true;
  operator = Nextoperator;
  console.log(displayValue, firstValue, operator, WaitingForSecondValue);
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}
