const github_data = {
    "token": "7de125784fe8a775822dbc5edd0e06cadc3ec7be",
    "username": "echilaka1"
};

const fetch = require("node-fetch");

const query_twenty_repo = {
    "query": `
    query { 
        user(login: "${github_data.username}") {
          repositories (first: 20) {
            totalCount
            nodes {
              nameWithOwner
            }
          }
        }
      }`,
  };

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data.token,
};

fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_twenty_repo),
  })
    .then(response => {console.log(JSON.stringify(response))})
    
    .catch((err) => console.log(JSON.stringify(err)));