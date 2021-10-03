export async function getUserInfo(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const json = await response.json();
  return json;
}

export async function getUserRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const json = await response.json();
  return json;
}
