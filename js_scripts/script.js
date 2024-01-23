import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'

var main = function() {
    var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
    var CURRENTSTATUS   = "FOCUS"  // states: "WORK" & "BREAK"
    var CURRENTTIMELEFT = new Date("01-01-2001"); 
    var WORKTIME        = new Date();
    var BREAKTIME       = new Date();
    var LONGBREAKTIME   = new Date();
    var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
    var PERIODSPASSED   = 0;


    var $clockStartLink = $("#clock_startOrPause")
    var $clockReset     = $("#clock_reset")

    WORKTIME = getMinutes(25);
    BREAKTIME = setMinutes(5);
    LONGBREAKTIME = setMinutes(15);

    $clockStartLink.on("click", function() {
        if(CURRENTSTATE == "PAUSED") {
            $clockStartLink.text("⏸︎")
            CURRENTSTATE = "STARTED"
        }

        else if(CURRENTSTATE == "STARTED") {
            $clockStartLink.text("⏵")
            CURRENTSTATE = "PAUSED"
        }

        return false;
    });
}

$(document).ready(main)