
//State variables
var CURRENTSTATE    = "PAUSED" // states: "PAUSED" "STARTED"
var CURRENTSTATUS   = "WORK"  // states: "WORK" & "BREAK" & "LONGBREAK"
var HASREQUESTEDNOTIFICATIONPERMS = false;
var NOTIFICATIONSENABLED = false;

//Timer variables
var WORKTIME          = 1
var BREAKTIME         = 1
var LONGBREAKTIME     = 1
var EMPTYTIME         = new Date(0,0,0,0,0,0,0)
var CURRENTTIMELEFT   = EMPTYTIME
var LONGBREAKINTERVAL = 4; // how many breaks until a long break.
var PERIODSPASSED     = 0;

//
var TIMERFINISHEDSOUND = new Audio("alert-noise.mp3")
var STYLEMODE          = "TOMATO" // "TOMATO" and "AUBERGINE"

//jQuery elements
var $clockStartLink = $("#clock_startOrPause")
var $clockReset     = $("#clock_reset")
var $clockSkip      = $("#clock_skip")
var $clockMins      = $('#clock_minutes')
var $clockSecs      = $('#clock_seconds')
var $resetInterval  = $('#current_interval')
var $changeCSS      = $('#logo')

var main = function() {
    CURRENTTIMELEFT.setSeconds(5)
    var minsLeft = CURRENTTIMELEFT.getMinutes()
    var secsLeft = CURRENTTIMELEFT.getSeconds()
    $clockMins.text(minsLeft)
    $clockSecs.text(secsLeft)

    

    $clockStartLink.on("click", function() {
        if(!HASREQUESTEDNOTIFICATIONPERMS) {
            HASREQUESTEDNOTIFICATIONPERMS=true;
            let permPromise = Notification.requestPermission();
            if(permPromise == "Granted") {
                console.log("Granted permission to use notifications")
                NOTIFICATIONSENABLED = true;
            }
        }
        else if(CURRENTSTATE == "PAUSED") {
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

    $resetInterval.on("click", function() {
        togglePaused()
        reset()
    })

    setInterval(function() {
        if(CURRENTSTATE == "STARTED") {
            CURRENTTIMELEFT.setTime(CURRENTTIMELEFT.getTime() - 1000)
            if(CURRENTTIMELEFT.getSeconds() == 0 && CURRENTTIMELEFT.getMinutes() == 0) {
                TIMERFINISHEDSOUND.play()
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
                let breakNotf = new Notification("Break Time!")
            }
            else if(PERIODSPASSED == LONGBREAKINTERVAL) {
                CURRENTSTATUS = "LONGBREAK"
                CURRENTTIMELEFT.setMinutes(LONGBREAKTIME)
                let longBreakNotf = new Notification("Long Break Time!")
            }
            break
        case "BREAK":
            CURRENTSTATUS = "WORK"
            CURRENTTIMELEFT.setMinutes(WORKTIME)
            PERIODSPASSED++
            $("#current_interval").text(PERIODSPASSED)
            let workNotf = new Notification("Time to Focus!")
            break
        case "LONGBREAK":
            reset()
            let workNotf2 = new Notification("Time to Focus!", { body:"It is now time to focus for ${WORKTIME} minutes." })
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

//Reset the timer and intervals.
var reset = function() {
    CURRENTSTATUS = "WORK"
    PERIODSPASSED = 0
    CURRENTTIMELEFT.setMinutes(WORKTIME)
    CURRENTTIMELEFT.setSeconds(0)
    updateTime()
    $("#current_interval").text(PERIODSPASSED)
}

$(document).ready(main)