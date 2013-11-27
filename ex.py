#
# A Python way of looking at the problem
#
bookFlightsForHolidays():
    seats = fetchAvailSeatsFromDB()
    cheapSeat = min(seats, price)
    me = fetchMyCustRecord()
    success = sellSeat(me, cheapSeat)
    if(success)
        sendConfirmationEmail(me)