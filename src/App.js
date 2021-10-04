import { useState } from "react";
import { Input, Button, Card, Text, Spacer, User } from "@geist-ui/react";
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
    if (userInformation && userInformation.login) {
      // VALID USER FOUND
      // USER PROFILE INFORMATION
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
    } else {
      // TODO: Handle NOT FOUND
    }
  };

  return (
    <>
      <div className="Header">
        <Text h2>GITHUB PROFILE SEARCH</Text>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <Input
            value={inputVal}
            htmlType="text"
            type=""
            width="80%"
            placeholder="Username"
            onChange={(e) => handleInputChange(e)}
          />

          <Spacer w={5} />
          <Button type="success" htmlType="submit">
            Search
          </Button>
        </form>
      </div>

      {user && user.login ? (
        <Card
          style={{
            backgroundColor: "#e3e3e3",
            margin: "0% 15%",
            fontSize: "2rem",
          }}
        >
          <User className="profile-card" src={user.avatar_url} name={user.name}>
            <User.Link href={user.html_url}>@{user.login}</User.Link>
          </User>
        </Card>
      ) : (
        <p></p>
      )}
      {repos && repos.length > 0 ? (
        <ul>
          {/* {repos.map((repo) => {
            return (
              <li>
                <a href={repo.html_url} key={repo.name}>
                  {repo.name}
                </a>
              </li>
            );
          })} */}
        </ul>
      ) : (
        <p></p>
      )}

      {/* TODO: ERROR HANDLING */}
    </>
  );
}

export default App;
