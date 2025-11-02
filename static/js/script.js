// ============================================
// PawConnect - Main JavaScript File
// ============================================

// Import Bootstrap
const bootstrap = window.bootstrap;

// ============================================
// Demo Pet Data
// ============================================
const petsData = [
  {
    id: 1,
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: "young",
    gender: "male",
    weight: "28 kg",
    vaccination: "vaccinated",
    healthStatus: "Excellent",
    image: "/static/images/pets/bigdog.jpg",
    description: "Friendly and energetic Golden Retriever looking for an active family.",
  },
  {
    id: 2,
    name: "Luna",
    type: "cat",
    breed: "Tabby",
    age: "adult",
    gender: "female",
    weight: "4 kg",
    vaccination: "vaccinated",
    healthStatus: "Good",
    image: "/static/images/pets/whitecat.jpg",
    description: "Playful and affectionate tabby cat perfect for families.",
  },
  {
    id: 3,
    name: "Fluffy",
    type: "rabbit",
    breed: "Holland Lop",
    age: "young",
    gender: "female",
    weight: "2 kg",
    vaccination: "vaccinated",
    healthStatus: "Excellent",
    image: "/static/images/pets/rabbit.jpg",
    description: "Cute and gentle rabbit, loves vegetables and cuddles.",
  },
  {
    id: 4,
    name: "Charlie",
    type: "dog",
    breed: "Labrador",
    age: "adult",
    gender: "male",
    weight: "32 kg",
    vaccination: "vaccinated",
    healthStatus: "Good",
    image: "/static/images/pets/puppydogwhite.jpg",
    description: "Calm and well-trained Labrador, great with kids.",
  },
  {
    id: 5,
    name: "Whiskers",
    type: "cat",
    breed: "Persian",
    age: "senior",
    gender: "male",
    weight: "5 kg",
    vaccination: "vaccinated",
    healthStatus: "Fair",
    image: "/static/images/pets/blacktigercat.jpg",
    description: "Gentle senior cat seeking a quiet home.",
  },
  {
    id: 6,
    name: "Tweety",
    type: "bird",
    breed: "Parrot",
    age: "young",
    gender: "female",
    weight: "0.5 kg",
    vaccination: "not-vaccinated",
    healthStatus: "Excellent",
    image: "/static/images/pets/parrot.jpg",
    description: "Colorful and vocal parrot, loves music and interaction.",
  },
];

// ============================================
// Initialization on DOM Load
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Featured pets on home page
  const featuredContainer = document.getElementById("featuredPetsContainer");
  if (featuredContainer) displayFeaturedPets();

  // Adoption page pets
  const petsContainer = document.getElementById("petsContainer");
  if (petsContainer) displayAllPets();

  // Adoption filter by URL query
  const typeFilter = document.getElementById("typeFilter");
  if (typeFilter) {
    const params = new URLSearchParams(window.location.search);
    const selectedType = params.get("type");
    if (selectedType) {
      typeFilter.value = selectedType;
      filterPets();
    }
  }

  // Attach form submit handlers
  attachFormListeners();
});

// ============================================
// Display Pets
// ============================================
function displayFeaturedPets() {
  const container = document.getElementById("featuredPetsContainer");
  const featured = petsData.slice(0, 3);
  featured.forEach((pet) => {
    const petCard = createPetCard(pet);
    container.appendChild(petCard);
  });
}

function displayAllPets() {
  const container = document.getElementById("petsContainer");
  container.innerHTML = "";
  petsData.forEach((pet) => {
    const petCard = createPetCard(pet);
    container.appendChild(petCard);
  });
}

function createPetCard(pet) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "pet-card";

  const ageLabel = capitalize(pet.age);
  const genderLabel = capitalize(pet.gender);
  const typeLabel = capitalize(pet.type);

  card.innerHTML = `
    <img src="${pet.image}" alt="${pet.name}" class="pet-image">
    <div class="pet-info">
      <div class="pet-name">${pet.name}</div>
      <div class="pet-details"><span>${ageLabel}</span> • <span>${genderLabel}</span> • <span>${typeLabel}</span></div>
      <div class="pet-features">
        <span class="pet-feature-badge">${pet.breed}</span>
        <span class="pet-feature-badge">${pet.weight}</span>
        <span class="pet-feature-badge">${pet.healthStatus}</span>
      </div>
      <div class="pet-description">${pet.description}</div>
      <div class="pet-buttons d-flex gap-2 justify-content-center mt-3">
      <button class="btn-adopt flex-fill"
        onclick="openAdoptionModal('${pet.name}', '${pet.breed}', '${pet.age}', '${pet.healthStatus}', '${pet.vaccination}')">
        Adopt
      </button>
      <button class="btn-foster flex-fill"
        onclick="openFosterModal('${pet.name}', '${pet.breed}', '${pet.age}', '${pet.healthStatus}', '${pet.vaccination}')">
        Foster
      </button>
    </div>

    </div>
  `;

  col.appendChild(card);
  return col;
}

// ============================================
// Filter Pets by Category
// ============================================
function filterPets() {
  const typeFilter = document.getElementById("typeFilter");
  const selectedType = typeFilter.value.toLowerCase();
  const container = document.getElementById("petsContainer");

  if (!container) return;

  const cards = container.querySelectorAll(".pet-card");
  cards.forEach((card) => {
    const petType = card.querySelector(".pet-details span:last-child").textContent.toLowerCase();
    card.parentElement.style.display =
      selectedType === "" || petType.includes(selectedType) ? "" : "none";
  });
}

// ============================================
// Modals & Buttons
// ============================================
function goToAdoption(category) {
  window.location.href = `/adoption?type=${category}`;
}

function openAdoptionModal(petName, breed, age, healthStatus, vaccination) {
  const modal = new bootstrap.Modal(document.getElementById("adoptionModal"));
  document.getElementById("adoptionModalLabel").textContent = `Adopt ${petName} 🐾`;
  document.getElementById("petDetails").innerHTML = `
    <p><strong>Breed:</strong> ${breed}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Health:</strong> ${healthStatus}</p>
    <p><strong>Vaccination:</strong> ${vaccination}</p>
  `;
  modal.show();
}

function openFosterModal(petName, breed, age, healthStatus, vaccination) {
  const modal = new bootstrap.Modal(document.getElementById("fosterModal"));
  document.getElementById("fosterModalLabel").textContent = `Foster ${petName} 💕`;
  document.getElementById("petDetails").innerHTML = `
    <p><strong>Breed:</strong> ${breed}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Health:</strong> ${healthStatus}</p>
    <p><strong>Vaccination:</strong> ${vaccination}</p>
  `;
  modal.show();
}


// ============================================
// Handle Form Submissions
// ============================================
function attachFormListeners() {
  const forms = [
    ".booking-form",
    ".volunteer-form",
    ".donation-form",
    ".contact-form",
    ".login-form",
    ".register-form",
  ];

  forms.forEach((selector) => {
    const form = document.querySelector(selector);
    if (form) form.addEventListener("submit", handleFormSubmit);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  console.log("Form submitted:", data);
  alert("✅ Thank you for your submission! We’ll get back to you soon.");

  e.target.reset();

  const modal = e.target.closest(".modal");
  if (modal) {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) bsModal.hide();
  }
}

// ============================================
// Pet Café Booking
// ============================================
function openCafeBookingModal() {
  const modal = new bootstrap.Modal(document.getElementById("cafeBookingModal"));
  modal.show();
}

// ============================================
// Utilities & Animations
// ============================================
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Add fade-in animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 0.5s ease-out forwards";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
);

document.querySelectorAll(".pet-card, .category-card, .feature-card, .info-card").forEach((el) =>
  observer.observe(el)
);
