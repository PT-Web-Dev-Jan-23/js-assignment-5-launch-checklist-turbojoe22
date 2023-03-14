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
    return 'Empty' 
   }
   else if (isNaN(numInput)){
    //console.log('IS NAN')
    return "Not a Number" 
   }
   else {
    //console.log('ISNUM')
   return "Is a Number" 
   } 
   
}
//
//
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let fuelStatus = document.getElementById('fuelStatus')
  let cargoStatus = document.getElementById("cargoStatus")
  let pilotStatus = document.getElementById("pilotStatus")
  let copilotStatus = document.getElementById("copilotStatus")

    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty'){
        alert('All fields required')
        
        }
    else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        alert("Enter valid information in each field")
    }
    else {
       
        list.style.visibility = "visible"
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
        let launchStatus = document.getElementById('launchStatus')
        console.log('fuelstatus', fuelLevel)
         if (fuelLevel < 10000 && cargoLevel > 10000) {

            fuelStatus.innerHTML = "Fuel level too low for launch"
            cargoStatus.innerHTML = "Cargo mass too heavy for launch"
            launchStatus.innerHTML = "Shuttle Not Ready for Launch"
            launchStatus.style.color = 'rgb(199, 37, 78)'
        } else if (cargoLevel < 10000 && fuelLevel < 10000){
            fuelStatus.innerHTML = 'Fuel level too low for launch'
            cargoStatus.innerHTML = 'Cargo mass low enough for launch'
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
            launchStatus.style.color = 'rgb(199, 37, 78)'
        } else if (cargoLevel > 10000 && fuelLevel >= 10000){
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
            launchStatus.style.color = 'rgb(199, 37, 78)'
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch'
            fuelStatus.innerHTML = 'Fuel level high enough for launch'
        } else if (cargoLevel <= 10000 && fuelLevel >= 10000){
            launchStatus.innerHTML = 'Shuttle is Ready for Launch'
            launchStatus.style.color = 'rgb(65, 159, 106)'
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
