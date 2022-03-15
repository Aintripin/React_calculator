import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css"
// import logo from './logo.svg';
// import './App.css';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }  
    case ACTIONS.CHOSE_OPERATION:           // if we have nothing on the screen and try to click on any operator, nothing's gonna happen
      if (state.currentOperand == null && state.previousOperand == null){
        return state
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
        return {}
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(prevOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) {
    return ""
  }
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

function App() {
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  // dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}})
  return (
    <div className = "calculator-grid">
      <div className = "output">
        <div className = "previous-operand"> {previousOperand} {operation} </div>
        <div className = "current-operand"> {currentOperand} </div>
      </div>


      <button 
        className = "span-two" 
        onClick = {() => dispatch({type: ACTIONS.CLEAR})}>
          AC
      </button>
      <button> DEL</button>
      <OperationButton operation = "÷" dispatch = {dispatch} />
      <DigitButton digit = "1" dispatch = {dispatch} />
      <DigitButton digit = "2" dispatch = {dispatch} />
      <DigitButton digit = "3" dispatch = {dispatch} />
      <OperationButton operation = "*" dispatch = {dispatch} />
      <DigitButton digit = "4" dispatch = {dispatch} />
      <DigitButton digit = "5" dispatch = {dispatch} />
      <DigitButton digit = "6" dispatch = {dispatch} />
      <OperationButton operation = "+" dispatch = {dispatch} />
      <DigitButton digit = "7" dispatch = {dispatch} />
      <DigitButton digit = "8" dispatch = {dispatch} />
      <DigitButton digit = "9" dispatch = {dispatch} />
      <OperationButton operation = "-" dispatch = {dispatch} />
      <DigitButton digit = "." dispatch = {dispatch} />
      <DigitButton digit = "0" dispatch = {dispatch} />
      <button className = "span-two"> = </button>
    </div>
  );
}

export default App;
