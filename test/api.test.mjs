import { assert, expect } from 'chai';
import request from 'supertest';                          // it is used to make http request

import app from '../index.js';

describe('API Tests', function(){

    // testing get request for home page '/'
    describe('GET /', ()=>{
        it('should render the home page with food items and categories', (done) => {

            // request to api
            request(app)
            .get('/')                          
            .expect(200)                               
            .end((err, res) => {                     
                if(err) return done(err);                      
                // expect(res.body).to.be.an('array').that.is.not.empty;    


                // Verify that the response contains the expected HTML
                expect(res.text).to.include('<title>Home</title>'); 
                expect(res.text).to.include('<main id="food-container"');

                // Extract the length of food categories from the hidden element
                const match = res.text.match(/<div\s+id="allFoodItems-length".*?>(\d+)<\/div>/);
                // console.log(match);
                
                if (match) {
                    const length = parseInt(match[1], 10);
                    
                    // Check if the length matches the expected value
                    expect(length).to.be.above(0);  // Change this based on your expected length
                } else {
                    throw new Error('Length of allFoodItems is not above 0');
                }
                done();                                 
            })
        })
    })


/*
    // for testing post
    describe('POST /api/items', ()=>{
        it('should create a new Items', (done)=>{
            const newItem = {name:'Item2'};                     // new item for post request
            request(app)
            .post('/api/items')         // post request to app.mjs
            .send(newItem)              // send newItem to app.mjs
            .end((err,res)=>{           // execute when code inside post request in app.mjs return something (err or data)
                if(err) return done(err);
                expect(res.body).to.have.property('id');        // data should contains id
                expect(res.body).to.have.property('name');      // data should contains name
                done();
            })
        })

    })
*/

})






/*

expect VS assert:
-----------------
Both are used for same purpose but they are syntatically different from each other

Example:

assert.isNotNull(val);          // with assert
expect(val).to.not.be.null;     // with expect

*/