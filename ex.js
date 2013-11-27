var _ = require("underscore"),
    lib = require("./lib.js");

/*
 * The node.js way of looking at the problem
 */
function bookFlightsForHolidays() {
    lib.fetchAvailSeatsFromDB(function(seats) {
        var cheapSeat = _.reduce(seats, function(currentCheapest, seat) {
            if(!currentCheapest) return seat;
            
            if (seat.price < currentCheapest.price) 
                return seat;
            else
                return currentCheapest;
        }, undefined);

        lib.fetchMyCustRecord(function(me) {
            lib.sellSeat(me.id, cheapSeat.seatId, function(success) {
                if(success)
                    lib.sendConfirmationEmail(me.id, function() {
                        console.log("all done");
                    });
                else
                    console.log("oops");
            });
        });
    });
};

bookFlightsForHolidays();