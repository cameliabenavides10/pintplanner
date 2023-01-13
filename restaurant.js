let locationZip = "787";
let restaurantChoiceContainer = document.getElementById('restaurants');
let restaurantName = document.getElementById('items');
let restaurantChoice = "Dim-Sum";
let fetchButton = document.getElementById('submit-activities');
const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'e045ca9b9amsha0dbbe5302d76a2p14b6a8jsnfe609301f0a7',
              'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
            }
        }

function getApi() {
  let locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationsURL = locationsURL + "/" + locationZip + "/10"

  fetch(locationsURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.restaurants.length; i++) {
   
        let restaurantList = data.restaurants[i];
        let restaurants = document.createElement('h3'); 
        let restraurantAddress = document.createElement('p');
       

        restaurants.textContent = restaurantList.restaurantName;
        restraurantAddress.textContent= restaurantList.address + restaurantList.zipCode;
        restaurantChoiceContainer.append(restaurants);
        restaurantChoiceContainer.append(restraurantAddress);
        
        let restaurantChoice = "Dim-Sum";
        let storeName = restaurantChoice
        storedRestChoice = JSON.parse(localStorage.getItem("storeName")) || [];
        storedRestChoice.push(storeName);
        localStorage.setItem("storeName", JSON.stringify(storedRestChoice));
      }
    });
    
}
fetchButton.addEventListener('click', getApi);

        // let storeName = restaurantList.restaurantName
        
// getApi();

// Michael's API Key: 'X-RapidAPI-Key': 'e045ca9b9amsha0dbbe5302d76a2p14b6a8jsnfe609301f0a7', 'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    

    // karen's API keys that have hit the limit: 'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
                // 'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'