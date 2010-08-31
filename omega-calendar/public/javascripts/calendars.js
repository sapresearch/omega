/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 22, 2010
 * Time: 10:36:04 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
 $('.tpickr').timepicker();

    // store the current event object
    var curent_event;

    // cache the content
    var $left = $('#left');
    var $create_event = $('#create_event');
    var left_pos = $left.position();
    //$create_event.css({ 'left': left_pos.left, 'top': left_pos.top, 'width' : $left.width() });

    var csrf_token = $('meta[name=csrf-token]').attr('content'),
            csrf_param = $('meta[name=csrf-param]').attr('content');

    $('#cal').fullCalendar({
        height: 550,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: "/calendars/1/events.json",
        dayClick: function(date, allDay, jsEvent, view) {


            $('#cal').hide();
            $create_event.show();
            $('#event_start, #event_end').val($.fullCalendar.formatDate(date, 'yyyy-MM-dd'));


        },
        eventClick: function(event, jsEvent, view) {
            curent_event = event;
            event_id = event.id;
            var ed = '<h1>';
            ed += event.title;
            ed += '</h1>';

            ed += 'Start: ';
            ed += $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm');
            ed += '<br>';
            ed += 'End: ';
            ed += $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm');
            ed += '<br>';
            ed += event.event_description;
            ed += '<br>';
            ed += '<a><span id="btn_edit_event">edit</span></a>';
            ed += '<br>';


            $('#sidebox_events').hide('slide', {direction : 'down'}, 500).empty().append(ed).show('slide', { direction : 'up' }, 500)


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
            f += '<p><input type="hidden" value="" name="event[end]" id="edit_event_end"></p>';
            f += '<p><input type="hidden" value="" name="event[start]" id="edit_event_start"></p>';
            f += '</form>';

            $('body').append(f);


            $('#edit_event_end').attr('value', $.fullCalendar.formatDate(event.end, 'yyyy-MM-dd HH:mm'));
            $('#edit_event_start').attr('value', $.fullCalendar.formatDate(event.start, 'yyyy-MM-dd HH:mm'));
            $('#edit_event_time').bind("ajax:success", function() {
                $(this).remove();

            });
            $('#edit_event_time').attr('action', '/events/' + event.id).trigger('submit');

        },

        loading: function(isloading) {
            // TODO show loading animation
        }
    });


    $('#btn_edit_event').live('click', function() {

        var f = '<form method="post" id="edit_event" data-remote="true" action="">';
        f += '<input type="hidden" value="put" name="_method">';
        f += '<input type="hidden" value="' + csrf_token + '" name="' + csrf_token + '">';
        f += '<p><label for="event_title">Title</label><input type="text" value="date" size="30" name="event[title]" id="event_title"></p>';
        f += '<p><label for="event_start">Start</label><input type="text" value="' + $.fullCalendar.formatDate(curent_event.start, 'yyyy-MM-dd HH:mm') + '" size="30" name="event[start]" id="event_start">YYYY-MM-DD</p>';
        f += '<p><label for="event_end">End</label><input type="text" value="' + $.fullCalendar.formatDate(curent_event.end, 'yyyy-MM-dd HH:mm') + '" size="30" name="event[end]" id="event_end">YYYY-MM-DD</p>';
        f += '<p><label for="event_event_description">Event description</label><textarea rows="5" name="event[event_description]" id="event_event_description" cols="40">' + curent_event.event_description + '</textarea></p>';
        f += '<input type="hidden" value="1" name="event[calendar_id]" id="event_calendar_id">';
        f += '<p><input type="submit" value="Update Event" name="commit" id="event_submit"><span id="cancel">cancel</span></p>';
        f += '</form>';


        $('#cal').hide();
        $(f).insertAfter($('#cal'));
        $('#edit_event').attr('action', '/events/' + curent_event.id);


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


    $('#new_event').bind('ajax:success', function() {
        //todo : notification
        $('#cal').fullCalendar('refetchEvents');
        $create_event.hide();
        $('#cal').show();


        reset_form($(this))


    });
    if($('#event_allday').is(':checked')){
            $('.tpickr').hide();
        }else{
        $('.tpickr').show();
    }
    $('#event_allday').change(function(){
        if($(this).is(':checked')){
            $('.tpickr').hide()
        }else{
        $('.tpickr').show();
    }
    })
    $('.datepickr').datepicker({
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        yearRange: '2010:2020'
    });



});