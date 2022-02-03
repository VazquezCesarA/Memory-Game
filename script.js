const gameContainer = document.getElementById("game");

const restartButton = document.querySelector('#restart');

restartButton.addEventListener('click', function(){
  window.location.reload();
});

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


let counterTwo = 1;

let gotchasCounter = 0;

let gotchasCounter2 = 0;


function removeBackGround(event, colorClassNow){
  //Try again: If incorrect match the color will be set to white.
  let firstValue = 0;
  event.target.style.backgroundColor = colorClassNow;
  if (counterTwo >= 2) {
    counterTwo = 1;
    for (let i in localStorage) {
      firstValue = i;
      break;
    }
    const first = document.getElementsByClassName(firstValue);

    //Turning normal if incorrect:
    event.target.style.backgroundColor = 'white';
    
    if(first[0].style.backgroundColor == 'white'){
      if(first[1].style.backgroundColor != ''){
        first[0].style.backgroundColor = 'white';
        first[1].style.backgroundColor = 'white';
      }
    }
    if(first[1].style.backgroundColor == 'white'){
      if(first[0].style.backgroundColor != ''){
        first[0].style.backgroundColor = 'white';
        first[1].style.backgroundColor = 'white';
      }
    }
    // Remove when they match;
    if (first[0].style.backgroundColor == first[1].style.backgroundColor) {
      localStorage.removeItem(first[0].style.backgroundColor);
    }
    else if (first[0].style.backgroundColor == ''){
      first[1].style.backgroundColor = 'white';
    }
    else{
      first[0].style.backgroundColor = 'white';
    }
    event.target.style.backgroundColor = 'white';
    localStorage.clear();
  }
  else{
    counterTwo++;
    localStorage.setItem(colorClassNow, colorClassNow);
    event.target.style.backgroundColor = colorClassNow;
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let colorClassNow = event.target.className;
  let lastColorStorageBefore = localStorage.getItem(colorClassNow);

  let divs = document.getElementsByClassName(event.target.className);

  //If correct:
  if(colorClassNow == lastColorStorageBefore){
    counterTwo = 1;
    event.target.style.backgroundColor = colorClassNow;
    localStorage.clear();
  }
  else{
    //If incorrect:  
    event.target.style.backgroundColor = colorClassNow;
    setTimeout(function(){
      removeBackGround(event, colorClassNow)
    }, 1000);
    gotchasCounter2 = 0;
    gotchasCounter = 0;
  } 

  //If incorrect:
  if(divs[0] == event.target){
    gotchasCounter++;
    if (gotchasCounter == 2) {
      event.target.style.backgroundColor = colorClassNow;
      divs[0].style.backgroundColor = 'white';
      gotchasCounter = 0;
    }
  }
  else if(divs[1] == event.target){
    gotchasCounter2++;
    if (gotchasCounter2 == 2) {
      event.target.style.backgroundColor = colorClassNow;
      divs[1].style.backgroundColor = 'white';
      gotchasCounter2 = 0;
    }
  }
  // event.target.style.backgroundColor = colorClassNow;
}

createDivsForColors(shuffledColors);

//When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.


//use localStorage or sessionStorage, save the first value you click on and if the second value dosent match then remove the element

//count the number of times the color has executed 


//counter. I dont think its a counter. The condition has to be if the 2 colors match then keep playing and store them in localstorage. Use event.target to target the correct div. Use an Array