var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * The node.js way of looking at the problem
 */


// Work on executing both fetchAvailSeatsFromDB and fetchMyCustRecord in parallel. Call the
// sellSeat function when both calls have data and you've determined what seat to sell.
// Don't use async.
var cheapSeat, me;

function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(seats) {
        cheapSeat = _.reduce(seats, bookFlightsForHolidays_findCheapestSeat, undefined);
        lib.fetchMyCustRecord(bookFlightsForHolidays_sellSeat);
    });
};

function bookFlightsForHolidays_done() {
    console.log("all done");
}

function bookFlightsForHolidays_email(success) {
    if(success)
        lib.sendConfirmationEmail(me.id, bookFlightsForHolidays_done);
    else
        console.log("oops");
}

function bookFlightsForHolidays_sellSeat(meRec) {
    me = meRec;
    lib.sellSeat(me.id, cheapSeat.seatId, bookFlightsForHolidays_email);
}

function bookFlightsForHolidays_findCheapestSeat(currentCheapest, seat) {
    if(!currentCheapest) return seat;

    if (seat.price < currentCheapest.price) 
       return seat;
    else
        return currentCheapest;
}


bookFlightsForHolidays();