const github_data = {
  token: "44e9fb22d6efc83df4ce178ea9d7698cd957a225",
  username: "echilaka1",
};

const fetch = require("node-fetch");

const body = {
  query: `
    query { 
      user(login: ${github_data["username"]}) {
        avatarUrl
        bio
        name
        status {
          emojiHTML
        }
        url
        repositories (first: 20) {
          totalCount
          nodes {
            ... on Repository {
              name
              description
              primaryLanguage {
                name
                color
              }
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
              updatedAt
              
            }
          }
        }
      }
    }`,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data["token"],
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((response) => {
    console.log(JSON.stringify(response));
  })

  .catch(err => console.log(JSON.stringify(err)));
