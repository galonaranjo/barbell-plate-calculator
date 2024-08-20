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

let barWeight = 45;
let userInputWeight = 600;
let netWeight = userInputWeight - barWeight;

//This function parses through the array of available plate types (45lb, 35lb, etc) the user has available
function parseArray(weightNum) {
  let holder;
  const plateWeightArray = [45, 25, 15, 10, 5, 2.5]; //Possible plates available.

  //Iterate through available plates as needed.
  for (let i = 0; i < plateWeightArray.length; i++) {
    //Tester: console.log("i = " + i);
    //Conditional checking if the weightNum is less than the current value * 2 (2 are needed to load the bar.) move to the next element in the array.
    if (weightNum < plateWeightArray[i] * 2) {
      continue;
    }
    holder = plateCalculator(weightNum, plateWeightArray[i]);
    if (holder === 0) {
      break;
    }
    weightNum = holder;
    //console.log(weightNum);
    if (weightNum < plateWeightArray[plateWeightArray.length - 1] * 2) {
      console.log(`Looks like you might need some extra plates. You've got ${weightNum}lbs left over.`);
    }
  }
}

//Function logs to the user the amount of plates needed for the inputted plateWeight and returns the difference in order to pass through the next array element above.
function plateCalculator(weightNum, plateWeight) {
  let newPlatesNeeded;
  let difference;
  let platesNeeded = weightNum / plateWeight;
  //console.log(`Raw ${plateWeight}lb plates needed = ${platesNeeded}`);
  //console.log(weightNum);

  //If platesNeeded is not an even number (because we must use two plates at a time to keep bar load symmetrical) find the next lowest number that is even. Set that to newPlatesNeeded
  if (platesNeeded % 2 !== 0) {
    newPlatesNeeded = findLowestEvenNumberBefore(platesNeeded);
    //console.log(newPlatesNeeded);
  } else {
    newPlatesNeeded = platesNeeded; //To keep code DRY and not have to console log for two different scenarios.
  }
  console.log(`${newPlatesNeeded} ${plateWeight} plates; ${newPlatesNeeded / 2} per side`);
  difference = weightNum - newPlatesNeeded * plateWeight; //This line should deduct the global variable of netweight to a new netWeight in order to calculate the remaining weight accordingly to how many plates are needed
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

parseArray(netWeight);
//plateCalculator(450, 35);
