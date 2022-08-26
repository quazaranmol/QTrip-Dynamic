
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
    let response = await fetch(config.backendEndpoint + `adventures?city=${city}`);
    let data = await response.json();
    // console.log(data);
    return data;
  }
  catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowElement=document.getElementById("data");
  // rowElement.setAttribute("class",`${rowElement.getAttribute("class")}`);
  // console.log(adventures)
  adventures.forEach((item)=>{
    // console.log(`detail/?adventure=${item.id}`);
    let column = document.createElement("div");
  column.setAttribute("class","col-6 col-lg-3 mb-3");
  column.innerHTML = `<a href="detail/?adventure=${item.id}" id="${item.id}">
        <div class="activity-card card">
          <img src="${item.image}" class="activity-card-image" alt="image">
          <span class="position-absolute end-0 top-0 mt-2 px-4 card text-dark bg-warning">${item.category}</span> 
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
rowElement.appendChild(column);
  })
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const durationFiltered = [];
  
  list.forEach((value)=>{
    if (value.duration>=parseInt(low) && value.duration<=parseInt(high)){
      durationFiltered.push(value);
    }
  });
  return durationFiltered;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let categoryFilteredAdventures = [];
  categoryList.forEach((category)=>{
    list.forEach((listItem)=>{
      if(category === listItem.category){
        categoryFilteredAdventures.push(listItem);
      }
    })
  });
  return categoryFilteredAdventures;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {


  if ((filters.category.length != 0) && (filters.duration.length != 0)) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  }
  else if (filters.category.length != 0) {
    return filterByCategory(list, filters.category);
  }
  else if (filters.duration.length != 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);
  }
  else {
    return list;
  }




  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // console.log(list);
  // let durationFilter = [];
  // if(filters.category.length != 0){
  //   list = filterByCategory(list,filters.category);
  // }
  // if(filters.duration.length != 0){
  //   // let minMaxDuraion = JSON.parse(JSON.stringify(filters.duration));
  //   let minMaxDuraion = filters.duration;
  //   let minMaxDuraion2 = minMaxDuraion.split("-");
  //   // console.log(minMaxDuraion2,typeof minMaxDuraion2);
  //   durationFilter = filterByDuration(list,minMaxDuraion2[0],minMaxDuraion2[1]);
  //   list.push(durationFilter);
  // }
  // if(filters.category.length != 0 && filters.duration.length != 0){
  //   list = filterByCategory(list,filters.category);
  //   let minMaxDuraion = filters.duration;
  //   let minMaxDuraion2 = minMaxDuraion.split("-");
  //   // console.log(minMaxDuraion2,typeof minMaxDuraion2);
  //   durationFilter = filterByDuration(list,minMaxDuraion2[0],minMaxDuraion2[1]);
  //   list.push(durationFilter);
  // }
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // list.push(durationFilter);
  // Place holder for functionality to work in the Stubs
  // console.log(categoryFilter,durationFilter)
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const storedFilters = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return storedFilters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categorySelect = document.getElementById("category-list");
  filters.category.forEach((filter)=>{
    categorySelect.innerHTML += `<span class="category-filter">${filter}</span>` 
  })

  const durationSelect = document.getElementById("duration-select");
  durationSelect.value = filters.duration;
  console.log(durationSelect.value);
}


        // //                   >>>>>>>>>>>>ADDING NEW RANDOM ADVENTURE<<<<<<<<<<<<<<

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
