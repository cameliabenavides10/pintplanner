var usersContainer = document.getElementById('users');
var fetchButton = document.getElementById('fetch-button');
var brewChoice = "&by_type=regional"

function getApi() {
  var requestUrl = 'https://api.openbrewerydb.org/breweries?by_city=austin';
    requestUrl = requestUrl+brewChoice;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        //Creating a h3 element and a p element
        var brewName = document.createElement('h3');
        var brewZip = document.createElement('p');

        //Setting the text of the h3 element and p element.
        brewName.textContent = data[i].name;
        brewZip.textContent = data[i].postal_code;

        //Appending the dynamically generated html to the div associated with the id="users"
        //Append will attach the element as the bottom most child.
        usersContainer.append(brewName);
        usersContainer.append(brewZip);
      }
    });
}
fetchButton.addEventListener('click', getApi);
