const buttons = document.querySelectorAll('.btn');
const inputval=document.getElementById("currentOperand");
const keypad = document.querySelector(".keypad");
let currentValue="";
let previousValue="";
let operator="";
let isResult = false;
const operators = [
    "add",
    "subtract",
    "multiply",
    "divide",
    "percentage"
];
buttons.forEach(btn => {
    btn.addEventListener('mousedown', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        
        this.appendChild(ripples);
        setTimeout(() => {
            ripples.remove();
        }, 500);
    });
});

function HasOperator() {
    return operator !== "";
}
keypad.addEventListener("click",(e)=>{
const button = e.target.closest("button");
if (!button) return;
  const action = button.dataset.action; 
      if (button.classList.contains("number")) {
         if (isResult) {
            currentValue = "";
            isResult = false;
        }       
         currentValue += button.textContent;
        UpdateDisplay();
        return;
    }
       if (action==="clear") {
        return clear()
    }
    if (action==="delete") {
    currentValue = currentValue.slice(0, -1);
        UpdateDisplay();
        return;
    }
    if (currentValue==="") {
        return;
    }

    if (operators.includes(action)){
if (CanCalculate()) {
    Calculate();
}
previousValue=currentValue;
currentValue="";
operator=action; 

            return;

}
    if (action==="calculate") {
if (CanCalculate()) {
            Calculate();
        }
        return;        
    }
 
currentValue+=button.textContent;
UpdateDisplay();
})

document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
  
 
});
function CanCalculate() {
    return previousValue !== "" &&
           currentValue !== "" &&
           operator !== "";
}
function clear()
{
    currentValue="";
    operator="";
    previousValue="";
UpdateDisplay();
}
function Vallidate(Number)
{
if (Number) {
    return false;
}
}
function UpdateDisplay() {
    inputval.textContent = currentValue;
}

function Calculate() {
    const num1=Number(previousValue);
    const num2=Number(currentValue);
    let operatorSymbol="";
    switch (operator) {
    case "add":
        currentValue=num1+num2;
        operatorSymbol = "+";
        break;

    case "subtract":
        currentValue=num1-num2;
        operatorSymbol = "-";
        break;

    case "multiply":
         currentValue=num1*num2;
         operatorSymbol = "*";

        break;

    case "divide":
          currentValue=num1/num2;
          operatorSymbol = "/";
        break;
    case "percentage":
        currentValue=previousValue/100;
        break;
}
    currentValue = String(currentValue);
 let expressionString = "";
    if (operator === "percentage") {
        expressionString = `${num1}%`;
    } else {
        expressionString = `${num1} ${operatorSymbol} ${num2}`;
    }
    UpdateDisplay();

    LogToHistory(expressionString, currentValue);
    previousValue = "";
    operator = "";
    isResult = true;
}
const Historylog= document.querySelector('.history-list');
function LogToHistory(expression,Result)
{
    if (Historylog) {
        const HistoryItem=document.createElement("div");
        HistoryItem.classList.add("history-item");
        const expressiondiv=document.createElement('div');
        expressiondiv.classList.add("history-expression");
        expressiondiv.textContent=expression;
          const resultdiv=document.createElement('div');
        resultdiv.classList.add("history-result");
        resultdiv.textContent=Result;
        HistoryItem.appendChild(expressiondiv);
        HistoryItem.appendChild(resultdiv);
        Historylog.appendChild(HistoryItem);
    }
}
document.querySelector(".history-clear").addEventListener("click",()=>
{
Historylog.children.clear();
})
