const classToggle = () => {
  const navs = document.querySelectorAll(".Navbar__Items");

  navs.forEach((nav) => nav.classList.toggle("Navbar__ToggleShow"));
};

document
  .querySelector(".Navbar__Link-toggle")
  .addEventListener("click", classToggle);

const alphabeticFormat = (date) => {
  if (!date) return;
  let zeroTime = false;
  try {
    let split = date.split("T");
    if (split[1] === "00:00:00") zeroTime = true;
  } catch (error) {}

  date = new Date(date);
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();

  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (mins < 10) mins = `0${mins}`;
  if (secs < 10) secs = `0${secs}`;

  //CHECK IF DATE HAS TIME
  if (zeroTime)
    return `${day} ${monthNames[monthIndex]}. ${year} ${hours}:${mins}:${secs}`;
  if (hours === "00" && mins === "00" && secs === "00")
    return `${day} ${monthNames[monthIndex]}. ${year}`;
  return `${day} ${monthNames[monthIndex]}`;
};

const myToken = config.TOKEN;
const myUser = config.USER_NAME;

const body = {
  query: `
      query { 
        user(login: "${myUser}") {
          avatarUrl
          bio
          name
          status {
            emojiHTML
          }
          url
          repositories (first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
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
  Authorization: "bearer " + myToken,
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
    const totalsearchrepocount = data.data.user.repositories.nodes.length;
    document.querySelector(".profile-name").textContent = data.data.user.name;
    document.querySelector(".user-bio").textContent = data.data.user.bio;
    document.querySelector(".user-name").textContent = userUrl;
    document.querySelector("#user-na").textContent = userUrl;
    document.querySelector(".user-image").src = data.data.user.avatarUrl;
    document.querySelector(".profile-image").src = data.data.user.avatarUrl;
    document.querySelector(".total-repo").textContent =
      data.data.user.repositories.totalCount;
    document.querySelector(".e-status").innerHTML =
      data.data.user.status.emojiHTML;
    document.querySelector(".search-repo").textContent = totalsearchrepocount;

    let therepos = "";
    data.data.user.repositories.nodes.forEach((repo) => {
      const updatedDate = alphabeticFormat(repo.updatedAt);
      therepos += `<div style="border-bottom: 1px solid #e1e4e8;">
      <div>
        <div class="clear-float">
          <span class="text-left">
            <h1 class="repo-names">${repo.name}</h1>
          </span>
          <div>
            <span class="repo-star text-right">
              <svg
                class="octicon-star v-align-middle"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                >
                </path>
              </svg>&nbsp; Star
            </span>
          </div>
        </div>
        
        <p class="repo-desc">${repo.description}</p>
        <span class="repo-language-color" style="background-color: #563d7c"></span>
        <span class="programmingLanguage">CSS</span>
        <span class="programmingLanguage">
          <svg
            class="octicon-star v-align-middle"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            >
            </path>
          </svg>&nbsp; ${repo.stargazers.totalCount}
        </span>
        <span class="programmingLanguage">
          <svg
            class="octicon-repo-forked v-align-middle"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            >
            </path>
          </svg>&nbsp; ${repo.forks.totalCount}
        </span>

        <span class="programmingLanguage">Updated on ${updatedDate}</span>
      </div>
      
      
    </div>`;
    });

    console.log("user details", data.data.user.repositories.nodes);

    document.querySelector("#repos").innerHTML = therepos;
  })

  .catch((error) => {
    console.log(error);
  });
