var _ = require("underscore"),
    async = require("async"),
    lib = require("./lib.js");

/*
 * I was so impressed with how easy async made my parallel solution that 
 * I decided use async to complete the rest of my algorithm. It turns out
 * that async has this function, waterfall, that will feed the results of
 * steps into future steps in order.
 *
 * I didn't notice until I was done but my new async dependent version is
 * almost as complex with nesting of arrays, objects and functions that I
 * don't think it's any better than the first.
 *
 * Damn it! Why is JavaScript so difficult to work with.
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
        var me = results.me;
        var cheapSeat = _.reduce(results.seats, bookFlightsForHolidays_min_price, undefined);
        async.waterfall([
            function(callback) {
                lib.sellSeat(me.id, cheapSeat.seatId, callback);
            },

            function(success, callback) {   
                if(success)
                   lib.sendConfirmationEmail(me.id, callback);
                else
                    callback("something when wrong trying to buy the ticket.");             
            }
        ], function(err) {
            if(err)
                console.log(err);
            else
                console.log("all done");
        });
    });
};

function bookFlightsForHolidays_min_price(currentCheapest, seat) {
    if(!currentCheapest) 
        return seat;
    return (seat.price < currentCheapest.price) ? seat : currentCheapest;
}


// Invoke the function right away to run it as a stand alone
// node.js script.
bookFlightsForHolidays();