// Get elements
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const thankYou = document.getElementById("thankYou");
const thankText = document.getElementById("thankText");

// Show error under a field
function showError(input, errId, text) {
  document.getElementById(errId).textContent = text;
  input.classList.add("error");
  input.classList.remove("ok");
}

// Mark field as correct
function showOk(input, errId) {
  document.getElementById(errId).textContent = "";
  input.classList.remove("error");
  input.classList.add("ok");
}

// ---------- Validation functions ----------
function checkName() {
  const value = nameInput.value.trim();
  const namePattern = /^[A-Za-z ]{2,}$/; // only letters and spaces, min 2 chars
  if (value === "") {
    showError(nameInput, "nameErr", "Please enter your name.");
    return false;
  }
  if (!namePattern.test(value)) {
    showError(nameInput, "nameErr", "Name should contain only letters.");
    return false;
  }
  showOk(nameInput, "nameErr");
  return true;
}

function checkEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  if (value === "") {
    showError(emailInput, "emailErr", "Please enter your email.");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, "emailErr", "Email is not correct. Please refill it (example: name@gmail.com).");
    return false;
  }
  showOk(emailInput, "emailErr");
  return true;
}

function checkPhone() {
  const value = phoneInput.value.trim();
  const phonePattern = /^[6-9][0-9]{9}$/; // Indian mobile: 10 digits, starts with 6-9
  if (value === "") {
    showError(phoneInput, "phoneErr", "Please enter your phone number.");
    return false;
  }
  if (!phonePattern.test(value)) {
    showError(phoneInput, "phoneErr", "Enter a valid 10 digit number starting with 6-9.");
    return false;
  }
  showOk(phoneInput, "phoneErr");
  return true;
}

function checkMessage() {
  const value = messageInput.value.trim();
  if (value === "") {
    showError(messageInput, "messageErr", "Please write a message.");
    return false;
  }
  if (value.length < 10) {
    showError(messageInput, "messageErr", "Message should be at least 10 characters.");
    return false;
  }
  showOk(messageInput, "messageErr");
  return true;
}

// Phone: allow only digits while typing
phoneInput.addEventListener("input", function () {
  const original = phoneInput.value;
  const digitsOnly = original.replace(/[^0-9]/g, "");
  phoneInput.value = digitsOnly;

  if (original !== digitsOnly) {
    // user typed a letter or symbol
    showError(phoneInput, "phoneErr", "Phone number must be in digits only (0-9).");
  } else if (digitsOnly.length > 0) {
    checkPhone();
  }
});

// Email: check while typing, so the error shows immediately
emailInput.addEventListener("input", checkEmail);

// Check each field when user leaves it (live feedback)
nameInput.addEventListener("blur", checkName);
emailInput.addEventListener("blur", checkEmail);
phoneInput.addEventListener("blur", checkPhone);
messageInput.addEventListener("blur", checkMessage);

// ---------- On submit ----------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page from reloading

  // run all checks (use & so every field gets checked and shows its error)
  const allGood = checkName() & checkEmail() & checkPhone() & checkMessage();

  if (!allGood) {
    // focus on the first wrong field so user can refill it
    const firstWrong = form.querySelector(".error");
    if (firstWrong) firstWrong.focus();
    return;
  }

  // All correct -> show thank you message
  thankText.textContent = "Thank you, " + nameInput.value.trim() + "! Your message has been sent. We will contact you soon.";
  form.style.display = "none";
  thankYou.style.display = "block";

  // NOTE: This only shows the message on screen.
  // To really send the data, you need a backend or a service like EmailJS / Formspree.
});
