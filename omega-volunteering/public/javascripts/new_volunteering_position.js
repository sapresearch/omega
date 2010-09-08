/**
 * @author I823626
 */


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
    if($('#contact_assignment_existing').is(':checked')){

        $('#position_exisiting_contact').show();

    } else if($('#contact_assignment_new').is(':checked')){

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
        $('<li />').append('<span class="om-icon-only om-icon-delete"></span>' + data[0]).appendTo($assigned_contacts).data('cid', data[1]);

        update_cid_values()

    });

    $assigned_contacts.find('.icon-delete').live('click', function(e) {
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

