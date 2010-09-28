/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    $('form').find('.tpickr').timepicker()

    // store the current event object
    var curent_event;


    var $create_event = $('#create_event');


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
        $('#add-event-form').dialog('open');
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
        $("#display-event-form").dialog('open');
    }

    ;
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
        $("#dateSelect").datepicker("setDate", cyear + "-" + (cmonth + 1) + "-" + cday);

        var startDate = jfcalplugin.getStartDate('#cal');
        var endDate = jfcalplugin.getEndDate('#cal');

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
        $("#dateSelect").datepicker("setDate", cyear + "-" + (cmonth + 1) + "-" + cday);
        var startDate = jfcalplugin.getStartDate('#cal');
        var endDate = jfcalplugin.getEndDate('#cal');

        jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics?startDate=" + startDate + '&endDate=' + endDate, "application/octet-stream");
        return false;
    });


    function reset_form(em) {
        em.find('input[type="text"]').attr('value', '');
        em.find('input[type="checkbox"]').attr('checked', true);
        em.find('.tpickr').hide();
        $('time_picker').remove();
    }


    $('#new_event').bind('ajax:success', function() {

        reset_form($(this))


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
    $("#dateSelect").datepicker({
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
    $("#dateSelect").datepicker('setDate', new Date());


    /**
     * Use reference to plugin object to a specific year/month
     */
    $("#dateSelect").bind('change', function() {
        var selectedDate = $("#dateSelect").val();
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
    $("#add-event-form").dialog({
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
            // reset form elements when we close so they are fresh when the dialog is opened again.
            $("#event_start_date").datepicker("destroy");
            $("#event_end_date").datepicker("destroy");
            $("#event_start_date").val("");
            $("#event_end_date").val("");
            $('#event_title').val('');
            $('#event_event_description').val('');
        }
    });

    /**
     * Initialize display event form.
     */
    $("#display-event-form").dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            Cancel: function() {
                $(this).dialog('close');
            },
            'Edit': function() {
                alert("Make your own edit screen or dialog!");
            },
            'Delete': function() {
                if (confirm("Are you sure you want to delete this agenda item?")) {
                    if (clickAgendaItem != null) {
                        jfcalplugin.deleteAgendaItemById("#cal", clickAgendaItem.agendaId);
                        //jfcalplugin.deleteAgendaItemByDataAttr("#mycal","myNum",42);
                    }
                    $(this).dialog('close');
                }
            }
        },
        open: function(event, ui) {
            if (clickAgendaItem != null) {
                var title = clickAgendaItem.title;
                var startDate = clickAgendaItem.startDate;
                var endDate = clickAgendaItem.endDate;
                var allDay = clickAgendaItem.allDay;
                var data = clickAgendaItem.data;
                // in our example add agenda modal form we put some fake data in the agenda data. we can retrieve it here.
                $("#display-event-form").append(
                        "<br><b>" + title + "</b><br><br>"
                        );
                if (allDay) {
                    $("#display-event-form").append(
                            "(All day event)<br><br>"
                            );
                } else {
                    $("#display-event-form").append(
                            "<b>Starts:</b> " + startDate + "<br>" +
                                    "<b>Ends:</b> " + endDate + "<br><br>"
                            );
                }
                for (var propertyName in data) {
                    $("#display-event-form").append("<b>" + propertyName + ":</b> " + data[propertyName] + "<br>");
                }
            }
        },
        close: function() {
            // clear agenda data
            $("#display-event-form").html("");
        }
    });


})
        ;