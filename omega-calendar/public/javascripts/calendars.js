/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {


    function formatDateForId(d) {
        return '' + d.getFullYear() + '-' + ((d.getMonth() < 10) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' + ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
    }

    var csrf_token = $('meta[name=csrf-token]').attr('content')
    var cal = $('#cal');
    cal.data('calendar_id', 1);
    cal.fullCalendar({
        disableDragging  : true,
        more            :3,
        calendar_id     :1,
        height          : 550,
        header          : {
            left        : 'prev,next today',
            center      : 'title',
            right       : 'month,agendaWeek,agendaDay'
        },
        editable        : true,
        events          : '/calendars/' + cal.data('calendar_id') + '/events.json',
        dayClick        : function(date, allDay, jsEvent, view) {


            var id = $('#uibox_' + formatDateForId(date));

            if (!id.is(':visible')) {

                $.ajax({
                    url     : '/calendars/' + cal.data('calendar_id') + '/events/new',
                    dataType: 'script',
                    complete: function() {

                        $('#event_start_date').val($.fullCalendar.formatDate(date, 'yyyy-MM-dd'));
                        $('#event_end_date').val($.fullCalendar.formatDate(date, 'yyyy-MM-dd'));
                    }

                });

            }


        },
        eventClick: function(event) {
            if (! $(this).andSelf("td").hasClass('more')) {
                var ed = '<div id="event-details">';
                ed += 'Start: ';
                ed += $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm');
                ed += '<br>';
                ed += 'End: ';
                ed += $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm');
                ed += '<br>';
                ed += event.event_description;
                ed += '<br>';
                ed += '<a><span id="btn_edit_event">edit</span></a>';
                ed += '<br></div>';
                $('body').append(ed);
                $("#event-details").dialog({
                    autoOpen:true,
                    title: event.title,
                    close : function(e, ui) {

                        $(this).dialog("destroy").remove();

                    },
                    buttons: {
                        "Ok": function() {
                            $("#event-details").remove();
                            $(this).dialog("destroy");

                        },
                        "Edit" : function() {
                            var that = $('#cal').data('fullCalendar');
                            $.ajax({
                                url: '/calendars/' + cal.data('calendar_id') + '/events/' + event.id + '/edit',
                                dataType: 'script'

                            });
                            var id = '#edit_event_' + event.id;

                            $("#event-details").dialog("destroy").remove();

                        },
                        "Delete": function() {
                            $.ajax({
                                url     : '/calendars/' + cal.data('calendar_id') + '/events/' + event.id ,
                                dataType: 'script',
                                type    : "delete",
                                success : function() {
                                    cal = $('#cal').data('fullCalendar');
                                    cal.removeEvents(event.id)
                                }

                            });

                        }
                    }
                });
            }
        }
    });


    $("#calendar").datepicker({
        show: '',
        onSelect: function(dateText) {
            var d = new Date(dateText);
            cal.fullCalendar('changeView', 'agendaDay');
            cal.fullCalendar('gotoDate', d);
        }

    });

$('#_calendars').change(function(){

    cal.data('calendar_id', $(this).val());
    var fullCalendar = cal.data('fullCalendar');
    fullCalendar.removeEvents();
    fullCalendar.addEventSource('/calendars/' + cal.data('calendar_id') + '/events.json')
})

});