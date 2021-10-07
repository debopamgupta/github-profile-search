import { GeistProvider, CssBaseline } from "@geist-ui/react";
import GithubProfileSearch from "./GithubProfileSearch";
import { useState } from "react";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    setTheme((last) => (last === "dark" ? "light" : "dark"));
  };
  return (
    <div className="App">
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <GithubProfileSearch />
        <button id="theme-btn" type="warning" onClick={(e) => changeTheme()}>
          🌗
        </button>
      </GeistProvider>
    </div>
  );
}
export default App;
