/**
 * @author I823626
 */


$(function() {

    $('.tpickr').timepicker();

    /* jqueryui datepicker defaults */
    $('#volunteer_position_form').find(".datepickr").datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '2010:2020'
    });


    // selector caching
    var $recurrent = $('input[name=volunteering_position[recurrence]]');
    var $scheduler = $('#scheduler');
    var $vp_contact = $('#vp_contact');

    $recurrent.change(function() {
        if ($(this).val() == 'true') {
            $('#non_recurrent').hide()
            $scheduler.slideDown('fast');

        } else {

            $scheduler.slideUp('fast');
            $('#non_recurrent').show();
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

    // restore the dom state on page refresh
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

    /* jqueryui autocomplete for contacts */
    $('#ac-contacts').autocomplete({
        source : '/contacts/autocomplete',
        minLength: 2,

        select: function(event, ui) {

            $(this).val('');
            $('<li />').append(ui.item.label + '<a href="javascript:void(0)" class="delete-user"> X</a>').appendTo($assigned_contacts).data('cid', ui.item.id);
            update_cid_values()
            return false;
        }

    });

    /**
     * when the form gets displayed again because  of errors we have to make sure that we restore the state as it was before
     */
    var contact_val = $('#volunteering_position_contact_ids').val();
    if (contact_val != "[]" && typeof contact_val != 'undefined' ) {

        var contacts = $('#volunteering_position_contact_ids').val().replace(/[\[\]']+/g, '').split(',');
        $.each(contacts, function(k, v) {
            $.ajax({
                global: false,
                url : '/contacts/' + v ,
                dataType : 'json',
                success: function(data) {
                    $('<li />').append(data.first_name + '<a href="javascript:void(0)" class="delete-user"> X</a>').appendTo($assigned_contacts).data('cid', data.id);
                    return false;
                }

            });
        })
    }


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
})
;

