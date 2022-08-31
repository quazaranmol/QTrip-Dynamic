import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split("=")[1];

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let url = `${config.backendEndpoint}adventures/detail?adventure=${adventureId}`;
    const adventure = await fetch(url);
    // console.log(await adventure.json());
    return await adventure.json();
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  document.getElementById("photo-gallery").setAttribute("class","row mb-3 carousel-inner")
  adventure.images.forEach((image,index)=>{
    if(index === 0){
    document.getElementById("photo-gallery").innerHTML += `<div class="carousel-item active">
    <img src="${image}" class="activity-card-image d-block w-100 alt="..."">
    </div>
    `}
    else{
      document.getElementById("photo-gallery").innerHTML += `<div class="carousel-item">
    <img src="${image}" class="activity-card-image d-block w-100 alt="..."">
    </div>
    `
    }
  });
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const carouselItems = document.createElement("div");
  carouselItems.setAttribute("class","row mb-3 carousel-inner")
  images.forEach((image,index)=>{
    const imageItem = document.createElement("div")
    index === 0 ? imageItem.setAttribute("class","carousel-item active") : imageItem.setAttribute("class","carousel-item");
    imageItem.innerHTML = `
    <img src="${image}" class="activity-card-image d-block w-100 alt="..."">
    `;
    carouselItems.append(imageItem);
  })
  // console.log(carouselItems)

  document.getElementById(
    "photo-gallery"
  ).innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

  `;

  document.getElementsByClassName("carousel")[0].append(carouselItems);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available === true){
    // console.log(adventure);
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";

  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById("myForm");
  form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    
  const data={
    name: form.elements["name"].value,
    date:form.elements["date"].value,
    person:form.elements["person"].value,
    adventure:adventure.id
  }
  // console.log(data);
  try {
    let response = await fetch(`${config.backendEndpoint}reservations/new`, {
      method: "POST",
      headers: { "Content-type": "application/json", },
      body: JSON.stringify(data),
    });
    // console.log(data);
    let responsedata = await response.json();
    console.log(responsedata);
    alert("Success!")
    location.reload();
  } catch (error) {
    alert("Failed!" ,error)
  }
})
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure)
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
