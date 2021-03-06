
// Reference the left column which is the form ans the entry of username to search
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// Reference the right column which will displayed the searched user and the repoes name and counts of issues
var repoSearchTerm = document.querySelector("#repo-search-term"); // Spanned item that will contain the searched user
var repoContainerEl = document.querySelector("#repos-container"); // Div list group

// Button languages element assignation 
languageButtonsEl = document.querySelector("#language-buttons");


var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            //console.log(data)
            displayRepos(data.items, language);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      });
  };



var getUserRepos = function(user) {
    // format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url

    fetch(apiUrl).then(function(response) {
        if(response.ok) { // Check if ther response is ok, meaning a HTTP 200 response.
        response.json().then(function(data) {
            displayRepos(data, user);
            //console.log(data);
        });
        } else { // Any other response like 400 500 will display the error.
            window.alert("Error: " + response.statusText);
        }
    }).catch(function(error) { // fetch api way of handling network errors.
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      });
};
          


  
//getUserRepos("microsoft");
//getUserRepos("facebook");
//getUserRepos("esroleo");


var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input elementgit 
    var username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }
    //console.log(event);
};


var displayRepos = function(repos, searchTerm) {

    // check if api returned any repos
    if (repos.length === 0) {
        repoSearchTerm.textContent = searchTerm;
        repoContainerEl.textContent = "No repositories found for " + searchTerm + ". Please try another user.";
        return;
    }
    // clear old content
    repoSearchTerm.textContent = searchTerm;
    repoContainerEl.textContent = "";

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
  
    // create a container for each repo
    //var repoEl = document.createElement("div");
    //repoEl.classList = "list-item flex-row justify-space-between align-center";
    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);


  
    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
  
    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
    statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

  
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
    
    console.log(repos);
    console.log(searchTerm);
};


var buttonClickHandler = function (event) {

    let language = event.target.getAttribute("data-language")
    //console.log(language);
    if (language){
        getFeaturedRepos(language);
        // clear old content from language
        // clear old content
        repoContainerEl.textContent = "";
    } 
    

};

//getFeaturedRepos(getFeaturedRepos);

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

