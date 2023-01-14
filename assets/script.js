let locationZip = "787";
let restaurantChoiceContainer = document.getElementById('restaurants');
let restaurantName = document.getElementById('items');
let restaurantChoice = "";
let fetchButton = document.getElementById('submit-activities'); // karen
var breweriesContainer = document.getElementById('breweries');
var regionalButton = document.getElementById('regional-button');
var brewChoice = '';
 // micro, brewpub, contract, regional

function getApi() {
    var requestUrl = 'https://api.openbrewerydb.org/breweries?by_postal=78&by_city=austin&per_page=50';
        brewChoice = document.querySelector('#list1').value
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


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e045ca9b9amsha0dbbe5302d76a2p14b6a8jsnfe609301f0a7',
        'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    }
}

function getApii() {
    let locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationsURL = locationsURL + "/" + locationZip + "/10"

    fetch(locationsURL, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.restaurants.length; i++) {

                let restaurant = data.restaurants[i];

                let restaurantName = document.createElement('h3');
                restaurantName.id = `restaurant${i}`
                let restraurantAddress = document.createElement('p');


                restaurantName.textContent = restaurant.restaurantName;
                restraurantAddress.textContent = restaurant.address + restaurant.zipCode;
                restaurantChoiceContainer.append(restaurantName);
                restaurantChoiceContainer.append(restraurantAddress);

                $(`#${restaurantName.id}`).on("click", function () {
                    console.log('restaurant name' + restaurantName + 'was clicked')
                });
            }
        });
}
regionalButton.addEventListener('click', getApi)
fetchButton.addEventListener('click', getApii);