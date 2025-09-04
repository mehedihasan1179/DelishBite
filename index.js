
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const menuOverlay = document.getElementById("menuOverlay");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the outside click
    menuOverlay.classList.toggle("active");
    hamburgerIcon.textContent = menuOverlay.classList.contains("active") ? "✖" : "☰";
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      menuOverlay.classList.contains("active") &&
      !menuOverlay.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      menuOverlay.classList.remove("active");
      hamburgerIcon.textContent = "☰";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal-close");

  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  // Close when clicking the close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

//images slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");

  if (slides.length === 0 || dots.length === 0 || !captionText) {
    console.warn("Slideshow elements not found");
    return;
  }
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function() { myFunction() };

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    const aboutHeader = document.querySelector(".about-header");
    if (aboutHeader) {
      aboutHeader.style.top = window.scrollY >= 50 ? "0px" : "68px";
    }
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuContainer = document.getElementById('menu-container');
  let menuData = [];

  // Fetch menu data from JSON file
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      menuData = data;
      displayMenuItems(menuData); // Show all items initially
    })
    .catch(error => console.error('Error loading menu data:', error));

  // Display menu items
  function displayMenuItems(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.setAttribute('data-category', item.category);

      menuItem.innerHTML = `
        <div class="menu-item-img-wrapper">
          <img src="${item.img}" alt="${item.name}" class="menu-item-img">
          <div class="menu-item-overlay">
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-cart-flatbed"></i>
          </div>
        </div>
        <div class="menu-item-content">
          <div class="menu-item-title">
            <h3>${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
        </div>
      `;
      menuContainer.appendChild(menuItem);
    });
  }

  // Filter buttons click event
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const category = this.getAttribute('data-category');
      if (category === 'all') {
        displayMenuItems(menuData);
      } else {
        const filteredItems = menuData.filter(item => item.category === category);
        displayMenuItems(filteredItems);
      }
    });
  });
});




