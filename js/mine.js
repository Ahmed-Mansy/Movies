let moviesList = [];
let allMoveSearch = [];
let movie_id = '';
// let word = document.getElementById("word");
let sideBar = document.getElementById("sideBar");
let form = document.getElementById("form");
let allMovies = document.getElementById("allMovies");
let userName = document.getElementById("userName");
let namealert = document.getElementById("namealert");
let userEmail = document.getElementById("userEmail");
let emailalert = document.getElementById("emailalert");
let phone = document.getElementById("phone");
let phonealert = document.getElementById("phonealert");
let age = document.getElementById("age");
let agealert = document.getElementById("agealert");
let password = document.getElementById("password");
let passwordalert = document.getElementById("passwordalert");
let rePassword = document.getElementById("rePassword");
let repasswordalert = document.getElementById("repasswordalert");
let submitBtn = document.getElementById("submitBtn");
let errorMail = document.getElementById("errorMail");
let NameOfUser = document.getElementById("NameOfUser");
let boxContainer = document.getElementById("boxContainer");

let nowURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87&language=en-US&page=1`;
const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87&language=en-US&page=1`;
const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87&language=en-US&page=1`;
const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87&language=en-US&page=1`;
const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87&language=en-US&page=1`;
const trendingURL = `https://api.themoviedb.org/3/trending/all/day?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87`;
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=21dd67c0ceaaea8f22688f9bdfaa8a87`;

if (movie_id == "") {
  getData(nowURL);
}

async function getData(nowURL) {
  let response = await fetch(nowURL)
  let data = await response.json();
  moviesList = data.results;
  display()
}


$(".nav-category").click(function (e) {
  movie_id = e.target.innerHTML;
  if (movie_id == "Now playing") {
    nowURL = nowPlayingURL;
    getData(nowURL);
  }
  else if (movie_id == "popular") {
    nowURL = popularURL
    getData(nowURL);
  }
  else if (movie_id == "Top Rated") {
    nowURL = topRatedURL;
    getData(nowURL);
  }
  else if (movie_id == "Upcoming") {
    nowURL = upcomingURL;
    getData(nowURL);
  }
  else if (movie_id == "Trending") {
    nowURL = trendingURL;
    console.log(nowURL)
    getData(nowURL);
  }
})


function display() {
  let cartoona = '';
  for (let i = 0; i < moviesList.length; i++) {
    cartoona += `
        <div class="col-md-4 my-3 shadow rounded ">
        <div class="poster position-relative">
          <img src= https://image.tmdb.org/t/p/w500${moviesList[i].poster_path} class="img-fluid rounded" alt="">
          <div class="layer d-flex align-items-center">
            <div class="movieInfo">
              <h2>${moviesList[i].original_title}</h2>
              <p>${moviesList[i].overview}</p>
              <p>rate: ${moviesList[i].vote_average}</p>
              <p>${moviesList[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>
        `
  }
  document.getElementById("movies").innerHTML = cartoona
}

$(document).ready(function () {
  let innerBoxWidth = $(".innerBox").outerWidth();
  $("nav").animate({ left: `-${innerBoxWidth}` }, 0)
  $(`#loading .sk-cube-grid`).fadeOut(1000, () => {
    $(`#loading .sk-cube-grid`).parent().fadeOut(1000, () => {
      $(`#loading`).remove();
      $("body").css("overflow-y", "auto");
    })
  });
})


$("#toggleBtn").click(function () {

  let innerBoxWidth = $(".innerBox").outerWidth();
  if ($("nav").css("left") == "0px") {
    $("nav").animate({ left: `-${innerBoxWidth}` }, 600)
    $('.innerBox .nav-item ul li').animate({ opacity: '0', paddingTop: '500px' }, 1000)

  }
  else {
    $("nav").animate({ left: `0px` }, 800)
    $('.innerBox .nav-item ul li').animate({ opacity: '1', paddingTop: '25px' }, 1000)
  }



})

$("#toggleBtn").click(function () {
  $("#toggleBtn").toggleClass("fa-align-justify fa-times", 1000)
})

function search(word) {

  let temp = '';
  for (let i = 0; i < moviesList.length; i++) {
    if (moviesList[i].original_title.toLowerCase().includes(word.toLowerCase())) {
      temp += `
        <div class="col-md-4 my-3 shadow rounded ">
        <div class="poster position-relative">
          <img src= https://image.tmdb.org/t/p/w500${moviesList[i].poster_path} class="img-fluid rounded" alt="">
          <div class="layer d-flex align-items-center">
            <div class="movieInfo">
              <h2>${moviesList[i].original_title}</h2>
              <p>${moviesList[i].overview}</p>
              <p>rate: ${moviesList[i].vote_average}</p>
              <p>${moviesList[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>
        `

    }

  }
  document.getElementById("movies").innerHTML = temp

}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = allMovies.value;
  //  if(searchTerm && searchTerm!==''){
  //    getData(searchURL+'&query='+searchTerm)
  const newURL = searchURL + '&query=' + searchTerm;
  fetch(newURL)
    .then((res) => res.json())
    .then((data) => {
      moviesList = data.results;
      displaySearch()
      allMovies.value = '';
    })



})

function displaySearch() {
  let cartoona = '';
  for (let i = 0; i < moviesList.length; i++) {
    cartoona += `
        <div class="col-md-4 my-3 shadow rounded ">
        <div class="poster position-relative">
          <img src= https://image.tmdb.org/t/p/w500${moviesList[i].poster_path} class="img-fluid rounded" alt="">
          <div class="layer d-flex align-items-center">
            <div class="movieInfo">
              <h2>${moviesList[i].original_title}</h2>
              <p>${moviesList[i].overview}</p>
              <p>rate: ${moviesList[i].vote_average}</p>
              <p>${moviesList[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>
        `
  }
  document.getElementById("movies").innerHTML = cartoona
}

function validationName() {
  let regex = /^[a-zA-Z]{3,9}$/
  if (regex.test(userName.value) == true) {
    userName.classList.add("is-valid")
    userName.classList.remove("is-invalid")
    namealert.classList.replace("d-block", "d-none")
  }
  else {
    userName.classList.add("is-invalid")
    userName.classList.remove("is-valid")
    namealert.classList.replace("d-none", "d-block")

  }
}


function validationEmail() {
  let regex = /^[a-zA-Z]{3,8}@(yahoo|gmail).com$/
  if (regex.test(userEmail.value) == true) {
    userEmail.classList.add("is-valid")
    userEmail.classList.remove("is-invalid")
    emailalert.classList.replace("d-block", "d-none")
  }
  else {
    userEmail.classList.add("is-invalid")
    userEmail.classList.remove("is-valid")
    emailalert.classList.replace("d-none", "d-block")
  }
}

function validationPhoneNumber() {
  let regex = /^(\+2)?01[0125][0-9]{8}$/
  if (regex.test(phone.value) == true) {
    phone.classList.add("is-valid")
    phone.classList.remove("is-invalid")
    phonealert.classList.replace("d-block", "d-none")
  }
  else {
    phone.classList.add("is-invalid")
    phone.classList.remove("is-valid")
    phonealert.classList.replace("d-none", "d-block")
  }
}

function validationAge() {
  let regex = /(^[1-9][0-9]|100)$/
  if (regex.test(age.value) == true) {
    age.classList.add("is-valid")
    age.classList.remove("is-invalid")
    agealert.classList.replace("d-block", "d-none")
  }
  else {
    age.classList.add("is-invalid")
    age.classList.remove("is-valid")
    agealert.classList.replace("d-none", "d-block")

  }
}

function passwordValidation() {
  let regex = /^[a-zA-z0-9]{8,20}$/
  if (regex.test(password.value) == true) {
    password.classList.add("is-valid")
    password.classList.remove("is-invalid")
    passwordalert.classList.replace("d-block", "d-none")
  }
  else {
    password.classList.add("is-invalid")
    password.classList.remove("is-valid")
    passwordalert.classList.replace("d-none", "d-block")
  }
}


function confirmPassword() {
  if (password.value == rePassword.value) {
    rePassword.classList.add("is-valid")
    rePassword.classList.remove("is-invalid")
    repasswordalert.classList.replace("d-block", "d-none")
  }
  else {
    rePassword.classList.add("is-invalid")
    rePassword.classList.remove("is-valid")
    repasswordalert.classList.replace("d-none", "d-block")
  }
}



function errorMailf() {
  if (userName.value != '' && userEmail.value != '' && phone.value != '' && age.value != '' && password.value != '' && rePassword.value != '') {
   
    NameOfUser.innerHTML=userName.value;
    errorMail.classList.replace("d-none", "d-block")
  }
  else {
    alert("all inputs required !!")
  }
}

userName.addEventListener('keyup', validationName)
userEmail.addEventListener('keyup', validationEmail)
phone.addEventListener('keyup', validationPhoneNumber)
age.addEventListener('keyup', validationAge)
password.addEventListener('keyup', passwordValidation)
rePassword.addEventListener('keyup', confirmPassword)
submitBtn.addEventListener('click', errorMailf)

$("a").click(function (e) {
  let aHref = e.target.getAttribute('href');
  let sectionOffset = $(aHref).offset().top;
  $("html,body").animate({ scrollTop: sectionOffset }, 1000)
})

document.addEventListener("keyup", (e) => {
  let code = e.code;
  if (code == 'Escape') {
    let innerBoxWidth = $(".innerBox").outerWidth();
    if ($("nav").css("left") == "0px") {
      $("nav").animate({ left: `-${innerBoxWidth}` }, 600)
      $('.innerBox .nav-item ul li').animate({ opacity: '0', paddingTop: '500px' }, 1000)
  
    }
  }
})

// $(".layer").click(function(e){
//   console.log("here")
// })

// let myImgs = Array.from(document.querySelectorAll("#movie .poster img"));

// for (let i = 0; i < myImgs.length; i++) {
//   myImgs[i].addEventListener("click", function (eventInfo) {
//       // boxContainer.style.display = "flex";
//       // let imgSrc = eventInfo.target.getAttribute("src")
//       // innerBox.style.backgroundImage = `url(${imgSrc})`;
//       console.log("here")

//   })
// }







// $("#password", "#rePassword").on("keyup", function () {
//   if ($("#password").val == $('#rePassword').val()) {
//     ("#rePassword").addClass("is-valid");
//     ("#rePassword").removeClass("is-invalid");
//   }
//   else
//   {
//     ("#rePassword").removeClass("is-valid");
//     ("#rePassword").addClass("is-invalid");
//   }
// });

