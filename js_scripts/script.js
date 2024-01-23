import "date-fns";

var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
var CURRENTSTATUS   = "FOCUS"  // states: "WORK" & "BREAK"
var CURRENTTIMELEFT = new Date(); 
var WORKTIME        = new Date();
var BREAKTIME       = new Date();
var LONGBREAKTIME   = new Date();
var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
var PERIODSPASSED   = 0;

var main = function() {
    var $clockStartLink = $("#clock_startOrPause")
    var $clockReset     = $("#clock_reset")

    WORKTIME = setMinutes(25);
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