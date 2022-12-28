import { clearSession } from "./login/logout.js";
const nv_cars_btn = $("#nv-cars-btn");
const nv_login_btn = $("#nv-login-btn");
const nv_bookings_btn = $("#nv-bookings-btn");
const nv_logout_btn = $("#nv-logout-btn");
const view = $("#view");

export const checkLogged = () => {
  const token = localStorage.getItem("anasToken");
  const storedUserName = localStorage.getItem("userName");
  if (token !== null && storedUserName !== null) {
    nv_cars_btn.removeClass("hide");
    nv_login_btn.addClass("hide");
    nv_bookings_btn.removeClass("hide");
    nv_logout_btn.removeClass("hide");
    return true
  } else {
    nv_cars_btn.addClass("hide");
    nv_login_btn.removeClass("hide");
    nv_bookings_btn.addClass("hide");
    nv_logout_btn.addClass("hide");
    return false
  }
};

checkLogged();

export const showCars = ()=>{
  view.load("/carRent/cars/carList.html");
}
export const showLogin = ()=>{
  view.load("/carRent/login/login.html");
}

// when click the login we will load login page to the main page
// and remove company name and login button and show another nav elements
nv_login_btn.click(function () {
  view.load("/carRent/login/login.html");
});

// when click the cars, we will load carsList page to the main page
nv_cars_btn.click(function () {
  view.load("/carRent/cars/carList.html");
});

nv_bookings_btn.click(async()=>{
  view.load("/carRent/bookings/bookings.html");
})

nv_logout_btn.click(async()=>{
  await clearSession()
  checkLogged()
  view.html('')
})


