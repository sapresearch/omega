/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 29, 2010
 * Time: 9:56:02 AM
 * To change this template use File | Settings | File Templates.
 */
$(function() {

    $("#accordion").accordion({
        fillSpace: true
    });

    $('#contacts').delegate("li", "hover", function() {
        $(this).draggable({
            helper: 'clone'

        }).find('.mgm-contact').toggleClass('hide');
    });
    $('#accordion').find('li').droppable({
        drop: function(event, ui) {
            $(this).effect('pulsate');
            var a_group = $(this).find('a').attr('href');
            var a_contact = ui.draggable.find('a').attr('href');
            var reg = /(\d+)/, g_id = reg.exec(a_group),c_id = reg.exec(a_contact);
            if (g_id !== null && c_id !== null) {
                g_id = parseInt(g_id, 10);
                c_id = parseInt(c_id, 10);
            } else {
                $.showFlash('Error')
            }

            

            $.ajax({
                url : 'http://ymqdomega1:9001/contacts/' + c_id + '/groups/' + g_id + '/assign',
                type: 'PUT'
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


    $.ajax({
        url: '/contacts/all',
        dataType: 'json',

        success: function(data) {

            update_contacts(data)

        }
    });


});

function update_contacts(contacts) {
    $('#contacts').empty();
    var list = '<ul>';
    $(contacts).each(function(i) {


        list += '<li id="contact_' + contacts[i].id + '"><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', ' + contacts[i].first_name + '</a>' +
                '<span class="mgm-contact hide"><span class="om-icon-only om-icon-delete-small"></span><span class="om-icon-only om-icon-arrow-move"></span></span></li>';
    });
    list += '</ul>';
    $('#contacts').append(list);
}


