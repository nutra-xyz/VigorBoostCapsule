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

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      }

    });


    // Toggle current FAQ

    if (!isActive) {

      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

      question.setAttribute(
        "aria-expanded",
        "true"
      );

    } else {

      item.classList.remove("active");

      answer.style.maxHeight = null;

      question.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

});


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

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

} else {

  // Fallback for older browsers

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

}


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

  if (!button.hasAttribute("aria-expanded")) {

    button.setAttribute(
      "aria-expanded",
      "false"
    );

  }

});


// =========================================
// LIVE OFFER INDICATOR
// =========================================
// This is a promotional indicator, not a fabricated
// viewer/buyer count.

const liveActivity =
  document.getElementById("liveActivity");

if (liveActivity) {

  liveActivity.setAttribute(
    "aria-label",
    "Live offer available"
  );

}


// =========================================
// ROTATING PROMOTIONAL NOTIFICATIONS
// =========================================
// 5 seconds visible
// 8 seconds hidden
// Then the next message appears.
//
// These messages describe promotional activity only;
// they do not claim that a specific person purchased.

const promoMessages = [

  {
    title: "Special Offer Available",
    text: "Explore Vigor Boost today"
  },

  {
    title: "Vigor Boost",
    text: "Discover men's wellness support"
  },

  {
    title: "Limited-Time Offer",
    text: "Check today's available offer"
  },

  {
    title: "Ready to Feel More Confident?",
    text: "Learn more about Vigor Boost"
  },

  {
    title: "Men's Wellness",
    text: "Explore Vigor Boost"
  }

];


const promoNotification =
  document.getElementById("promoNotification");

const promoTitle =
  document.getElementById("promoTitle");

const promoText =
  document.getElementById("promoText");


let promoIndex = 0;


function showPromoNotification() {

  if (
    !promoNotification ||
    !promoTitle ||
    !promoText
  ) {
    return;
  }


  const current =
    promoMessages[promoIndex];


  promoTitle.textContent =
    current.title;

  promoText.textContent =
    current.text;


  // Show notification

  promoNotification.classList.add("show");


  // Visible for exactly 5 seconds

  setTimeout(() => {

    promoNotification.classList.remove("show");

  }, 5000);


  // Move to next message

  promoIndex =
    (promoIndex + 1) %
    promoMessages.length;


  // Next notification:
  // 5 sec visible + 8 sec hidden = 13 sec

  setTimeout(() => {

    showPromoNotification();

  }, 13000);

}


// Start first notification after 3 seconds

setTimeout(() => {

  showPromoNotification();

}, 3000);


// =========================================
// PAGE LOADED
// =========================================

window.addEventListener("load", () => {

  document.body.classList.add("page-loaded");

});
