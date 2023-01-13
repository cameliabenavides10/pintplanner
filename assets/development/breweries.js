var breweriesContainer = document.getElementById('breweries');
var regionalButton = document.getElementById('regional-button');
var microButton = document.getElementById('micro-button');
var brewpubButton = document.getElementById('brewpub-button');
var contractButton = document.getElementById('contract-button');
var brewChoice = "&by_type=" // micro, brewpub, contract, regional

// TODO -- listen for click on any of the 4 available type buttons
  // id of button pressed should pass to brewChoice var
  // e.g. if 'regional-button' is pressed then brewChoice = '&by_type=regional'

function getApi() {
  var requestUrl = 'https://api.openbrewerydb.org/breweries?by_postal=78&by_city=austin&per_page=50';
    requestUrl = requestUrl+brewChoice; // adds type query to base url

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
        // brewStreet.textContent = data[i].street;
        // brewCity.textContent = data[i].city;
        // brewState.textContent = data[i].state;
        brewZip.textContent = data[i].postal_code;

        //Appending the dynamically generated html to the div associated with the id="users"
        //Append will attach the element as the bottom most child.
        breweriesContainer.append(brewName);
        breweriesContainer.append(brewZip);
      }
    });
}



fetchButton.addEventListener('click', getApi);
