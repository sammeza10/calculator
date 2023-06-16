// -------------------------------------------- utilities
const SELECTED_CLASS = "selected";
const INVALID_CLASS = "invalid";
let memory = [];
let activeOperation = null;
let errorState = false;

// -------------------------------------------- display
const display = document.querySelector(".display");

const setDisplayValue = (value) => {
  let displayValue = value;
  if (!Number.isFinite(Number(value))) {
    displayValue = "Error";
    setErrorStateHandler();
  }
  display.innerHTML = displayValue;
};

// -------------------------------------------- reset
const resetHandler = () => {
  memory = [];
  activeOperation = null;
  errorState = false;
};

// -------------------------------------------- ac
const ac = document.querySelector("#ac");

const acHandler = () => {
  ac.innerHTML = "AC";
  setDisplayValue(0);
  resetHandler();
  removeErrorStateHandler();
};

ac.addEventListener("click", acHandler);
// -------------------------------------------- equal
const equal = document.querySelector("#equal");

const equalHandler = () => {
  if (errorState) return;
  const operation = `${memory.join(" ")} ${display.innerHTML}`;
  setDisplayValue(eval(operation));
  resetHandler();
};

equal.addEventListener("click", equalHandler);

// -------------------------------------------- percent
const percent = document.querySelector("#percent");

const percentHanlder = () => {
  if (errorState) return;
  setDisplayValue(Number(display.innerHTML) / 100);
};

percent.addEventListener("click", percentHanlder);

// -------------------------------------------- dot
const dot = document.querySelector("#dot");

const decimalHandler = () => {
  if (errorState) return;
  const currentDisplay = display.innerHTML;
  if (currentDisplay.indexOf(".") > 0) return;
  setDisplayValue(`${currentDisplay}.`);
};

dot.addEventListener("click", decimalHandler);

// -------------------------------------------- sig
const sig = document.querySelector("#sig");

const sigHandler = () => {
  if (errorState) return;
  const currentDisplay = display.innerHTML;
  let newDisplay = Number(currentDisplay) * -1;
  if (currentDisplay === "0") {
    newDisplay = "-0";
  }
  setDisplayValue(newDisplay);
};

sig.addEventListener("click", sigHandler);
// -------------------------------------------- style mod
const addSelectedStyle = (el) => {
  el.classList.add(SELECTED_CLASS);
};

const removeSelectedStyle = (el) => {
  el.classList.remove(SELECTED_CLASS);
};

// -------------------------------------------- operators
const div = document.querySelector("#div"); // /
const mul = document.querySelector("#mul"); // *
const sum = document.querySelector("#sum"); // +
const sub = document.querySelector("#sub"); // -

const operators = [
  { el: div, op: "/" },
  { el: mul, op: "*" },
  { el: sum, op: "+" },
  { el: sub, op: "-" },
];

const operationHandler = (operatorElement, operatorIdentifier) => {
  if (errorState) return;
  if (activeOperation !== null && memory.length > 1) {
    removeSelectedStyle(activeOperation);
  }
  addSelectedStyle(operatorElement);
  if (memory.length === 0) {
    memory.push(display.innerHTML);
  }
  if (memory.length > 1) {
    equalHandler();
    memory.push(display.innerHTML);
  }
  memory.push(operatorIdentifier);
  activeOperation = operatorElement;
};

operators.forEach((operator) => {
  operator.el.addEventListener("click", () =>
    operationHandler(operator.el, operator.op)
  );
});

// -------------------------------------------- numbers
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const numberHandler = (n) => {
  if (errorState) return;
  if (activeOperation !== null) {
    removeSelectedStyle(activeOperation);
    setDisplayValue("");
    activeOperation = null;
  }
  ac.innerHTML = "C";
  const currentDisplay = display.innerHTML;
  const newDisplay = Number(`${currentDisplay}${n}`);
  // if (currentDisplay === '0') {
  //   newDisplay = n;
  // }
  // if (currentDisplay === '-0') {
  //   newDisplay = Number(n) * -1;
  // }
  setDisplayValue(newDisplay);
};

const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];

numbers.forEach((n, i) => {
  n.addEventListener("click", () => numberHandler(i));
});

// -------------------------------------------- errors

const setErrorStateHandler = () => {
  errorState = true;
  numbers.forEach((n) => {
    n.classList.add(INVALID_CLASS);
  });
  operators.forEach((op) => {
    op.el.classList.add(INVALID_CLASS);
  });
  equal.classList.add(INVALID_CLASS);
  dot.classList.add(INVALID_CLASS);
  percent.classList.add(INVALID_CLASS);
  sig.classList.add(INVALID_CLASS);
};

const removeErrorStateHandler = () => {
  errorState = false;
  numbers.forEach((n) => {
    n.classList.remove(INVALID_CLASS);
  });
  operators.forEach((op) => {
    op.el.classList.remove(INVALID_CLASS);
  });
  equal.classList.remove(INVALID_CLASS);
  dot.classList.remove(INVALID_CLASS);
  percent.classList.remove(INVALID_CLASS);
  sig.classList.remove(INVALID_CLASS);
};
