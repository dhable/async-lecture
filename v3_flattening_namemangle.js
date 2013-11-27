var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * Ah ha! After thinking about the problem overnight, I determined I could
 * avoid name collisions if I prepended the name of the entry function each
 * named chunk of code belongs to. Now everyone can have a done method that
 * is specific to them and I don't need to worry about synonyms for done.
 */
function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(err, seats) {
        var cheapSeat = _.reduce(seats, bookFlightsForHolidays_min_price, undefined);
        lib.fetchMyCustRecord(_.partial(bookFlightsForHolidays_sellSeat, cheapSeat));
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

function bookFlightsForHolidays_sellSeat(cheapSeat, err, me) {
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