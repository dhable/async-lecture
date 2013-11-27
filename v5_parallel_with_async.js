var _ = require("underscore"),
    async = require("async"),
    lib = require("./lib.js");

/*
 * I was so proud of my parallel solution until I showed my implementation to a
 * senior node.js engineer at a local meetup. He told me that there was a library
 * in NPM called async that would do all of this work for me. I was skeptical at
 * first but getting the parallel logic working with async took far less time than
 * trying to understand the JS execution loop through Stack Overflow articles.
 *
 * Here's the new version using async. Why didn't anyone tell me about this 
 * library sooner.
 */
function bookFlightsForHolidays() {
    async.parallel({
        seats: function(callback) {
            lib.fetchAvailSeatsFromDB(callback);
        },

        me: function(callback) {
            lib.fetchMyCustRecord(callback);
        }
    }, function(err, results) {
        var cheapSeat = _.reduce(results.seats, bookFlightsForHolidays_min_price, undefined);
        bookFlightsForHolidays_sellSeat(cheapSeat, results.me);
    });
};

function bookFlightsForHolidays_done(err) {
    console.log("all done");
}

function bookFlightsForHolidays_emailConfirmation(me, err, success) {
    if(success)
        lib.sendConfirmationEmail(me.id, bookFlightsForHolidays_done);
    else
        console.log("something when wrong trying to buy the ticket.");
}

function bookFlightsForHolidays_sellSeat(cheapSeat, me) {
    lib.sellSeat(me.id, cheapSeat.seatId, _.partial(bookFlightsForHolidays_emailConfirmation, me));
}

function bookFlightsForHolidays_min_price(currentCheapest, seat) {
    if(!currentCheapest) 
        return seat;
    return (seat.price < currentCheapest.price) ? seat : currentCheapest;
}


// Invoke the function right away to run it as a stand alone
// node.js script.
bookFlightsForHolidays();