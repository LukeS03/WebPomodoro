var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
var CURRENTSTATUS   = "WORK"  // states: "WORK" & "BREAK" & "LONGBREAK"
var WORKTIME        = 1
var BREAKTIME       = 1
var LONGBREAKTIME   = 1
var EMPTYTIME       = new Date(0,0,0,0,0,0,0)
var CURRENTTIMELEFT = EMPTYTIME
var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
var PERIODSPASSED   = 0;

var $clockStartLink = $("#clock_startOrPause")
var $clockReset     = $("#clock_reset")
var $clockSkip      = $("#clock_skip")
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
            toggleStarted()
        }

        else if(CURRENTSTATE == "STARTED") {
            togglePaused()
        }

        return false;
    });

    $clockSkip.on("click", function() {
        togglePaused()
        CURRENTTIMELEFT.setMinutes(0)
        CURRENTTIMELEFT.setSeconds(0)
        toggleWorkOrBreak()
    })

    $clockReset.on("click", function() {
        switch(CURRENTSTATE) {
            case "WORK":
                CURRENTTIMELEFT.setMinutes(WORKTIME)
                break
            case "BREAK":
                CURRENTTIMELEFT.setMinutes(BREAKTIME)
                break
            case "LONGBREAK":
                CURRENTTIMELEFT.setMinutes(LONGBREAKTIME)
                break
        }
        CURRENTTIMELEFT.setSeconds(0);
        updateTime();
    })

    setInterval(function() {
        if(CURRENTSTATE == "STARTED") {
            CURRENTTIMELEFT.setTime(CURRENTTIMELEFT.getTime() - 1000)
            if(CURRENTTIMELEFT.getSeconds() == 0 && CURRENTTIMELEFT.getMinutes() == 0) {
                toggleWorkOrBreak()
            }
        }
        updateTime();
        console.log(PERIODSPASSED, " ", LONGBREAKINTERVAL, " ", CURRENTSTATUS, " ", CURRENTSTATE)
    }, 1000);
}

var updateTime = function() {
    var minsLeft = CURRENTTIMELEFT.getMinutes()
    var secsLeft = CURRENTTIMELEFT.getSeconds()
    $('#clock_minutes').text(minsLeft)
    $('#clock_seconds').text(secsLeft)
}

var toggleWorkOrBreak = function() {
    switch(CURRENTSTATUS) {
        case "WORK":
            if(PERIODSPASSED < LONGBREAKINTERVAL) {
                CURRENTSTATUS = "BREAK"
                CURRENTTIMELEFT.setMinutes(BREAKTIME)
            }
            else if(PERIODSPASSED == LONGBREAKINTERVAL) {
                CURRENTSTATUS = "LONGBREAK"
                CURRENTTIMELEFT.setMinutes(LONGBREAKTIME)
            }
            break
        case "BREAK":
            CURRENTSTATUS = "WORK"
            CURRENTTIMELEFT.setMinutes(WORKTIME)
            PERIODSPASSED++
            $("#current_interval").text(PERIODSPASSED)
            break
        case "LONGBREAK":
            CURRENTSTATUS = "WORK"
            CURRENTTIMELEFT.setMinutes(WORKTIME)
            PERIODSPASSED = 0;
            $("#current_interval").text(PERIODSPASSED)
            break
    } 
    CURRENTTIMELEFT.setSeconds(0);
    togglePaused()
}

var togglePaused = function() {
    $clockStartLink.text("⏵")
    CURRENTSTATE = "PAUSED"
    if(CURRENTSTATUS == "WORK") {
        $("#clock_state").text("Focus (Paused)")
    }
    else if(CURRENTSTATUS == "BREAK") {
        $("#clock_state").text("Break (Paused)")
    }
    else if(CURRENTSTATUS == "LONGBREAK") {
        $("#clock_state").text("Long Break (Paused)")
    }
}

var toggleStarted = function() {
    $clockStartLink.text("⏸︎")
    CURRENTSTATE = "STARTED"
    if(CURRENTSTATUS == "WORK") {
        $("#clock_state").text("Focus")
    }
    else if(CURRENTSTATUS == "BREAK") {
        $("#clock_state").text("Break")
    }
    else if(CURRENTSTATUS == "LONGBREAK") {
        $("#clock_state").text("Long Break")
    }
}

$(document).ready(main)