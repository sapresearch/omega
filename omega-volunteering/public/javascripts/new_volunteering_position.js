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
    $('.tpickr').timepicker();


    $('#new_volunteering_position').find(".datepickr").datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '2010:2020'
    });


    var $recurrent = $('#volunteering_position_recurrence');
    var $scheduler = $('#scheduler');
    var $vp_contact = $('#vp_contact');

    $recurrent.click(function() {
        if ($(this).is(':checked')) {
            $('#scheduler').slideDown('fast');
            $('#non_recurrent').slideUp('fast');
        } else {
            $('#scheduler').slideUp('fast');
            $('#non_recurrent').slideDown('fast');

        }

    });
    $('#create_new_contact').change(function() {
        if ($(this).is(':checked')) {
            $('#position_exisiting_contact').hide();
            $('#new_contact').show();
        } else {
            $('#new_contact').hide();
            $('#position_exisiting_contact').show();
        }

    });

    // restore the dom states on page refresh
    if ($recurrent.is(':checked')) {
        $('#scheduler').show();
        $('#non_recurrent').hide();

    }


    var v = $scheduler.find('input:radio:checked').val();
    $scheduler.find('#' + v + '_schedule').show();


    $scheduler.find('input[name="volunteering_position[schedule_attributes][schedule_type]"]').change(function() {

        var v = $(this).val();
        $scheduler.find('.hide').hide();
        $scheduler.find('#' + v + '_schedule').show();
    });

    $vp_contact.find('input[name="contact_assignment"]').change(function() {
        var v = $(this).val();
        $vp_contact.find('.hide').hide();
        if (v == "new") {
            $vp_contact.find('#position_new_contact').show();
        } else if (v == "existing") {
            $vp_contact.find('#position_exisiting_contact').show();
        }

    });
    if ($('#contact_assignment_existing').is(':checked')) {

        $('#position_exisiting_contact').show();

    } else if ($('#contact_assignment_new').is(':checked')) {

        $('#position_new_contact').show();
    }


    $('#wst').find('input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {

            $(this).parent().siblings('td').find('input').attr('disabled', '')
        } else {
            $(this).parent().siblings('td').find('input').attr('disabled', 'disabled').val('')
        }

    });

    // selector caching
    var $assigned_contacts = $('#assigned_contacts');
    var $vp_contact_id = $('#volunteering_position_contact_ids');


    $("#ac_contacts").autocomplete('/contacts/autocomplete.psv', {
        multiple: true,
        formatItem: function(data, i, n, value) {
            return '<img src="/images/user.png"/> ' + value;
        }
    }).result(function(e, data) {
        $(this).val('');
        $('<li />').append(data[0] + '<a href="javascript:void(0)" class="delete-user"> X</a>').appendTo($assigned_contacts).data('cid', data[1]);

        update_cid_values()

    });

    $assigned_contacts.find('.delete-user').live('click', function(e) {
        $(this).parent('li').remove();
        update_cid_values();

    });
    /**
     * update #assigned_contacts hidden field with the values from the assigned contact list
     * the corresponding contact id is stored in the dom with the $.data method
     * on update action (add or remove) we iterate over the list items and build a string which cointains all the cids from li elements
     */
    function update_cid_values() {
        var serialized_cids = '', separator = '';
        $assigned_contacts.find('li').each(function() {
            serialized_cids += separator + $(this).data('cid');
            separator = ',';
        });
        $vp_contact_id.val(serialized_cids);
    }
});

