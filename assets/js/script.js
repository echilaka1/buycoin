function classToggle() {
  const navs = document.querySelectorAll(".Navbar__Items");

  navs.forEach((nav) => nav.classList.toggle("Navbar__ToggleShow"));
}

document
  .querySelector(".Navbar__Link-toggle")
  .addEventListener("click", classToggle);

const body = {
  query: `
      query { 
        user(login: "echilaka1") {
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
  Authorization: "bearer " + "44e9fb22d6efc83df4ce178ea9d7698cd957a225",
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("All Results", data.data);
  })

  .catch((err) => console.log(JSON.stringify(err)));
