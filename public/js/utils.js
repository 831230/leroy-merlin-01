// var debounce = require('lodash.debounce');
// import Notiflix from 'notiflix';


const API_KEY = "5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a";
const ANOTHER_PARAMS_API_URL =
  "focus.point.lon=19.846570115898984&focus.point.lat=50.10754511537663&boundary.country=PL";
const OPENROUTE_API_URL_AUTOCOMPLETE = "https://api.openrouteservice.org/geocode/autocomplete";
const OPENROUTE_API_URL_DIRECTIONS = "https://api.openrouteservice.org/v2/directions/driving-car";

const DEBOUNCE_DELAY = 1000;

const searchBoxForm = document.querySelector(".form-driver");

const coordinatesLatLonEnd = [];
const coordinatesLatLonStart = [];
let semafor=true;
const noticeTitle = document.querySelector(".form-driver__notice");
const jsAddClassToStartEndDiv = document.querySelectorAll(".js-add-class");
//-------------------------------------------START VARIABLES------------------------------------------------
// const searchResultsStart = document.getElementById("form-driver__route-start-list");
const searchResultsStart = document.querySelector(".form-driver__route-start-list");
const choiceLabelStart = document.querySelector(".form-driver__route-start-choise-label");
// const divStartSpace = document.querySelector(".form-driver__input-space");
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------------END VARIABLES------------------------------------------------
const searchResultsEnd = document.querySelector(".form-driver__route-end-list");
const choiceLabelEnd = document.querySelector(".form-driver__route-end-choise-label");
// const divEndSpace = document.querySelector(".form-driver__input-space");
//----------------------------------------------------------------------------------------------------------

const placesOnRouteZone1DIV = document.querySelector(".form-driver__places-on-route-space-zone1");
const placesOnRouteZone2DIV = document.querySelector(".form-driver__places-on-route-space-zone2");
const placesOnRouteZone3DIV = document.querySelector(".form-driver__places-on-route-space-zone3");

//---------------------ROUNDING METHOD--------------------------
function roundingMethodToSecPlace(value){
  let roundingValue = Number(Math.round(value + 'e+2') + 'e-2');
  return roundingValue
};
//--------------------------------------------------------------

// ---------------------------ROUTE STRART & END LISTENER---------------------------------
searchBoxForm.addEventListener(
  "input",
  debounce((e) => {
    let eventForm = e;

    //-----------------values input------------------------------------
    let searchBoxStartValue = validationStartInput(searchBoxForm.start.value);
    let searchBoxEndValue = validationEndInput(searchBoxForm.end.value);
    //------------------------------------------------------------------

    console.log(e);
    if(e.target.name === "start" || e.target.name === "end"){
      fetchOpenrouteAutocomplete(searchBoxStartValue,searchBoxEndValue,eventForm);
    };
    
    validationForm(eventForm, searchBoxForm.dataRoute, searchBoxForm.placesInCar, searchBoxForm.driverComment, searchBoxForm.contactToDriver);
    
  }, DEBOUNCE_DELAY)
);
//------------------------------------------------------------------------------

// -------------------------------VALIDATION INPUTS-------------------------------------
function validationStartInput(text){
  let trimText = text.trim();
  if(trimText.length<=30){
    console.log(trimText);
    searchBoxForm.start.value = trimText;
    return trimText;
  };
  if(trimText.length>30){
    Notiflix.Notify.warning("Maksymalna ilość znaków w tym polu wynosi 30", {timeout: 6000});
    searchBoxForm.start.value = trimText.slice(0, 30);
    console.log(trimText.slice(0, 30));
    return trimText.slice(0 ,30);
  };
};
function validationEndInput(text){
  let trimText = text.trim();
  if(trimText.length<=30){
    console.log(trimText);
    searchBoxForm.end.value = trimText;
    return trimText;
  };
  if(trimText.length>30){
    Notiflix.Notify.warning("Maksymalna ilość znaków w tym polu wynosi 30", {timeout: 6000});
    searchBoxForm.end.value = trimText.slice(0, 30);
    console.log(trimText.slice(0, 30));
    return trimText.slice(0 ,30);
  };
};

function validationForm(event, data, amountPlaces, comment, contact){
  if(event.target.name === "dataRoute"){
    const dateNow = new Date();
    const selectedDate = new Date(data.value);
    console.log(dateNow.getTime(), selectedDate.getTime());
    if(dateNow >= selectedDate){
      Notiflix.Notify.failure("Data przejazdu nie może odnosić się do przeszłości. Wybierz datę najwcześniej na godzinę w przód.", {timeout: 6000});
      searchBoxForm.dataRoute.value = getPartOfDate(dateNow);
    };
  };

  if(event.target.name === "placesInCar"){
    console.log(amountPlaces.value);
    let correctValue = Math.floor(amountPlaces.value.trim());
    searchBoxForm.placesInCar.value = correctValue;
    console.log(correctValue);
    if(correctValue<0){
      Notiflix.Notify.failure("Ilość pasażerów nie może być wartością ujemną", {timeout: 6000});
      searchBoxForm.placesInCar.value = 1;
    }
    if(correctValue>8){
      Notiflix.Notify.failure("Maksymalna ilość pasażerów wynosi 8", {timeout: 6000});
      searchBoxForm.placesInCar.value = 1;
    }
  }

  if(event.target.name === "driverComment"){
    console.log("Komentarz: ", comment.value);
    if(comment.value.length>500){
      Notiflix.Notify.warning("Zbyt długa wiadomość, maksymalna ilość znaków wynosi 500", {timeout: 6000});
      searchBoxForm.driverComment.value = comment.value.slice(0, 500);
    }
  };

  if(event.target.name === "contactToDriver"){
    console.log("Pole kontakt: ", contact.value);
    if(contact.value.length>50){
      Notiflix.Notify.warning("Maksymalna ilość znaków w tym polu wynosi 50", {timeout: 6000});
      searchBoxForm.contactToDriver.value = contact.value.slice(0, 50);
    }
  }
};
//--------------------------------------------------------------------------------------


async function fetchOpenrouteAutocomplete(valueInputStart, valueInputEnd, eventForm){
  console.log("Fuction: fetchOpenrouteAutocomplete: display event.");
  try {
    // if (valueInputStart.length<=2) {
    //   return
    // }
    const params = new URLSearchParams({
      api_key: API_KEY,
      text: valueInputStart+valueInputEnd,
    });
    // if(eventForm.target.name === "start" && eventForm.target.name === "end"){
      let fetchUrl = OPENROUTE_API_URL_AUTOCOMPLETE + "?" + params + "&" + ANOTHER_PARAMS_API_URL;
      const response = await fetch(fetchUrl);
      const places = await response.json();

      console.log(places.features);
      if(places.features.length===0){
        Notiflix.Notify.warning("Nie znaleziono żadnych wyników", {timeout: 6000});
        setTimeout(() => {
          Notiflix.Notify.info("Pamiętaj, że jeśli używasz nazwy ulicy do wyszukiwania to musi ona być wpisana na początku", {timeout: 6000});
        }, 2000);
      }
      if(eventForm.target.id === "form-driver__route-start"){
        createResultsTagStart(places);
        console.log("Create result START:");
      };
      if(eventForm.target.id === "form-driver__route-end"){
        createResultsTagEnd(places);
        console.log("Create result END:");
      };
     searchBoxForm.addEventListener("click", handlingSearchedResults);
     console.log("Handling results:");
  } catch (error) {
    console.log(error);
  }
};

//----------------------------CREATE TAGS START & END METHODS--------------------------------
function createResultsTagStart(places){
  let resultTagsHTML = "";
  places.features.map((place)=>{
    resultTagsHTML += `
    <p class="search-results-start__content-list" data-place="&#8194;${place.properties.label}" data-lat="${place.geometry.coordinates[0]}" data-lon="${place.geometry.coordinates[1]}" style="cursor:pointer;">
    &#187;&#8194;${place.properties.label}
    </p>
    ` 
  });
  searchResultsStart.innerHTML = resultTagsHTML;
  console.log("Function createResultsTagStart:");
};
function createResultsTagEnd(places){
  let resultTagsHTML = "";
  places.features.map((place)=>{
    resultTagsHTML += `
    <p class="search-results-end__content-list" data-place="&#8194;${place.properties.label}" data-lat="${place.geometry.coordinates[0]}" data-lon="${place.geometry.coordinates[1]}" style="cursor:pointer;">
    &#187;&#8194;${place.properties.label}
    </p>
    ` 
  });
  searchResultsEnd.innerHTML = resultTagsHTML;
  console.log("Function createResultsTagEnd:");
};
//--------------------------------------------------------------------------------------

function handlingSearchedResults(evt){
  console.info("Function handlingSearchedResults: ");
  if (evt.target.className === "search-results-start__content-list"){
    let event = evt;
    return createOneResultTagStart(event);
  };
  if (evt.target.className === "search-results-end__content-list"){
    let event = evt;
    return createOneResultTagEnd(event);
  };
  if(evt.target.className === "delete-my-choise-start"){
    return deleteMyAllChoiseStart();
  };
  if(evt.target.className === "delete-my-choise-end"){
    
    return deleteMyAllChoiseEnd();
  };
  // searchBoxForm.removeEventListener("click", handlingSearchedResults);
  // searchBoxForm.removeEventListener("input", fetchOpenrouteAutocomplete);
  let event = evt;
  console.debug("Coordinate start",coordinatesLatLonStart," END ",coordinatesLatLonEnd);
  if(coordinatesLatLonStart.length === 2 && coordinatesLatLonEnd.length === 2 && semafor){
    semafor=false;
    const dataRouteInputSpace = document.querySelector(".form-driver__input-space--data-route");
    dataRouteInputSpace.innerHTML = `<input id="form-driver__data" type="datetime-local" class="form-driver__input" name="dataRoute" value="${getPartOfDate(new Date())}" min="${getPartOfDate(new Date())}">`
    console.log("zaczynamy szukać trasy");
    fetchOpenrouteGetRoute(coordinatesLatLonStart, coordinatesLatLonEnd, event);
  };

  // console.log(coordinatesLatLonStart, coordinatesLatLonEnd);
};
// function addLeadingZero(value) {
//   const string = String(value);
//   return string.padStart(2, '0');  
// }
function getPartOfDate(data){
  console.log("obiekt daty");
  let dayOfMonth = String(data.getDate());
  dayOfMonth.padStart(2, '0');
  // const dayOfWeek = data.getDay()+1;
  let monthOfYear = String(data.getMonth()+1);
  monthOfYear.padStart(2, '0');
  let year = String(data.getFullYear());
  year.padStart(2, '0');
  let hours = String(data.getHours()+1);
  hours.padStart(2, '0');
  let minutes = String(data.getMinutes());
  // if(minutes.length===1){
  //   minutes="0"+minutes;
  // };
  // minutes.padStart(2, '0');
  let seconds = String(data.getSeconds());
  seconds.padStart(2, '0');
  let milliseconds = String(data.getMilliseconds());
  milliseconds.padStart(2, '0');
  return `${year}-${monthOfYear}-${dayOfMonth}T${hours}:${minutes.padStart(2, '0')}`
};

function getHourAndMinutes(data){
  let hours = String(data.getHours()+1);
  // hours.padStart(2, '0');
  let minutes = String(data.getMinutes());
  // minutes.padStart(2, '0');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}


//----------------------------CREATE ONE RESULT TAG START & END METHODS--------------------------------
function createOneResultTagStart(event){
  console.log("Function createOneResultTagStart: ");
  coordinatesLatLonStart.push(event.target.dataset.lat, event.target.dataset.lon);
  const dataStart = document.querySelector(".data-start-input");
  dataStart.value = event.target.dataset.place.trim();
  searchBoxForm.start.style.display="none";
  searchBoxForm.start.value = "";
  searchBoxForm.start.setAttribute("data-chosen_start", event.target.dataset.place.trim());
  searchBoxForm.start.setAttribute("data-value", event.target.textContent.replace("»", "").trim());
  noticeTitle.style.display="none";
  searchResultsStart.innerHTML = "";
  choiceLabelStart.innerHTML = `<span class="search-results__content">${event.target.dataset.place} &#8194 <span class="delete-my-choise-start" style="cursor:pointer;">Usuń</span></span>`;
  jsAddClassToStartEndDiv[0].classList.add("form-driver__input-space--start-end");
  console.log(searchBoxForm.start.dataset.chosen_start);
  return coordinatesLatLonStart
};
function createOneResultTagEnd(event){
  console.log("Function createOneResultTagEnd: ");
  coordinatesLatLonEnd.push(event.target.dataset.lat, event.target.dataset.lon);
  const dataEnd = document.querySelector(".data-end-input");
  dataEnd.value = event.target.dataset.place.trim();
  searchBoxForm.end.style.display="none";
  searchBoxForm.end.value = "";
  searchBoxForm.end.setAttribute("data-chosen_end", event.target.dataset.place.trim());
  noticeTitle.style.display="none";
  searchResultsEnd.innerHTML = "";
  choiceLabelEnd.innerHTML = `<span class="search-results__content">${event.target.dataset.place} &#8194 <span class="delete-my-choise-end" style="cursor:pointer;">Usuń</span></span>`;
  jsAddClassToStartEndDiv[1].classList.add("form-driver__input-space--start-end");
  return coordinatesLatLonEnd
};

//----------------------------DELETE ALL RESULT TAGS START & END METHODS-------------------------------
function deleteMyAllChoiseStart(){
  searchBoxForm.start.style.display="inline";
  noticeTitle.style.display="inline";
  searchBoxForm.start.value="";
  searchBoxForm.start.setAttribute("data-chosen_start", "");
  choiceLabelStart.innerHTML = "";
  coordinatesLatLonStart.splice(0,2);
  jsAddClassToStartEndDiv[0].classList.remove("form-driver__input-space--start-end");
  searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone3.parentNode.parentNode.style.display="none";
  placesOnRouteZone1DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone2DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone3DIV.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone1.value = "";
  searchBoxForm.departureTimeZone2.value = "";
  searchBoxForm.departureTimeZone3.value = "";
  semafor=true;
};
function deleteMyAllChoiseEnd(){
  searchBoxForm.end.style.display="inline";
  noticeTitle.style.display="inline";
  searchBoxForm.end.value="";
  searchBoxForm.end.setAttribute("data-chosen_start", "");
  choiceLabelEnd.innerHTML = "";
  coordinatesLatLonEnd.splice(0,2);
  jsAddClassToStartEndDiv[1].classList.remove("form-driver__input-space--start-end");
  searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone3.parentNode.parentNode.style.display="none";
  placesOnRouteZone1DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone2DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone3DIV.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone1.value = "";
  searchBoxForm.departureTimeZone2.value = "";
  searchBoxForm.departureTimeZone3.value = "";
  semafor=true;
};
//-----------------------------------------------------------------------------------------------------


//------------------------------------GET ROUTE BETWEEN TWO POINTS--------------------------------------
async function fetchOpenrouteGetRoute(latLonStartArray, latLonEndArray, event){
  try {
    // console.log("we are inside fetchOpenrouteGetRoute");
    // console.log(latLonStartArray,latLonEndArray);
    const paramsTwo = new URLSearchParams({
      api_key: API_KEY,
      start: latLonStartArray,
      end: latLonEndArray
    });

    let fetchUrlTwo = OPENROUTE_API_URL_DIRECTIONS + "?" + paramsTwo;
    const response = await fetch(fetchUrlTwo);
    const routeObj = await response.json();
    console.log("fetch no 2: ",routeObj);
    let routeDistance = roundingMethodToSecPlace((routeObj.features[0].properties.segments[0].distance)/1000);
    let routeDuration = roundingMethodToSecPlace((routeObj.features[0].properties.segments[0].duration)/60);
    let placesOnRoute = routeObj.features[0].properties.segments[0].steps.map(place => {return place.name});
    console.log("odległość: ", routeDistance);
    console.log("czas dojazdu: ", routeDuration);
    console.log("Miejsca na trasie: ", placesOnRoute);
    if(routeDistance < 10){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
      // searchBoxForm.departureTimeZone1.value = getHourAndMinutes(new Date());
      // searchBoxForm.departureTimeZone1.value = new Date(searchBoxForm.dataRoute.value);
    };
    if(routeDistance >= 10 && routeDistance < 20){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone2.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone2DIV.parentNode.parentNode.style.display="inline";
      // searchBoxForm.departureTimeZone1.value = getHourAndMinutes(new Date());
      // searchBoxForm.departureTimeZone1.value = new Date(searchBoxForm.dataRoute.value);
    };
    if(routeDistance >= 20){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone3.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone2DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone3DIV.parentNode.parentNode.style.display="inline";
      // searchBoxForm.departureTimeZone1.value = getHourAndMinutes(new Date());
      // searchBoxForm.departureTimeZone1.value = new Date(searchBoxForm.dataRoute.value);
    };

    let increasingRouteDistance = 0;
    let placesOnRouteMarkupZone1 = "";
    let placesOnRouteMarkupZone2 = "";
    let placesOnRouteMarkupZone3 = "";
    let placesOnRouteMarkupZone1Input = "";
    let placesOnRouteMarkupZone2Input = "";
    let placesOnRouteMarkupZone3Input = "";
    routeObj.features[0].properties.segments[0].steps.map(step => {
      increasingRouteDistance += (step.distance)/1000;

      if(increasingRouteDistance < 10){
        if(step.name !== "-"){
        placesOnRouteMarkupZone1 += `<span>${step.name}&#8194;&#10509;&#8194;</span>`;
        placesOnRouteMarkupZone1Input += `${step.name} -> `;
        }
      };
      if(increasingRouteDistance >= 10 && increasingRouteDistance < 20){
        if(step.name !== "-"){
          placesOnRouteMarkupZone2 += `<span>${step.name}&#8194;&#10509;&#8194;</span>`;
          placesOnRouteMarkupZone2Input += `${step.name} -> `;
        }      
      };
      if(increasingRouteDistance >= 20){
        if(step.name !== "-"){
          placesOnRouteMarkupZone3 += `<span>${step.name}&#8194;&#10509;&#8194;</span>`;
          placesOnRouteMarkupZone3Input += `${step.name} -> `;
        }
      };
    });
    placesOnRouteZone1DIV.innerHTML = placesOnRouteMarkupZone1;
    placesOnRouteZone2DIV.innerHTML = placesOnRouteMarkupZone2;
    placesOnRouteZone3DIV.innerHTML = placesOnRouteMarkupZone3;
    searchBoxForm.localityZone1.value = placesOnRouteMarkupZone1Input;
    searchBoxForm.localityZone2.value = placesOnRouteMarkupZone2Input;
    searchBoxForm.localityZone3.value = placesOnRouteMarkupZone3Input;
  } catch (error) {
    console.log(error);
  }
  
}