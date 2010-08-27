/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Jun 29, 2010
 * Time: 9:56:02 AM
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    $('[data-remote]').live('ajax:loading', function() {
        showAjaxAnimation()
    }).live('ajax:complete', function() {
        $("#ajax_loading_wrapper").hide();
    });


    var contact_filter = $('#contact_filter')

    contact_filter.keyup(function() {
        this.value == '' ? $('#clear_filter').hide() : $('#clear_filter').show();
    });
    $('#clear_filter').click(function() {
        contact_filter.val('');
        $('#contacts li').show();
        $(this).hide();
    });

    contact_filter.jfilter({
        list: '#contacts',
        speed: 100,
        highlight: 'highlight' // Class name with no "."
    });
    $.ajax({
        url: '/contacts/all',
        dataType: 'json',
        beforeSend: function(){
          showAjaxAnimation($('#contacts_group_pane'));  
        },
        success: function(data) {
            $('#contacts').empty();
            var list = '<ul>';
            $(data).each(function(i) {


                list += '<li id="contact_' + data[i].id + '"><a data-remote="true" href="/contacts/' + data[i].id + '">' + data[i].first_name + ', ' + data[i].last_name + '</a></li>';
            });
            list += '</ul>';
            $('#contacts').append(list);

        },
        complete : function(){
            $("#ajax_loading_wrapper").hide();
        }
    });


});

function update_contacts(contacts) {
    $('#contacts').empty();
    var list = '<ul>';
    $(contacts).each(function(i) {


        list += '<li id="contact_' + contacts[i].id + '"><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].first_name + ', ' + contacts[i].last_name + '</a></li>';
    })
    list += '</ul>';
    $('#contacts').append(list);
}

/**
 * loading animation for ajax requests
 * @cl = layer that should get covered - jquey selector
 */
function showAjaxAnimation(cl) {
    var cm = cl ||  $('#cm');
    var pos = cm.position();

    $("#ajax_loading_wrapper").width(cm.width()).height(cm.outerHeight()).css({ 'left' :pos.left, 'top': pos.top, 'opacity':0.8}).show()
}

//function l(msg) {
//    console.log(msg);
//}