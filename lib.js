exports.fetchAvailSeatsFromDB = function(callback) {
    console.log("making call to pricing db");
    setTimeout(function() {
        callback(null,
                 [{seatId: "2A", price: 1000000.99}, 
                  {seatId: "12D", price: 876.12},
                  {seatId: "44C", price: 199.99},
                  {seatId: "44D", price: 199.92}]);
    }, 2000);    
};


exports.fetchMyCustRecord = function(callback) {
    console.log("making call to customer db");
    setTimeout(function() {
        callback(null, {id: 123, name: "Dan"});
    }, 1000);
};


exports.sellSeat = function(custId, seatId, callback) {
    console.log("attempting to update db in transaction");
    setTimeout(function() {
        console.log("assigning seat %s to customer %s", seatId, custId);
        callback(null, true);
    }, 5000 + custId);
};


exports.sendConfirmationEmail = function(custId, callback) {
    console.log("sending email to %s", custId);
    setTimeout(function() {
        console.log("email send to %s", custId);
        callback();
    }, 10000);
};