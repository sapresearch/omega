/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    // store the current event object
    var curent_event;

    // cache the content
    var $left = $('#left');
    var $create_event = $('#create_event');
    var left_pos = $left.position();
    var csrf_token = $('meta[name=csrf-token]').attr('content')
    //$create_event.css({ 'left': left_pos.left, 'top': left_pos.top, 'width' : $left.width() });


    $('#cal').fullCalendar({
        more:3,
        calendar_id :1,
        height: 550,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: '/calendars/1/events.json',
        dayClick: function(date, allDay, jsEvent, view) {

            

            var that = $('#cal').data('fullCalendar');
            $.ajax({
                url: '/calendars/' + that.options.calendar_id + '/events/new',
                dataType: 'script'

            });
            $('#event_start, #event_end').val($.fullCalendar.formatDate(date, 'yyyy-MM-dd'));


        },
        eventClick: function(event, jsEvent, view) {

            curent_event = event;
            event_id = event.id;
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
                    $(ui).remove();
                },
                buttons: {
                    "Ok": function() {
                        $(this).dialog("destroy");
                    },
                    "Edit" : function() {
                        var that = $('#cal').data('fullCalendar');
                        $.ajax({
                            url: '/calendars/' + that.options.calendar_id + '/events/' + event_id + '/edit',
                            dataType: 'script'

                        });
                        $(this).dialog("destroy");
                    }
                }
            });


        },
        eventResize: function(event) {


            var f = '<form method="post" id="edit_event_time" data-remote="true" action="">';
            f += '<input type="hidden" value="put" name="_method">';
            f += '<input type="hidden" value="' + csrf_token + '" name="' + csrf_token + '">';
            f += '<p><input type="hidden" value="" name="event[end]" id="edit_event_end"></p>';
            f += '</form>';

            $('body').append(f);


            $('#edit_event_end').attr('value', $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm'));
            $('#edit_event_time').bind("ajax:success", function() {
                $(this).remove();
            });
            $('#edit_event_time').attr('action', '/events/' + event.id).trigger('submit');

        },
        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc) {

            var f = '<form method="post" id="edit_event_time" data-remote="true" action="">';
            f += '<input type="hidden" value="put" name="_method">';
            f += '<input type="hidden" value="' + csrf_token + '" name="' + csrf_token + '">';
            f += '<input type="hidden" value="" name="event[end]" id="edit_event_end">';
            f += '<input type="hidden" value="" name="event[start]" id="edit_event_start">';
            f += '<input type="hidden" value="' + event.id + '" name="event[id]" id="edit_event_id">';
            f += '</form>';

            $('body').append(f);


            $('#edit_event_end').attr('value', $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm'));
            $('#edit_event_start').attr('value', $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm'));
            $('#edit_event_time').bind("ajax:success", function() {
                $(this).remove();

            });
            //$('#edit_event_time').attr('action', '/events/' + event.id).trigger('submit');

        }
    });


    $('#btn_edit_event').live('click', function() {
        $.ajax({
            url : '/calendars/1/events/12/edit'
        })
    });


    $('#cancel').live('click', function() {
        $('#cal').show();
        $create_event.hide();
        $('#edit_event').hide();
        reset_form($('#new_event'))
    });
    $("#calendar").datepicker({
        show: '',
        onSelect: function(dateText) {
            var d = new Date(dateText);
            $('#cal').fullCalendar('changeView', 'agendaDay');
            $('#cal').fullCalendar('gotoDate', d);
        }

    });

    $('#edit_event').live("ajax:success", function() {

        $('#cal').fullCalendar('refetchEvents')

    });


    function reset_form(em) {
        em.find('input[type="text"]').attr('value', '');
        em.find('input[type="checkbox"]').attr('checked', true);
        em.find('.tpickr').hide();
        $('time_picker').remove();
    }






    $('input.datepickr').live('click', function() {
        $(this).datepicker({
            showOn:'focus',
            dateFormat: 'yy-mm-dd',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            yearRange: '2010:2020'}).focus();
    });



});