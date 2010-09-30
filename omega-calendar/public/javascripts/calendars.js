/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    $('form').find('.tpickr').timepicker();
    // jquery selector caching
    $addeventform = $('#add-event-form');
    $dateSelect = $('#dateSelect');
    $displayeventform = $('#display-event-form');


    /**
     * Initialize with current year and date. Returns reference to plugin object.
     */
    var jfcalplugin = $("#cal").jFrontierCal({
        date: new Date(),
        dayClickCallback: myDayClickHandler,
        agendaClickCallback: myAgendaClickHandler,
        agendaDropCallback: myAgendaDropHandler,
        dragAndDropEnabled: true
    }).data("plugin");

    var startDate = jfcalplugin.getStartDate('#cal');
    var endDate = jfcalplugin.getEndDate('#cal');

    jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics?startDate=" + startDate + '&endDate=' + endDate, "application/octet-stream");


    /**
     * Get the date (Date object) of the day that was clicked from the event object
     */
    function myDayClickHandler(eventObj) {
        // Get the Date of the day that was clicked from the event object
        var date = eventObj.data.calDayDate;
        // store date in our global js variable for access later
        clickDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        // open our add event dialog
        $addeventform.dialog('open');
    }

    ;

    ;
    /**
     * Called when user clicks and agenda item
     * use reference to plugin object to edit agenda item
     */
    function myAgendaClickHandler(eventObj) {
        // Get ID of the agenda item from the event object
        var agendaId = eventObj.data.agendaId;
        // pull agenda item from calendar
        var agendaItem = jfcalplugin.getAgendaItemById("#cal", agendaId);
        clickAgendaItem = agendaItem;

        $displayeventform.dialog('open');
    }

    ;
    /**
     * get the agenda item that was dropped. It's start and end dates will be updated.
     */
    function myAgendaDropHandler(eventObj) {
        var agendaId = eventObj.data.agendaId;
        var date = eventObj.data.calDayDate;
        var agendaItem = jfcalplugin.getAgendaItemById("#cal", agendaId);
        alert("You dropped agenda item " + agendaItem.title +
                " onto " + date.toString() + ". Here is where you can make an AJAX call to update your database.");
    }


    /**
     * Initialize previous month button
     */

    $("#BtnPreviousMonth").click(function() {
        jfcalplugin.showPreviousMonth("#cal");
        // update the jqeury datepicker value
        var calDate = jfcalplugin.getCurrentDate("#cal"); // returns Date object
        var cyear = calDate.getFullYear();
        // Date month 0-based (0=January)
        var cmonth = calDate.getMonth();
        var cday = calDate.getDate();
        // jquery datepicker month starts at 1 (1=January) so we add 1
        $dateSelect.datepicker("setDate", cyear + "-" + (cmonth + 1) + "-" + cday);

        var startDate = jfcalplugin.getStartDate('#cal');
        var endDate = jfcalplugin.getEndDate('#cal');
        jfcalplugin.deleteAllAgendaItems('#cal')
        jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics?startDate=" + startDate + '&endDate=' + endDate, "application/octet-stream");

        return false;
    });
    /**
     * Initialize next month button
     */

    $("#BtnNextMonth").click(function() {
        jfcalplugin.showNextMonth("#cal");
        // update the jqeury datepicker value
        var calDate = jfcalplugin.getCurrentDate("#cal"); // returns Date object
        var cyear = calDate.getFullYear();
        // Date month 0-based (0=January)
        var cmonth = calDate.getMonth();
        var cday = calDate.getDate();
        // jquery datepicker month starts at 1 (1=January) so we add 1
        $dateSelect.datepicker("setDate", cyear + "-" + (cmonth + 1) + "-" + cday);
        var startDate = jfcalplugin.getStartDate('#cal');
        var endDate = jfcalplugin.getEndDate('#cal');
        jfcalplugin.deleteAllAgendaItems('#cal');
        jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics?startDate=" + startDate + '&endDate=' + endDate, "application/octet-stream");
        return false;
    });


    $('.datepickr').datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '2010:2020'
    });
    /**
     * Initialize jquery ui datepicker. set date format to yyyy-mm-dd for easy parsing
     */
    $dateSelect.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy-mm-dd'
    });
    /**
     * Set datepicker to current date
     */
    $dateSelect.datepicker('setDate', new Date());


    /**
     * Use reference to plugin object to a specific year/month
     */
    $dateSelect.bind('change', function() {
        var selectedDate = $dateSelect.val();
        var dtArray = selectedDate.split("-");
        var year = dtArray[0];
        // jquery datepicker months start at 1 (1=January)
        var month = dtArray[1];
        // strip any preceeding 0's
        month = month.replace(/^[0]+/g, "")
        var day = dtArray[2];
        // plugin uses 0-based months so we subtrac 1
        jfcalplugin.showMonth("#cal", year, parseInt(month - 1).toString());
        var startDate = jfcalplugin.getStartDate('#cal');
        var endDate = jfcalplugin.getEndDate('#cal');

        jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics?startDate=" + startDate + '&endDate=' + endDate, "application/octet-stream");
    });
    /**
     * Initialize add event modal form
     */
    $addeventform.dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: false,
        open: function(event, ui) {
            // initialize start date picker
            $("#startDate").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            });
            // initialize end date picker
            $("#endDate").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            });
            // initialize with the date that was clicked
            $("#startDate").val(clickDate);
            $("#endDate").val(clickDate);
            // initialize color pickers

            //$("#colorForeground").val("#ffffff");
            // put focus on first form input element
            $("#what").focus();
        },
        close: function() {
            $('#new_event').find('input:not(:hidden),input:not(:submit)').val('');

//            // reset form elements when we close so they are fresh when the dialog is opened again.
//            $("#event_start_date").datepicker("destroy");
//            $("#event_end_date").datepicker("destroy");
//            $("#event_start_date").val("");
//            $("#event_end_date").val("");
//            $('#event_title').val('');
//            $('#event_event_description').val('');
//            $('#event_start_time').val('')
        }
    });


    $('#new_event').bind('ajax:success', function() {
        $addeventform.dialog('close');
    });

    /**
     * Initialize display event form.
     */
    $displayeventform.dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            Cancel: function() {
                $(this).dialog('close');
                $addeventform.dialog('open');
            },
            'Edit': function() {
                $.showFlash('Coming Soon :)')
                $(this).dialog('close');

            },
            'Delete': function() {
                var self = $(this);
                $.ajax({
                    url : '/events/' + clickAgendaItem.data.UID ,
                    type : 'DELETE',
                    dataType : 'json',
                    success: function() {
                        var agendaId = clickAgendaItem.agendaId;
                        jfcalplugin.deleteAgendaItemById("#cal", agendaId);
                        self.dialog('close');
                    }
                })

            }
        },
        open: function(event, ui) {
            if (clickAgendaItem != null) {
                var data = clickAgendaItem.data;
                var title = clickAgendaItem.title;
                var startDate = clickAgendaItem.startDate;
                var endDate = clickAgendaItem.endDate;
                var allDay = clickAgendaItem.allDay;

                // in our example add agenda modal form we put some fake data in the agenda data. we can retrieve it here.
                var append = '';

                append += "<h2>" + title + "</h2>";

                if (allDay) {

                    append += "(All day event)<br><br>"
                } else {
                    append += '<span class="om-plain-icon-button"><span class="om-icon om-icon-calendar"></span></span>Starts:' + startDate + "<br>"
                    append += '<span class="om-plain-icon-button"><span class="om-icon om-icon-calendar"></span></span>Ends:' + endDate + "<br><br>"
                }
                append += data.DESCRIPTION;
                $displayeventform.append(append);
            }
        },
        close: function() {
            // clear agenda data
            $displayeventform.html("");
        }
    });
});