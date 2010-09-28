/**
 * Created by IntelliJ IDEA.
 * User: I824562
 * Date: Aug 26, 2010
 * Time: 9:57:22 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    $('#sidebar-date-picker').datepicker({
        firstDay:1,
        beforeShowDay: function(date) {
            var a = new Array();
            a[0] = date.getDay() == 1;
            a[1] = '';
            a[2] = '';
            return a;
        }, dateFormat: 'yy-mm-dd',
        onSelect: function(dateText) {
        $('#volunteering_time_entry_week, #cw').val(dateText);
        },
         weekHeader: 'W' ,
        showWeek: true 

    });

});