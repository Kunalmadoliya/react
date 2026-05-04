import {useState} from "react";
import ManualForm from "./components/ManualForm";
import ReactForm from "./components/ReactForm";

const App = () => {
  const [post, setPost] = useState("manual");

  return (
    <>
      <div>
        <button onClick={() => setPost("manual")}>Manual</button>
        <button onClick={() => setPost("react")}>Reaxt</button>
      </div>
      {post === 'manual' ? <ManualForm /> : <ReactForm />}
    </>
  );
};

export default App;
