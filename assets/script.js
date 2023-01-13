var breweriesContainer = document.getElementById('breweries');
var brewSelect = document.querySelector('#list1').value;
var brewChoice = "aby_type="+brewSelect;
console.log(brewChoice);

breweriesContainer.addEventListener("click", console.log(brewSelect));