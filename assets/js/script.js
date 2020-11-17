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
  Authorization: "bearer " + "674081bc4938ec4a41199519f43fd4d807c8564d",
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => {
    const str = data.data.user.url;
    const userUrl = str.split("/").pop();
    const allrepo = document.querySelector("#repos");
    const totalsearchrepocount = data.data.user.repositories.nodes.length;
    document.querySelector(".profile-name").textContent = data.data.user.name;
    document.querySelector(".user-bio").textContent = data.data.user.bio;
    document.querySelector(".user-name").textContent = userUrl;
    document.querySelector(".user-image").src = data.data.user.avatarUrl;
    document.querySelector(".profile-image").src = data.data.user.avatarUrl;
    document.querySelector(".total-repo").textContent =
      data.data.user.repositories.totalCount;
    document.querySelector(".e-status").innerHTML =
      data.data.user.status.emojiHTML;
    document.querySelector(".search-repo").textContent = totalsearchrepocount;

    data.data.user.repositories.nodes.forEach((repo) => {
      document.querySelector(".repo-names").textContent = repo.name;                              
      console.log("name: " + repo.name);
    });

    console.log("All Results", data.data.user.repositories.nodes);
  })

  .catch((error) => console.error("Fetch Error:", error));
