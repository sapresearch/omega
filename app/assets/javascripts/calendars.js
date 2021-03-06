//= require thirdParty/jquery.timepicker.js
//= require thirdParty/jquery.fullcalendar.js


function formatDateForId(d) {
    return '' + d.getFullYear() + '-' + ((d.getMonth() < 10) ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' + ((d.getDate() < 10) ? ('0' + d.getDate()) : d.getDate());
}

    
function load_calendar(calendar_id){
//$(function() {

    var csrf_token = $('meta[name=csrf-token]').attr('content');
    // dont cache the cal calendar selector as it changes on the calendar selevt even
    $('#cal').empty();
    $('#cal').data('calendar_id', calendar_id);
    $('#cal').fullCalendar({

        more            :3,
        calendar_id     :calendar_id,
        height          : 550,
        header          : {
            left        : 'prev,next today',
            center      : 'title',
            right       : 'month,agendaWeek,agendaDay'
        },
        editable        : true,
        events          : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events.json',
        dayClick        : function(date, allDay, jsEvent, view) {
            $('#cal').data('day_data', $.fullCalendar.formatDate(date, 'yyyy-MM-dd'));
            var id = $('#uibox_' + formatDateForId(date));
            if (!id.is(':visible')) {
                $.ajax({
                    url     : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/new',
                    dataType: 'script'
                });
            }

        },
        eventResize: function(event, dayDelta, minuteDelta, revertFunc) {
            $.ajax({
                type:   'POST',
                url     : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') +'/events/' + event.id,
                data    :   {
                    _method:'PUT',
                    'calendar_event[start_time]' : $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm'),
                    'calendar_event[end_time]'      : $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm')
                },
                dataType: 'json'

            })


        },

        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc) {
            $.ajax({
                type:   'POST',
                url     : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') +'/events/' + event.id,
                data    :   {
                    _method:'PUT',
                    'calendar_event[start]' : $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm'),
                    'calendar_event[end]'      : $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm')
                },
                dataType: 'json'

            })


        },

        eventClick : function(event) {
            if (! $(this).andSelf("td").hasClass('more')) {
                var ed = '<div id="event-details">';
                ed += 'Start: ';
                ed += $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm');
                ed += '<br>';
                ed += 'End: ';
                ed += $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm');
                ed += '<br><p>';
                ed += event.event_description;
                ed += '</p></div>';
                $('body').append(ed);
                $("#event-details").dialog({
                    autoOpen    : true,
                    height      : 500,
                    width       : 500,
                    title       : event.title,
                    close       : function(e, ui) {
                        $(this).dialog("destroy").andSelf().remove();
                    }

                });

                if (event.recurrence_series_id != null) {

                    $("#event-details").dialog("option", "buttons", {

                        "Edit Series" : function() {

                            $.ajax({
                                url: account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/' + event.recurrence_series_id + '/edit',
                                dataType: 'script'

                            });
                            var id = '#edit_event_' + event.recurrence_series_id;
                            $("#event-details").dialog("destroy").remove();
                        },

                        "Edit this occurence" : function() {
                            var that = $('#cal').data('fullCalendar');
                            $.ajax({
                                url: account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/' + event.id + '/edit',
                                dataType: 'script'
                            });
                            var id = '#edit_event_' + event.id;
                            $("#event-details").dialog("destroy").remove();
                        },
                        "Delete": function() {
                            $.ajax({
                                url     : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/' + event.id ,
                                dataType: 'script',
                                type    : "delete",
                                success : function() {
                                    var calref = $('#cal').data('fullCalendar');
                                    calref.removeEvents(event.id)
                                }
                            });
                        },

                        "Ok": function() {
                            $("#event-details").remove();
                            $(this).dialog("destroy");
                        }


                    });
                } else {
                    $("#event-details").dialog("option", "buttons", {


                        "Edit this occurence" : function() {
                            var that = $('#cal').data('fullCalendar');
                            $.ajax({
                                url: account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/' + event.id + '/edit',
                                dataType: 'script'
                            });
                            var id = '#edit_event_' + event.id;
                            $("#event-details").dialog("destroy").remove();
                        },
                        "Delete": function() {
                            $.ajax({
                                url     : account_prefix_path+'/calendars/' + $('#cal').data('calendar_id') + '/events/' + event.id ,
                                dataType: 'script',
                                type    : "delete",
                                success : function() {
                                    var calref = $('#cal').data('fullCalendar');
                                    calref.removeEvents(event.id)
                                }
                            });
                        },

                        "Ok": function() {
                            $("#event-details").remove();
                            $(this).dialog("destroy");
                        }


                    });


                }

            }
        }
    });
    $("#calendar").datepicker({
        show: '',
        onSelect: function(dateText) {
            var d = new Date(dateText);
            $('#cal').fullCalendar('changeView', 'agendaDay');
            $('#cal').fullCalendar('gotoDate', d);
        }

    });
//});
}