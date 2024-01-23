var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
var CURRENTSTATUS   = "FOCUS"  // states: "WORK" & "BREAK"
var WORKTIME        = 25
var BREAKTIME       = 5
var LONGBREAKTIME   = 15
var EMPTYTIME       = new Date(0,0,0,0,0,0,0)
var CURRENTTIMELEFT = EMPTYTIME
var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
var PERIODSPASSED   = 0;

var $clockStartLink = $("#clock_startOrPause")
var $clockReset     = $("#clock_reset")
var $clockMins      = $('#clock_minutes')
var $clockSecs      = $('#clock_seconds')

var main = function() {
    CURRENTTIMELEFT.setSeconds(5)

    var minsLeft = CURRENTTIMELEFT.getMinutes()
    var secsLeft = CURRENTTIMELEFT.getSeconds()
    $clockMins.text(minsLeft)
    $clockSecs.text(secsLeft)

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

    setInterval(function() {
        if(CURRENTTIMELEFT.getSeconds() == 0 && CURRENTTIMELEFT.getMinutes() == 0) {
            $clockStartLink.text("⏵")
            CURRENTSTATE = "PAUSED"
            var minsLeft = CURRENTTIMELEFT.getMinutes()
            var secsLeft = CURRENTTIMELEFT.getSeconds()
            $('#clock_minutes').text(minsLeft)
            $('#clock_seconds').text(secsLeft)
        }

        else if(CURRENTSTATE == "STARTED") {
            var minsLeft = CURRENTTIMELEFT.getMinutes()
            var secsLeft = CURRENTTIMELEFT.getSeconds()
            $('#clock_minutes').text(minsLeft)
            $('#clock_seconds').text(secsLeft)
            CURRENTTIMELEFT.setTime(CURRENTTIMELEFT.getTime() - 1000)
        }
        console.log( CURRENTTIMELEFT.getMinutes(), " : ", CURRENTTIMELEFT.getSeconds())
    }, 1000);
}

$(document).ready(main)