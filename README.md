# BUYCOINS FRONTEND ENGINEER TEST

Visit TEST URL (https://buycoins-github-ui.netlify.app/) to see the live version of the test.

## How to setup your API key and username ##

After creating your API key, create a config.js on the root directory of this project.

In the config file, enter your API key and username. You don't need any other code in this file:

const config = {
  TOKEN: "12345",
  USER_NAME: "ire1234",
};

Once this is done you should be able to see the dynamic areas of the UI feeding from Github Graphql


## Coding Challenge

Using the GraphQL GitHub API (https://developer.github.com/v4/explorer/), recreate your github profile page (the tab that lists your repositories). 

### What you SHOULD include:
1. The responsive design of the website. Make your recreation as close to the real website as possible
2. The profile picture and basic description of the account
3. 20 repositories (maximum)

See an example of what the final result should look like - https://res.cloudinary.com/bitkoin/image/upload/v1605131940/frontend_dev_example.png

### What you should NOT include:
1. Pagination/Search functionality - you should load the first 20 repositories only
2. The other tabs (e.g. Overview, Projects, Packages)
3. The graph showing year of activity for the repository

### Other requirements:
- Do not use any CSS or JS framework
- Host your site somewhere (e.g. Netlify or Github Pages)