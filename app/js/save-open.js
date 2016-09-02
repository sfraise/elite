/**
 * Created by Spencer on 8/2/2016.
 */

var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');

$(document).ready(function() {
    /*** GET LATEST SAVED FILES ***/
    //getLatestSaves(2);

    /*** START NEW ***/
    $('#start-plan-submit').click(function() {
        // SET INPUT ELEMENTS
        var companyNameEle = $('#start-company-name');
        var planYearEle = $('#start-plan-year');
        var lastYrRevEle = $('#start-last-year-revenue');

        // RESET ERRORS
        companyNameEle.css('border', '1px solid #5c0f8b');
        planYearEle.css('border', '1px solid #5c0f8b');
        lastYrRevEle.css('border', '1px solid #5c0f8b');

        // GET VALUES
        var companyName = companyNameEle.val();
        var planYear = planYearEle.val();
        var lastYrRev = lastYrRevEle.val();

        if(!companyName) {
            companyNameEle.css('border', '1px solid red');
        } else if(!planYear) {
            planYearEle.css('border', '1px solid red');
        } else if(!lastYrRev) {
            lastYrRevEle.css('border', '1px solid red');
        } else {
            // SET INITIAL VALUES
            $('#company_name').val(companyName);
            $('#company_year').html(planYear);

            // TRANSITION TO FORM
            $('#start_view').fadeOut();
            $('#inner_page_view').fadeIn();

            // ADJUST INNER BODY HEIGHT
            if($('#tab_goals').attr('class') !== 'tab_text active_tab') {
                $('.body-inner').css('height', 'calc(100vh - 56px)');
            }
        }
    });

    /*** SYNC START PAGE VALUES WITH INNER VALUES ***/
    $('#start-company-name').on('keyup', function() {
        $('#company_name').val($(this).val());
    });
    $('#company_name').on('keyup', function() {
        $('#start-company-name').val($(this).val());
    });
    $('#start-plan-year').on('keyup', function() {
        $('#company_year').html($(this).val());
    });

    /*** OPEN FILE ***/
    $('.open-button').click(function() {
        openFile();
    });

    /*** SAVE FILE ***/
    $('.save-button').click(function() {
        saveFile();
    });

    /*** SAVE AND EMAIL ***/
    $('#email_save_button').click(function() {
        emailSaveFile();
    });

    $('#email_open_button').click(function() {
        emailOpenFile();
    });

    $('#email_send_button').click(function() {
        var address = $('#email_send_address').val();
        var filePath = $('#email_file_path').val();
        var subject = 'Elite Marketing Planner File';
        var emailString = 'mailto:' + address + '?subject=' + subject + '&attachment="' + filePath + '"';
        console.log(emailString);

        window.location.href = emailString;
    });

    $('#open-pdf-etool').click(function() {
        const shell = require('electron').shell;
        const path = require('path');

        shell.openItem(path.join(__dirname, '/images/OperationalExcellenceCalculator.pdf'));
    });
});

function getLatestSaves(limit) {
    var path = __dirname + '\\..\\';
    // READ THE SAVED FILE
    fs.readFile(path + 'data.txt', 'utf-8', function (err, data) {
        if(err) {
            dialog.showErrorBox("Cannot Open File: ", err.message);
        } else {
            // CONVERT DATA TO ARRAY
            var dataArr = data.split(/[[\]]{1,2}/);

            // REMOVE EMPTY ARRAY ITEMS
            dataArr = cleanArray(dataArr);

            // SET NEW ARRAY TO PUSH OBJECTS TO
            var savedFiles = [];

            // ITERATE OVER DATA ARRAY
            for (var i = 0; i < dataArr.length; i++) {
                // PARSE THE DATA
                var obj = JSON.parse(dataArr[i]);

                var filePath = obj.file;
                var filename = filePath.replace(/^.*[\\\/]/, '');
                var dateTime = new Date(obj.time);
                var saveMonth = dateTime.getMonth() + 1;
                var saveDate = dateTime.getDate();
                var saveYear = dateTime.getFullYear();
                var saveHours = dateTime.getHours();
                var saveMinutes = dateTime.getMinutes();
                var formattedDate = saveMonth + '/' + saveDate + '/' + saveYear + ' ' + saveHours + ':' + saveMinutes;
                var latestFile = '<div class="start-latest-file-wrapper"><div class="start-latest-file" data="' + filePath + '">' + filename + '<span class="start-latest-file-open">OPEN</span></div></div>';

                // STRINGIFY AND PUSH OBJECTS TO NEW ARRAY
                JSON.stringify(savedFiles.push({"time": obj.time, "datetime": formattedDate, "value": latestFile}));
            }

            // SORT NEW ARRAY BY LAST SAVED
            savedFiles.sort(function(a, b) {
                return parseFloat(a.time) + parseFloat(b.time);
            });

            // ITERATE OVER NEW ARRAY OBJECTS
            var f = 0;
            $.each(savedFiles, function() {
                // LIMIT RESULTS BY LIMIT VARIABLE PASSED TO FUNCTION
                if(f < limit) {
                    // ADD SAVED FILE TO PAGE
                    $(this.value).appendTo('.start-latest-files');

                    f++
                } else {
                    return false;
                }
            });
        }
    });
}

function saveFile() {
    var time = $.now();

    // SET THE JSON OBJECT
    var obj = JSON.parse('[{"id": "save_time", "value": ' + time + '}]');

    // GET VALUES FROM FORM
    var editorVal = $('#editor').val();

    $('body input[type=text], body input[type=textarea], body input[type=select], body input[type=number], body input[type=hidden]').each(function() {
        // GET FIELD DATA
        var fieldId = $(this).attr('id');
        var fieldVal = $(this).val();

        // PUSH VALUES TO JSON OBJECT
        JSON.stringify(obj.push({"id": fieldId, "value": fieldVal}));
    });

    obj = JSON.stringify(obj);

    // OPEN SAVE-AS DIALOG
    dialog.showSaveDialog({ filters: [
        { name: 'text', extensions: ['elite'] }
    ]}, function (fileName) {
        if (fileName === undefined) return;
        fs.writeFile(fileName, obj, function (err) {
            if(err) {
                dialog.showErrorBox("File Save Error", err.message);
            } else {
                var saveObj = [];
                JSON.stringify(saveObj.push({"time": time, "file": fileName}));

                saveObj = JSON.stringify(saveObj);

                // SAVE TIME AND FILE PATH TO DATA FILE
                fs.appendFile('./data.txt', saveObj, function (err) {
                    if(err) {
                        dialog.showErrorBox("File Save Log Error", err.message);
                    }
                });

                // SHOW SUCCESS NOTICE
                $('#messages').html('<div class="message-file-saved">File Saved</div>').fadeIn().delay(2000).fadeOut();
            }
        });
    });
}

function openFile() {
    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['elite'] }
    ]}, function (fileNames) {
        if (fileNames === undefined) return;

        // REMOVE ANY EXISTING CUSTOM ROWS
        $('.remove-row').trigger('click');

        var fileName = fileNames[0];
        fs.readFile(fileName, 'utf-8', function (err, data) {
            // PARSE THE DATA
            var obj = JSON.parse(data);

            // ITERATE OVER OBJECTS
            $.each(obj, function() {
                // CHECK FOR CUSTOM ROW
                var startPatt = new RegExp("^strategy_custom");
                var endPatt = new RegExp("_label$");
                var startRes = startPatt.test(this.id);
                var endRes = endPatt.test(this.id);

                if(startRes == true && endRes == true) {
                    // IF CUSTOM ADD NEW ROW
                    $('.add-row').trigger('click');

                    // NOW ROW IS ADDED FILL THE FIRST FIELD WITH THIS VALUE
                    $('#' + this.id).val(this.value).trigger('keyup');

                    // UPDATE CUSTOM LABELS
                    $('.strategy_custom_label :input').trigger('keyup');
                } else {
                    $('#' + this.id).val(this.value).trigger('keyup');
                }
            });

            // ADD FILENAME TO TOP BAR
            var filename = fileName.replace(/^.*[\\\/]/, '');
            $('#window-bar-filename').html(filename);

            // TRANSITION TO FORM
            $('#start_view').fadeOut();
            $('#inner_page_view').fadeIn();
        });
    });
}

function emailSaveFile() {
    var time = $.now();

    // SET THE JSON OBJECT
    var obj = JSON.parse('[{"id": "save_time", "value": ' + time + '}]');

    $('body input[type=text], body input[type=textarea], body input[type=select], body input[type=number], body input[type=hidden]').each(function() {
        // GET FIELD DATA
        var fieldId = $(this).attr('id');
        var fieldVal = $(this).val();

        // PUSH VALUES TO JSON OBJECT
        JSON.stringify(obj.push({"id": fieldId, "value": fieldVal}));
    });

    obj = JSON.stringify(obj);

    // OPEN SAVE-AS DIALOG
    dialog.showSaveDialog({ filters: [
        { name: 'text', extensions: ['elite'] }
    ]}, function (filePath) {
        if (filePath === undefined) return;
        fs.writeFile(filePath, obj, function (err) {
            if(err) {
                dialog.showErrorBox("File Save Error", err.message);
            } else {
                var saveObj = [];
                JSON.stringify(saveObj.push({"time": time, "file": filePath}));

                saveObj = JSON.stringify(saveObj);

                // SAVE TIME AND FILE PATH TO DATA FILE
                fs.appendFile('./data.txt', saveObj, function (err) {
                    if(err) {
                        dialog.showErrorBox("File Save Log Error", err.message);
                    }
                });

                // SET SELECTED FILE
                var fileName = filePath.replace(/^.*[\\\/]/, '');
                $('#email_file_path').val(filePath);
                $('#modal_email_file_selected').html('Attached File: ' + filePath + '<div class="email_file_selected_notice">* Some email clients will not accept attachments passed to them so you may need to manually select the file from within the client.');

                // HIGHLIGHT EMAIL INPUT OR SEND BUTTON
                var emailAddressEle = $('#email_send_address');
                var emailAddress = emailAddressEle.val();
                if(!emailAddress) {
                    emailAddressEle.css('border','1px solid #80ba00');
                } else {
                    emailAddressEle.css('border','1px solid #5c0f8b');
                    $('#email_send_button').css('border','1px solid #80ba00');
                }
            }
        });
    });
}


function emailOpenFile() {
    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['elite'] }
    ]}, function (filePaths) {
        if (filePaths === undefined) return;
        var filePath = filePaths[0];

        // SET SELECTED FILE
        var fileName = filePath.replace(/^.*[\\\/]/, '');
        $('#email_file_path').val(filePath);
        $('#modal_email_file_selected').html('Attached File: ' + filePath + '<div class="email_file_selected_notice">* Some email clients will not accept attachments passed to them so you may need to manually select the file from within the client.');

        // HIGHLIGHT EMAIL INPUT OR SEND BUTTON
        var emailAddressEle = $('#email_send_address');
        var emailAddress = emailAddressEle.val();
        if(!emailAddress) {
            emailAddressEle.css('border','1px solid #80ba00');
        } else {
            emailAddressEle.css('border','1px solid #5c0f8b');
            $('#email_send_button').css('border','1px solid #80ba00');
        }
    });
}

/*** CLEANS EMPTY VALUES FROM ARRAY ***/
function cleanArray(actual) {
    var newArray = [];
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}