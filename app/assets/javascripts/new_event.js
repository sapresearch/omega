$('#new_calendar_event').find('.datepickr').datepicker({

    dateFormat: 'yy-mm-dd',
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true
});
$('#new_calendar_event').find('.tpickr').timepicker();


$('#new_calendar_event').find('span.increase').click(function() {
    var ipt = $(this).next('input');
    if (ipt.val() == '') {

        ipt.val(1)
    } else {
        var curval = parseFloat(ipt.val());
        ipt.val(curval + 1)
    }
});
$('#new_calendar_event').find('span.decrease').click(function() {
    var ipt = $(this).prev('input');
    var curval = parseFloat(ipt.val());
    if (curval > 1) ipt.val(curval - 1);
});

$('#scheduler-pattern').find('input').change(function() {
    var pattern = '#schedule-' + $(this).val();
    $('#schedule').find('div.schedules:visible').hide();
    $(pattern).show();
});

$('#scheduler-trigger').click(function() {
    $('#scheduler').show();
});


console.log('dfdff')