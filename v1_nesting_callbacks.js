var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * This is the first version of our implementation. It uses a set of 3rd party
 * APIs that have been provided to us as lib.js from our favorite travel site.
 *
 * In general, my script looks for the cheapest flight and then buys the cheapest
 * seat using my customer record. Once it's all done, I'd like to send a confirmation
 * email to my parents so they'll know when I'm going home.
 *
 * Since my implementation started small, I just decided to nest the callback
 * function declerations inline with the API methods. Before I knew it, I was in
 * callback hell!
 *
 * Note: You normally won't name the callback functions if you're defining them
 *       inline. I have provided names so we can trace where those blocks of code
 *       end up as we work through our iterations.
 */
function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(err, seats) {
        var cheapSeat = _.reduce(seats, function min_price(currentCheapest, seat) {
            if(!currentCheapest) return seat;
            
            if (seat.price < currentCheapest.price) 
                return seat;
            else
                return currentCheapest;
        }, undefined);

        lib.fetchMyCustRecord(function sellSeat(err, me) {
            lib.sellSeat(me.id, cheapSeat.seatId, function emailConfirmation(err, success) {
                if(success)
                    lib.sendConfirmationEmail(me.id, function done(err) {
                        console.log("all done");
                    });
                else
                    console.log("something when wrong trying to buy the ticket.");
            });
        });
    });
};


// Invoke the function right away to run it as a stand alone
// node.js script.
bookFlightsForHolidays();