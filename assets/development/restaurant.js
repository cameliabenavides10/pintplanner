let locationZip = "787";
let restaurantChoiceContainer = document.getElementById('restaurants');
let restaurantName = document.getElementById('items');
let restaurantChoice = "";
let fetchButton = document.getElementById('submit-activities');  // karen
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
   
        let restaurant = data.restaurants[i];
        
        let restaurantName = document.createElement('h3'); 
        restaurantName.id = `restaurant${i}`
        let restraurantAddress = document.createElement('p');
       

        restaurantName.textContent = restaurant.restaurantName;
        restraurantAddress.textContent= restaurant.address + " ," + restaurant.zipCode +" ,"+ restaurant.cuisineType;
        restaurantChoiceContainer.append(restaurantName);
        restaurantChoiceContainer.append(restraurantAddress);

        $(`#${restaurantName.id}`).on("click", function() {
         console.log('restaurant name ' + restaurant.restaurantName + ' was clicked')
        });
      }
    });
}
        
        // let storeName = restaurantChoice
        // storedRestChoice = JSON.parse(localStorage.getItem("storeName")) || [];
        // storedRestChoice.push(storeName);
        // localStorage.setItem("storeName", JSON.stringify(storedRestChoice));

// fetchButton.addEventListener('click', getApi);
fetchButton.addEventListener('click', getApi);

// function restaurantChoice(event) {
//   if (!event) var event = window.event;
//   if (event.target) targ = event.target;
//   else if (event.srcElement) targ = event.srcElement;
// }

// a.addEventListener('click', e => {
//   e.currentTarget; // always returns "a" element
//   e.target; // may return "a" or "span"
// })

// getApi();

// Michael's API Key: 'X-RapidAPI-Key': 'e045ca9b9amsha0dbbe5302d76a2p14b6a8jsnfe609301f0a7', 'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'

// Camelia's API Key: 'X-RapidAPI-Key': '46164f71f4msh24d65c9eecf4879p1c3ec4jsnd8b0ebced189', 'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    

    // karen's API keys that have hit the limit: 'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
                // 'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'

               