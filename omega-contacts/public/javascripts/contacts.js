/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 29, 2010
 * Time: 9:56:02 AM
 * To change this template use File | Settings | File Templates.
 */
$(function() {

    $.ajax({
        url: '/contacts/all',
        dataType: 'json',
        success: function(data) {
            update_contacts(data)

        }
    });

    $("#accordion").accordion({
        fillSpace: true
    });


//    $('#contacts').delegate("tr", "hover", function() {
////        $(this).find('td').toggleClass('li-over');
//        $(this).draggable({
//            helper: 'clone'
//
//        }).find('.mgm-contact').toggleClass('hide');
//    });
    $('#accordion').find('tr').droppable({

        drop: function(event, ui) {
            $(this).effect('pulsate');
            var group_id = this.getAttribute('data-id');
            var contact_id = ui.draggable.attr('data-id');
            var from_group_id = ui.draggable.attr('data-group-id');


            $.ajax({
                url :  '/contacts/' + contact_id + '/groups/' + from_group_id + '/move/' + group_id,
                type: 'PUT',
                dataType : 'json',
                success: function() {
                    $('#contacts').find('tr[data-id=\'' + contact_id + '\']').remove();
                }
            })
        }
    });




});

function update_contacts(contacts, group_id, group_name) {
    var $contacts = $('#contacts');
    var mgm_span_begin = '<td class="text-right" width="40px"><span class="mgm-contact hide">'
            + '<span data-tooltip="Assign me by dragging into a group on the left" class="om-icon-only om-blue-icon ui-icon-arrow-4-diag"></span>'
    var mgm_span_end = '</span></td>';
    $contacts.empty();

    var list = '<table>';

    if (group_id !== undefined && typeof group_id == "number") {

        $(contacts).each(function(i) {


        list += '<tr data-id="' + contacts[i].id + '" data-group-id="' + group_id + '"><td><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
                + contacts[i].first_name + '</a>'
                + mgm_span_begin
                + '<a href="/contacts/' + contacts[i].id + '/groups/' + group_id + '/remove" '
                + 'class="remove-contact" data-remote="true" data-method="put">'
                + '<span class="om-icon-only om-blue-icon ui-icon-shuffle" data-tooltip="remove this contact from: ' + group_name + '"></span></a>'
                + mgm_span_end
                + '</td></tr>';

        });
    } else {
        $(contacts).each(function(i) {
        list += '<tr data-id="' + contacts[i].id + '"><td><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
                + contacts[i].first_name + '</a>'
                + mgm_span_begin
                + '<a  data-remote="true" data-method="delete" href="/contacts/' + contacts[i].id + '" class="remove-contact">'
                + '<span class="om-icon-only om-blue-icon ui-icon-trash" data-tooltip="Delete this contact from the database"></span></a>'
                + mgm_span_end
                + '</td></tr>';

        });
    }

    list += '</table>';
    $contacts.append(list);
    $contacts.find('table').delegate("tr", 'hover', function() {

        $(this).draggable({
            helper: 'clone',
            start: function(event, ui) {
                var to = $(this).find('span[data-tooltip]').data('tipsy');
                to.hide();
            }
        }).find('.mgm-contact').toggleClass('hide');
    });


        $contacts.find('a.remove-contact').bind("ajax:success", function() {

        var t = $(this).find('span').data('tipsy');
        if (t.hoverState == 'in') {
            t.hide();
        }


        $(this).closest('tr').remove();

    });


}


