// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');

$( "#start_view" ).load( "./html/start.html" );
$( "#view_goals" ).load( "./html/goals.html" );
$( "#view_strategy" ).load( "./html/strategy.html" );
$( "#view_budget" ).load( "./html/budget.html" );
$( "#view_appointments" ).load( "./html/appointments.html" );


/*** NAVIGATION ***/

$(document).ready(function () {
    showHideView();


    function showHideView(prevId) {
        var prevView = $("#" + prevId).data("view");
        var newId = $(".active_tab").data("view");
        $("#" + prevView).hide();
        $("#" + newId).show();

        if (newId == 'view_strategy' || newId == 'view_budget' || newId == 'view_appointments') {
            $('.body-inner').css('height', 'calc(100vh - 56px)');
        } else {
            $('.body-inner').css('height', 'calc(100vh - 28px)');
        }
    }

    $(".tab_text").on('click', function () {
        var newId = $(this).attr("id");
        var currentId = $(".active_tab").attr("id");
        if (newId != currentId) {
            $("#" + currentId).removeClass("active_tab");
            $("#" + newId).addClass("active_tab");
            showHideView(currentId);
        }
    });

    $('#strategy_submit_button').on('click', function () {
        var currentId = $(".active_tab").attr("id");
//console.log( currentId);
        $("#" + currentId).removeClass("active_tab");
        $("#tab_strategy").addClass("active_tab");
        showHideView(currentId);

    });


});