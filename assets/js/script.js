'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // auto-play music when portfolio page is opened
        if (pages[i].dataset.page === "portfolio") {
          const musicPlayer = document.querySelector("[data-music-player]");
          if (musicPlayer && !musicPlayer.classList.contains("active")) {
            musicPlayer.classList.add("active");
          }

          if (musicPlayer) {
            const iframe = musicPlayer.querySelector("iframe");
            if (iframe) {
              const url = new URL(iframe.src);
              if (url.searchParams.get("autoplay") !== "1") {
                url.searchParams.set("autoplay", "1");
                iframe.src = url.toString();
              }
            }
          }
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const avatarBox = document.getElementById("avatarBox");
const avatarImg = document.getElementById("avatarImg");

if (avatarBox && avatarImg) {
  let transitionTimeout;

  const applyTransform = (rotateX, rotateY, scale = 1) => {
    avatarImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, 1)`;
  };

  const applyFilter = (x, y) => {
    avatarImg.style.filter = `drop-shadow(${x * -10}px ${y * -10 + 20}px 30px rgba(0, 0, 0, 0.2))`;
  };

  const calculateRotation = (e, multiplier = 20) => {
    const rect = avatarBox.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    return { x, y, rotateX: -y * multiplier, rotateY: x * multiplier };
  };

  const resetAvatar = () => {
    avatarImg.style.transition = 'transform 0.5s ease-out, filter 0.5s ease-out';
    applyTransform(0, 0, 1);
    avatarImg.style.filter = `drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))`;

    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
      avatarImg.style.transition = 'transform 0.1s ease, filter 0.3s ease';
    }, 500);
  };

  avatarBox.addEventListener("mousemove", (e) => {
    const { x, y, rotateX, rotateY } = calculateRotation(e);
    applyTransform(rotateX, rotateY, 1.05);
    applyFilter(x, y);
  });

  avatarBox.addEventListener("mouseleave", resetAvatar);

  avatarBox.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = avatarBox.getBoundingClientRect();
    const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const rotateX = -y * 25;
    const rotateY = x * 25;
    applyTransform(rotateX, rotateY, 1.05);
  }, { passive: false });

  avatarBox.addEventListener("touchend", resetAvatar);
}


// music player toggle functionality
const musicBtn = document.querySelector("[data-music-btn]");
const musicPlayer = document.querySelector("[data-music-player]");

if (musicBtn && musicPlayer) {
  musicBtn.addEventListener("click", function () {
    musicPlayer.classList.toggle("active");
  });
}
