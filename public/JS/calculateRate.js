/***************************************************
 * Doc: calculateRate.js
 * Author: Sam Gay
 * Date: 3/9/19
 * Purpose: calculate postage rates and return.
 *           Also includes validation for postageCalculator.html
 ***************************************************/


exports.calculateRate = function calculateRate (type, weight) {
  console.log("Called: calculateRate...");
  console.log("Type: " + type);
  console.log("Weight: " + weight);

  var val = sortMail(type, weight);

  return val;
}

//sortMail
function sortMail(type, weight) {
  var val = "empty1";

  if(type == "Letter (Stamped)") {
    val = calcLStamped(weight);
    console.log("Letter Stamped...");
  }
  else if (type == "Letter (Metered)") {
    val = calcLMetered(weight);
    console.log("Letter Metered...");
  }
  else if (type == "Large Envelopes (Flats)") {
    val = calcLrgEnv(weight);
    console.log("Lrg Envp...");
  }
  else if (type == "First-Class Package - Retail") {
    val = calcPkg(weight);
    console.log("Pkg...");
  }
  else
    val = "Hello, boys! You didn't choose a type...";

  return val;
}

//calculations
function calcLStamped(weight) {
  var val = "empty2";

  if (weight < 0 || weight == '')
    val = "Please input more than 0 oz.";

  else if(weight <= 1) {
    val = "$0.55";
  }
  else if (weight <= 2) {
    val = "$0.70";
  }
  else if (weight <= 3) {
    val = "$0.85";
  }
  else if (weight <= 3.5) {
   val = "$1.00"; 
  }
  else
    val = "Pleas choose another type for more than 3.5 oz."

  return val;
}

function calcLMetered(weight) {
  var val = "empty3";

  if (weight < 0 || weight == '')
    val = "Please input more than 0 oz.";

  else if(weight <= 1) {
    val = "$0.50";
  }
  else if (weight <= 2) {
    val = "$0.65";
  }
  else if (weight <= 3) {
    val = "$0.80";
  }
  else if (weight <= 3.5) {
   val = "$0.95"; 
  }
  else
    val = "Pleas choose another type for more than 3.5 oz."

  return val;
}

function calcLrgEnv(weight) {
  var val = "empty4";

  if (weight < 0 || weight == ''){
    val = "Please input more than 0 oz.";
  }
  else if(weight <= 1) {
    val = "$1.00";
  }
  else if (weight <= 2) {
    val = "$1.15";
  }
  else if (weight <= 3) {
    val = "$1.30";
  }
  else if (weight <= 4) {
   val = "$1.45"; 
  }
  else if (weight <= 5) {
    val = "$1.60"; 
   }
   else if (weight <= 6) {
    val = "$1.75"; 
   }
   else if (weight <= 7) {
    val = "$1.90"; 
   }
   else if (weight <= 8) {
    val = "$2.05"; 
   }
   else if (weight <= 9) {
    val = "$2.20"; 
   }
   else if (weight <= 10) {
    val = "$2.35"; 
   }
   else if (weight <= 11) {
    val = "$2.50"; 
   }
   else if (weight <= 12) {
    val = "$2.65"; 
   }
   else if (weight <= 13) {
    val = "$2.80"; 
   }
  else
    val = "Pleas choose another type for more than 13 oz."

  return val;
}

function calcPkg(weight) {
  if (weight < 0 || weight == ''){
    val = "Please input more than 0 oz.";
  }
  else if(weight <= 4) {
    val = "$3.66";
  }
  else if (weight <= 8) {
    val = "$4.39"; 
   }
   else if (weight <= 12) {
    val = "$5.19"; 
   }
   else if (weight <= 13) {
    val = "$5.71"; 
   }
  else
    val = "Pleas choose another type for more than 13 oz."

  return val;
}


///////////Validation//////////////
function validateForm() {
  validateType();
  validateWeight();
  
}

function validateType() {
  var type = document.getElementById("type").value;
  if (type == '') {
    document.getElementById("dType").innerHTML = "Please select a mail type.";
  }
  else
  document.getElementById("dType").innerHTML = "";

}

function validateWeight() {
  var weight = document.getElementById("weight").value;
  if (weight == '') {
    document.getElementById("dWeight").innerHTML = "Please input the mail weight.";
    document.getElementById("weight").value = -1;
  }
}