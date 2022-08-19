
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1].toLowerCase();
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const data = await fetch(`${config.backendEndpoint}adventures?city=${city}`);
    return  await data.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  let rowElement=document.getElementById("data");
  // rowElement.setAttribute("class",`${rowElement.getAttribute("class")}`);
  adventures.forEach((item)=>{
    // console.log(`detail/?adventure=${item.id}`);
    let column = document.createElement("div");
  column.setAttribute("class","col-6 col-lg-3 mb-3");
  column.innerHTML = `<a href="detail/?adventure=${item.id}" id="${item.id}">
        <div class="activity-card card">
          <img src="${item.image}" class="activity-card-image" alt="image">

            <div class="card-body col-12 d-flex justify-content-between p-1">
              <h5 class="card-title small">${item.name}</h5>
              <p class="card-text small">₹ ${item.costPerHead}</p>
            </div>

            <div class="card-body col-12 d-flex justify-content-between p-1">
              <h5 class="card-title small">DURATION</h5>
              <p class="card-text small">${item.duration} HOURS</p>
            </div>
        </div>
</a>`;
rowElement.append(column);
  })
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}

async function newAdventure(city){
  const send = await fetch
  (`${config.backendEndpoint}adventures/new`,
  {
      method: "POST",
      body:JSON.stringify({"city":city}),
      headers:{ "Content-type": "application/json; charset=UTF-8"}
  })
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  newAdventure,
  generateFilterPillsAndUpdateDOM,
};
