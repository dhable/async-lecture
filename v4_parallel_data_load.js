var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * After staring at my implementation for hours, I finally noticed that fetching
 * the seats for sale and my customer record could be done in parllel to make the
 * whole function execute faster.
 *
 * It took quite a bit of time on Stack Overflow to figure out how to accomplish
 * this but I eventually figured out that I could set some state variables and
 * then implement a check function that is placed back into the execution cycle
 * using setImmediate. If the data is present, I can then continue the execution.
 *
 * Even though it works, I'm still not 100% convinced that this is the best
 * way of implementing the parallelization of my function.
 */
function bookFlightsForHolidays() {
    var seats = undefined,
        me = undefined;

    lib.fetchAvailSeatsFromDB(function(err, s) { seats = s; });
    lib.fetchMyCustRecord(function(err, m) { me = m; });

    function checkForResults() {
        if(seats && me) {
            var cheapSeat = _.reduce(seats, bookFlightsForHolidays_min_price, undefined);
            bookFlightsForHolidays_sellSeat(cheapSeat, me);
        } else {
            setImmediate(checkForResults);
        }
    }
    checkForResults();
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