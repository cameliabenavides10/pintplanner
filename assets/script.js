let locationZip = ""; // was "787"
let restaurantChoiceContainer = document.getElementById('restaurants');
let restaurantName = document.getElementById('items');
let restaurantChoice = "";
let fetchButton = document.getElementById('submit-activities'); // karen
var breweriesContainer = document.getElementById('breweries');
var brewButtonPressed = ""
var brewType = "";
var microButton = document.getElementById('micro');
var brewpubButton = document.getElementById('brewpub');
var regionalButton = document.getElementById('regional');
var contractButton = document.getElementById('contract');
var brewChoice = "";
var brewChoiceZip = "";
var selectedBrewery = {};

//GETTING VALUES AND CREATING A DYNAMIC VALUE BASED ON USER CHOICE WHILE TRYING TO INSERT IT INTO URL 
// var brewOption = document.getElementById("list1");
// var brewValue = brewOption.value;

// FUNCTION GRABBING VALUE FROM DROP DOWN WORKS MORE OR LESS BUT NEED POLISHING
// function listQ(){
//   var brewOption = document.getElementById("list1");
//   var brewValue = brewOption.value;
//   console.log(brewValue);
  
// };
function getButton(event){  
  console.log('get button ran') 
  console.log("event", event.target.id)
  brewType=event.target.id;
  console.log(brewType);

  // if (event.target.id = 'regional-button') {
  //       brewType = '&by_type=regional'
  //   } else if (event.target.id = 'brewpub-button') {
  //       brewType = '&by_type=brewpub'
  //   } else if (event.target.id = 'micro-button') {
  //       brewType = '&by_type=micro'
  //   } else if (event.target.id = 'contract-button') 
  //       brewType= '&by_type=contract'
  //    console.log(brewType)
  //    console.log("event", event.target.id)
     getApi(); 
    };
   
function getApi() {
  var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=austin&per_page=50&by_type=" + brewType;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        //Using console.log to examine the data
       
        // LOOPING THRU INFO AND GETTING NAMES, ADDRESS, ZIP, PHONE
        for (var i = 0; i < data.length; i++) {
          
          var brewName = data[i].name;
          var brewZip = data[i].postal_code;

          brewName = document.createElement('h3');
          brewName.id = `data${i}`
          


              brewZip = document.createElement('p');
              brewName.textContent = data[i].name;
              brewZip.textContent = data[i].postal_code;
              console.log(brewName.id);
          // var barAddress = data[i].street;
          // var barPhone = data[i].phone;
          // console.log(barZip);
          // console.log(brewName);
          // console.log(barAddress);
          // console.log(barPhone);
        
  
          //Setting the text of the h3 element and p element.
         
          // brewStreet.textContent = data[i].street;
          // brewCity.textContent = data[i].city;
          // brewState.textContent = data[i].state;
          
  
          //Appending the dynamically generated html to the div associated with the id="users"
          //Append will attach the element as the bottom most child.
          breweriesContainer.append(brewName);
          breweriesContainer.append(brewZip);
          brewName.setAttribute("name", brewName.textContent);
          brewName.setAttribute("postal_code", brewZip.textContent);

           $(`#${brewName.id}`).on("click", function (event) {
            
            // build obj var to pass choice to restaurant function and results
            selectedBrewery.brewName = $(this).attr("name");
            selectedBrewery.brewChoiceZip = $(this).attr("postal_code");
            

            localStorage.setItem("selectedBrewery", JSON.stringify(selectedBrewery));
             
            console.log('object passed to local storage: ' + JSON.stringify(selectedBrewery));

            brewChoice=$(this).text();
            brewChoiceZip=$(this).next().text();
            console.log(brewChoiceZip);
            console.log('Brewery type '+ JSON.stringify(selectedBrewery) + ' was clicked ')

           });
        }
      });
  }
// START OF RESTAURANT CONTAINER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': ' ',
        'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    } // Camelia's API Key
}

function getApii() {
    let locationsURL = 'https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode'
    locationZip = selectedBrewery.brewChoiceZip;
    locationsURL = locationsURL + "/" + locationZip + "/10"

    console.log(locationsURL);  

    fetch(locationsURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.restaurants.length; i++) {
   
        let restaurant = data.restaurants[i];
        
       
        let restaurantName = document.createElement('h3'); 
        restaurantName.id = `restaurant${i}`
        restaurantName.setAttribute("restaurantName", restaurant.restaurantName);
        restaurantName.setAttribute("address", restaurant.address);
        restaurantName.setAttribute("zipCode", restaurant.zipCode);
        restaurantName.setAttribute("website", restaurant.website);
        restaurantName.setAttribute("cuisineType", restaurant.cuisineType);
        let restraurantAddress = document.createElement('p');
      



        restaurantName.textContent = restaurant.restaurantName;
        restraurantAddress.textContent= restaurant.address + " ," + restaurant.zipCode + " , " + restaurant.cuisineType + " \n " + restaurant.website;
        restaurantChoiceContainer.append(restaurantName);
        restaurantChoiceContainer.append(restraurantAddress);

        $(`#${restaurantName.id}`).on("click", function() {
          var selectedRestaurant = {
            restaurantName: $(this).attr("restaurantName"),
            address: $(this).attr("address"),
            zipCode:$(this).attr("zipCode"),
            website: $(this).attr("website"),
            cuisineType:$(this).attr("cuisineType")
          }

        localStorage.setItem("selectedRestaurant", JSON.stringify(selectedRestaurant));
         console.log('restaurant name ' + restaurant.restaurantName + ' was clicked')
        });
      }
    });
  }
// document.getElementById("list1").addEventListener("click",listQ)

regionalButton.addEventListener('click', getButton);
microButton.addEventListener('click', getButton);
brewpubButton.addEventListener('click', getButton);
contractButton.addEventListener('click', getButton);
fetchButton.addEventListener('click', getApii);