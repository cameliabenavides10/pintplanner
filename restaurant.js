var locationZip = "787";
var restaurantChoiceContainer = document.getElementById('restaurants-container');
var restaurantName = document.getElementById("restaurant-list")
var restaurantChoice = "";
var fetchButton = document.getElementById('fetch-button');
const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
                'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
            }
        }


function getApi() {
    var locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationsURL = locationsURL + "/" + locationZip + "/10"
    console.log(locationsURL);

  fetch(locationsURL, options)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        //Creating a h3 element and a p element
        var restaurants = document.createElement('h3');

        //Setting the text of the h3 element and p element.
        restaurants.textContent = data[i].restaurantName;
  

        //Appending the dynamically generated html to the div associated with the id="users"
        //Append will attach the element as the bottom most child.
        restaurantName.append(restuarants);
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






    // const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '495e45f322msh4fca825b3c3afa3p19ec03jsnd3b134bddfbd',
    //             'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    //         }
    // };
    // var locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    //     locationsURL = locationsURL + "/" + locationZip + "/20"

    // fetch(locationsURL, options)
    //     .then(response => response.json())
    //     // if (locationZip)
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
        


// submitbtn.addEventListener('click', searchSubmit);


// function restaurantList(zip) {
//     locationZip = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
//     fetch(apiUrlWeather).then((results) => {
//         return results.json();
//     })
//     .then(function(data)    {
//         displayCurrentWeather(data, city);
//     })
// }