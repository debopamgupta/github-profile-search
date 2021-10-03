import { useState } from "react";
import "./App.css";

import { getUserInfo, getUserRepos } from "./utils/User";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [user, setUser] = useState(undefined);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputVal);

    // USER PROFILE INFORMATION

    const userInformation = await getUserInfo(inputVal);
    setUser(userInformation);

    // USER'S REPOSITORY INFORMATION

    const userRepoInformation = await getUserRepos(inputVal);
    setRepos(userRepoInformation);
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
      {user && user.login ? <p>{JSON.stringify(user)}</p> : <p>NO USER</p>}
      {repos && repos.length > 0 ? <p>{repos.length}</p> : <p>NO REPOS</p>}
    </>
  );
}

export default App;
