import { loadBookings } from "../cars/apiCalls.js";
import { updateBooking } from "./apiCalls.js";
const bookings_view = $("#bookings-view");

const populateBooking = (bookings) => {

    const table = $("<table></table>");
    const tr = $("<tr></tr>");
    const th_id = $("<th>id</th>");
    const th_car = $("<th>car</th>");
    const th_date = $("<th>booking date</th>");
    tr.append(th_id, th_car, th_date);
    table.append(tr);

  bookings.forEach((booking) => {
    const data_tr = $('<tr></tr>')
    const td_id = $(`<td>${booking.id}</td>`);
    const td_car = $(`<td>${booking.car.brand} - ${booking.car.model}</td>`);
    const td_date = $(`<td>${booking.createAt}</td>`);
    const btn = $(`<button id="btn-${booking.id}">Change date to Now</button>`)
    const td_btn = $(`<td></td>`)
    td_btn.append(btn)
    data_tr.append(td_id, td_car, td_date, td_btn)
    table.append(data_tr)
    btn.click(async()=>{
      alert('clicked')
      await updateBooking(booking.id, new Date())
    })
  });
  bookings_view.append(table);
};

await loadBookings().then((res) => {
  populateBooking(res.bookings);
});
