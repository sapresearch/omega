$(function() {

	// Add function to add volunteers.
 	$('#volunteers-list').delegate('li', 'click', function() {
    var self = $(this);
		var contact_id = self.attr('ui-data');
		$('#contacts_to_add').prepend(
			'<li ui-data="'
			+ contact_id
			+ '"><span class="om-icon-only om-blue-icon ui-icon-minus" data-tooltip="Remove this volunteer">'
			+ '</span><span class="remove-contacts">'
			+ self.text().trim()
			+ '</span></li>');
		update_contact_id_values(contact_id);
	});

	// Add function to remove volunteers.
	$('#contacts_to_add').delegate('li', 'click', function() {
		$(this).remove();
		update_contact_id_values();
	});

	// Add data-tooltip to each skill or interest in the accordion.
	// The name
	$('#accordion').find('#service_body').each(function() {
		var service_body = $(this);
		service_body.find('a').each(function() {
			var self = $(this);
			var category_name = self.attr('name');
			self.attr('data-tooltip', "See volunteers with this " + category_name);
		});
	});

});




// This function is assigned to the HTML elements by the SearchHelper module.  The function is assigned to list item elements in the accordion.
function display_search_results(contacts, position_id){
	var separates_each_contact = ",,"
	var separates_name_from_id = ","
	contacts_array = contacts.split(separates_each_contact)
	contacts_array.splice([contacts_array.length - 1], 1); // This gets rid of the last element, after the last ",," that is always empty
	for(i=0; i < contacts_array.length; i++){
		contact = contacts_array[i].split(separates_name_from_id);
		var name = contact[0];
		var contact_id = contact[1];
		$( "#volunteers-list" ).html( '<li ui-data="'
																	+ contact_id
																	+ '"><span class="om-icon-only om-blue-icon ui-icon-plus" data-tooltip="Add this volunteer"></span>'
																	+ name
																	+ '</li>' );
	}
}

/**
 * update #assigned_contacts hidden field with the values from the assigned contact list
 * the corresponding contact id is stored in the dom with the ui-data attribute
 * on update action (add or remove) we iterate over the list items and build a string which cointains all the cids from li elements
 */
function update_contact_id_values() {

    var serialized_contact_ids = '[', separator = '';
    $('#contacts_to_add').find('li').each(function() {
        serialized_contact_ids += separator + $(this).attr('ui-data');
        separator = ',';
    });
    serialized_contact_ids += ']';

    $('#records_contact_ids').val(serialized_contact_ids);
}
