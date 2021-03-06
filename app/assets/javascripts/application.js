// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require thirdParty/jquery
//= require thirdParty/jquery-ui
//= require rails
//= require thirdParty/jquery.tipsy
//= require thirdParty/jquery.dataTables.min.js
//= require ui_util

/* Overlay layer for notifications and ajax request notifications*/
jQuery.showFlash = function(msg, n) {
    var msg_div = $('#notification-flash-wrapper');
    msg_div.find('div').html(msg);
    msg_div.css('top', ($(window).height() / 4) + 'px');
    if (n === 'ajax') {

        msg_div.fadeIn('fast');
    } else if (n === undefined) {

        msg_div.fadeIn('fast').delay(2000).fadeOut();
    }

    $(window).resize(function() {
        msg_div.css('top', ($(window).height() / 4) - (msg_div.height() / 4) + 'px');
    });
};

/* jquery plugin for tooltips - default settings */
$.fn.tipsy.defaults = {
    delayIn: 0,      // delay before showing tooltip (ms)
    delayOut: 0,     // delay before hiding tooltip (ms)
    fade: false,     // fade tooltips in/out?
    fallback: '',    // fallback text to use when no tooltip text
    gravity: 's',    // gravity
    html: false,     // is tooltip content HTML?
    live: false,     // use live event support?
    offset: 0,       // pixel offset of tooltip from element
    opacity: 0.8,    // opacity of tooltip
    title: function() {
        return this.getAttribute('data-tooltip')
    },  // attribute/callback containing tooltip text
    trigger: 'hover' // how tooltip is triggered - hover | focus | manual
};


/* dom ready! here we go */

jQuery(function($) {
    /* Bug fix  for empty ajax response */
    jQuery.ajaxSetup({ dataFilter: function(data, type) {
        return (!data || jQuery.trim(data) == '') ? '{}' : data;
    } });

    /* Nested attribues support for rails*/
    $('form a[data-new-nested]').live('click', function () {
        var association = $(this).attr('data-new-nested');
        var template = $('#' + association + '_fields_template').html();
        var new_id = new Date().getTime();
        var content = template.replace(/_ID_/g, new_id);
        var fields = $(content).insertBefore($(this));
        fields.siblings('input[name*=_template]').remove();
        return false;
    });

    // Use live('click') to fire for new nested fields' remove link
    $('form a[data-remove-nested]').live('click', function() {
        // There is a hidden input called _destroy for each nested item, set it to true to tell rails to destroy
        var _destroy_field = $(this).prev('input[name*=_destroy]').val('true');

        $(this).parent().hide();
        return false;
    });
    /* End Nested attribues */

    /* Applicationwide - tooltip */
    $('span[data-tooltip]').tipsy({live:true});
    $('a[data-tooltip]').tipsy({live:true}); // make it live for ajax. changed on 2011-7-15
    $('form').find('input[data-tooltip],textarea[data-tooltip] ').tipsy({gravity: 'w',
        trigger : 'focus'
    });
    /* bind default beahvior for ajax calls */
    $('#notification-flash-wrapper').bind("ajaxSend",
                                         function() {
                                             $.showFlash('Loading', 'ajax')
                                         }).bind("ajaxComplete",
                                                function() {
                                                    $(this).fadeOut();
                                                    $(".tipsy").remove();
                                                }).bind("ajaxError", function(e, xhr, settings, exception) {

        $.showFlash('Error :' + xhr.responseText)  // for development
        //dialog_message('general_message', 'Not able to process', '<p>An error has occurred. Please check your input again, or contact your administrator.</p>', {width:300}) // for production

    });

    /* menu */

    $("ul#topnav li a").mouseover(function() { //Hover over event on list item

        $(this).parent().find("div").delay(200).slideDown('slow'); //Show the subnav
        $(this).parent().find("#services_nested_menu_ul_root").delay(200).slideDown('slow'); //special case for services
    });

    $("ul#topnav li").mouseleave(function() {

        $(this).find("div").slideUp('fast'); //Hide the subnav
        $(this).find("#services_nested_menu_ul_root").slideUp('fast'); //special case for services
    });

    /* jquerui datepicker defaults */
    $.datepicker.setDefaults({showAnim: '',
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '2010:2020'});


    $('[data-link-to]').click(function() {
        location.href = $(this).attr('data-link-to');
    });

    /* jquery selector caching */
    var trigger = $('#trigger');
    var loginWrapper = $('#loginWrapper');


    loginWrapper.dialog({
        resizable: false,
        modal   : true,
        autoOpen: false,
        title   : 'Login',
        width   : 500,
        buttons: {
            Login: function() {
                $('#new_session').submit();
            },
            Cancel: function() {
            	$(this).dialog( "close" );
            }
	}
    });


    trigger.click(function() {
        loginWrapper.dialog('open');
        $('#session_username').focus();
    });


    $('#right').find('div.sidebar-menu-content li:last-child').addClass('menu-li-last-divider');


});

