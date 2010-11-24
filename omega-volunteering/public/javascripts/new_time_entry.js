/**
 * Created by IntelliJ IDEA.
 * User: I824562
 * Date: Aug 26, 2010
 * Time: 9:57:22 AM
 * To change this template use File | Settings | File Templates.
 */

$(function() {
    $('.datepickr').datepicker({
        firstDay:1,
        beforeShowDay: function(date) {
            var a = new Array();
            a[0] = date.getDay() == 1;
            a[1] = '';
            a[2] = '';
            return a;
        }, dateFormat: 'yy-mm-dd',
        onSelect: function(dateText) {
        $(this).val(dateText);
        },
         weekHeader: 'W' ,
        showWeek: true 

    });

        $('#new_volunteering_time_entry').find('span.increase').click(function() {
        var ipt = $(this).next('input');
        if (ipt.val() =='') {

            ipt.val(1)
        } else {
            var curval = parseFloat(ipt.val());
            ipt.val(curval + 1)
        }


    });
    $('#new_volunteering_time_entry').find('span.decrease').click(function() {
        var ipt = $(this).prev('input');
        var curval = parseFloat(ipt.val());
        if (curval > 1) ipt.val(curval - 1);
    });

});