/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    var clickDate = "";
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
        retrieveData(startDate, endDate);

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
        retrieveData(startDate, endDate);
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

        retrieveData(startDate, endDate);
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
            $("#event_start_date").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            }).val(clickDate);
            // initialize end date picker
            $("#event_end_date").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy-mm-dd'
            }).val(clickDate);
            // initialize with the date that was clicked


        },
        close: function() {

            $.ajax({
                url : '/calendars/1/events/new' ,
                global: false,
                dataType : 'script'

            });

            $('#new_event')[0].reset();

        }
    });


    $('#new_event').bind('ajax:success', function() {
        $addeventform.dialog('close');
    });
    $('#event_allday').live('change', function() {
        if (!$(this).is(':checked')) {

            $('#new_event').find('.tpickr').removeClass('hide')
        } else {
            $('#new_event').find('.tpickr').addClass('hide')
        }
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

            },
            'Edit': function() {
                var self = $(this);
                $.ajax({
                    global : false,
                    url : '/calendars/1/events/' + clickAgendaItem.data.id + '/edit',
                    type : 'GET',
                    dataType : 'script',
                    success: function() {

                    }
                })
            },
            'Delete': function() {
                var self = $(this);
                $.ajax({
                    global : false,
                    url : '/events/' + clickAgendaItem.data.id ,
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
                    append += '<span class="om-plain-icon-button"><span class="om-icon om-icon-calendar"></span></span>Ends:' + endDate + "<br>"
                }
                append += '<p>' + data.description + '</p>';
                $displayeventform.append(append);
            }
        },
        close: function() {
            // clear agenda data

            $displayeventform.html("");
        }
    });


    var addAgendaItems = function(jso) {
        var l = jso.length, i = 0,jsi;
        for (i; i < l; i++) {
            jsi = jso[i];
            var desc = (typeof jsi.event_description != 'undefined') ? jsi.event_description : ''
            var alld = jsi.allDay || false;
            jfcalplugin.addAgendaItem(
                    "#cal",
                    jsi.title,
                    new Date(jsi.start),
                    new Date(jsi.end),
                    alld,
            {
                id: jsi.id,
                description:  desc
            });


        }
    };

    function retrieveData(startDate, endDate) {
        $.ajax({
            url: "calendars/1/events.json?startDate=" + startDate + '&endDate=' + endDate,
            success: addAgendaItems
        });
    }

    retrieveData(startDate, endDate);


});