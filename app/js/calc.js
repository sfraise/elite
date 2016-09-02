/**
 * Created by Dan on 8/9/2016.
 */
var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');




$(document).ready(function(){
    // VALIDATE ONLY NUMBERS, COMMAS, DECIMALS, BACKSPACE, TAB, DELETE AND LEFT/RIGHT ARROWS USED IN INPUTS
    $('#start-last-year-revenue, .goals_input , .strategy_annbudget_input , #view_budget input , #view_appointments input').on('keydown', function(e) {
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

    $('#start-last-year-revenue').on("keyup", function(){
        var number = $(this).val();
        var cl_num = clean_num(number);
        if (cl_num > 0 ) {
            $(this).val('$' + addCommas(cl_num));
            $('#last_rev').val('$' + addCommas(cl_num))
        }
    });

//*** GOALS VIEW ***//

    $('.goals_input').on("focus",function(){
        var inputData = $(this).attr('id');
        //console.log(inputData);
    });

    $('#last_rev').on("keyup", function(e){
        //do noting if left or right arrow keys pressed
        if(e.keyCode !== 37 || e.keyCode !== 39) {
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);
            $(this).val('$' + decimalNum);
        }
    });

    $('#annual_rev_goal').on("keyup", function(e){
        var revenue_goal = $(this).val();
        var revenue = clean_num(revenue_goal);
        var rev_percentage = $('#percent_revenue').val();
        var percent = clean_num(rev_percentage);
        var mark_budget = (revenue * percent/100);
        mark_budget = Math.round(mark_budget * 100) / 100;


        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        $('#total_mark_budget').val('$'+ addCommas(mark_budget));

        budgetTotalColumns();
        strategyRemainingBudget();
    });

    $('#percent_revenue').on("keyup", function(e){
        var revenue_goal = $('#annual_rev_goal').val();
        var revenue = clean_num(revenue_goal);
        var rev_percentage = $(this).val();
        var percent = clean_num(rev_percentage);

        var mark_budget = (revenue * percent/100);
        mark_budget = Math.round(mark_budget * 100) / 100;

        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val(decimalNum + "%");
        }

        $('#total_mark_budget').val('$' + addCommas(mark_budget));

        strategyRemainingBudget();
    });
    $('#total_mark_budget').on("keyup", function(e){
        var revenue_goal = $('#annual_rev_goal').val();
        var revenue = clean_num(revenue_goal);
        var marketing_budget = $('#total_mark_budget').val();
        var budget = clean_num(marketing_budget);
        var percent = (budget * 100 / revenue);
        percent = Math.round(percent * 10) / 10;

        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        $('#percent_revenue').val((percent)+'%');
        strategyRemainingBudget();
    });

    $('#op_eff_rev').on("keyup", function(e) {
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }

    });


    $('#rev_mark_act').on("keyup", function(e) {
        var rev_marketing = $(this).val();
        var revenue = clean_num(rev_marketing);
        var sel_price = $('#avg_sel_price').val();
        var price = clean_num(sel_price);
        if (price > 0) {
            var unit_sales = revenue / price;
        }else{
            unit_sales = 0
        }
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        $('#unit_sales').val(unit_sales);
        $('#avg_sel_price').trigger('keyup');
    });

    $('#avg_sel_price').on("keyup", function(e) {
        var rev_marketing = $('#rev_mark_act').val();
        var revenue = clean_num(rev_marketing);
        var sel_price = $(this).val();
        var price = clean_num(sel_price);
        if (price > 0) {
            var unit_sales = revenue / price;
            unit_sales = Math.round(unit_sales)
        }else{
            var unit_sales = 0
        }
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        $('#unit_sales').val(unit_sales);
        $('#close_rate').trigger('keyup');

    });
    $('#close_rate').on("keyup", function(e) {
        var unit_sales = $('#unit_sales').val();

        var close_rate = $(this).val();
        var rate = clean_num(close_rate);

        if (unit_sales > 0) {
            var appointments = unit_sales / (rate / 100);
            appointments = Math.round(appointments)
        }else{
            var appointments = 0
        }
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val(decimalNum + '%');
        }
        $('#appointments').val(appointments);
        $('#leads').val( appointments * 2);
    });


//*** STRATEGY VIEW ***//


    $(document).on('keyup','.strategy_annbudget_input',function(e){
        var this_id = $(this).attr('id');
        var item = this_id.replace('strategy_','').replace('_annbudget', '');

        //do noting if left or right arrow keys pressed
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        $('#appoint_' + item + '_budget').val('$' + decimalNum);
        totalAnnualBudget(item);
        totalPercent();
        budgetItemTotal(item);
        budgetAllMonths();
        budgetTotalColumns();
        budgetTotalTotal();
        strategyEcpItemTotal(item);
        strategyEcpTotal();
        strategyRemainingBudget();
        appointTotalBudget();


    });

    $(document).on('keyup','.strategy_annapp_input',function(e){
        var this_id = $(this).attr('id');
        var item = this_id.replace('strategy_','').replace('_annapp', '');
        //totalAnnualBudget();
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val(decimalNum);
        }
        var total = 0;
        $('.strategy_annapp_input').each(function(index, elem){
            var number = $(elem).val();
            var cl_num = clean_num(number);

            total = total + cl_num;
            total = Math.round(total * 100) / 100;
            $('#strategy_total_annapp').val( addCommas(total));
        });

        goalDiff(item);
        strategyEcpItemTotal(item);
        strategyEcpTotal();
        totalPercent();
    });


//*** BUDGET VIEW ***//

    $(document).on('keyup','#view_budget input',function(e){

        var this_id = $(this).attr('id');
        var this_val = $(this).val();
        var mon = this_id.substr(this_id.length - 3);

        var this_class = $(this).attr('class');

        var item = this_class.replace('budget_','').replace('_mon_input', '');

        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }

        budgetItemTotal(item);
        budgetMonthTotal(mon);
        budgetTotalColumns();
        budgetTotalTotal();
        appointTotalBudget();
    });


//** APPIONTSMENT VIEW **/

    $(document).on('keyup','#view_appointments .col_2 input', function(e){
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else {
            var this_id = $(this).attr('id');

            var mon = this_id.substr(this_id.length - 3);

            var this_class = $(this).attr('class');
            var item = this_class.replace('appoint_', '').replace('_mon_input', '');

            if(e.keyCode == 37 || e.keyCode == 39) {
                //do noting if left or right arrow keys pressed
            }else{
                var number = $(this).val();
                var decimalNum = addDecimal(e.keyCode,number);

                $(this).val(decimalNum);
            }
            appointMonthTotal(mon);
            totalItemAppointments(item);
            goalDiff(item);
            appointTotalTotal();
            appointTotalDiff();
            appointCostPerApp(item);
        }

    });

    $(document).on('keyup','#view_appointments .col_6 input', function(e){
        var this_id = $(this).attr('id');
        var item = this_id.replace('appoint_', '').replace('_act_anncost', '');
        if(e.keyCode == 37 || e.keyCode == 39) {
            //do noting if left or right arrow keys pressed
        }else{
            var number = $(this).val();
            var decimalNum = addDecimal(e.keyCode,number);

            $(this).val('$' + decimalNum);
        }
        appointActAnncostTotal();
        appointTotalDiff();
        appointCostPerApp(item);
    });



});


//*** FUNCTIONS ***//

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
            numberStr = addCommas(cl_num) + ".";

            // if 0 is pressed                      //if number has decimal
        } else if ((keyCode == 96 || keyCode == 48 ) && (input.indexOf('.00') != -1) ) {
            numberStr = addCommas(cl_num) + ".00" ;
        } else if ((keyCode == 96 || keyCode == 48 ) && (input.indexOf('.0') != -1) )  {

            numberStr = addCommas(cl_num) + ".0";
        }else if(( keyCode ==8 || keyCode == 46) && (input.match(/\.$|\.%$/)) )  {

            numberStr = addCommas(cl_num) + ".";
        }else if (( keyCode ==8 || keyCode == 46) && (input.match(/\.0$|\.0%$/))) {

            numberStr = addCommas(cl_num) + ".0";
        }else if ((keyCode ==8 || keyCode == 46 ) &&(input.match(/\.00$|\.00%$/))) {

            numberStr = addCommas(cl_num) + ".00";

        }else if(input.match(/\.[0-9][0-9][0-9]*$|\.[0-9][0-9][0-9]*%$/)){
            cl_num = Math.round(cl_num * 100)/100;
            numberStr = addCommas(cl_num);
        }else{
            numberStr = addCommas(cl_num);
        }

        return numberStr
    }
}

function totalAnnualBudget(item){
    var website = 0;
    var total = 0;
    var total_budget = clean_num($('#total_mark_budget').val());
    if (total_budget < 1){
        total_budget = 1;
    }
    $('.strategy_annbudget_input').each(function(index, elem){

        var number = $(elem).val();
        var cl_num = clean_num(number);

        total = total + cl_num;
        total = Math.round(total * 100) / 100;
        $('#strategy_total_annbudget').val("$" + addCommas(total));
    });

        var budget = $("#strategy_"+item+"_annbudget").val();
        budget = clean_num(budget);
        var mon_budget = budget / 12;
        mon_budget =  Math.round(mon_budget * 100)/100;
        $('.budget_'+ item + '_mon_input').val('$'+addCommas(mon_budget));

    var percent = budget / total_budget;
        percent = Math.round(percent * 1000)/10;
        $("#strategy_"+item+"_perbudget").val( percent + "%");



}

function strategyEcpItemTotal(item){



    var budget = $('#strategy_'+item+'_annbudget').val();
    var app_goal = $('#strategy_'+item+'_annapp').val();
    budget = clean_num(budget);
    app_goal = clean_num(app_goal);

    if (item == 'website' || item == 'seo'){

        var website_budget = clean_num($('#strategy_website_annbudget').val());
        var seo_budget = clean_num($('#strategy_seo_annbudget').val());
        budget = website_budget + seo_budget;
        app_goal = clean_num($('#strategy_website_annapp').val());

        item = 'website';

    }

    var ecpapp = 0;
    if (app_goal > 0 ) {
        ecpapp = Math.round(budget / app_goal * 100) / 100;
    }else{
        ecpapp = 0;
    }

    $('#strategy_'+item+'_ecpapp').val("$" + addCommas(ecpapp));
}

function totalPercent( ){
    var total = 0;
    $('.strategy_perbudget_input').each(function(index, elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);

        total = total + cl_num;
        total = Math.round(total * 100);
        total = total / 100;
        $('#strategy_total_perbudget').val( addCommas(total) + "%");
    });
}

function totalItemAppointments(item){
    var total_q1 = 0;
    var total_q2 = 0;
    var total_q3 = 0;
    var total_q4 = 0;

    $('.appoint_'+item+'_mon_input').each(function(index, elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        if (index >= 0 && index <= 2 ){
            total_q1 = total_q1 + cl_num;
        }else if (index >= 3 && index <= 5 ){
            total_q2 = total_q2 + cl_num;
        }else if (index >= 6 && index <= 8 ){
            total_q3 = total_q3 + cl_num;
        }else if (index >= 9 && index <= 11 ){
            total_q4 = total_q4 + cl_num;
        }

    });
    $('#appoint_'+item+'_q1').val(Math.round(total_q1*100)/100);
    $('#appoint_'+item+'_q2').val(Math.round(total_q2*100)/100);
    $('#appoint_'+item+'_q3').val(Math.round(total_q3*100)/100);
    $('#appoint_'+item+'_q4').val(Math.round(total_q4*100)/100);

    var total= total_q1 + total_q2 + total_q3 + total_q4;

    total = Math.round(total * 100);
    total = total / 100;
    //appoint_branding_total_appoint
    $('#appoint_'+item+'_total_appoint').val(total)
}

function strategyEcpTotal(){
    var total_ann_budget = $('#strategy_total_annbudget').val();
    total_ann_budget = clean_num(total_ann_budget);
    var total_app_goal = $('#strategy_total_annapp').val();
    total_app_goal = clean_num(total_app_goal);
    var total_ecp = 0;
    if (total_app_goal <= 0){
        total_ecp = 0;
    }else{
        total_ecp = total_ann_budget / total_app_goal;
    }
    total_ecp = Math.round(total_ecp * 100);
    total_ecp = total_ecp / 100;

    $('#strategy_total_ecpapp').val('$'+addCommas(total_ecp));
}

function goalDiff(item){
    var annual_appointments = $('#strategy_' + item + '_annapp').val();
    annual_appointments = clean_num(annual_appointments);
    var total_appointments = $('#appoint_'+item+'_total_appoint').val();
    total_appointments = clean_num(total_appointments);
    var diff = annual_appointments - total_appointments;
    var goalElem = $('#appoint_'+item+'_goal_diff');
    if (diff < 0 ){
        goalElem.css('color','green').val('+' + Math.abs(diff));
    }
    else if(diff > 0){
        goalElem.css('color','red').val('-' + diff);
    }
    else{
        goalElem.css('color','#545454').val(diff);
    }
}

function budgetItemTotal(item) {
    var total_q1 = 0;
    var total_q2 = 0;
    var total_q3 = 0;
    var total_q4 = 0;

    var ann_budget = $('#strategy_'+ item + '_annbudget').val();
    ann_budget = clean_num(ann_budget);

    $('.budget_' + item + '_mon_input').each(function (index, elem) {
        var number = $(elem).val();
        var cl_num = clean_num(number);
        if (index >= 0 && index <= 2) {
            total_q1 = total_q1 + cl_num;
        } else if (index >= 3 && index <= 5) {
            total_q2 = total_q2 + cl_num;
        } else if (index >= 6 && index <= 8) {
            total_q3 = total_q3 + cl_num;
        } else if (index >= 9 && index <= 11) {
            total_q4 = total_q4 + cl_num;
        }

    });
    $('#budget_' + item + '_q1').val("$" + addCommas(Math.round(total_q1*100)/100));
    $('#budget_' + item + '_q2').val("$" + addCommas(Math.round(total_q2*100)/100));
    $('#budget_' + item + '_q3').val("$" + addCommas(Math.round(total_q3*100)/100));
    $('#budget_' + item + '_q4').val("$" + addCommas(Math.round(total_q4*100)/100));

    var total = total_q1 + total_q2 + total_q3 + total_q4;

    total = Math.round(total * 100);
    total = total / 100;

    $('#budget_' + item + '_tot').val("$" + addCommas(total));

    var diff = ann_budget - total;
    diff = Math.round(diff * 100);
    diff = diff / 100;

    var diff_id = $('#budget_'+item+'_diff');

    if (diff < 0 ){
        diff_id.css('color','red').val('$'+addCommas(Math.abs(diff)));
    }
    else if(diff > 0){
        diff_id.css('color','green').val('$'+ addCommas(diff));
    }
    else{
        diff_id.css('color','#545454').val('$'+ addCommas(diff));

    }

    $('#appoint_'+ item + '_budget').val("$" + addCommas(total));
}

function budgetMonthTotal(month){
    var month_total = 0;
    $("#view_budget [id$= "+month+"]").each(function(index, elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        month_total = month_total + cl_num;

        $('#budget_'+month+'_total').val('$'+ addCommas(month_total) );
    });
}

function budgetTotalTotal(){

    var total_q1 = 0;
    var total_q2 = 0;
    var total_q3 = 0;
    var total_q4 = 0;

    $('.budget_total_mon_input').each(function(index,elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        if (index >= 0 && index <= 2 ){
            total_q1 = total_q1 + cl_num;
        }else if (index >= 3 && index <= 5 ){
            total_q2 = total_q2 + cl_num;
        }else if (index >= 6 && index <= 8 ){
            total_q3 = total_q3 + cl_num;
        }else if (index >= 9 && index <= 11 ){
            total_q4 = total_q4 + cl_num;
        }

    });
    $('#budget_total_q1').val('$'+addCommas(total_q1));
    $('#budget_total_q2').val('$'+addCommas(total_q2));
    $('#budget_total_q3').val('$'+addCommas(total_q3));
    $('#budget_total_q4').val('$'+addCommas(total_q4));

    var total= total_q1 + total_q2 + total_q3 + total_q4;

    total = Math.round(total * 100);
    total = total / 100;
    $('#budget_total_total_budget').val('$'+addCommas(total));
    var total_budget = clean_num($('#total_mark_budget').val());
    var diff = total_budget - total;
    diff = Math.round(diff * 100);
    diff = diff / 100;
    if (diff < 0 ){
        $('#budget_total_goal_diff').css('color','red').val('$'+addCommas(Math.abs(diff)));
    }
    else if(diff > 0){
        $('#budget_total_goal_diff').css('color','green').val('$'+ addCommas(diff));
    }
    else{
        $('#budget_total_goal_diff').css('color','white').val('$'+ addCommas(diff));

    }
}

function budgetTotalColumns(){

    // update total columns
    var tot_tot = 0;
    var diff_total_dirty =  $('#strategy_total_annbudget').val();
    var diff_total = clean_num(diff_total_dirty);
    $("#view_budget .totals [id$='total']").each(function(index, elem){

        var number = $(elem).val();
        var cl_num = clean_num(number);
        tot_tot = tot_tot + cl_num;

    });
        var diff = diff_total - tot_tot;
        diff = Math.round(diff * 100);
        diff = diff / 100;
        if (diff < 0 ){
            $('#tot_diff').css('color','green').val('+$'+addCommas(Math.abs(diff)));

        }
        else if(diff > 0){
            $('#tot_diff').css('color','red').val('-$'+ addCommas(diff));
        }
        else{
            $('#tot_diff').css('color','white').val('$'+ addCommas(diff));

        }
        tot_tot = Math.round(tot_tot * 100);
        tot_tot = tot_tot / 100;
        $('#tot_tot_budget').val( '$' + addCommas(tot_tot) );
}

function budgetAllMonths(){
    var months = [];
        months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    //update month total

    for ( var i = 0 ; i < months.length; i++) {
        var month_total = 0;
        $("[id$= " + months[i] + "]").each(function (index, elem) {
            var number = $(elem).val();
            var cl_num = clean_num(number);
            month_total = month_total + cl_num;
            month_total = Math.round(month_total * 100);
            month_total = month_total / 100;

            $('#budget_' + months[i] + '_total').val("$" + addCommas(month_total));
        });
    }
}

function appointActAnncostTotal(){
    var total = 0;
    $('.appoint_act_anncost_input').each(function(index, elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        total = total + cl_num;
    });
    total = Math.round(total * 100);
    total = total / 100;
    $('#appoint_total_act_anncost').val('$'+ addCommas(total));
}

function appointMonthTotal(month){
    //update month total
    var month_total = 0;
    $("#view_appointments [id$= "+month+"]").each(function(index, elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        month_total = month_total + cl_num;

        $('#appoint_'+month+'_total').val( addCommas(month_total) );
    });

}

function appointTotalTotal(){

    var total_q1 = 0;
    var total_q2 = 0;
    var total_q3 = 0;
    var total_q4 = 0;

    $('.appoint_total_mon_input').each(function(index,elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        if (index >= 0 && index <= 2 ){
            total_q1 = total_q1 + cl_num;
        }else if (index >= 3 && index <= 5 ){
            total_q2 = total_q2 + cl_num;
        }else if (index >= 6 && index <= 8 ){
            total_q3 = total_q3 + cl_num;
        }else if (index >= 9 && index <= 11 ){
            total_q4 = total_q4 + cl_num;
        }

    });
    $('#appoint_total_q1').val(addCommas(total_q1));
    $('#appoint_total_q2').val(addCommas(total_q2));
    $('#appoint_total_q3').val(addCommas(total_q3));
    $('#appoint_total_q4').val(addCommas(total_q4));

    var total= total_q1 + total_q2 + total_q3 + total_q4;

    total = Math.round(total * 100);
    total = total / 100;
    $('#appoint_total_total_appoint').val(addCommas(total));
}

function appointTotalDiff(){
    var appoint_goal = $('#strategy_total_annapp').val();
    appoint_goal = clean_num(appoint_goal);
    var appoint_total = $('#appoint_total_total_appoint').val();
    appoint_total = clean_num(appoint_total);
    var diff = appoint_goal - appoint_total;
    var goalElem = $('#appoint_total_goal_diff');
    if (diff < 0 ){
        goalElem.css('color','green').val('+' + Math.abs(diff));
    }
    else if(diff > 0){
        goalElem.css('color','red').val('-' + diff);
    }
    else{
        goalElem.css('color','white').val(diff);
    }
}

function appointTotalBudget(){
    var total = 0;
    $('.appoint_budget_input').each(function(index,elem){
        var number = $(elem).val();
        var cl_num = clean_num(number);
        total = total + cl_num;
    });
    total = Math.round(total * 100);
    total = total / 100;
    $('#appoint_total_budget').val('$'+ addCommas(total));
}

function appointCostPerApp(item){
    var total_appoint = $('#appoint_'+item+'_total_appoint').val();
    total_appoint = clean_num(total_appoint);
    var act_cost = $('#appoint_'+item+'_act_anncost').val();
    act_cost = clean_num(act_cost);

    if (item == "website" || item ==  "seo") {
        item = "website";
        var website_cost = $('#appoint_website_act_anncost').val();
        var seo_cost = $('#appoint_seo_act_anncost').val();
        act_cost = clean_num(website_cost) + clean_num(seo_cost);
    }

    var cost_per = 0;
    if (total_appoint <= 1 ){
        cost_per = act_cost;
    }else{
        cost_per = act_cost / total_appoint;
    }
    cost_per = Math.round(cost_per * 100);
    cost_per = cost_per / 100;

    $('#appoint_'+item+'_act_costper_appoint').val('$'+addCommas(cost_per));

    var total_total_appoint = $('#appoint_total_total_appoint').val();
    total_total_appoint = clean_num(total_total_appoint);
    var total_act_cost = $('#appoint_total_act_anncost').val();
    total_act_cost = clean_num(total_act_cost);
    var total_cost_per = 0;
    if (total_total_appoint <= 1 ){
        total_cost_per = total_act_cost;
    }else{
        total_cost_per = total_act_cost / total_total_appoint;
    }
    total_cost_per = Math.round(total_cost_per * 100);
    total_cost_per = total_cost_per / 100;

    $('#appoint_total_act_costper_appoint').val('$'+addCommas(total_cost_per));

}

function strategyRemainingBudget(){
    var total = $('#strategy_total_annbudget').val();
    total = clean_num(total);
    var budget = $('#total_mark_budget').val();
    budget = clean_num(budget);

    var remaining = budget - total;
    $('#remaining_budget').val('$'+addCommas(remaining));
}