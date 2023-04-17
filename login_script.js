function loginUser(event) {
    event.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
  
  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(`${username}:${password}`)
  });
  
  const options = {
    method: "GET",
    headers: headers,
  };
  
  fetch(`http://localhost:3000/proxy`,options)
    .then(response => {
      if (response.ok) {
        console.log("response ok")
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
    .then(data => {
      jwt_token = data.token;
      alert("successfully logged in!")
      loginForm.style.display = "none";
      const encodedCredentials = jwt_token.split('.')[1];
      const decodedCredentials = JSON.parse(atob(encodedCredentials));
      const userId = decodedCredentials['https://hasura.io/jwt/claims']['x-hasura-user-id'];
      getUserData(userId)
    })
    .catch(error => {
     alert("Please check that the credentials are valid")
      console.log(error);
    });
  
}