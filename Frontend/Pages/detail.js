let backedData = {};

function postData(breweryData) {
  console.log("breweryData", breweryData);

  let userid = localStorage.getItem("id");
  let userName = localStorage.getItem("username");
  let rate = localStorage.getItem("rating");
  let Des = localStorage.getItem("des");

  let reviewOObj = {
    description: Des,
    rating: rate,
    userID: userid,
    userName: userName,
  };

  breweryData.reviews.push(reviewOObj);
  // Get the brewery ID from the URL
  const breweryId = getBreweryIdFromUrl();

  // Create a new object with only the fields you want to update
  const updateData = {
    reviews: breweryData.reviews,
  };

  console.log("breweryData", updateData);

  fetch(`http://localhost:8080/breweries/${breweryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Update successful:", data);
    })
    .catch((error) => {
      console.error("Error during update:", error.message);
    });
}

document.getElementById("description").addEventListener("input", (e) => {
  localStorage.setItem("des", e.target.value);
});

document.getElementById("submit_review_btn").addEventListener("click", () => {
  postData(backedData);
});

const stars = document.querySelectorAll(".rating input");
var rating;
stars.forEach((star) => {
  star.addEventListener("click", (e) => {
    rating = e.target.value;
    localStorage.setItem("rating", rating);
    document.getElementById("resultt").innerHTML = `You rated: ${rating} stars`;
  });
});

// Function to extract the ID from the URL
function getBreweryIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Function to fetch data based on the extracted ID
async function fetchDataById(id) {
  let someID = localStorage.getItem("breweryId") || id;
  try {
    const response = await fetch(`http://localhost:8080/breweries/${someID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully 1111:", data);
    backedData = data;
    createAndAppendDivs(data);
    // Call a function to handle the fetched data
    handleFetchedData(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Function to handle the fetched data (modify as per your requirements)
function handleFetchedData(data) {
  // Example: Display the name in the console
  console.log("Brewery Name:", data.name);

  // Modify this function to update the UI with the fetched data
  // For example, you can update HTML elements with the fetched data
}

// Main execution flow
document.addEventListener("DOMContentLoaded", () => {
  // Get the brewery ID from the URL
  const breweryId = getBreweryIdFromUrl();
  localStorage.setItem("breweryId", breweryId);
  // Fetch data based on the extracted ID
  if (breweryId) {
    fetchDataById(breweryId);
  } else {
    console.error("Brewery ID not found in the URL.");
  }
});

// Function to create and append repeating divs
function createAndAppendDivs(data) {
  let {
    address_1,
    brewery_type,
    city,
    country,
    name,
    phone,
    postal_code,
    state,
    street,
    website_url,
  } = data;

  const container = document.querySelector(".Brewery_info");

  let infoCardinnerHTML = `
  <div>
   <img src="../../Images/icon.png" alt="" />
   <p><strong>Name : </strong>${name}</p>
 </div>
 <div>
  <img src="../../Images/icon.png" alt="" />
  <p><strong>Phone : </strong>${phone}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>Street : </strong>${street}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>Address : </strong>${address_1}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>City : </strong>${city}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>PIN : </strong>${postal_code}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>State : </strong>${state}</p>
</div>
<div>
 <img src="../../Images/icon.png" alt="" />
 <p><strong>Country : </strong>${country}</p>
</div>
   <div>
    <img src="../../Images/icon.png" alt="" />
    <p><strong>Type : </strong>${brewery_type}</p>
  </div>
   <div>
    <img src="../../Images/icon.png" alt="" />
    <p><strong>URL : </strong>${website_url}</p>
  </div>
                  
  `;

  container.innerHTML += infoCardinnerHTML;
}
