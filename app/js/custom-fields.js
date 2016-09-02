/**
 * Created by Spencer on 8/24/2016.
 */

var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');

$(document).ready(function() {
    /*** ADD NEW ROW ***/
    $(document).on('click', '.add-row', function() {
        // GET LAST CUSTOM LABEL COLUMN
        var newRowNum = 1;
        var lastLabelEle = $('.strategy_custom_label_cell').last().parent();
        var newLabelEle;
        var lastAnnbudgetEle;
        var newAnnbudgetEle;
        var lastAnnappEle;
        var newAnnappEle;
        var lastEcpappEle;
        var newEcpappEle;
        var lastPerbudgetEle;
        var newPerbudgetEle;
        if(lastLabelEle.length == 0) {
            lastLabelEle = $('.strategy_label_cell').last().parent();

            // ADD NEW CUSTOM LABEL COLUMN
            newLabelEle = lastLabelEle.clone().insertAfter(lastLabelEle).attr('class', 'cell-wrapper custom_label_' + newRowNum);
            var newLabelContent = '<div class="remove-row" data="1"><img src="images/remove-button.png" alt="Remove" /></div><div class="strategy_custom_label"><input type="text" id="strategy_custom_1_label" value="Custom Field 1" /></div>';
            newLabelEle.find('.strategy_label_cell').attr('class', 'tb_cell strategy_custom_label_cell').html(newLabelContent);

            // ADD NEW CUSTOM ANNUAL BUDGET COLUMN
            lastAnnbudgetEle = $('.strategy_annbudget_cell').last().parent();
            newAnnbudgetEle = lastAnnbudgetEle.clone().insertAfter(lastAnnbudgetEle);
            newAnnbudgetEle.find('.strategy_annbudget_cell').attr('class', 'tb_cell strategy_custom_annbudget_cell');
            newAnnbudgetEle.find('.strategy_annbudget_input').attr('id', 'strategy_custom_' + newRowNum + '_annbudget').val('');

            // ADD NEW CUSTOM ANNUAL APPOINTMENT GOAL COLUMN
            lastAnnappEle = $('.strategy_annapp_cell').last().parent();
            newAnnappEle = lastAnnappEle.clone().insertAfter(lastAnnappEle);
            newAnnappEle.find('.strategy_annapp_cell').attr('class', 'tb_cell strategy_custom_annapp_cell');
            newAnnappEle.find('.strategy_annapp_input').attr('id', 'strategy_custom_' + newRowNum + '_annapp').val('');

            // ADD NEW CUSTOM ESTIMATED COST PER APPOINTMENT COLUMN
            lastEcpappEle = $('.strategy_ecpapp_cell').last().parent();
            newEcpappEle = lastEcpappEle.clone().insertAfter(lastEcpappEle);
            newEcpappEle.find('.strategy_ecpapp_cell').attr('class', 'tb_cell strategy_custom_ecpapp_cell');
            newEcpappEle.find('.strategy_ecpapp_input').attr('id', 'strategy_custom_' + newRowNum + '_ecpapp').val('');

            // ADD NEW CUSTOM % OF BUDGET COLUMN
            lastPerbudgetEle = $('.strategy_perbudget_cell').last().parent();
            newPerbudgetEle = lastPerbudgetEle.clone().insertAfter(lastPerbudgetEle);
            newPerbudgetEle.find('.strategy_perbudget_cell').attr('class', 'tb_cell strategy_custom_perbudget_cell');
            newPerbudgetEle.find('.strategy_perbudget_input').attr('id', 'strategy_custom_' + newRowNum + '_perbudget').val('');
        } else {
            var lastLabelInput = lastLabelEle.find(':input');
            var lastLabelInputSplit = lastLabelInput.attr('id').split('_');
            var rowNum = lastLabelInputSplit[2];
            newRowNum = ++rowNum;

            // ADD NEW CUSTOM LABEL COLUMN
            newLabelEle = lastLabelEle.clone().insertAfter(lastLabelEle).attr('class', 'cell-wrapper custom_label_' + newRowNum);
            newLabelEle.find('.remove-row').attr('data', newRowNum);
            newLabelEle.find(':input').attr('id', 'strategy_custom_' + newRowNum + '_label').val('Custom Field ' + newRowNum);

            // ADD NEW CUSTOM ANNUAL BUDGET COLUMN
            lastAnnbudgetEle = $('.strategy_custom_annbudget_cell').last().parent();
            newAnnbudgetEle = lastAnnbudgetEle.clone().insertAfter(lastAnnbudgetEle);
            newAnnbudgetEle.find(':input').attr('id', 'strategy_custom_' + newRowNum + '_annbudget').val('');

            // ADD NEW CUSTOM ANNUAL APPOINTMENT GOAL COLUMN
            lastAnnappEle = $('.strategy_custom_annapp_cell').last().parent();
            newAnnappEle = lastAnnappEle.clone().insertAfter(lastAnnappEle);
            newAnnappEle.find(':input').attr('id', 'strategy_custom_' + newRowNum + '_annapp').val('');

            // ADD NEW CUSTOM ESTIMATED COST PER APPOINTMENT COLUMN
            lastEcpappEle = $('.strategy_custom_ecpapp_cell').last().parent();
            newEcpappEle = lastEcpappEle.clone().insertAfter(lastEcpappEle);
            newEcpappEle.find(':input').attr('id', 'strategy_custom_' + newRowNum + '_ecpapp').val('');

            // ADD NEW CUSTOM % OF BUDGET COLUMN
            lastPerbudgetEle = $('.strategy_custom_perbudget_cell').last().parent();
            newPerbudgetEle = lastPerbudgetEle.clone().insertAfter(lastPerbudgetEle);
            newPerbudgetEle.find(':input').attr('id', 'strategy_custom_' + newRowNum + '_perbudget').val('');

            // HIDE THE ADD ROW BUTTON SO WE ONLY ALLOW 2 CUSTOM ROWS
            $('.add-row').parent().parent().hide();
        }

        /* ADD NEW ROW TO APPOINTMENTS */
        // ADD NEW CUSTOM LABEL COLUMN
        var lastAppLabelEle = $('.appoint_custom_label_cell').last().parent();
        if(lastAppLabelEle.length == 0) {
            lastAppLabelEle = $('.appoint_label_cell').last().parent();
        }
        var newAppLabelEle = lastAppLabelEle.clone().insertAfter(lastAppLabelEle).attr('class', 'cell-wrapper custom_label_' + newRowNum);
        newAppLabelEle.children().children().html('Custom Field ' + newRowNum);

        // ADD NEW CUSTOM JAN COLUMN
        var lastAppJanEle = $('.appoint_custom_jan_cell').last().parent();
        if(lastAppJanEle.length == 0) {
            lastAppJanEle = $('.appoint_jan_cell').last().parent();
        }
        var newAppJanEle = lastAppJanEle.clone().insertAfter(lastAppJanEle);
        newAppJanEle.children().attr('class', 'tb_cell appoint_custom_jan_cell');
        newAppJanEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_jan').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM FEB COLUMN
        var lastAppFebEle = $('.appoint_custom_feb_cell').last().parent();
        if(lastAppFebEle.length == 0) {
            lastAppFebEle = $('.appoint_feb_cell').last().parent();
        }
        var newAppFebEle = lastAppFebEle.clone().insertAfter(lastAppFebEle);
        newAppFebEle.children().attr('class', 'tb_cell appoint_custom_feb_cell');
        newAppFebEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_feb').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM MAR COLUMN
        var lastAppMarEle = $('.appoint_custom_mar_cell').last().parent();
        if(lastAppMarEle.length == 0) {
            lastAppMarEle = $('.appoint_mar_cell').last().parent();
        }
        var newAppMarEle = lastAppMarEle.clone().insertAfter(lastAppMarEle);
        newAppMarEle.children().attr('class', 'tb_cell appoint_custom_mar_cell');
        newAppMarEle.children().children().children().attr('id', 'appoint_custom_'  + newRowNum + '_mar').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM APR COLUMN
        var lastAppAprEle = $('.appoint_custom_apr_cell').last().parent();
        if(lastAppAprEle.length == 0) {
            lastAppAprEle = $('.appoint_apr_cell').last().parent();
        }
        var newAppAprEle = lastAppAprEle.clone().insertAfter(lastAppAprEle);
        newAppAprEle.children().attr('class', 'tb_cell appoint_custom_apr_cell');
        newAppAprEle.children().children().children().attr('id', 'appoint_custom_'  + newRowNum + '_apr').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM MAY COLUMN
        var lastAppMayEle = $('.appoint_custom_may_cell').last().parent();
        if(lastAppMayEle.length == 0) {
            lastAppMayEle = $('.appoint_may_cell').last().parent();
        }
        var newAppMayEle = lastAppMayEle.clone().insertAfter(lastAppMayEle);
        newAppMayEle.children().attr('class', 'tb_cell appoint_custom_may_cell');
        newAppMayEle.children().children().children().attr('id', 'appoint_custom_'  + newRowNum + '_may').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM JUN COLUMN
        var lastAppJunEle = $('.appoint_custom_jun_cell').last().parent();
        if(lastAppJunEle.length == 0) {
            lastAppJunEle = $('.appoint_jun_cell').last().parent();
        }
        var newAppJunEle = lastAppJunEle.clone().insertAfter(lastAppJunEle);
        newAppJunEle.children().attr('class', 'tb_cell appoint_custom_jun_cell');
        newAppJunEle.children().children().children().attr('id', 'appoint_custom_'  + newRowNum + '_jun').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM JUL COLUMN
        var lastAppJulEle = $('.appoint_custom_jul_cell').last().parent();
        if(lastAppJulEle.length == 0) {
            lastAppJulEle = $('.appoint_jul_cell').last().parent();
        }
        var newAppJulEle = lastAppJulEle.clone().insertAfter(lastAppJulEle);
        newAppJulEle.children().attr('class', 'tb_cell appoint_custom_jul_cell');
        newAppJulEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_jul').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM AUG COLUMN
        var lastAppAugEle = $('.appoint_custom_aug_cell').last().parent();
        if(lastAppAugEle.length == 0) {
            lastAppAugEle = $('.appoint_aug_cell').last().parent();
        }
        var newAppAugEle = lastAppAugEle.clone().insertAfter(lastAppAugEle);
        newAppAugEle.children().attr('class', 'tb_cell appoint_custom_aug_cell');
        newAppAugEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_aug').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM SEP COLUMN
        var lastAppSepEle = $('.appoint_custom_sep_cell').last().parent();
        if(lastAppSepEle.length == 0) {
            lastAppSepEle = $('.appoint_sep_cell').last().parent();
        }
        var newAppSepEle = lastAppSepEle.clone().insertAfter(lastAppSepEle);
        newAppSepEle.children().attr('class', 'tb_cell appoint_custom_sep_cell');
        newAppSepEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_sep').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM OCT COLUMN
        var lastAppOctEle = $('.appoint_custom_oct_cell').last().parent();
        if(lastAppOctEle.length == 0) {
            lastAppOctEle = $('.appoint_oct_cell').last().parent();
        }
        var newAppOctEle = lastAppOctEle.clone().insertAfter(lastAppOctEle);
        newAppOctEle.children().attr('class', 'tb_cell appoint_custom_oct_cell');
        newAppOctEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_oct').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM NOV COLUMN
        var lastAppNovEle = $('.appoint_custom_nov_cell').last().parent();
        if(lastAppNovEle.length == 0) {
            lastAppNovEle = $('.appoint_nov_cell').last().parent();
        }
        var newAppNovEle = lastAppNovEle.clone().insertAfter(lastAppNovEle);
        newAppNovEle.children().attr('class', 'tb_cell appoint_custom_nov_cell');
        newAppNovEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_nov').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM DEC COLUMN
        var lastAppDecEle = $('.appoint_custom_dec_cell').last().parent();
        if(lastAppDecEle.length == 0) {
            lastAppDecEle = $('.appoint_dec_cell').last().parent();
        }
        var newAppDecEle = lastAppDecEle.clone().insertAfter(lastAppDecEle);
        newAppDecEle.children().attr('class', 'tb_cell appoint_custom_dec_cell');
        newAppDecEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_dec').attr('class', 'appoint_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM Q1 COLUMN
        var lastAppQ1Ele = $('.appoint_custom_q1_cell').last().parent();
        if(lastAppQ1Ele.length == 0) {
            lastAppQ1Ele = $('.appoint_q1_cell').last().parent();
        }
        var newAppQ1Ele = lastAppQ1Ele.clone().insertAfter(lastAppQ1Ele);
        newAppQ1Ele.children().attr('class', 'tb_cell appoint_custom_q1_cell');
        newAppQ1Ele.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_q1').attr('class', 'appoint_q1_input').val('');

        // ADD NEW CUSTOM Q2 COLUMN
        var lastAppQ2Ele = $('.appoint_custom_q2_cell').last().parent();
        if(lastAppQ2Ele.length == 0) {
            lastAppQ2Ele = $('.appoint_q2_cell').last().parent();
        }
        var newAppQ2Ele = lastAppQ2Ele.clone().insertAfter(lastAppQ2Ele);
        newAppQ2Ele.children().attr('class', 'tb_cell appoint_custom_q2_cell');
        newAppQ2Ele.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_q2').attr('class', 'appoint_q2_input').val('');

        // ADD NEW CUSTOM Q3 COLUMN
        var lastAppQ3Ele = $('.appoint_custom_q3_cell').last().parent();
        if(lastAppQ3Ele.length == 0) {
            lastAppQ3Ele = $('.appoint_q3_cell').last().parent();
        }
        var newAppQ3Ele = lastAppQ3Ele.clone().insertAfter(lastAppQ3Ele);
        newAppQ3Ele.children().attr('class', 'tb_cell appoint_custom_q3_cell');
        newAppQ3Ele.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_q3').attr('class', 'appoint_q3_input').val('');

        // ADD NEW CUSTOM Q4 COLUMN
        var lastAppQ4Ele = $('.appoint_custom_q4_cell').last().parent();
        if(lastAppQ4Ele.length == 0) {
            lastAppQ4Ele = $('.appoint_q4_cell').last().parent();
        }
        var newAppQ4Ele = lastAppQ4Ele.clone().insertAfter(lastAppQ4Ele);
        newAppQ4Ele.children().attr('class', 'tb_cell appoint_custom_q4_cell');
        newAppQ4Ele.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_q4').attr('class', 'appoint_q4_input').val('');

        // ADD NEW CUSTOM TOTAL APPOINTMENTS COLUMN
        var lastAppTaEle = $('.appoint_custom_total_appoint_cell').last().parent();
        if(lastAppTaEle.length == 0) {
            lastAppTaEle = $('.appoint_total_appoint_cell').last().parent();
        }
        var newAppTaEle = lastAppTaEle.clone().insertAfter(lastAppTaEle);
        newAppTaEle.children().attr('class', 'tb_cell appoint_custom_total_appoint_cell');
        newAppTaEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_total_appoint').attr('class', 'appoint_total_appoint_input').val('');

        // ADD NEW CUSTOM GOAL DIIFF COLUMN
        var lastAppGdEle = $('.appoint_custom_goal_diff_cell').last().parent();
        if(lastAppGdEle.length == 0) {
            lastAppGdEle = $('.appoint_goal_diff_cell').last().parent();
        }
        var newAppGdEle = lastAppGdEle.clone().insertAfter(lastAppGdEle);
        newAppGdEle.children().attr('class', 'tb_cell appoint_custom_goal_diff_cell');
        newAppGdEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_goal_diff').attr('class', 'appoint_goal_diff_input').val('');

        // ADD NEW CUSTOM BUDGET COLUMN
        var lastAppBudgetEle = $('.appoint_custom_budget_cell').last().parent();
        if(lastAppBudgetEle.length == 0) {
            lastAppBudgetEle = $('.appoint_budget_cell').last().parent();
        }
        var newAppBudgetEle = lastAppBudgetEle.clone().insertAfter(lastAppBudgetEle);
        newAppBudgetEle.children().attr('class', 'tb_cell appoint_custom_budget_cell');
        newAppBudgetEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_budget').attr('class', 'appoint_budget_input').val('');

        // ADD NEW CUSTOM ACTUAL ANNUAL COST COLUMN
        var lastAppAacEle = $('.appoint_custom_act_anncost_cell').last().parent();
        if(lastAppAacEle.length == 0) {
            lastAppAacEle = $('.appoint_act_anncost_cell').last().parent();
        }
        var newAppAacEle = lastAppAacEle.clone().insertAfter(lastAppAacEle);
        newAppAacEle.children().attr('class', 'tb_cell appoint_custom_act_anncost_cell');
        newAppAacEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_act_anncost').attr('class', 'appoint_act_anncost_input').val('');

        // ADD NEW CUSTOM COST PER APPOINTMENT COLUMN
        var lastAppCpaEle = $('.appoint_custom_act_costper_appoint_cell').last().parent();
        if(lastAppCpaEle.length == 0) {
            lastAppCpaEle = $('.appoint_act_costper_appoint_cell').last().parent();
        }
        var newAppCpaEle = lastAppCpaEle.clone().insertAfter(lastAppCpaEle);
        newAppCpaEle.children().attr('class', 'tb_cell appoint_custom_act_costper_appoint_cell');
        newAppCpaEle.children().children().children().attr('id', 'appoint_custom_' + newRowNum + '_act_costper_appoint').attr('class', 'appoint_act_costper_appoint_input').val('');

        /* ADD NEW ROW TO BUDGET */
        // ADD NEW CUSTOM LABEL COLUMN
        var lastBudLabelEle = $('.budget_custom_label_cell').last().parent();
        if(lastBudLabelEle.length == 0) {
            lastBudLabelEle = $('.budget_label_cell').last().parent();
        }
        var newBudLabelEle = lastBudLabelEle.clone().insertAfter(lastBudLabelEle).attr('class', 'cell-wrapper custom_label_' + newRowNum);
        newBudLabelEle.children().children().html('Custom Field ' + newRowNum);

        // ADD NEW CUSTOM JAN COLUMN
        var lastBudJanEle = $('.budget_custom_jan_cell').last().parent();
        if(lastBudJanEle.length == 0) {
            lastBudJanEle = $('.budget_jan_cell').last().parent();
        }
        var newBudJanEle = lastBudJanEle.clone().insertAfter(lastBudJanEle);
        newBudJanEle.children().attr('class', 'tb_cell budget_custom_jan_cell');
        newBudJanEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_jan').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM FEB COLUMN
        var lastBudFebEle = $('.budget_custom_feb_cell').last().parent();
        if(lastBudFebEle.length == 0) {
            lastBudFebEle = $('.budget_feb_cell').last().parent();
        }
        var newBudFebEle = lastBudFebEle.clone().insertAfter(lastBudFebEle);
        newBudFebEle.children().attr('class', 'tb_cell budget_custom_feb_cell');
        newBudFebEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_feb').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM MAR COLUMN
        var lastBudMarEle = $('.budget_custom_mar_cell').last().parent();
        if(lastBudMarEle.length == 0) {
            lastBudMarEle = $('.budget_mar_cell').last().parent();
        }
        var newBudMarEle = lastBudMarEle.clone().insertAfter(lastBudMarEle);
        newBudMarEle.children().attr('class', 'tb_cell budget_custom_mar_cell');
        newBudMarEle.children().children().children().attr('id', 'budget_custom_'  + newRowNum + '_mar').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM APR COLUMN
        var lastBudAprEle = $('.budget_custom_apr_cell').last().parent();
        if(lastBudAprEle.length == 0) {
            lastBudAprEle = $('.budget_apr_cell').last().parent();
        }
        var newBudAprEle = lastBudAprEle.clone().insertAfter(lastBudAprEle);
        newBudAprEle.children().attr('class', 'tb_cell budget_custom_apr_cell');
        newBudAprEle.children().children().children().attr('id', 'budget_custom_'  + newRowNum + '_apr').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM MAY COLUMN
        var lastBudMayEle = $('.budget_custom_may_cell').last().parent();
        if(lastBudMayEle.length == 0) {
            lastBudMayEle = $('.budget_may_cell').last().parent();
        }
        var newBudMayEle = lastBudMayEle.clone().insertAfter(lastBudMayEle);
        newBudMayEle.children().attr('class', 'tb_cell budget_custom_may_cell');
        newBudMayEle.children().children().children().attr('id', 'budget_custom_'  + newRowNum + '_may').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM JUN COLUMN
        var lastBudJunEle = $('.budget_custom_jun_cell').last().parent();
        if(lastBudJunEle.length == 0) {
            lastBudJunEle = $('.budget_jun_cell').last().parent();
        }
        var newBudJunEle = lastBudJunEle.clone().insertAfter(lastBudJunEle);
        newBudJunEle.children().attr('class', 'tb_cell budget_custom_jun_cell');
        newBudJunEle.children().children().children().attr('id', 'budget_custom_'  + newRowNum + '_jun').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM JUL COLUMN
        var lastBudJulEle = $('.budget_custom_jul_cell').last().parent();
        if(lastBudJulEle.length == 0) {
            lastBudJulEle = $('.budget_jul_cell').last().parent();
        }
        var newBudJulEle = lastBudJulEle.clone().insertAfter(lastBudJulEle);
        newBudJulEle.children().attr('class', 'tb_cell budget_custom_jul_cell');
        newBudJulEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_jul').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM AUG COLUMN
        var lastBudAugEle = $('.budget_custom_aug_cell').last().parent();
        if(lastBudAugEle.length == 0) {
            lastBudAugEle = $('.budget_aug_cell').last().parent();
        }
        var newBudAugEle = lastBudAugEle.clone().insertAfter(lastBudAugEle);
        newBudAugEle.children().attr('class', 'tb_cell budget_custom_aug_cell');
        newBudAugEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_aug').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM SEP COLUMN
        var lastBudSepEle = $('.budget_custom_sep_cell').last().parent();
        if(lastBudSepEle.length == 0) {
            lastBudSepEle = $('.budget_sep_cell').last().parent();
        }
        var newBudSepEle = lastBudSepEle.clone().insertAfter(lastBudSepEle);
        newBudSepEle.children().attr('class', 'tb_cell budget_custom_sep_cell');
        newBudSepEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_sep').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM OCT COLUMN
        var lastBudOctEle = $('.budget_custom_oct_cell').last().parent();
        if(lastBudOctEle.length == 0) {
            lastBudOctEle = $('.budget_oct_cell').last().parent();
        }
        var newBudOctEle = lastBudOctEle.clone().insertAfter(lastBudOctEle);
        newBudOctEle.children().attr('class', 'tb_cell budget_custom_oct_cell');
        newBudOctEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_oct').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM NOV COLUMN
        var lastBudNovEle = $('.budget_custom_nov_cell').last().parent();
        if(lastBudNovEle.length == 0) {
            lastBudNovEle = $('.budget_nov_cell').last().parent();
        }
        var newBudNovEle = lastBudNovEle.clone().insertAfter(lastBudNovEle);
        newBudNovEle.children().attr('class', 'tb_cell budget_custom_nov_cell');
        newBudNovEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_nov').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM DEC COLUMN
        var lastBudDecEle = $('.budget_custom_dec_cell').last().parent();
        if(lastBudDecEle.length == 0) {
            lastBudDecEle = $('.budget_dec_cell').last().parent();
        }
        var newBudDecEle = lastBudDecEle.clone().insertAfter(lastBudDecEle);
        newBudDecEle.children().attr('class', 'tb_cell budget_custom_dec_cell');
        newBudDecEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_dec').attr('class', 'budget_custom_' + newRowNum + '_mon_input').val('');

        // ADD NEW CUSTOM Q1 COLUMN
        var lastBudQ1Ele = $('.budget_custom_q1_cell').last().parent();
        if(lastBudQ1Ele.length == 0) {
            lastBudQ1Ele = $('.budget_q1_cell').last().parent();
        }
        var newBudQ1Ele = lastBudQ1Ele.clone().insertAfter(lastBudQ1Ele);
        newBudQ1Ele.children().attr('class', 'tb_cell budget_custom_q1_cell');
        newBudQ1Ele.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_q1').attr('class', 'budget_q1_input').val('');

        // ADD NEW CUSTOM Q2 COLUMN
        var lastBudQ2Ele = $('.budget_custom_q2_cell').last().parent();
        if(lastBudQ2Ele.length == 0) {
            lastBudQ2Ele = $('.budget_q2_cell').last().parent();
        }
        var newBudQ2Ele = lastBudQ2Ele.clone().insertAfter(lastBudQ2Ele);
        newBudQ2Ele.children().attr('class', 'tb_cell budget_custom_q2_cell');
        newBudQ2Ele.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_q2').attr('class', 'budget_q2_input').val('');

        // ADD NEW CUSTOM Q3 COLUMN
        var lastBudQ3Ele = $('.budget_custom_q3_cell').last().parent();
        if(lastBudQ3Ele.length == 0) {
            lastBudQ3Ele = $('.budget_q3_cell').last().parent();
        }
        var newBudQ3Ele = lastBudQ3Ele.clone().insertAfter(lastBudQ3Ele);
        newBudQ3Ele.children().attr('class', 'tb_cell budget_custom_q3_cell');
        newBudQ3Ele.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_q3').attr('class', 'budget_q3_input').val('');

        // ADD NEW CUSTOM Q4 COLUMN
        var lastBudQ4Ele = $('.budget_custom_q4_cell').last().parent();
        if(lastBudQ4Ele.length == 0) {
            lastBudQ4Ele = $('.budget_q4_cell').last().parent();
        }
        var newBudQ4Ele = lastBudQ4Ele.clone().insertAfter(lastBudQ4Ele);
        newBudQ4Ele.children().attr('class', 'tb_cell budget_custom_q4_cell');
        newBudQ4Ele.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_q4').attr('class', 'budget_q4_input').val('');

        // ADD NEW CUSTOM BUDGET TOTAL COLUMN
        var lastBudTotEle = $('.budget_custom_tot_cell').last().parent();
        if(lastBudTotEle.length == 0) {
            lastBudTotEle = $('.budget_tot_cell').last().parent();
        }
        var newBudTotEle = lastBudTotEle.clone().insertAfter(lastBudTotEle);
        newBudTotEle.children().attr('class', 'tb_cell budget_custom_tot_cell');
        newBudTotEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_tot').attr('class', 'budget_budget_total').val('');

        // ADD NEW CUSTOM BUDGET TOTAL COLUMN
        var lastBudDifEle = $('.budget_custom_diff_cell').last().parent();
        if(lastBudDifEle.length == 0) {
            lastBudDifEle = $('.budget_diff_cell').last().parent();
        }
        var newBudDifEle = lastBudDifEle.clone().insertAfter(lastBudDifEle);
        newBudDifEle.children().attr('class', 'tb_cell budget_custom_diff_cell');
        newBudDifEle.children().children().children().attr('id', 'budget_custom_' + newRowNum + '_diff').attr('class', 'budget_budget_diff').val('');
    });

    /*** REMOVE CUSTOM ROW ***/
    $(document).on('click', '.remove-row', function() {
        var rowNum = $(this).attr('data');

        // REMOVE LABEL CELLS
        $('.custom_label_' + rowNum).remove();


        // REMOVE REST OF CELLS
        $(document).find('[id*="_' + rowNum + '_"]').each(function() {
            $(this).val('0').trigger('keyup').delay(10).parent().parent().parent().remove();
        });

        // SHOW THE ADD ROW BUTTON
        $('.add-row').parent().parent().show();
    });

    /*** UPDATE CUSTOM LABELS ***/
    $(document).on('keyup', '.strategy_custom_label :input', function() {
        var value = $(this).val();
        var split = $(this).attr('id').split('_');
        var rowNum = split[2];

        $('.custom_label_' + rowNum).each(function() {
            if($(this).children().attr('class') !== 'tb_cell strategy_custom_label_cell') {
                $(this).children().children().html(value);
            }
        });
    });
});