import { useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputVal);
  };

  return (
    <>
      <div className="App">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="Profile Username">Username</label>
          <br />
          <input type="text" onChange={(e) => handleInputChange(e)} />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
}

export default App;
