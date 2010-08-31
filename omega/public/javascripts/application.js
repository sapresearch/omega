/**
 * @author I823626
 */


(function($) {
    function Timepicker() {

        this.timesformat = {
            24 : ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30',
                '06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
                '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30',
                '21:00','21:30','20:00','22:30','23:00','23:30'],
            ampm : ''
        };

        // run init once to create the timepicker div and append it to the body
        this.init = function() {
            var times_li = '';
            $.each(this.timesformat['24'], function(k, v) {

                var tp_li_id = v.replace(':', '');

                times_li += '<li id="tp_' + tp_li_id + '">' + v + '</li>'
            });
            var f = '<div id="time_picker">';
            f += times_li;
            f += '</ul>';
            f += '</div>';
            $('body').append(f);

        };

    }

    Timepicker.initialized = false;


    $.fn.timepicker = function() {

        if (!Timepicker.initialized && $(this).length != 0) {

            var tp = new Timepicker();

            tp.init();
            jQuery.fn.timepicker.defaults.initialized = true;
        }
        //cache ref
        var $timepicker = jQuery('#time_picker');

        // listen if the user clicks anywhere else besides the current timepicker and hide the picker
        $(document).mouseup(function(e) {
            var $t = jQuery(e.target);
            if ($timepicker.is(':visible')
                    && $t.parent()[0].id != 'time_picker'
                    && $t[0].id != 'time_picker'
                    && !$t.hasClass('tpickr')) {
                $timepicker.hide();
                $timepicker.scrollTop(0);


            }
        });
        // reference to the current timepicker
        var current;
        // insert the selected time from the list into the current timepicker field and hide the timepicker afterwards
        $timepicker.delegate('li', 'click', function() {
            var v = $(this).text();
            current.val(v);
            $timepicker.hide();

        });
        $timepicker.delegate('li', 'hover', function(e) {
            if (e.type == 'mouseover') {
                $(this).addClass('tpickr_li_over');
            } else {
                $(this).removeClass('tpickr_li_over');
            }
        });
        return this.each(function () {
            var jNode = $(this);


            jNode.bind('focus',
                      function(e) {
                          // get ref to the current element
                          current = $(e.target);
                          var tp_p = current.position();
                          var h = (tp_p.top + current.outerHeight() );
                          // check if there is another datepciker already opened
                          if ($timepicker.is(':visible')) {
                              $timepicker.hide();
                          }


                          $('#time_picker').css({ position:'absolute', left: tp_p.left, top:(h + 1), width: current.outerWidth() }).show();


                          var ct = new Date().getHours();
                          if (ct < 10) ct = "0" + ct;
                          var ct_id = $('#tp_' + ct + '00');
                          var t = Math.floor(ct_id.position().top);
                          if (t != 0) $timepicker.scrollTop(t);


                      });
            // listen for keydown in the input whether the user wants to insert custim values without the picker functionality
            jNode.bind('keydown', function() {
                $timepicker.hide();
            });

            return $(this)
        });


    };

    $.fn.timepicker.defaults = {
        initialized: false,
        scrolled: false
    }
})


        (jQuery);

$(function() {

    /**
     * menu
     */
    $("ul.subnav").parent().append("<span></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)

    $("#main_menu li span").mouseover(
                                     function() { //When trigger is clicked...

                                         //Following events are applied to the subnav itself (moving subnav up and down)
                                         $(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click

                                         $(this).parent().hover(function() {
                                         }, function() {
                                             $(this).parent().find("ul.subnav").slideUp('normal'); //When the mouse hovers out of the subnav, move it back up
                                         });

                                         //Following events are applied to the trigger (Hover events for the trigger)
                                     })
    $('ul.subnav').find('li').hover(function() {
        $(this).addClass("menu_li_hover"); //On hover over, add class "subhover"
    }, function() {    //On Hover Out
        $(this).removeClass("menu_li_hover"); //On hover out, remove class "subhover"
    });
    // end menu


    $("a[rel^='prettyPhoto']").prettyPhoto();


    $.datepicker.setDefaults({showAnim: '' });
    /**
     * visual highlight methods
     */
    $('fieldset input[type=text],fieldset input[type=password],textarea').focus(
                                                                               function() {
                                                                                   $(this).addClass('inputActive');
                                                                               }).blur(function() {
        $(this).removeClass('inputActive');
    });

    $('fieldset input,fieldset select').live('focus',
                                            function() {
                                                $(this).closest('fieldset').addClass('fieldset_active')
                                            }).live('blur', function() {
        $(this).closest('fieldset').removeClass('fieldset_active');
    });


    var search = $("#search");

    search.hover(function() {
        $(this).addClass("searchHover")
    }, function() {
        $(this).removeClass("searchHover")
    });
    $("#searchInput").focus(
                           function() {

                               search.addClass("searchActive")
                           }).blur(function() {
        search.removeClass("searchActive")
    });


    $('[data-link-to]').click(function() {
        location.href = $(this).attr('data-link-to');
    });


    var trigger = $('#trigger');
    var loginWrapper = $('#loginWrapper');
    var loginPanel = $('#loginPanel');

    //
    //    trigger.click(
    //                 function() {
    //
    //                     $('#ctlrBar a.btnLoginCtrl').toggle()
    //                 }).toggle(function() {
    //
    //        loginWrapper.show()
    //
    //
    //    }, function() {
    //
    //        loginWrapper.hide();
    //        $('#loginFailed').empty();
    //        $('#new_session input').not('input[type=submit]').val('')
    //
    //
    //    });
    //  init calandar plugin


    $("#new_session").bind("ajax:failure",
                          function(event, data, xhr, status, error) {
                              var erroMsg = '<span class="error">' + data[0] + '</span>';
                              $('#loginFailed').empty().append(erroMsg)

                          }).bind("ajax:success", function(event, data, status, xhr) {
        location = xhr.getResponseHeader("Location");
    });


    /**
     * customized drop_down
     */
    $(".drop_down dt a").live('click', function() {
        $(".drop_down dd ul").toggle();
    });
    $(".drop_down dd ul li a").live('click', function() {

        $(".drop_down dd ul").hide();

    });
    function getSelectedValue(id) {
        return id;
    }

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("drop_down"))
            $(".drop_down dd ul").hide();
    });


    $('.search_wrapper_l').hover(
                                function() {
                                    $(this).addClass('search_wrapper_hover');
                                },
                                function() {
                                    $(this).removeClass('search_wrapper_hover').find('input').blur();

                                }).find('input').focus(
                                                      function() {

                                                          $(this).val('').parent().removeClass('search_wrapper_hover').addClass('search_wrapper_focus');
                                                      }).blur(function() {
        $(this).val('Search..').parent().removeClass('search_wrapper_focus');
    });

});


