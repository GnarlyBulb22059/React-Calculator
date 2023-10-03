import { useState } from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const isOperator = (symbol: string) => {
    return /[-+/*]/.test(symbol);
  };
  const et = expression.trim();

  const pressButtons = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
      return;
    }
    else if (symbol === "negative") {
      if (answer === "") {
        return;
      }
      setAnswer(answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer);
    }
    else if (symbol === "percentage") {
      if (answer === "") {
        return;
      }
      setAnswer((parseFloat(answer) / 100).toString());
    }
    else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    }
    else if (symbol === "=") {
      calculate();
    }
    else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    }
    else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (lastNumber?.includes(".")) {
        return;
      }
      setExpression(expression + symbol);
    }
    else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      }
      else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) {
      return;
    }
    const parts = et.split(" ");
    const newParts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      }
      else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    }
    else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };
  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button onClick={() => {
            pressButtons("clear");
          }} className="light-grey" id='clear'>C</button>
          <button onClick={() => {
            pressButtons("negative");
          }} className="light-grey" id='negative'>+/-</button>
          <button onClick={() => {
            pressButtons("percentage");
          }} className="light-grey" id='percentage'>%</button>
          <button onClick={() => {
            pressButtons("/");
          }} className="yellow" id='divide'>/</button>
          <button onClick={() => {
            pressButtons("7");
          }} className="dark-grey" id='seven'>7</button>
          <button onClick={() => {
            pressButtons("8");
          }} className="dark-grey" id='eight'>8</button>
          <button onClick={() => {
            pressButtons("9");
          }} className="dark-grey" id='nine'>9</button>
          <button onClick={() => {
            pressButtons("*");
          }} className="yellow" id='multiply'>*</button>
          <button onClick={() => {
            pressButtons("4");
          }} className="dark-grey" id='four'>4</button>
          <button onClick={() => {
            pressButtons("5");
          }} className="dark-grey" id='five'>5</button>
          <button onClick={() => {
            pressButtons("6");
          }} className="dark-grey" id='six'>6</button>
          <button onClick={() => {
            pressButtons("-");
          }} className="yellow" id='subtract'>-</button>
          <button onClick={() => {
            pressButtons("1");
          }} className="dark-grey" id='one'>1</button>
          <button onClick={() => {
            pressButtons("2");
          }} className="dark-grey" id='two'>2</button>
          <button onClick={() => {
            pressButtons("3");
          }} className="dark-grey" id='three'>3</button>
          <button onClick={() => {
            pressButtons("+");
          }} className="yellow" id='add'>+</button>
          <button onClick={() => {
            pressButtons("0");
          }} className="dark-grey" id='zero'>0</button>
          <button onClick={() => {
            pressButtons(".");
          }} className="dark-grey" id='decimal'>.</button>
          <button onClick={() => {
            pressButtons("=");
          }} className="yellow" id='equals'>=</button>
        </div>
      </div>
    </>
  )
}

export default App
