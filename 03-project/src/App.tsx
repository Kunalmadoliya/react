import {useState} from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  

  const inc = () => {
    setCount(count + 1);
  };

  const dec = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h1>Value : {count}</h1>
      <button onClick={inc}>➕</button>
      <button onClick={dec}>➖</button>
    </>
  );
}

export default App;
