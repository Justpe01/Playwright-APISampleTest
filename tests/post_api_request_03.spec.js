
//Load playwright module

const {test, expect} =require('@playwright/test');
import {faker}  from '@faker-js/faker'

const {DateTime} = require('luxon');

//Create POST api request

test ('Create Post API request using dynamic API request body', async({request}) =>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int(1000);
    const checkinDate =  DateTime.now().toFormat('yyyy-MM-dd')
    const checkoutDate =  DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')
    
    const postAPIReponse =  await request.post(`/booking`,{
        data:{
            "firstname" : firstName,
            "lastname" : lastName,
            "totalprice" : totalprice,
            "depositpaid":true,
            "bookingdates": {
                "checkin": checkinDate,
                "checkout": checkoutDate
            },
            "additionalneeds": "super bowls"
        }
    })

//Validate status code
    expect (postAPIReponse.ok()).toBeTruthy();
    expect (postAPIReponse.status()).toBe(200);

    const postAPResponseBody =  await postAPIReponse.json();
    console.log(postAPResponseBody)

    //Validate JSON api response
    expect(postAPResponseBody.booking).toHaveProperty("firstname" , firstName);
    expect(postAPResponseBody.booking).toHaveProperty("lastname" , lastName);

    
    //Validate nested JSOn objects
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkin",checkinDate);
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkout", checkoutDate);

})


