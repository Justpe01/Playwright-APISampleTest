
//Load playwright module

const {test, expect} =require('@playwright/test');

//Create POST api request

test ('Create Post API request using static request body', async({request}) =>{
    
    const postAPIReponse =  await request.post(`/booking`,{
        data:{
            "firstname" : "testers talk playwright",
            "lastname" : "testers talk api testing",
            "totalprice" : 1000,
            "depositpaid":true,
            "bookingdates": {
                "checkin":"2018-01-01",
                "checkout": "2019-01-01"
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
    expect(postAPResponseBody.booking).toHaveProperty("firstname" , "testers talk playwright");
    expect(postAPResponseBody.booking).toHaveProperty("lastname" , "testers talk api testing");

    
    //Validate nested JSOn objects
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

})


