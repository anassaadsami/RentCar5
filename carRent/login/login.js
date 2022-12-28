import { getToken } from "./getToken.js";
import { checkLogged, showCars } from ".././carRent.js";

const Uname = $('#Uname')
const passWord = $('#passWord')
const submitButton = $('#submitButton')

submitButton.click(async()=>{
    await getToken(Uname.val(), passWord.val())
    .then((res)=>{
        console.log(checkLogged());
        if(checkLogged() === true) showCars()
    })
})

