var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * This is my second version of our implementation. By simply moving the inline
 * callback funcitons to named functions at the module level, I can eliminate 
 * the deep nesting of blocks.
 *
 * Refactoring my code like this also has the side effect of breaking the
 * implementation into smaller, more testable blocks of code. Additionally,
 * changes to various pieces only impact the small function. Combined with
 * unit tests, I should have a good tool set to prevent breaking changes from
 * being published.
 *
 * The downside was coming up with names for each of these functions. I'm not
 * sure how I would make this work with a large module. Names like done seem to
 * generic to be reused but it's the best description of what that chunk of code
 * does.
 */
function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(err, seats) {
        var cheapSeat = _.reduce(seats, min_price, undefined);
        lib.fetchMyCustRecord(_.partial(sellSeat, cheapSeat));
    });
};

function done(err) {
    console.log("all done");
}

function emailConfirmation(me, err, success) {
    if(success)
        lib.sendConfirmationEmail(me.id, done);
    else
        console.log("something when wrong trying to buy the ticket.");
}

function sellSeat(cheapSeat, err, me) {
    lib.sellSeat(me.id, cheapSeat.seatId, _.partial(emailConfirmation, me));
}

function min_price(currentCheapest, seat) {
    if(!currentCheapest) 
        return seat;
    return (seat.price < currentCheapest.price) ? seat : currentCheapest;
}


// Invoke the function right away to run it as a stand alone
// node.js script.
bookFlightsForHolidays();