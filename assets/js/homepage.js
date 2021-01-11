var getUserRepos = function(user) {
    // format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        });
    });
};
          
    
    /*
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
          });
    });
    */
   



//function getUserRepos(user) {
//}
  
getUserRepos("microsoft");
getUserRepos("facebook");
getUserRepos("esroleo");


