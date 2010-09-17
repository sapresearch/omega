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

            $.ajax({
                url : '/contacts/' + contact_id + '/groups/' + group_id + '/assign',
                type: 'PUT',
                dataType : 'json',
                success: function() {
                    $('#contacts').find('tr[data-id=\'' + contact_id + '\']').remove();
                }
            })


        }
    });


//    var contact_filter = $('#contact_filter');
//
//    contact_filter.keyup(function() {
//        this.value == '' ? $('#clear_filter').hide() : $('#clear_filter').show();
//    });
//    $('#clear_filter').click(function() {
//        contact_filter.val('');
//        $('#contacts li').show();
//        $(this).hide();
//    });
//
//    contact_filter.jfilter({
//        list: '#contacts',
//        speed: 100,
//        highlight: 'highlight' // Class name with no "."
//    });


    $('#contacts').find('a.remove-contact').live("ajax:success", function() {

        var t = $(this).find('span').data('tipsy');
        t.hide();
        $(this).closest('tr').remove();

    });

});

function update_contacts(contacts, group_id, group_name) {


    var mgm_span_begin = '<td class="text-right" width="40px"><span class="mgm-contact hide">'
            + '<span data-tooltip="Assign me by dragging into a group on the left" class="om-icon-only om-blue-icon ui-icon-arrow-4-diag"></span>'
    var mgm_span_end = '</span></td>';

    $('#contacts').empty();


    var list = '<table>';

    if (group_id !== undefined && typeof group_id == "number") {

        $(contacts).each(function(i) {


            list += '<tr data-id="' + contacts[i].id + '"><td><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
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
    $('#contacts').append(list).find("tr").hover(function() {

        $(this).draggable({
            helper: 'clone',
            start: function(event, ui) {
               $(this).find('span[data-tooltip]').data('tipsy').hide();


            }
        }).find('.mgm-contact').toggleClass('hide');
    });
}


