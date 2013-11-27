var _ = require("underscore"),
    Q = require("q"),
    lib = require("./lib.js");

/*
 * Another meetup, another suggestion. This time someone told me to look at
 * ditching callbacks in favor of promises. The promise becomes an object that
 * encapsulates an event (callback).
 * 
 * I ended up using the JS library called Q that implements promises. Since my
 * airline library wasn't written with Q in mind, I needed to add a bit of boiler
 * plate to make it work.
 *
 * I'm impresses how little code my promise implementation contains and it's 
 * a fairly flat data structure. If my library exposed promises, I'm sure I
 * could cut a fair amount of this code.
 */
function bookFlightsForHolidays() {
    Q.allSettled([Q.nfcall(lib.fetchAvailSeatsFromDB), Q.nfcall(lib.fetchMyCustRecord)])
     .spread(function(seats, me) {
        return [me.value, _.reduce(seats.value, bookFlightsForHolidays_min_price, undefined)];
     })
     .spread(function(me, cheapSeat) {
        return [me, Q.nfcall(lib.sellSeat, me.id, cheapSeat.seatId)];
     })
     .spread(function(me, success) {
        return Q.nfcall(lib.sendConfirmationEmail, me.id);
     })
     .done(function() {
        console.log("all done");
     });
}

function bookFlightsForHolidays_min_price(currentCheapest, seat) {
    if(!currentCheapest) 
        return seat;
    return (seat.price < currentCheapest.price) ? seat : currentCheapest;
}


// Invoke the function right away to run it as a stand alone
// node.js script.
bookFlightsForHolidays();