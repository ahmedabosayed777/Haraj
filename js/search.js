const listings = [];
const listingElements = document.querySelectorAll(".listing-item");

listingElements.forEach(item => {
  const titleEl = item.querySelector(".listing-title");
  const title = titleEl.textContent.trim();
  const url = titleEl.href;
  const category = item.dataset.category;
  const location = item.dataset.location; 
  const productId = item.dataset.productId;
  const imgSrc = item.querySelector(".listing-thumb").src;
const time = item.querySelector(".listing-meta i.bi-clock")?.parentElement.textContent.trim() || "";
const userAvatar = item.querySelector(".user-avatar")?.textContent.trim() || "";
const userName = item.querySelector(".listing-meta span:last-child")?.textContent.replace(userAvatar, "").trim() || "";
const condition = item.dataset.condition || "";

  listings.push({ 
  title, 
  url, 
  category, 
  location, 
  productId, 
  imgSrc,
  time,
  userAvatar,
  userName,
  condition
});

});
const locationMap = {
  "riyadh": "الرياض",
  "jeddah": "جده",
  "dammam": "الدمام",
  "safwa": "صفوى"
};

const resultsContainer = document.getElementById("listingsList");
const searchInput = document.getElementById("searchInput");


function displayResults(results) {
  resultsContainer.innerHTML = "";
  results.forEach(item => {
  resultsContainer.innerHTML += `
  <div class="listing-item" data-category="${item.category}" data-location="${item.location}" data-product-id="${item.productId}" data-condition="${item.condition || ''}">
    <div class="listing-info">
      <a href="${item.url}" class="listing-title">${item.title}</a>
      <div class="listing-meta">
        <span><i class="bi bi-geo-alt"></i> ${locationMap[item.location] || item.location}</span>

        <span><i class="bi bi-clock"></i> ${item.time || ''}</span>
        <span><span class="user-avatar">${item.userAvatar || ''}</span> ${item.userName || ''}</span>
      </div>
    </div>
    <img src="${item.imgSrc}" alt="${item.title}" class="listing-thumb">
  </div>
`;

  });
}

// ---------------    search -----------------
searchInput.addEventListener("input", e => {
  const term = e.target.value.trim().toLowerCase();
  const results = listings.filter(item => 
    item.title.toLowerCase().includes(term)
  );
  displayResults(results);
});

// ---------------   filter by location -----------------
const locationDropdownItems = document.querySelectorAll(".dropdown-menu .dropdown-item");

locationDropdownItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    
    const selectedLocation = item.dataset.value; 
    
    
    item.closest(".dropdown").querySelector(".filter-dropdown").textContent = item.textContent.trim();

    let results;
    if (selectedLocation === "all") {
      results = listings; 
    } else {
      results = listings.filter(item => item.location === selectedLocation);
    }

    displayResults(results);
  });
});


displayResults(listings);

// ---------------   filter by new -----------------
const btnNewOnly = document.getElementById("btnNewOnly");
let showNewOnly = false;

btnNewOnly.addEventListener("click", () => {
  showNewOnly = !showNewOnly; 
  btnNewOnly.classList.toggle("active", showNewOnly); 

  let results = listings;
  if (showNewOnly) {
    results = listings.filter(item => item.condition === "new");
  }

  displayResults(results);
});