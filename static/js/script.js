// ============================================
// PawConnect - Main JavaScript File
// ============================================

// Import Bootstrap
const bootstrap = window.bootstrap

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
    image: "https://images.unsplash.com/photo-1633722715463-d30628519d00?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1633722715463-d30628519d00?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1444464666175-1642a9f33e12?w=400&h=300&fit=crop",
    description: "Colorful and vocal parrot, loves music and interaction.",
  },
]

// Initialize featured pets on home page
document.addEventListener("DOMContentLoaded", () => {
  const featuredContainer = document.getElementById("featuredPetsContainer")
  if (featuredContainer) {
    displayFeaturedPets()
  }

  const petsContainer = document.getElementById("petsContainer")
  if (petsContainer) {
    displayAllPets()
  }

  // Form submissions
  const adoptionForm = document.getElementById("adoptionForm")
  if (adoptionForm) {
    adoptionForm.addEventListener("submit", handleFormSubmit)
  }

  const fosterForm = document.getElementById("fosterForm")
  if (fosterForm) {
    fosterForm.addEventListener("submit", handleFormSubmit)
  }

  const bookingForm = document.querySelector(".booking-form")
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleFormSubmit)
  }

  const volunteerForm = document.querySelector(".volunteer-form")
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", handleFormSubmit)
  }

  const donationForm = document.querySelector(".donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", handleFormSubmit)
  }

  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  const loginForm = document.querySelector(".login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", handleFormSubmit)
  }

  const registerForm = document.querySelector(".register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", handleFormSubmit)
  }
})

// Display featured pets (first 3)
function displayFeaturedPets() {
  const container = document.getElementById("featuredPetsContainer")
  const featured = petsData.slice(0, 3)

  featured.forEach((pet) => {
    const petCard = createPetCard(pet)
    container.appendChild(petCard)
  })
}

// Display all pets with filters
function displayAllPets() {
  const container = document.getElementById("petsContainer")
  container.innerHTML = ""

  petsData.forEach((pet) => {
    const petCard = createPetCard(pet)
    container.appendChild(petCard)
  })
}

function createPetCard(pet) {
  const col = document.createElement("div")
  col.className = "col-md-6 col-lg-4"

  const card = document.createElement("div")
  card.className = "pet-card"

  const ageLabel = pet.age.charAt(0).toUpperCase() + pet.age.slice(1)
  const genderLabel = pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)

  card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-image">
        <div class="pet-info">
            <div class="pet-name">${pet.name}</div>
            <div class="pet-details">
                <span>${ageLabel}</span> • <span>${genderLabel}</span> • <span>${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</span>
            </div>
            <div class="pet-features">
                <span class="pet-feature-badge">${pet.breed}</span>
                <span class="pet-feature-badge">${pet.weight}</span>
                <span class="pet-feature-badge">${pet.healthStatus}</span>
            </div>
            <div class="pet-description">${pet.description}</div>
            <div class="pet-buttons">
                <button class="btn-adopt" onclick="openAdoptionModal()">Adopt</button>
                <button class="btn-foster" onclick="openFosterModal()">Foster</button>
            </div>
        </div>
    `

  col.appendChild(card)
  return col
}

// Filter pets
function filterPets() {
  const typeFilter = document.getElementById("typeFilter").value
  const ageFilter = document.getElementById("ageFilter").value
  const genderFilter = document.getElementById("genderFilter").value
  const vaccinationFilter = document.getElementById("vaccinationFilter").value

  const container = document.getElementById("petsContainer")
  container.innerHTML = ""

  const filtered = petsData.filter((pet) => {
    return (
      (typeFilter === "" || pet.type === typeFilter) &&
      (ageFilter === "" || pet.age === ageFilter) &&
      (genderFilter === "" || pet.gender === genderFilter) &&
      (vaccinationFilter === "" || pet.vaccination === vaccinationFilter)
    )
  })

  if (filtered.length === 0) {
    container.innerHTML = '<div class="col-12 text-center"><p>No pets found matching your criteria.</p></div>'
    return
  }

  filtered.forEach((pet) => {
    const petCard = createPetCard(pet)
    container.appendChild(petCard)
  })
}

// Show pet modal
function showPetModal(type) {
  const modal = new bootstrap.Modal(document.getElementById("petModal"))
  const pet = petsData.find((p) => p.type === type)

  if (pet) {
    document.getElementById("petModalTitle").textContent =
      `${pet.name} - ${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}`
    document.getElementById("petModalBody").innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${pet.name}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Type:</strong> ${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</p>
            <p><strong>Age:</strong> ${pet.age.charAt(0).toUpperCase() + pet.age.slice(1)}</p>
            <p><strong>Gender:</strong> ${pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</p>
            <p><strong>Weight:</strong> ${pet.weight}</p>
            <p><strong>Health Status:</strong> ${pet.healthStatus}</p>
            <p><strong>Vaccination:</strong> ${pet.vaccination === "vaccinated" ? "Yes" : "No"}</p>
            <p><strong>Description:</strong> ${pet.description}</p>
            <div class="pet-buttons">
                <button class="btn-adopt" onclick="openAdoptionModal()">Adopt</button>
                <button class="btn-foster" onclick="openFosterModal()">Foster</button>
            </div>
        `
    modal.show()
  }
}

// Open adoption modal
function openAdoptionModal() {
  const modal = new bootstrap.Modal(document.getElementById("adoptionModal"))
  modal.show()
}

// Open foster modal
function openFosterModal() {
  const modal = new bootstrap.Modal(document.getElementById("fosterModal"))
  modal.show()
}

// Handle form submissions
function handleFormSubmit(e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  // Log form data (in production, this would be sent to Flask backend)
  console.log("Form submitted:", data)

  // Show success message
  alert("Thank you for your submission! We will get back to you soon.")

  // Reset form
  e.target.reset()

  // Close modal if it's inside one
  const modal = e.target.closest(".modal")
  if (modal) {
    const bsModal = bootstrap.Modal.getInstance(modal)
    if (bsModal) {
      bsModal.hide()
    }
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeIn 0.5s ease-out forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".pet-card, .category-card, .feature-card, .info-card").forEach((el) => {
  observer.observe(el)
})
