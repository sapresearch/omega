$(function() {

    /**
     * get all contacts out of the db
     */
    $.ajax({
        url: '/contacts/all',
        dataType: 'json',
        success: function(data) {
            update_contacts(data);

        }
    });
    // selector caching
    var $ac_contacts = $('#ac-contacts');
    /**
     * autocomplete for contacts
     */
    $ac_contacts.autocomplete({
        source : '/contacts/autocomplete',
        minLength: 3,
        select: function(event, ui) {
            $.ajax({
                url: '/contacts/' + ui.item.id,
                dataType: 'script',
                cache : false
            });
            return false;
        }
    });

    var $clear_filter = $('#clear-filter');
    $ac_contacts.keyup(function() {
        this.value == '' ? $clear_filter.hide() : $clear_filter.show();
    });
    $clear_filter.click(function() {
        $ac_contacts.val('');
        $(this).hide();
    });

    /**
     * jQuery ui accordion for all contacts households and organizations
     */
    $("#accordion").accordion({
        fillSpace: true
    });

    /**
     * show the panel to add or remove a contact from a group
     */
    $('#contact-assignment').dialog({ autoOpen: false,
        title: 'Assign Contacts',
        modal: true,
        height:400,
        width:600
    });


    $('#assign-trigger').click(function() {
        $('#contact-assignment').dialog('open');
    });
     $("#contact_accordion").accordion();

    /**
     * contact group assignment by draging and dropping
     * attach drop event to the contact groups (organizations and households)
     */
    $('#accordion').find('tr').droppable({
        drop: function(event, ui) {

            $(this).effect('pulsate');
            var group_id = this.getAttribute('data-id');
            var contact_id = ui.draggable.attr('data-id');
            var from_group_id = ui.draggable.attr('data-group-id');
            if (from_group_id == undefined) {
                
                $.ajax({
                    url :  '/contacts/' + contact_id + '/groups/' + group_id + '/assign/',
                    type: 'PUT',
                    dataType : 'json'
                })
            } else {
                $.ajax({
                    url :  '/contacts/' + contact_id + '/groups/' + from_group_id + '/move/' + group_id,
                    type: 'PUT',
                    dataType : 'json',
                    success: function() {
                        $('#contacts').find('tr[data-id=\'' + contact_id + '\']').remove();
                    }
                })
            }
        }
    });
});

/**
 * retrieve contacts obejct. create the html structure for the contact list
 * empty the current contact list and append the new contacts
 * if we get a group id passed in we show the contacts of a particular group, if not we show all contacts
 * @param contacts
 * @param group_id
 * @param group_name
 */
function update_contacts(contacts, group_id, group_name) {
    //selector caching
    var $contacts = $('#contacts');
    $contacts.empty();
    var list = '<table>';
    if (group_id !== undefined && typeof group_id == "number") {
        $(contacts).each(function(i) {
            list += '<tr data-id="' + contacts[i].id + '" data-group-id="' + group_id + '"><td><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
                    + contacts[i].first_name + '</a>'
                    + '<td class="text-right" width="40px"><span class="mgm-contact hide">'
                    + '<span data-tooltip="Move me into another group by dragging me into a group on the left" class="om-icon-only om-blue-icon ui-icon-arrow-4-diag"></span>'
                    + '<a href="/contacts/' + contacts[i].id + '/groups/' + group_id + '/remove" '
                    + 'class="remove-contact" data-remote="true" data-method="put">'
                    + '<span class="om-icon-only om-blue-icon ui-icon-shuffle" data-tooltip="remove this contact from: ' + group_name + '"></span></a>'
                    + '</span></td>'
                    + '</td></tr>';

        });
    } else {
        $(contacts).each(function(i) {

            list += '<tr data-id="' + contacts[i].id + '"><td><a data-remote="true" href="/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
                    + contacts[i].first_name + '</a>'
                    + '<td class="text-right" width="40px"><span class="mgm-contact hide">'
                    + '<span data-tooltip="Add me to another group me by dragging into a group on the left" class="om-icon-only om-blue-icon ui-icon-arrow-4-diag"></span>'
                    + '<a  data-remote="true" data-method="delete" href="/contacts/' + contacts[i].id + '" class="remove-contact">'
                    + '<span class="om-icon-only om-blue-icon ui-icon-trash" data-tooltip="Delete this contact from the database"></span></a>'
                    + '</span></td>'
                    + '</td></tr>';

        });
    }
    list += '</table>';
    $contacts.append(list);
    $contacts.find('tr').draggable({
            helper: 'clone',
            start: function(event, ui) {
                // remove tipsy tooltip otherwise it wont get removed anymore
                $("div.tipsy").remove();
            }
        }).find('.mgm-contact').toggleClass('hide');
   
    $contacts.find('a.remove-contact').bind("ajax:success", function() {
        $(this).closest('tr').remove();
    });

}