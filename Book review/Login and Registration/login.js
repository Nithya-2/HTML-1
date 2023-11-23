let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let signupButton = document.getElementById("signup");
let loginButton = document.getElementById("login");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});

signupButton.addEventListener("click", () => {
  userRegistration();
});

loginButton.addEventListener("click", () => {
  userLogin();
});

function userRegistration(){
 const users= JSON.parse(localStorage.getItem('registration'));
 const email = document.getElementById("signup-email").value;
 const password = document.getElementById("signup-password").value;
 const user = {
   email: email,
   password: password
 }
 const registerValue = users && users.length > 0 ? [
...users,user] : [user]
 
 localStorage.setItem('registration',JSON.stringify(registerValue));
 location.href = "../books.html";
}

function userLogin(){
  // const users= JSON.parse(localStorage.getItem('registration'));
  // const email = document.getElementById("login-email").value;
  // const password = document.getElementById("login-password").value;

  // const user = {
  //   email: email,
  //   password: password
  // }
  // const loginUser = users && users.length > 0 ?
  //  users.filter(value => value.email === user.email) : [];
  //  if(loginUser && loginUser.length >0 ){
  //   localStorage.setItem('login',JSON.stringify(loginUser));
  //   location.href = "../index.html";
  //  } else {
  //    alert("Invalid user and password");
  //  }
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email === '' || password === '') {
    return alert('please enter the email and password');
  }


  fetch('./login.json').then((response) => response.json()).then(loginJson => {
    
    console.log('login data', loginJson)

    const loginValue = loginJson.filter(val => val.email === email && val.password === password);
    if (loginValue && loginValue.length > 0) {
      location.href = "../books.html";
    } else {
      return alert('please enter the valid email and password')
    }
}).catch((err) => {
    alert("Something went wrong when json fetch from json")
})
}
