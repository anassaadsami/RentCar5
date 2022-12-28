import { loadCarList, exchange, bookCar } from "./apiCalls.js";

$(document).ready(async()=>{


const list_view = $('#list-view')

const commitBooking = async(car)=>{
    await bookCar(car.brand);
    await loadCarList()
        .then((res)=>{
            const cars = res.cars
            populate(cars)
        })
}

const populate = (cars)=>{
    list_view.empty()
    cars.forEach(car => {
        const imgUrl = `/carRent/carsPhotos/${car.brand}.jpeg`
        const img = $(`<div class="img" style="background-image: url(${imgUrl});"></div>`)
        const item = $('<div class="listItem"></div>')
        item.append(img)

        const details = $(`<div class="details"></div>`)

        const line1 = $(`<h2 class="brand">${car.brand}<span>${car.model}</span></h2>`)
        const line2 = $(`<h3 class="price">price: <span>${car.price_day}</span></h3>`)

        const line3 = $(`<div class="euro-row"></div>`)
        const euroBtn = $(`<button class="euroBtn" id="ex-${car.model}">exchange:</button>`)
        const euro_text = $(`<p id="euro-text"></p>`)
        
        line3.append(euroBtn)
        line3.append(euro_text)

        const bookBtn = $(`<button class="bookBtn" id="book-${car.model}">book car</button>`)

        details.append(line1, line2, line3, bookBtn)
        item.append(details)
        
        list_view.append(item)

        euroBtn.click(async()=>{
           await exchange(car.brand)
            .then((res)=>{
                if(res.success === true)
                euro_text.text(res.price_euro)
            })
        })

        bookBtn.on('click',async ()=>{
           await commitBooking(car)
        })
    });
}

await loadCarList()
        .then((res)=>{
            const cars = res.cars
            populate(cars)
        })

    })