
//Load playwright module

const {test, expect} = require('@playwright/test');

import { stringFormat } from '../utils/common';

const bookingAPIRequestBody =  require('../test-data/post_dynamic_request_body.json');

const tokenRequestBody =  require("../test-data/token_request_body.json"); 

const putRequestBody = require('../test-data/put_request_body.json');

//Create PUT api request

test ('Create PUT  API request using in playwright', async({request}) =>{

    const dynamicRequestBody= stringFormat(JSON.stringify(bookingAPIRequestBody),"testers talk cypress","testers talk javascript","orange")
    

    console.log("=====POST API=====")
    const postAPIReponse =  await request.post(`/booking`,{
        data:
           JSON.parse(dynamicRequestBody)
    })

    const postAPResponseBody =  await postAPIReponse.json();
    console.log(postAPResponseBody)

    const bId = postAPResponseBody.bookingid

    //Validate JSON api response
    expect(postAPResponseBody.booking).toHaveProperty("firstname" , "testers talk cypress");
    expect(postAPResponseBody.booking).toHaveProperty("lastname" , "testers talk javascript");

    
    //Validate nested JSOn objects
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
    expect(postAPResponseBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

    console.log("=====GET API=====")

    //Get API call
    const getAPIResponse = await request.get(`/booking/${bId}`)
    console.log(await getAPIResponse.json());

    //Validate status code
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);



    //Generate Token

   const tokenResponse =  await request.post('/auth',{
        data : tokenRequestBody
    })

    const tokenAPITResponseBody =  await tokenResponse.json();
    const tokenNo = tokenAPITResponseBody.token;

    console.log("Token No is: "+ tokenNo);



    //Put API
        const putResponse = await request.put(`/booking/${bId}`,{
                headers : {
                    "Content-Type" : "application/json",
                    "Cookie" : `token=${tokenNo}`
                },
                data : putRequestBody
            })


            console.log("=====PUT API=====")

            const putResponseBody = await putResponse.json();
            console.log(putRequestBody);

            //validate status code
            expect (putResponse.status()).toBe(200);
            expect (putResponse.ok()).toBeTruthy()

})


