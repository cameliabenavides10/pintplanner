let locationZip = "787";
let restaurantChoiceContainer = document.getElementById('restaurants-container');
let restaurantName = document.getElementById("restaurant-list")
let restaurantChoice = "";
let fetchButton = document.getElementById('fetch-button');
const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
                'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
            }
        }


function getApi() {
  let locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationsURL = locationsURL + "/" + locationZip + "/10"
    console.log(locationsURL);

  fetch(locationsURL, options)
    .then(function (response) {
        console.log('responses', response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
      
        let restaurants = document.createElement('h3');

        restaurants.textContent = data[i].restaurantName;
  

        restaurantName.append(restaurants);
      }
    });
}
// fetchButton.addEventListener('click', getApi);
getApi();

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
// 		'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
// 	}
// };

// fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/78660/10', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
