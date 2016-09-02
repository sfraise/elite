/**
 * Created by Spencer on 8/14/2016.
 */

var remote = require('electron').remote;
var dialog = remote.dialog;
var fs = require('fs');
const BrowserWindow = require('electron').remote.BrowserWindow;

$(document).ready(function() {
    maximizeWindow();

    /*** WINDOW BUTTONS ***/
    $('#minimize-window').click(function() {
        minimizeWindow();
    });

    $('#maximize-window').click(function() {
        maximizeWindow();
    });

    $('.close-window').click(function() {
        closeWindow();
    });

    // SET MAXIMIZE BUTTON
    $(window).on('resize', function(){
        var isMaximized = BrowserWindow.getFocusedWindow().isMaximized();

        if(isMaximized == true){
            $('#window-max-col').attr('src','./images/collapse.png');
        } else {
            $('#window-max-col').attr('src','./images/maximize.png');
        }
    });

    /*** MENU BUTTONS (OPEN/SAVE ITEMS IN SAVE-OPEN.JS) ***/
    $('.home-button').click(function () {
        // TRANSITION TO HOME
        $('#inner_page_view').fadeOut();
        $('#start_view').fadeIn();

        $('.body-inner').css('height', 'calc(100vh - 28px)');
    });

    $('#main_header_menu_button').click(function() {
        var menu = $('#main_header_menu_items');
        var menuClose = $('#menu_close');
        var menuOpen = $('#menu_open');

        if(menu.is(':visible')) {
            menu.slideUp();
            menuClose.hide();
            menuOpen.show();
        } else {
            menu.slideDown();
            menuOpen.hide();
            menuClose.show();
        }
    });

    // HIDE MENU & TOOL TIPS WHEN CLICKING OFF ELEMENT
    var menuHandler = function(event){
        // if the target is a descendent of container do nothing
        if($(event.target).is(".main_header_menu, .main_header_menu *")) return;

        // remove event handler from document
        //$(document).off("click", handler);

        var menu = $('#main_header_menu_items');
        var menuClose = $('#menu_close');
        var menuOpen = $('#menu_open');

        if(menu.is(':visible')) {
            menu.slideUp();
            menuClose.hide();
            menuOpen.show();
        }
    };
    $(document).on("click", menuHandler);

    /*** TOGGLE BUTTON (monthly/quarterly) ***/
    /*
    $('.toggle_button_left').click(function() {
        $('.toggle_button_active').css('right', function(){
            return $(this).offset().right;
        }).animate({"right":"0px"}, "slow");
    });

    $('.toggle_button_right').click(function() {
        $('.toggle_button_active').css('left', function(){
            return $(this).offset().left;
        }).animate({"left":"0px"}, "slow");
    });
    */
    $('.toggle_button_left').click(function() {
        $('.toggle_button_left').css('color','#fff');

        $('.toggle_button_right').css('color','#aeaeae');

        $('.toggle_button_active').animate({'left':'0'}, '500');

        $('.quarterly').hide();
        $('.monthly').show();

        // SHOW SCROLL ARROWS
        $('.left-scroll, .right-scroll').show();
    });
    $('.toggle_button_right').click(function() {
        $('.toggle_button_right').css('color','#fff');

        $('.toggle_button_left').css('color','#aeaeae');

        $('.toggle_button_active').animate({'left':'50%'}, '500');

        $('.monthly').hide();
        $('.quarterly').show();

        // SHOW SCROLL ARROWS
        $('.left-scroll, .right-scroll').hide();
    });

    /*** TOOL TIPS ***/
    $('.tool-tip-icon').click(function() {
        var allContentEle = $('.tool-tip-content');
        var position = $(this).position();
        var contentEle = $(this).next('.tool-tip-content');
        var contentEleHeight = contentEle.height();
        var contentEleWidth = contentEle.width();

        // CLOSE PREVIOUS TOOL TIPS IF OPEN
        if(allContentEle.is(':visible')) {
            allContentEle.fadeOut();
        }

        // OPEN THIS TOOL TIP
        contentEle.fadeIn().css({
            'left' : position.left + 30,
            'top' : position.top - 15
        });

        var off = contentEle.offset();
        var t = off.top;
        var l = off.left;
        var h = contentEle.height();
        var w = contentEle.width();
        var docH = $(window).height();
        var docW = $(window).width();

        var isEntirelyVisible = (t > 0 && l > 0 && t + h < docH && l+ w < docW);
        console.log(isEntirelyVisible);

        if(isEntirelyVisible == false) {
            console.log('move');
            contentEle.css({
                'left' : position.left - contentEleWidth,
                'top' : position.top - (contentEleHeight + 30)
            });
        }
    });
    var toolTipHandler = function(event) {
        // if the target is a descendent of container do nothing
        if($(event.target).is(".info, .info *, .tool-tip-content, .tool-tip-content *")) return;

        var toolTipsEle = $('.tool-tip-content');

        if(toolTipsEle.is(':visible')) {
            toolTipsEle.fadeOut();
        }
    };
    $(document).on("click", toolTipHandler);

    $('.tt-close').click(function() {
        $(this).parent().fadeOut();
    });

    // BUDGET SCROLL
    $('.arrow-right').click(function() {
        var scrollEle = $('#scroll');
        var scrollToEle = $(".tb_quarterly_wrapper:last");
        var speed = 500;

        scrollTo(scrollEle, scrollToEle, speed, direction);
    });

    // APPOINTMENTS SCROLL NEXT
    $('.right-scroll').click(function() {
        var page =  $(this).attr('data');
        var eleCount = 1;
        $('#view_'+page+' .monthly_quarter').each(function() {
            if($(this).attr('data') == 'selected') {
                return false;
            } else {
                eleCount = ++eleCount;
            }
        });
        var scrollEle = $('.monthly');
        var selectedEle = $('#view_'+ page).find("[class*='monthly_quarter'][data='selected']");
        var scrollToEle = selectedEle.next();
        var scrollOffset = scrollToEle.width() * eleCount;
        var speed = 500;

        if(scrollToEle.length > 0) {
            // FIRE SCROLL FUNCTION
            scrollTo(scrollEle, scrollOffset, speed);

            // CHANGE SELECTED ATTRIBUTE
            selectedEle.attr('data', '');
            scrollToEle.attr('data', 'selected');

            // UPDATE ARROWS
            $('#view_'+page+' .left-scroll img').css({
                'opacity':'1',
                'cursor':'pointer'
            });

            if(scrollToEle.is(':last-child')) {
                $('#view_'+page+' .right-scroll img').css({
                    'opacity':'0.4',
                    'cursor':'auto'
                });
            }
        }
    });

    // APPOINTMENTS SCROLL PREVIOUS
    $('.left-scroll').click(function() {
        var page =  $(this).attr('data');
        var eleCount = 1;
        $('#view_'+page+' .monthly_quarter').each(function() {
            if($(this).attr('data') == 'selected') {
                return false;
            } else {
                eleCount = ++eleCount;
            }
        });
        var scrollEle = $('.monthly');
        var selectedEle = $('#view_'+ page).find("[class*='monthly_quarter'][data='selected']");
        var scrollToEle = selectedEle.prev();
        var scrollToWidth = scrollToEle.width();
        var scrollOffset = (scrollToWidth * eleCount) - (scrollToWidth * 2);

        var speed = 500;

        if(scrollToEle.length > 0) {
            // FIRE SCROLL FUNCTION
            scrollTo(scrollEle, scrollOffset, speed);

            // CHANGE SELECTED ATTRIBUTE
            selectedEle.attr('data', '');
            scrollToEle.attr('data', 'selected');

            // UPDATE ARROWS
            $('#view_'+page+' .right-scroll img').css({
                'opacity':'1',
                'cursor':'pointer'
            });

            if(scrollToEle.is(':first-child')) {
                $('#view_'+page+' .left-scroll img').css({
                    'opacity':'0.4',
                    'cursor':'auto'
                });
            }
        }
    });

    /* TODO - RESCROLL ON WINDOW RESIZE TO FIX OFFSET */

    $('.modal_link').click(function() {
        var data = $(this).attr('data');

        var content = $(document).find("[class*='modal_window_wrapper'][data='" + data + "']");

        content.fadeIn();
    });

    $('.modal_window_close').click(function() {
        $(this).parent().parent().parent().fadeOut();
    });

    /*** MODAL WINDOWS ***/
    $('.modal-button').click(function() {
        var data = $(this).attr('data');
        var modal = $(document).find("[class='modal-window'][data='" + data + "']");

        // CLOSE TOOL TIPS IF OPEN
        $('.tt-close').trigger('click');

        modal.fadeIn();
    });

    $('.modal-close').click(function() {
        var data = $(this).attr('data');
        var modal = $(document).find("[class='modal-window'][data='" + data + "']");

        modal.fadeOut();
    });


    //**** PRINT ****//


    $('.print-button ').click(function(){
        var menu = $('#main_header_menu_items');
        var menuClose = $('#menu_close');
        var menuOpen = $('#menu_open');

        if(menu.is(':visible')) {
            menu.hide();
            menuClose.hide();
            menuOpen.show();
        } else {
            menu.show();
            menuOpen.hide();
            menuClose.show();
        }
        var active_tab;
        $('.menu_tab').each(function(index, elem) {
            if ($(elem).is(':visible')){
                active_tab = $(elem).attr('id');
            }else{
                active_tab = 'view_goals';
            }
            $(elem).show()
        });
        //tab_title_right_wrapper
        var name = $('#start-company-name').val();
        var year = $('#start-plan-year').val();

        $('.tab_title_right_wrapper').append(
            '<div class = "print_title"><div class="print_name">'+ name +'</div><div class="print_year">'+ year +'</div></div>'
        );

        $('.body-inner').css('height', 'auto');
        window.print();
        $('.menu_tab').each(function(index, elem) {
            $(elem).hide();
        });
        $('.print_title').remove();

        if(active_tab) {
            $('#' + active_tab + '').css('display', 'block');
        }else{
            $('#view_goals').css('display', 'block');
        }
    });
});

function minimizeWindow() {
    var window = remote.getCurrentWindow();
    window.minimize();
}

function maximizeWindow() {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
}

function closeWindow() {
    var window = remote.getCurrentWindow();
    window.close();
}

function scrollTo(scrollEle, scrollOffset, scrollSpeed) {
    scrollEle.animate({
        scrollLeft: scrollOffset
    }, scrollSpeed);
}
