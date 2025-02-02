document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const signInTab = document.getElementById("signInTab");
  const registerTab = document.getElementById("registerTab");
  const underline = document.querySelector(".underline");
  const forms = document.querySelectorAll(".form");
  const tabs = document.querySelectorAll(".tab");

  // Initialize underline position
  underline.style.width = `${signInTab.offsetWidth}px`;

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const activeTab = document.querySelector(".tab.active");
      activeTab.classList.remove("active");
      e.target.classList.add("active");

      // Update underline position
      underline.style.width = `${e.target.offsetWidth}px`;
      underline.style.transform = `translateX(${e.target.offsetLeft}px)`;

      // Switch forms
      forms.forEach((form) => form.classList.remove("active"));
      const formId =
        e.target.id === "signInTab" ? "signInForm" : "registerForm";
      document.getElementById(formId).classList.add("active");
    });
  });

  // Password visibility toggle
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
    });
  });

  // Registration Form Handling
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value,
        dob: document.getElementById("dob").value,
        nationality: document.getElementById("nationality").value,
      };

      // Store in localStorage
      localStorage.setItem(user.email, JSON.stringify(user));
      alert("Registration successful! Please sign in.");
      signInTab.click();
      this.reset();
    });

  // Login Form Handling
  document
    .getElementById("signInForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const user = JSON.parse(localStorage.getItem(email));

      if (user && user.password === password) {
        alert(`Welcome back, ${user.firstName}!`);
        this.reset();
      } else {
        alert("Invalid email or password!");
      }
    });
});
