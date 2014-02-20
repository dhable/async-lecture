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
 */
function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(err, seats) {
        var cheapSeat = _.reduce(seats, function(currentCheapest, seat) {
            if(!currentCheapest) return seat;
            
            if (seat.price < currentCheapest.price) 
                return seat;
            else
                return currentCheapest;
        }, undefined);

        lib.fetchMyCustRecord(function(err, me) {
            lib.sellSeat(me.id, cheapSeat.seatId, function(err, success) {
                if(success)
                    lib.sendConfirmationEmail(me.id, function(err) {
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
