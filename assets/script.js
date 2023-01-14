let locationZip = "787";
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
              brewZip = document.createElement('p');
              brewName.textContent = data[i].name;
              brewZip.textContent = data[i].postal_code;
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

          // $(`#${brewButtons.id}`).on("click", function (event) {
          //   console.log('Brewery type' + event.target + 'was clicked')
          // });
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
                    console.log('restaurant name' + restaurant.restaurantName + 'was clicked')
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