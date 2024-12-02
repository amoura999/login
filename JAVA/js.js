// Elements for sign-up
var signupname = document.getElementById("signupname");
var signupemail = document.getElementById("signupemail");
var signuppassword = document.getElementById("signuppassword");
var signupbtn = document.getElementById("signupbtn");
var list = JSON.parse(localStorage.getItem("Credentials")) || [];
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var successfulmsg = document.getElementById("successfulmsg");
var emailExistError = document.getElementById("emailExistError");

function validation() {
  var namevalidation = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
  var emailvalidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var passwordvalidation =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  var name = signupname.value.trim();
  var email = signupemail.value.trim();
  var pass = signuppassword.value.trim();
  let isValid = true;

  // Validate name
  if (!namevalidation.test(name)) {
    nameError.classList.remove("d-none");
    isValid = false;
  } else {
    nameError.classList.add("d-none");
  }

  // Validate email
  if (!emailvalidation.test(email)) {
    emailError.classList.remove("d-none");
    isValid = false;
  } else {
    emailError.classList.add("d-none");
  }

  // Validate password
  if (!passwordvalidation.test(pass)) {
    passwordError.classList.remove("d-none");
    isValid = false;
  } else {
    passwordError.classList.add("d-none");
  }

  return isValid;
}

function getdata() {
  var email = signupemail.value.trim();

  for (let i = 0; i < list.length; i++) {
    if (list[i].upemail === email) {
      emailExistError.classList.remove("d-none");
      return;
    }
  }

  emailExistError.classList.add("d-none");
  if (!validation()) {
    return;
  }

  var data = {
    upname: signupname.value.trim(),
    upemail: email,
    uppassword: signuppassword.value.trim(),
  };

  list.push(data);
  localStorage.setItem("Credentials", JSON.stringify(list));
  successfulmsg.classList.remove("d-none");
  clear();

  setTimeout(function () {
    window.location.href = "../LogIn.html";
  }, 1000);
}

function clear() {
  signupname.value = "";
  signuppassword.value = "";
  signupemail.value = "";
}

signupbtn.addEventListener("click", function (e) {
  e.preventDefault();
  getdata();
});

// ----------------------------------------------------------------------------------

// Elements for login
var loginemail = document.getElementById("loginemail");

var loginpassword = document.getElementById("loginpassword");

var loginbtn = document.getElementById("loginbtn");

var emptylogin = document.getElementById("emptylogin");

var Invalidlogin = document.getElementById("Invalidlogin");

function loginValidation() {
  var email = loginemail.value.trim();
  var password = loginpassword.value.trim();

  if (email === "" || password === "") {
    emptylogin.classList.remove("d-none");
    return false;
  }

  var isUserValid = false;

  for (let i = 0; i < list.length; i++) {
    if (list[i].upemail === email && list[i].uppassword === password) {
      isUserValid = true;
      break;
    }
  }

  if (isUserValid) {
    window.location.href = "../Pages/home.html";
  } else {
    Invalidlogin.classList.remove("d-none");
  }
}

loginbtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginValidation();
});
