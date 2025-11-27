// Toggle the deployment checklist visibility
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleChecklist");
  const checklist = document.getElementById("deploymentChecklist");
  if (!toggleButton || !checklist) return;

  toggleButton.addEventListener("click", () => {
    const isHidden = checklist.classList.toggle("hidden");
    toggleButton.textContent = isHidden
      ? "Show deployment checklist"
      : "Hide deployment checklist";
  });
});

// Capstone interactivity features

document.addEventListener("DOMContentLoaded", function () {
  showWelcomeAlert();
  setupFormValidation();
  setupSlideshow();
  setupBackToTop();
});

// 1. One time welcome alert message
function showWelcomeAlert() {
  try {
    if (window.sessionStorage.getItem("welcomeAlertShown") === "true") {
      return;
    }
  } catch (e) {
    // sessionStorage might not be available
  }

  alert(
    "Welcome to my capstone site. Check out our latest specials on the Products page!"
  );

  try {
    window.sessionStorage.setItem("welcomeAlertShown", "true");
  } catch (e) {
    // ignore if storage fails
  }
}

// 2. Simple form validation
function setupFormValidation() {
  // Works with a form that has id="contact-form" or id="order-form"
  var form =
    document.querySelector("#contact-form") ||
    document.querySelector("#order-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    var nameInput = form.querySelector(
      'input[name="name"], input[name="customerName"], #name'
    );
    var emailInput = form.querySelector(
      'input[type="email"], input[name="email"], #email'
    );
    var messageInput = form.querySelector(
      'textarea[name="message"], textarea[name="comments"], #message'
    );

    var errors = [];

    if (nameInput && nameInput.value.trim() === "") {
      errors.push("Please enter your name.");
    }

    if (emailInput) {
      var emailValue = emailInput.value.trim();
      if (emailValue === "") {
        errors.push("Please enter your email address.");
      } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
          errors.push("Please enter a valid email address.");
        }
      }
    }

    if (messageInput && messageInput.value.trim().length < 10) {
      errors.push("Please enter a message that is at least 10 characters long.");
    }

    if (errors.length > 0) {
      event.preventDefault();
      alert(errors.join("\n"));
    }
  });
}

// 3. Image slideshow
function setupSlideshow() {
  var slideshow = document.getElementById("hero-slideshow");
  if (!slideshow) {
    return;
  }

  var slides = slideshow.querySelectorAll(".slide");
  if (!slides || slides.length === 0) {
    return;
  }

  var currentIndex = 0;

  function showSlide(index) {
    slides[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  var prevButton = slideshow.querySelector('[data-direction="prev"]');
  var nextButton = slideshow.querySelector('[data-direction="next"]');

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showSlide(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showSlide(currentIndex + 1);
    });
  }

  // Auto advance every 5 seconds
  setInterval(function () {
    showSlide(currentIndex + 1);
  }, 5000);
}

// 4. Back to top button
function setupBackToTop() {
  var button = document.getElementById("back-to-top");
  if (!button) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  });

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
