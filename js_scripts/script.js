var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
var CURRENTSTATUS   = "WORK"  // states: "WORK" & "BREAK" & "LONGBREAK"
var WORKTIME        = 25
var BREAKTIME       = 5
var LONGBREAKTIME   = 15
var EMPTYTIME       = new Date(0,0,0,0,0,0,0)
var CURRENTTIMELEFT = EMPTYTIME
var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
var PERIODSPASSED   = 1;

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
        toggleWorkOrBreak();
        updateTime();
    })

    $clockReset.on("click", function() {
        switch(CURRENTSTATE) {
            case "WORK":
                CURRENTTIMELEFT.setMinutes(WORKTIME)
            case "BREAK":
                CURRENTTIMELEFT.setMinutes(BREAKTIME)
            case "LONGBREAK":
                CURRENTTIMELEFT.setMinutes(LONGBREAKTIME)
        }
        CURRENTTIMELEFT.setSeconds(0);
        updateTime();
    })

    setInterval(function() {
        if(CURRENTTIMELEFT.getSeconds() == 0 && CURRENTTIMELEFT.getMinutes() == 0) {
            toggleWorkOrBreak()
        }
        else if(CURRENTSTATE == "STARTED") {
            CURRENTTIMELEFT.setTime(CURRENTTIMELEFT.getTime() - 1000)
        }
        updateTime();
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
                PERIODSPASSED++
                $("#current_interval").text(PERIODSPASSED)
            }
            else {
                CURRENTSTATUS = "LONGBREAK"
                CURRENTTIMELEFT.setMinutes(LONGBREAKTIME)
                PERIODSPASSED = 0;
            }
        case "BREAK":
            CURRENTSTATUS = "WORK"
            CURRENTTIMELEFT.setMinutes(WORKTIME)
        case "LONGBREAK":
            CURRENTSTATUS = "WORK"
            CURRENTTIMELEFT.setMinutes(WORKTIME)
    } 
    togglePaused()
}

var togglePaused = function() {
    $clockStartLink.text("⏵")
    CURRENTSTATE = "PAUSED"
    if(CURRENTSTATUS == "WORK") {
        $("#clock_state").text("Paused")
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