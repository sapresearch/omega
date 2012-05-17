/**
 * @author I823626
 */

$(function(){
	$("div.ui-dialog").css({"left":"15%"});
});

$(function() {

    $('.tpickr').timepicker();
    $('.datepickr').datepicker({minDate: 0});

    /* jqueryui datepicker defaults */
    $('#volunteer_position_form').find(".datepickr").datepicker({ minDate: 0 });


    // selector caching
    var $recurrent = $('input[name="volunteering_position[recurrent]"]');
    var $scheduler = $('#scheduler');
    var $vp_contact = $('#vp_contact');

    $recurrent.change(function() {
        if ($(this).val() == 'true') {
            $('#non_recurrent').hide();
            $scheduler.slideDown('fast');

        } else {

            $scheduler.slideUp('fast');
            $('#non_recurrent').show();
        }

    });
    $('#create_new_contact').change(function() {
        if ($(this).is(':checked')) {
            $('#position_existing_contact').hide();
            $('#new_contact').show();
        } else {
            $('#new_contact').hide();
            $('#position_existing_contact').show();
        }

    });

    // restore the dom state on page refresh or edit
		if ($('input[name="volunteering_position[recurrent]"][value=true]').is(":checked")){
        var pattern = '#schedule-' + $scheduler.find('input:checked').val();
        $(pattern).show();
        $('#scheduler').show();

        $('#non_recurrent').hide();
    }else{
         $('#scheduler').hide();
        $('#non_recurrent').show();

    }
    var v = $scheduler.find('input:radio:checked').val();

    if ($('#contact_assignment_existing').is(':checked')) {
        $('#position_existing_contact').show();


    } else if ($('#contact_assignment_new').is(':checked')) {

        $('#position_new_contact').show();
    }


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
            $vp_contact.find('#position_existing_contact').show();
        }

    });

    // selector caching
    var $assigned_contacts = $('#assigned_contacts');
    var $vp_contact_id = $('#volunteering_position_contact_ids');


    $('#add-contacts').click(function() {
        $.ajax({
						//style   : 'left:70%',
            url     : '/contacts/list',
            dataType: 'script',
            success : function(data){
            }
        })
    });

    $('#assigned_contacts').delegate('li', 'click', function() {
        $(this).remove();
        $('div.tipsy').remove();
        update_cid_values();
    });
    $('#scheduler').find('input[type="text"]').focusin(function(){

      $(this).prevAll('input[type="radio"]').attr('checked',true)
    }).end().find('select').change(function(){
    	
      $(this).prevAll('input[type="radio"]').attr('checked',true)  
    });

   $('#volunteer_position_form').find('span.increase').click(function() {
        var ipt = $(this).next('input');
            if (ipt.val() == '') {  

        ipt.val(1)
    } else {
        var curval = parseFloat(ipt.val());
        ipt.val(curval + 1)
    }
    });
       $('#volunteer_position_form').find('span.decrease').click(function() {
        var ipt = $(this).prev('input');
        var curval = parseFloat(ipt.val());
           if(curval>1) ipt.val(curval -1);
    });

    $('#scheduler-pattern').find('input').change(function() {
    	var pattern = '#schedule-' + $(this).val();
    	$('#schedule').find('div.schedules:visible').hide();
    	$(pattern).show();
		});

});

/**
 * update #assigned_contacts hidden field with the values from the assigned contact list
 * the corresponding contact id is stored in the dom with the ui-data attribute
 * on update action (add or remove) we iterate over the list items and build a string which cointains all the cids from li elements
 */
function update_cid_values() {

    var serialized_cids = '[', separator = '';
    $('#assigned_contacts').find('li').each(function() {
        serialized_cids += separator + $(this).attr('ui-data');
        separator = ',';
    });
    serialized_cids += ']';

    $('#volunteering_position_contact_ids').val(serialized_cids);
}

