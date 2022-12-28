import { checkExp } from "../login/getToken.js";
let accecc_token = localStorage.getItem("anasToken");

export const loadCarList = async () => {
  await checkExp().then((res)=>{
    if (res === true) accecc_token = localStorage.getItem("anasToken");
  })
  const output = {
    success: false,
    cars: [],
  };

  await fetch("http://localhost:9090/api/v1/cars", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accecc_token,
      accept: "*/*",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(async (res) => {
      if (res.status === 302) {
        const result = await res.json();
        output.success = true;
        output.cars = result;
      }
    })
    .catch(() => {
      console.log("an error accured");
    });

  return output;
};

export const exchange = async (brand) => {
  await checkExp().then((res)=>{
    if (res === true) accecc_token = localStorage.getItem("anasToken");
  })
  const output = {
    success: false,
    price_euro: 0,
  };

  await fetch("http://localhost:9090/api/v1/exchange", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accecc_token,
      accept: "*/*",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      brand: brand,
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        const result = await res.json();
        output.success = true;
        output.price_euro = result.price_euro;
      }
    })
    .catch(() => {
      console.log("an error accured");
    });

  return output;
};

export const bookCar = async (nameCar) => {
  await checkExp().then((res)=>{
    if (res === true) accecc_token = localStorage.getItem("anasToken");
  })
  const output = {
    success: false,
  };

  await fetch("http://localhost:9090/api/v1/ordercar", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accecc_token,
      accept: "*/*",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      brand: nameCar,
      name: localStorage.getItem("userName"),
    },
  })
    .then(async (res) => {
      if (res.status === 201) {
        output.success = true;
        const result = await res.json();
        alert(`${result.car.brand} - ${result.car.model} is booked`);
      }
    })
    .catch(() => {
      console.log("an error accured");
    });

  return output;
};

export const loadBookings = async () => {
  await checkExp().then((res)=>{
    if (res === true) accecc_token = localStorage.getItem("anasToken");
  })
  const output = {
    success: false,
    bookings: [],
  };

  await fetch("http://localhost:9090/api/v1/myorders", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accecc_token,
      accept: "*/*",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      name: localStorage.getItem("userName"),
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        const result = await res.json();
        output.success = true;
        output.bookings = result;
      }
    })
    .catch(() => {
      console.log("an error accured");
    });

  return output;
};
