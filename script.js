function searchItems() {
  var text = document.getElementById("search").value.toLowerCase();
  var items = document.getElementsByClassName("product");

  for (var i = 0; i < items.length; i++) {
    var name = items[i].innerText.toLowerCase();
    if (name.includes(text)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

function sendFeedback(event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();

  var namePattern = /^[A-Za-z ]{3,}$/;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(name)) {
    alert("Your name is wrong. Please fill it again (letters only, at least 3 letters).");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Your email is wrong. Please fill it again (example: name@gmail.com).");
    return;
  }

  if (phone.length != 10 || isNaN(phone)) {
    alert("Your phone number is wrong. Please fill a 10 digit number again.");
    return;
  }

  if (message.length < 5) {
    alert("Your message is too short. Please fill it again.");
    return;
  }

  var form = document.getElementById("contactForm");

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: new FormData(form)
  })
    .then(function (response) {
      if (response.ok) {
        alert("Thank you, " + name + "! Your message has been sent.");
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(function () {
      alert("No internet connection. Please try again.");
    });
}