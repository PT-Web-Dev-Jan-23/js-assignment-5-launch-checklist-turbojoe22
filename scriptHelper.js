// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  let missionTarget = document.getElementById('missionTarget')
  missionTarget.innerHTML = `
  <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
  `
}
//
//
function validateInput(testInput) {
    //console.log(testInput)
   let numInput = Number(testInput);
   if(testInput === ""){
    //console.log("empty")
    return "Empty"
   } 
   else if (isNaN(numInput)){
    //console.log('IS NAN')
    return 'Not a Number' 
   }
   else {
    //console.log('ISNUM')
   return "Is a Number" 
   } 
   
}
//
//
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
     pilot = document.querySelector("input[name=pilotName]");
     copilot = document.querySelector("input[name=copilotName]");
     fuel = document.querySelector("input[name=fuelLevel]");
     cargo = document.querySelector("input[name=cargoMass]");
    if (pilot.value === '' || copilot.value === '' || fuel.value === '' || cargo.value === ''){
        alert('All fields required')
        
        }
    else if (validateInput(pilot.value) === "Is a Number" || validateInput(copilot.value) === "Is a Number" || validateInput(fuel.value) === "Not a Number" || validateInput(cargo.value) === "Not a Number"){
        alert("Enter valid information in each field")
    }
    else {
        list.style.visibility = "visible"
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `Co-Pilot ${copilot.value} is ready for launch`
        
        if (fuel.value < 10000){
            fuelStatus.innerHTML = "Fuel level too low for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = 'red'
        } else if (cargo.value > 10000){
            cargoStatus.innerHTML = "Cargo mass too high for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = 'red'
        } else if (cargo.value <= 10000 && fuel.value >= 10000){
            launchStatus.innerHTML = 'Shuttle is ready for launch'
            launchStatus.style.color = 'green'
            fuelStatus.innerHTML = 'Fuel level high enough for launch'
            cargoStatus.innerHTML = 'Cargo mass low enough for launch'
        }
    }
}
//
//
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomSelection = Math.floor(Math.random()*planets.length)
    return planets[randomSelection]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
