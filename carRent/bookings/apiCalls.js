export const loadBookings = async () => {

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


  
export const updateBooking = async (bookingId, newDate) => {

    const output = {
      success: false
    };
    
    await fetch("http://localhost:9090/api/v1/updateorder", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('anasToken'),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "contractId": bookingId,
      },
    })
      .then(async (res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };


