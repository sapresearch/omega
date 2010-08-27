/**
 * @author I823626
 */


$(function() {

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
    if ($('#create_new_contact').is(':checked')) {
        $('#position_exisiting_contact').hide();
        $('#new_contact').show();
    }


    var v = $scheduler.find('input:radio:checked').val();
    $scheduler.find('#' + v + '_schedule').show();


    $scheduler.find('input[name="volunteering_position[schedule_attributes][schedule_type]"]').change(function() {

        var v = $(this).val();
        $scheduler.find('.hide').hide();
        $scheduler.find('#' + v + '_schedule').show();
    });

    $vp_contact.find('input[name="volunteering_position[contact]"]').change(function() {
        var v = $(this).val();
        $vp_contact.find('.hide').hide();
        if (v == "new contact") {
            $vp_contact.find('#position_new_contact').show();
        } else if (v == "existing contact") {
            $vp_contact.find('#position_exisiting_contact').show();
        }

    });

    $('#wst').find('input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {

            $(this).parent().siblings('td').find('input').attr('disabled', '')
        } else {
            $(this).parent().siblings('td').find('input').attr('disabled', 'disabled').val('')
        }

    });


});

