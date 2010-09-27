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

    // cache the content
    var $left = $('#left');
    var $create_event = $('#create_event');
    var left_pos = $left.position();
    //$create_event.css({ 'left': left_pos.left, 'top': left_pos.top, 'width' : $left.width() });


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

    jfcalplugin.loadICalSource("#cal", "calendars/1/events.ics", "application/octet-stream");


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
	function myAgendaClickHandler(eventObj){
		// Get ID of the agenda item from the event object
		var agendaId = eventObj.data.agendaId;
		// pull agenda item from calendar
		var agendaItem = jfcalplugin.getAgendaItemById("#cal",agendaId);
		clickAgendaItem = agendaItem;
		$("#display-event-form").dialog('open');
	};
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
	$("#BtnPreviousMonth").button();
	$("#BtnPreviousMonth").click(function() {
		jfcalplugin.showPreviousMonth("#cal");
		// update the jqeury datepicker value
		var calDate = jfcalplugin.getCurrentDate("#cal"); // returns Date object
		var cyear = calDate.getFullYear();
		// Date month 0-based (0=January)
		var cmonth = calDate.getMonth();
		var cday = calDate.getDate();
		// jquery datepicker month starts at 1 (1=January) so we add 1
		$("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);
		return false;
	});
	/**
	 * Initialize next month button
	 */
	$("#BtnNextMonth").button();
	$("#BtnNextMonth").click(function() {
		jfcalplugin.showNextMonth("#cal");
		// update the jqeury datepicker value
		var calDate = jfcalplugin.getCurrentDate("#cal"); // returns Date object
		var cyear = calDate.getFullYear();
		// Date month 0-based (0=January)
		var cmonth = calDate.getMonth();
		var cday = calDate.getDate();
		// jquery datepicker month starts at 1 (1=January) so we add 1
		$("#dateSelect").datepicker("setDate",cyear+"-"+(cmonth+1)+"-"+cday);
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
		month = month.replace(/^[0]+/g,"")
		var day = dtArray[2];
		// plugin uses 0-based months so we subtrac 1
		jfcalplugin.showMonth("#cal",year,parseInt(month-1).toString());
	});
    /**
     * Initialize add event modal form
     */
    $("#add-event-form").dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            'Add Event': function() {

                var what = jQuery.trim($("#what").val());

                if (what == "") {
                    alert("Please enter a short event description into the \"what\" field.");
                } else {

                    var startDate = $("#startDate").val();
                    var startDtArray = startDate.split("-");
                    var startYear = startDtArray[0];
                    // jquery datepicker months start at 1 (1=January)
                    var startMonth = startDtArray[1];
                    var startDay = startDtArray[2];
                    // strip any preceeding 0's
                    startMonth = startMonth.replace(/^[0]+/g, "");
                    startDay = startDay.replace(/^[0]+/g, "");
                    var startHour = jQuery.trim($("#startHour").val());
                    var startMin = jQuery.trim($("#startMin").val());
                    var startMeridiem = jQuery.trim($("#startMeridiem").val());
                    startHour = parseInt(startHour.replace(/^[0]+/g, ""));
                    if (startMin == "0" || startMin == "00") {
                        startMin = 0;
                    } else {
                        startMin = parseInt(startMin.replace(/^[0]+/g, ""));
                    }
                    if (startMeridiem == "AM" && startHour == 12) {
                        startHour = 0;
                    } else if (startMeridiem == "PM" && startHour < 12) {
                        startHour = parseInt(startHour) + 12;
                    }

                    var endDate = $("#endDate").val();
                    var endDtArray = endDate.split("-");
                    var endYear = endDtArray[0];
                    // jquery datepicker months start at 1 (1=January)
                    var endMonth = endDtArray[1];
                    var endDay = endDtArray[2];
                    // strip any preceeding 0's
                    endMonth = endMonth.replace(/^[0]+/g, "");

                    endDay = endDay.replace(/^[0]+/g, "");
                    var endHour = jQuery.trim($("#endHour").val());
                    var endMin = jQuery.trim($("#endMin").val());
                    var endMeridiem = jQuery.trim($("#endMeridiem").val());
                    endHour = parseInt(endHour.replace(/^[0]+/g, ""));
                    if (endMin == "0" || endMin == "00") {
                        endMin = 0;
                    } else {
                        endMin = parseInt(endMin.replace(/^[0]+/g, ""));
                    }
                    if (endMeridiem == "AM" && endHour == 12) {
                        endHour = 0;
                    } else if (endMeridiem == "PM" && endHour < 12) {
                        endHour = parseInt(endHour) + 12;
                    }

                    //alert("Start time: " + startHour + ":" + startMin + " " + startMeridiem + ", End time: " + endHour + ":" + endMin + " " + endMeridiem);

                    // Dates use integers
                    var startDateObj = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay), startHour, startMin, 0, 0);
                    var endDateObj = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay), endHour, endMin, 0, 0);

                    // add new event to the calendar
                    jfcalplugin.addAgendaItem(
                            "#cal",
                            what,
                            startDateObj,
                            endDateObj,
                            false,
                    {
                        fname: "Santa",
                        lname: "Claus",
                        leadReindeer: "Rudolph",
                        myDate: new Date(),
                        myNum: 42
                    },
                    {
                        backgroundColor: $("#colorBackground").val(),
                        foregroundColor: $("#colorForeground").val()
                    }
                            );

                    $(this).dialog('close');

                }

            },
            Cancel: function() {
                $(this).dialog('close');
            }
        },
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
            $("#startDate").datepicker("destroy");
            $("#endDate").datepicker("destroy");
            $("#startDate").val("");
            $("#endDate").val("");
            $("#startHour option:eq(0)").attr("selected", "selected");
            $("#startMin option:eq(0)").attr("selected", "selected");
            $("#startMeridiem option:eq(0)").attr("selected", "selected");
            $("#endHour option:eq(0)").attr("selected", "selected");
            $("#endMin option:eq(0)").attr("selected", "selected");
            $("#endMeridiem option:eq(0)").attr("selected", "selected");
            $("#what").val("");
            //$("#colorBackground").val("#1040b0");
            //$("#colorForeground").val("#ffffff");
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