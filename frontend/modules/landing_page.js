import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // console.log(config);
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try{
    // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // console.log(`${config.backendEndpoint}cities`);
  return await (await fetch(`${config.backendEndpoint}cities`)).json();
  }
  catch(error){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataRow = document.getElementById("data");

  const column = createElement("div",["class"],["col-xs-12 col-sm-6 col-lg-3 mb-4"]);

  const link = createElement("a",["href","id"],[`pages/adventures/?city=${city}`,`${id}`]);

  link.innerHTML = `<div class="tile">

  <div class="tile-text text-center">
    <h4>${city}</h4>
    <h5>${description}</h5>
  </div>

  <img class="img-responsive" src="${image}" alt="${city}-image">
  </div>`;

  column.append(link);
  dataRow.append(column);

}

//                  >>>>>>>>>>>My Creation Start<<<<<<<<<<
                function createElement(tag,attribute,value){
                  const newElement = document.createElement(tag);
                  attribute.forEach((val,i)=>{
                    newElement.setAttribute(val,value[i]);
                  })
                  console.log(newElement);
                  return newElement;
                }
//                  >>>>>>>>>>>My Creation End <<<<<<<<<<


export { init, fetchCities, addCityToDOM };