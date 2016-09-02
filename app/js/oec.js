/**
 * Created by Spencer on 8/25/2016.
 */

var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');

$(document).ready(function() {
    // VALIDATE ONLY NUMBERS, COMMAS, DECIMALS, BACKSPACE, TAB, DELETE AND LEFT/RIGHT ARROWS USED IN INPUTS
    $('#oec-modal :input').on('keydown', function(e) {
        if(e.keyCode > 47 && e.keyCode < 58 || e.keyCode > 95 && e.keyCode < 106 || e.keyCode == 188 || e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 9) {
            // BIND ENTER KEY TO NEXT BUTTON
            if(e.keyCode == 13) {
                //var inputData = $(this).attr('id');
                //console.log(inputData);
                //$('.goals_input').next('input').focus();
            }

            return true;
        } else {
            //$('#input_error').html('Only numbers, commas and decimals can be entered');
            //$('#input_error').fadeIn(1000).delay(1000).fadeOut(1000).promise().done(function() {
            //
            //});
        }

        return false;
    });

    /*** OPPERATIONAL EXCELLENCE CALCULATOR ***/
    $('#oec-modal :input').on('keyup', function(e) {

        if (e.keyCode !== 37 || e.keyCode !== 39) {
            var thisId = $(this).attr('id');
            var input = $(this).val();
            var thisValue = addDecimal(e.keyCode, input);
            if (thisId == "aspCurrent" || thisId == "aspFuture") {
                $('#' + thisId).val('$' + thisValue);
            }else if (thisId == "oecLeads"){
                $('#' + thisId).val(thisValue);
        }else{
                $('#' + thisId).val(thisValue + "%");
            }


            // GET VALUES
           
            var leads = clean_num($('#oecLeads').val());


            var callsCurrentPercentage = clean_num($('#callsCurrentPercentage').val());
            var bookedCurrentPercentage = clean_num($('#bookedCurrentPercentage').val());
            var showedCurrentPercentage = clean_num($('#showedCurrentPercentage').val());
            var testedCurrentPercentage = clean_num($('#testedCurrentPercentage').val());
            var hlCurrentPercentage = clean_num($('#hlCurrentPercentage').val());
            var closingCurrentPercentage = clean_num($('#closingCurrentPercentage').val());
            var binauralCurrentPercentage = clean_num($('#binauralCurrentPercentage').val());
            var returnsCurrentPercentage = clean_num($('#returnsCurrentPercentage').val());
            var aspCurrent = clean_num($('#aspCurrent').val());

            var callsCurrentPercentageEle = $('#callsCurrentPercentage');

            var callsCurrentPercentageDef = callsCurrentPercentageEle.attr('data-default');
            if(!callsCurrentPercentage) {
                callsCurrentPercentageEle.val(callsCurrentPercentageDef);
            }

            var bookedCurrentPercentageEle = $('#bookedCurrentPercentage');

            var bookedCurrentPercentageDef = bookedCurrentPercentageEle.attr('data-default');
            if(!bookedCurrentPercentage) {
                bookedCurrentPercentageEle.val(bookedCurrentPercentageDef);
            }

            var showedCurrentPercentageEle = $('#showedCurrentPercentage');

            var showedCurrentPercentageDef = showedCurrentPercentageEle.attr('data-default');
            if(!showedCurrentPercentage) {
                showedCurrentPercentageEle.val(showedCurrentPercentageDef);
            }

            var testedCurrentPercentageEle = $('#testedCurrentPercentage');

            var testedCurrentPercentageDef = testedCurrentPercentageEle.attr('data-default');
            if(!testedCurrentPercentage) {
                testedCurrentPercentageEle.val(testedCurrentPercentageDef);
            }

            var hlCurrentPercentageEle = $('#hlCurrentPercentage');

            var hlCurrentPercentageDef = hlCurrentPercentageEle.attr('data-default');
            if(!hlCurrentPercentage) {
                hlCurrentPercentageEle.val(hlCurrentPercentageDef);
            }

            var closingCurrentPercentageEle = $('#closingCurrentPercentage');

            var closingCurrentPercentageDef = closingCurrentPercentageEle.attr('data-default');
            if(!closingCurrentPercentage) {
                closingCurrentPercentageEle.val(closingCurrentPercentageDef);
            }

            var binauralCurrentPercentageEle = $('#binauralCurrentPercentage');

            var binauralCurrentPercentageDef = binauralCurrentPercentageEle.attr('data-default');
            if(!binauralCurrentPercentage) {
                binauralCurrentPercentageEle.val(binauralCurrentPercentageDef);
            }

            var returnsCurrentPercentageEle = $('#returnsCurrentPercentage');

            var returnsCurrentPercentageDef = returnsCurrentPercentageEle.attr('data-default');
            if(!returnsCurrentPercentage) {
                returnsCurrentPercentageEle.val(returnsCurrentPercentageDef);
            }

            var aspCurrentEle = $('#aspCurrent');

            var aspCurrentPercentageDef = aspCurrentEle.attr('data-default');
            if(!aspCurrent) {
                aspCurrentEle.val(aspCurrentPercentageDef);
            }

            var callsFuturePercentage = clean_num($('#callsFuturePercentage').val());
            var bookedFuturePercentage = clean_num($('#bookedFuturePercentage').val());
            var showedFuturePercentage = clean_num($('#showedFuturePercentage').val());
            var testedFuturePercentage = clean_num($('#testedFuturePercentage').val());
            var hlFuturePercentage = clean_num($('#hlFuturePercentage').val());
            var closingFuturePercentage = clean_num($('#closingFuturePercentage').val());
            var binauralFuturePercentage = clean_num($('#binauralFuturePercentage').val());
            var returnsFuturePercentage = clean_num($('#returnsFuturePercentage').val());
            var aspFuture = clean_num($('#aspFuture').val());
            
            // TODO - ASK BRANDON WHY PDF CALCULATIONS AREN'T MATCHING UP WITH MINE
            var callsCurrent = (leads * callsCurrentPercentage) / 100;
            var bookedCurrent = (leads * bookedCurrentPercentage) / 100;
            var showedCurrent = (bookedCurrent * showedCurrentPercentage) / 100;
            var testedCurrent = (showedCurrent * testedCurrentPercentage) / 100;
            var hlCurrent = (testedCurrent * hlCurrentPercentage) / 100;
            var closingCurrent = (hlCurrent * closingCurrentPercentage) / 100;
            var binauralCurrent = ((closingCurrent * binauralCurrentPercentage) / 100) * 2;
            var returnsCurrent = binauralCurrent - ((binauralCurrent * returnsCurrentPercentage) / 100);
            var totalCurrent = returnsCurrent * aspCurrent;

            var callsFuture = (leads * callsFuturePercentage) / 100;
            var bookedFuture = (leads * bookedFuturePercentage) / 100;
            var showedFuture = (bookedFuture * showedFuturePercentage) / 100;
            var testedFuture = (showedFuture * testedFuturePercentage) / 100;
            var hlFuture = (testedFuture * hlFuturePercentage) / 100;
            var closingFuture = (hlFuture * closingFuturePercentage) / 100;
            var binauralFuture = ((closingFuture * binauralFuturePercentage) / 100) * 2;
            var returnsFuture = binauralFuture - ((binauralFuture * returnsFuturePercentage) / 100);
            var totalFuture = returnsFuture * aspFuture;
            var operationalEfficienciesRevenue = totalFuture - totalCurrent;

            // UPDATE VALUES
            $('#leadsCurrent').val(addCommas(Math.round(leads)));
            $('#callsCurrent').val(addCommas(Math.round(callsCurrent)));
            $('#bookedCurrent').val(addCommas(Math.round(bookedCurrent)));
            $('#showedCurrent').val(addCommas(Math.round(showedCurrent)));
            $('#testedCurrent').val(addCommas(Math.round(testedCurrent)));
            $('#hlCurrent').val(addCommas(Math.round(hlCurrent)));
            $('#closingCurrent').val(addCommas(Math.round(closingCurrent)));
            $('#binauralCurrent').val(addCommas(Math.round(binauralCurrent)));
            $('#returnsCurrent').val(addCommas(Math.round(returnsCurrent)));
            $('#totalCurrent').val("$" + addCommas(Math.round(totalCurrent * 100)/100));

            $('#leadsFuture').val(addCommas(Math.round(leads)));
            $('#callsFuture').val(addCommas(Math.round(callsFuture)));
            $('#bookedFuture').val(addCommas(Math.round(bookedFuture)));
            $('#showedFuture').val(addCommas(Math.round(showedFuture)));
            $('#testedFuture').val(addCommas(Math.round(testedFuture)));
            $('#hlFuture').val(addCommas(Math.round(hlFuture)));
            $('#closingFuture').val(addCommas(Math.round(closingFuture)));
            $('#binauralFuture').val(addCommas(Math.round(binauralFuture)));
            $('#returnsFuture').val(addCommas(Math.round(returnsFuture)));
            $('#totalFuture').val("$" + addCommas(Math.round(totalFuture * 100)/100));

            $('#operationalEfficienciesRevenue').val("$" + addCommas(Math.round(operationalEfficienciesRevenue * 100)/100));
            $('#op_eff_rev').val("$" + addCommas(Math.round(operationalEfficienciesRevenue * 100)/100));
            $('#op_eff_rev').trigger("keyup");
        }
    });

    /*** OEC CLEAR ***/
    $('.modal-clear').click(function() {
        // RESET ALL VALUES TO EMPTY
        $('#oec-modal :input').each(function() {
            $(this).val('');
        });

        // RESET DEFAULTS
        var callsCurrentPercentageEle = $('#callsCurrentPercentage');
        var callsCurrentPercentageDef = callsCurrentPercentageEle.attr('data-default');
        callsCurrentPercentageEle.val(callsCurrentPercentageDef);

        var bookedCurrentPercentageEle = $('#bookedCurrentPercentage');
        var bookedCurrentPercentageDef = bookedCurrentPercentageEle.attr('data-default');
        bookedCurrentPercentageEle.val(bookedCurrentPercentageDef);

        var showedCurrentPercentageEle = $('#showedCurrentPercentage');
        var showedCurrentPercentageDef = showedCurrentPercentageEle.attr('data-default');
        showedCurrentPercentageEle.val(showedCurrentPercentageDef);

        var testedCurrentPercentageEle = $('#testedCurrentPercentage');
        var testedCurrentPercentageDef = testedCurrentPercentageEle.attr('data-default');
        testedCurrentPercentageEle.val(testedCurrentPercentageDef);

        var hlCurrentPercentageEle = $('#hlCurrentPercentage');
        var hlCurrentPercentageDef = hlCurrentPercentageEle.attr('data-default');
        hlCurrentPercentageEle.val(hlCurrentPercentageDef);

        var closingCurrentPercentageEle = $('#closingCurrentPercentage');
        var closingCurrentPercentageDef = closingCurrentPercentageEle.attr('data-default');
        closingCurrentPercentageEle.val(closingCurrentPercentageDef);

        var binauralCurrentPercentageEle = $('#binauralCurrentPercentage');
        var binauralCurrentPercentageDef = binauralCurrentPercentageEle.attr('data-default');
        binauralCurrentPercentageEle.val(binauralCurrentPercentageDef);

        var returnsCurrentPercentageEle = $('#returnsCurrentPercentage');
        var returnsCurrentPercentageDef = returnsCurrentPercentageEle.attr('data-default');
        returnsCurrentPercentageEle.val(returnsCurrentPercentageDef);

        var aspCurrentEle = $('#aspCurrent');
        var aspCurrentPercentageDef = aspCurrentEle.attr('data-default');
        aspCurrentEle.val(aspCurrentPercentageDef);
    });
});
function addCommas(input){
    // If the regex doesn't match, `replace` returns the string unmodified
    return (input.toString()).replace(
        // Each parentheses group (or 'capture') in this regex becomes an argument
        // to the function; in this case, every argument after 'match'
        /^([-+]?)(0?)(\d+)(.?)(\d+)$/g, function(match, sign, zeros, before, decimal, after) {

            // Less obtrusive than adding 'reverse' method on all strings
            var reverseString = function(string) { return string.split('').reverse().join(''); };

            // Insert commas every three characters from the right
            var insertCommas  = function(string) {

                // Reverse, because it's easier to do things from the left
                var reversed           = reverseString(string);

                // Add commas every three characters
                var reversedWithCommas = reversed.match(/.{1,3}/g).join(',');

                // Reverse again (back to normal)
                return reverseString(reversedWithCommas);
            };

            // If there was no decimal, the last capture grabs the final digit, so
            // we have to put it back together with the 'before' substring

            var number =  sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
            return number;
        }
    );
}

function clean_num(num){
    if(num){
        var new_num = Number(num.replace(/[$,%]/g, ""));
        if(isNaN(new_num)){
            return 0;
        }else{
            return new_num;
        }
    }else{
        return 0;
    }


}

function addDecimal(keyCode,input) {
    var numberStr;
    if (keyCode !== 37 || keyCode !== 39) {
        //do noting if left or right arrow keys pressed
        var cl_num = clean_num(input);

        // if decimal or period pressed a             // if number has  decimal
        if ((keyCode == 190 || keyCode == 110 ) && (input.indexOf('.') != -1)){
            console.log("decimal");
            numberStr = addCommas(cl_num) + ".";
            // if 0 is pressed                      //if number has decimal
        } else if ((keyCode == 96 || keyCode == 48 ) && (input.indexOf('.00') != -1)) {
            console.log("0 pressed");
            numberStr = addCommas(cl_num) + ".00" ;
        } else if ((keyCode == 96 || keyCode == 48 ) && (input.indexOf('.0') != -1)) {

            numberStr = addCommas(cl_num) + ".0";
        }else if(( keyCode ==8 || keyCode == 46) && (input.match(/\.$|\.%$/)) )  {

            numberStr = addCommas(cl_num) + ".";
        }else if (( keyCode ==8 || keyCode == 46) && (input.match(/\.0$|\.0%$/))) {

            numberStr = addCommas(cl_num) + ".0";
        }else if ((keyCode ==8 || keyCode == 46 ) &&(input.match(/\.00$|\.00%$/))) {

            numberStr = addCommas(cl_num) + ".00";
        }else{
            numberStr = addCommas(cl_num);
        }
        return numberStr
    }
}

/*
 function formatDollarDefaultValue () {
 if (event.value == "") {
 event.target.display = display.noPrint;
 event.value = '$0';
 } else {
 event.target.display = display.visible;
 event.value = "$" + event.value;
 }
 }

 function formatLeadsDefaultValue () {
 if (event.value == "") {
 event.target.display = display.noPrint;
 event.value = '0';
 } else {
 event.target.display = display.visible;
 }
 }

 function formatPercentageDefaultValue () {
 if (event.value == "") {
 event.target.display = display.noPrint;
 event.value = '0%';
 } else {
 event.target.display = display.visible;
 event.value = event.value + "%";
 }
 }

 formatDollarDefaultValue ()
 event.value=AFMakeNumber(getField("ClosingCurrent").value)*((AFMakeNumber(getField("BinauralCurrentPercentage").value)/100) + 1)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("ClosingFuture").value)*((AFMakeNumber(getField("BinauralFuturePercentage").value)/100) + 1)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("CallsCurrent").value)*(AFMakeNumber(getField("BookedCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("CallsFuture").value)*(AFMakeNumber(getField("BookedFuturePercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("LeadsCurrent").value)*(AFMakeNumber(getField("CallsCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("LeadsFuture").value)*(AFMakeNumber(getField("CallsFuturePercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("HLCurrent").value)*(AFMakeNumber(getField("ClosingCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("HLFuture").value)*(AFMakeNumber(getField("ClosingFuturePercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("TestedCurrent").value)*(AFMakeNumber(getField("HLCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("TestedFuture").value)*(AFMakeNumber(getField("HLFuturePercentage").value)/100)

 formatPercentageDefaultValue ()

 formatLeadsDefaultValue ()

 if (Number(event.value)<0) event.value = "0";
 event.value=AFMakeNumber(getField("TotalFuture").value)-AFMakeNumber(getField("TotalCurrent").value)
 event.value=AFMakeNumber(getField("BinauralCurrent").value)*(1 - (AFMakeNumber(getField("ReturnsCurrentPercentage").value)/100))
 event.value=AFMakeNumber(getField("BinauralFuture").value)*(1 - (AFMakeNumber(getField("ReturnsFuturePercentage").value)/100))

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("BookedCurrent").value)*(AFMakeNumber(getField("ShowedCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("BookedFuture").value)*(AFMakeNumber(getField("ShowedFuturePercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("ShowedCurrent").value)*(AFMakeNumber(getField("TestedCurrentPercentage").value)/100)

 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("ShowedFuture").value)*(AFMakeNumber(getField("TestedFuturePercentage").value)/100)
 formatPercentageDefaultValue ()
 event.value=AFMakeNumber(getField("ASPCurrent").value)*AFMakeNumber(getField("ReturnsCurrent").value)
 event.value=AFMakeNumber(getField("ASPFuture").value)*AFMakeNumber(getField("ReturnsFuture").value)
 */