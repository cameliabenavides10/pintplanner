// Variable for Brewery type buttons
var brewType = ""; // global so can be used in brewery query
var microButton = document.getElementById('micro');
var brewpubButton = document.getElementById('brewpub');
var regionalButton = document.getElementById('regional');
var contractButton = document.getElementById('contract');
var breweryButtonContainer = document.getElementById("brewButtons")
var brewButtonPressed = ""  // is this still used?

// Variables for Brewery results list
var breweriesContainer = document.getElementById('breweries');
var breweryContainerCard = document.getElementById('brewery-container-card');
var selectedBrewery = {};
var brewChoice = "";
var brewChoiceZip = "";

// Variables for Restaurants functions
let locationZip = ""; // was "787"
let restaurantChoiceContainer = document.getElementById('restaurants');
let restaurantName = document.getElementById('items');
//let restaurantChoice = document.createElement('p'); //I don't think we're using this
let fetchButton = document.getElementById('submit-activities'); // karen

// Variable for determining if brewery selected will have restaurant results
var badZip = ['78703', '78721', '78723', '78727', '78732', '78733', '78734', '78736', '78737', '78742', '78744', '78746', '78749', '78751', '78752', '78756'];

// results variables
var resultsContainer=document.getElementById('results');

// function to determine which brewery type was selected
function getButton(event){  
  // console.log('get button ran') 
  // console.log("event", event.target.id)
  brewType=event.target.id;
  console.log(brewType);
  breweryButtonContainer.classList="hide  "
    // call brewery query function based on selected brewery type
    getApi(); 
  };
   
// function to find breweries of selected type in Austin area  
function getApi() {
  var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=austin&by_postal=78&per_page=50&by_type=" + brewType;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)
        // Using console.log to examine the data
       
        // LOOPING THRU INFO AND GETTING NAMES, ADDRESS, ZIP
        for (var i = 0; i < data.length; i++) {
          
          var brewName = data[i].name;
          var brewZip = data[i].postal_code;
          var brewStreet = data[i].street;

          // Creating list of Brewery results
          brewName = document.createElement('h3');
          brewName.id = `data${i}`
          brewStreet = document.createElement('p');
          brewZip = document.createElement('p');
          brewName.textContent = data[i].name;
          brewZip.textContent = data[i].postal_code;
          brewStreet.textContent = data[i].street;
            // console.log("this is brewName.id " + brewName.id);
         
          //Append will attach the element as the bottom most child.
          breweriesContainer.append(brewName);
          breweriesContainer.append(brewZip);
          breweriesContainer.append(brewStreet);
          brewName.setAttribute("name", brewName.textContent);
          brewName.setAttribute("postal_code", brewZip.textContent);
          brewName.setAttribute("street", brewStreet.textContent);

          // Users should be able to click on a brewery name
           $(`#${brewName.id}`).on("click", function (event) {
            
            // build obj var to pass choice to restaurant function and results
            selectedBrewery.brewName = $(this).attr("name");
            selectedBrewery.brewStreet = $(this).attr("street");
            
            // remove zip+4 info, restuarants query only takes 5 digit zips
            selectedBrewery.brewChoiceZip = $(this).attr("postal_code").split('-', 1).pop();
            console.log("selected brewery zip", selectedBrewery.brewChoiceZip);
            // compare zip of selected brewery to array of known bad zips 
            let zipCompare = selectedBrewery.brewChoiceZip;
              // console.log(zipCompare);
              // console.log(badZip.includes(zipCompare));
            if (badZip.includes(zipCompare)){
              // if zip is bad, default to known good zip for entire area
              selectedBrewery.brewChoiceZip='787';
  
            };
            breweryContainerCard.classList="hide";
            // save brewery info for use in restaurants and results functions
            brewChoice=$(this).text();
            brewChoiceZip=$(this).next().text();
              // console.log(brewChoiceZip);
              // console.log('Brewery type '+ JSON.stringify(selectedBrewery) + ' was clicked ')

            // pass brewery info to local storage  
            localStorage.setItem("selectedBrewery", JSON.stringify(selectedBrewery));
            getRestaurantApi()
           });
        }
      });
  }










// START OF RESTAURANT CONTAINER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '23188ebbdcmsh7aeb3fccfa1534cp172313jsnbcc398cc377f',
        'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    } // camelia's API Key    
}

// display a list of restuarants based on zip code of user selected brewery
function getRestaurantApi() {
    let locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationZip = selectedBrewery.brewChoiceZip;
    locationsURL = locationsURL + "/" + locationZip + "/10"

      // console.log(locationsURL);  

    fetch(locationsURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.restaurants.length; i++) {
        // loop through restaurant data returned from query
        let restaurant = data.restaurants[i];
        
        // create placeholder elements for restaurant results
        let restaurantName = document.createElement('h3'); 
        restaurantName.id = `restaurant${i}`
        restaurantName.setAttribute("restaurantName", restaurant.restaurantName);
        restaurantName.setAttribute("address", restaurant.address);
        restaurantName.setAttribute("zipCode", restaurant.zipCode);
        restaurantName.setAttribute("website", restaurant.website);
        restaurantName.setAttribute("cuisineType", restaurant.cuisineType);
        let restraurantAddress = document.createElement('p');
      
        // populate restaurant details to placeholders
        restaurantName.textContent = restaurant.restaurantName;
        restraurantAddress.textContent= restaurant.address + " ," + restaurant.zipCode + " , " + restaurant.cuisineType + " \n " + restaurant.website;
        restaurantChoiceContainer.append(restaurantName);
        restaurantChoiceContainer.append(restraurantAddress);

        // user should be able to click on a restaurant to select it
        $(`#${restaurantName.id}`).on("click", function() {
            //store selected restaurant for use in results function
            var selectedRestaurant = {
            restaurantName: $(this).attr("restaurantName"),
            address: $(this).attr("address"),
            zipCode:$(this).attr("zipCode"),
            website: $(this).attr("website"),
            cuisineType:$(this).attr("cuisineType")
          }
          restaurantChoiceContainer.classList="hide"; 
        // pass selected restaurant to local storage
        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
        //  console.log('restaurant name ' + restaurant.restaurantName + ' was clicked')
        
        // call the results function
        results();
        });
      }
    });
  }



// RESULTS CONTAINER

// user should see the selected brewery and restaurant info
function results(){

  // get brewery info from local storage
  let storedBrewery = JSON.parse(localStorage.getItem("selectedBrewery")) || [];

  // display selected brewery
  let displayBrewery = document.getElementById("brewAddressEl-Zero").append(storedBrewery.brewName);
  let displayBreweryOne = document.getElementById("brewAddressEl-One").append(storedBrewery.brewStreet);

  // get selected restaurant info from local storage
  let selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant")) || [];

  // display selected restaurant
  let displayRestaurantOne = document.getElementById("li-One").append(selectedRestaurant.address);
  let displayRestaurantTwo = document.getElementById("li-Two").append(selectedRestaurant.zipCode);
  let displayRestaurantThree = document.getElementById("li-Three").append(selectedRestaurant.website);
  let displayRestaurantFour = document.getElementById("li-Four").append(selectedRestaurant.cuisineType);
  let displayRestaurant = document.getElementById("resName").append(selectedRestaurant.restaurantName);
}

// TO DO: Clear Cache and start over button

// TO DO: Clear Cache and start over button

function clearButton() {
  localStorage.clear();
  location.reload();
}
// functions for brewery type buttons and brewery selection / restaurant fetch button
regionalButton.addEventListener('click', getButton);
microButton.addEventListener('click', getButton);
brewpubButton.addEventListener('click', getButton);
contractButton.addEventListener('click', getButton);
//get rid of console.logs
//remove let restaurantChoice
// remove var brewButtonPressed