// =========================================
// VIGOR BOOST - JAVASCRIPT
// =========================================


// =========================================
// MOBILE MENU
// =========================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    const isOpen = mobileMenu.classList.contains("open");

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menuButton.textContent = isOpen ? "×" : "☰";

  });


  // Close mobile menu after clicking a link

  const mobileLinks = mobileMenu.querySelectorAll("a");

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");

      menuButton.textContent = "☰";

      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );

    });

  });

}


// =========================================
// FAQ ACCORDION
// =========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!question || !answer) return;

  question.addEventListener("click", () => {

    const isActive = item.classList.contains("active");


    // Close all other FAQ items

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

      }

    });


    // Toggle current item

    if (!isActive) {

      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    } else {

      item.classList.remove("active");

      answer.style.maxHeight = null;

    }

  });

});


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


// =========================================
// HEADER SCROLL EFFECT
// =========================================

const header =
  document.getElementById("header");


window.addEventListener(
  "scroll",
  () => {

    if (!header) return;

    if (window.scrollY > 40) {

      header.style.background =
        "rgba(7, 11, 22, 0.96)";

    } else {

      header.style.background =
        "rgba(11, 16, 32, 0.88)";

    }

  },
  { passive: true }
);


// =========================================
// PREVENT EMPTY HASH JUMP
// =========================================

document.querySelectorAll('a[href="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    event.preventDefault();

  });

});


// =========================================
// ACCESSIBILITY
// =========================================

document.querySelectorAll(".faq-question").forEach((button) => {

  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {

    const parent =
      button.closest(".faq-item");

    if (!parent) return;

    const expanded =
      parent.classList.contains("active");

    button.setAttribute(
      "aria-expanded",
      expanded ? "true" : "false"
    );

  });

});


// =========================================
// PAGE LOADED
// =========================================

window.addEventListener("load", () => {

  document.body.classList.add("page-loaded");

});
