// //Take input and subtract weight of the bar = newWeight
// let newWeight = 300 - bar;
// // Take newWeight and divide it by (highest plate available) 55lb or 45lb.

//  //If the modulus of newWeight and (plate-weight times *2) equals zero you have a perfect fit.
//     //Divide the newWeight by plate-weight to get how many plates you actually need. Then divide by two to let user know how many of these plates go on each side of the barbell.

//Check if userinput weight is less than bar.
//Check if userinput === bar, then output bar.
//check if userinput is a number
//Check if userinputweight is <=0
//Check if there's a max capacity of the barbell.
//Figure out how you would set up an array or an object to reflect user input of plate availability.

document.querySelector("#calculateBtn").addEventListener("click", setUp);
document.querySelector("#availablePlatesBtn").addEventListener("click", togglePlateSelect);
document.querySelector("#submitAvailablePlates").addEventListener("click", setToLocalStorage);
document.addEventListener("DOMContentLoaded", loadAvailablePlatesFromStorage);

function setUp() {
  document.querySelector(".output-text").innerText = ""; //Clear any text on page.
  let barWeight = parseFloat(document.querySelector("#barWeight").value) || 45;
  let userInputWeight = parseFloat(document.querySelector("#weightInput").value);

  if (isNaN(userInputWeight)) {
    // No weight was entered, set netWeight to barWeight
    document.querySelector(".output-text").innerText = `Total weight: ${barWeight}lbs (just the bar)`;
    return;
  } else if (userInputWeight < barWeight) {
    // User input weight is less than bar weight
    document.querySelector(".output-text").innerText = "Total weight cannot be less than the bar weight.";
    return;
  }

  let netWeight = userInputWeight - barWeight;
  parseArray(netWeight);
  document.querySelector("#weightInput").value = "";
}

//Toggles the plateSelect div to be hidden or shown.
function togglePlateSelect() {
  const plateSelect = document.querySelector(".plateSelect");
  plateSelect.classList.toggle("hidden");
}

//This function parses through the array of available plate types (45lb, 35lb, etc) the user has available
//Paramets should be a number and an array to parse through.
function parseArray(weightNum) {
  let holder;
  const plateWeightArray = getAvailablePlates(); // Array of objects with plate weights and quantities
  // Iterate through available plates as needed.
  for (let i = 0; i < plateWeightArray.length; i++) {
    const plateWeight = Object.keys(plateWeightArray[i])[0];
    const quantity = plateWeightArray[i][plateWeight];
    console.log(plateWeight, quantity);
    if (weightNum < plateWeight * quantity || quantity === 0) {
      continue;
    }

    holder = plateCalculator(weightNum, parseFloat(plateWeight), quantity);
    if (holder === 0) {
      break;
    }
    weightNum = holder;
  }

  if (weightNum > 0) {
    document.querySelector(
      ".output-text"
    ).innerText += `Looks like you might need some extra plates. You've got ${weightNum}lbs left over.`;
  }
}

//Function logs to the user the amount of plates needed for the inputted plateWeight and returns the difference in order to pass through the next array element above.
function plateCalculator(weightNum, plateWeight, quantity) {
  let newPlatesNeeded;
  let difference;
  let platesNeeded = weightNum / plateWeight;

  //If platesNeeded is not an even number (because we must use two plates at a time to keep bar load symmetrical) find the next lowest number that is even. Set that to newPlatesNeeded
  if (platesNeeded % 2 !== 0) {
    newPlatesNeeded = findLowestEvenNumberBefore(platesNeeded);
  } else {
    newPlatesNeeded = platesNeeded; //To keep code DRY and not have to console log for two different scenarios.
  }
  //Check newPlatesNeeded against quantity. If newPlatesNeeded is greater than quantity, we need to log the quantity of plates available and the amount of weight left over.
  if (newPlatesNeeded >= quantity) newPlatesNeeded = quantity;

  console.log(`${newPlatesNeeded} ${plateWeight} plates; ${newPlatesNeeded / 2} per side`);
  document.querySelector(".output-text").innerText += `${newPlatesNeeded} ${plateWeight} plates; ${
    newPlatesNeeded / 2
  } per side`;
  difference = weightNum - newPlatesNeeded * plateWeight;
  return difference;
}

//Takes in any number and finds the most previous even integer.
function findLowestEvenNumberBefore(num) {
  num = Math.floor(num);
  for (let i = num; i > 0; i--) {
    if (i % 2 === 0) {
      return i;
    }
  }
  return -1; // Return -1 if no even number is found before the given number
}

// This function returns an array of objects with the available plates.
function getAvailablePlates() {
  const plateWeights = [55, 45, 35, 25, 15, 10, 5, 2.5];
  const plateIds = ["FiftyFive", "FortyFive", "ThirtyFive", "TwentyFive", "Fifteen", "Ten", "Five", "TwoAndHalf"];

  let availablePlates = [];
  plateWeights.forEach((weight, index) => {
    const quantity = parseInt(document.getElementById(`quantity${plateIds[index]}`).value) || 0;
    availablePlates.push({ [weight]: quantity });
  });
  console.log(availablePlates);
  return availablePlates;
}

function setToLocalStorage() {
  const availablePlates = getAvailablePlates();
  localStorage.setItem("availablePlates", JSON.stringify(availablePlates));
  console.log("Available plates stored in local storage");
  // Optionally, you can provide some user feedback here
  alert("Available plates have been saved!");
}

function loadAvailablePlatesFromStorage() {
  const storedPlates = localStorage.getItem("availablePlates");
  if (storedPlates) {
    const availablePlates = JSON.parse(storedPlates);
    const plateIds = ["FiftyFive", "FortyFive", "ThirtyFive", "TwentyFive", "Fifteen", "Ten", "Five", "TwoAndHalf"];

    availablePlates.forEach((plate, index) => {
      const weight = Object.keys(plate)[0];
      const quantity = plate[weight];
      document.getElementById(`quantity${plateIds[index]}`).value = quantity;
    });
  } else {
    console.log("Please add available plates.");
  }
}
