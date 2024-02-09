
//Load playwright module

const {test, expect} = require('@playwright/test');

import { stringFormat } from '../utils/common';

const bookingAPIRequestBody =  require('../test-data/post_dynamic_request_body.json');

//Create GET api request

test ('Create GET  API request using in playwright', async({request}) =>{

    const dynamicRequestBody= stringFormat(JSON.stringify(bookingAPIRequestBody),"testers talk cypress","testers talk javascript","orange")
    
    const postAPIReponse =  await request.post(`/booking`,{
        data:
           JSON.parse(dynamicRequestBody)
    })

    //Validate status code
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);

    const postAPResponseBody =  await postAPIReponse.json();
    console.log(postAPResponseBody)

    const bId = postAPResponseBody.bookingid

    //Validate JSON api response
    expect(postAPResponseBody.booking).toHaveProperty("firstname" , "testers talk cypress");
    expect(postAPResponseBody.booking).toHaveProperty("lastname" , "testers talk javascript");

    
    //Validate nested JSOn objects
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

    console.log("========================")

    //Get API call
    const getAPIResponse = await request.get(`/booking/${bId}`)
    console.log(await getAPIResponse.json());

})


