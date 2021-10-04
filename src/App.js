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
    const username = inputVal;
    console.log(username);
    setInputVal("");

    // USER PROFILE INFORMATION

    const userInformation = await getUserInfo(inputVal);
    setUser(userInformation);

    // USER'S REPOSITORY INFORMATION

    const userRepoInformation = await getUserRepos(inputVal);

    userRepoInformation.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return 1;
      }
      if (a.created_at > b.created_at) {
        return -1;
      }
      return 0;
    });

    const repoArray = userRepoInformation.slice(0, 4);
    setRepos(repoArray);
  };

  return (
    <>
      <div className="App">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="Profile Username">Username</label>
          <br />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {user && user.login ? (
        <div>
          <h3>Username: {user.login}</h3>
          <h3>Bio: {user.bio}</h3>
          <h3>Followers: {user.followers}</h3>
          <h3>Following: {user.following}</h3>
          <h3>Public Repos: {user.public_repos}</h3>
          <img
            width="100"
            height="100"
            alt="User Profile"
            src={user.avatar_url}
          />
        </div>
      ) : (
        <p></p>
      )}
      {repos && repos.length > 0 ? (
        <ul>
          {repos.map((repo) => {
            return (
              <li>
                <a href={repo.html_url} key={repo.name}>
                  {repo.name}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default App;
