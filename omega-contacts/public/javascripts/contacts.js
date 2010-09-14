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

    $("#contact_accordion").accordion({

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
            $('#contacts').empty();
            var list = '<ul>';
            $(data).each(function(i) {


                list += '<li id="contact_' + data[i].id + '"><a data-remote="true" href="/contacts/' + data[i].id + '">' + data[i].last_name + ', ' + data[i].first_name + '</a></li>';
            });
            list += '</ul>';
            $('#contacts').append(list);

        }
    });

    

});

function update_contacts(contacts) {
    $('#contacts').empty();
    var list = '<ul>';
    $(contacts).each(function(i) {


        list += '<li id="contact_' + contacts[i].id + '"><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', ' + contacts[i].first_name + '</a></li>';
    })
    list += '</ul>';
    $('#contacts').append(list);
}


