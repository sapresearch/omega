$(function() {

	// Function to add volunteers to invite volunteers section.
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
	$('#accordion').find('#service_body').each(function() {
		var service_body = $(this);
		service_body.delegate('li', 'click', function() {
			var self = $(this);
			var category = self.attr('name');
			var val = self.text().trim();
  	  var data = {search:{column:{column:category, query:val}}}
			ajax_filter(data);
		});
	});
});

		function ajax_filter(data) {

   	 	$.ajax({
   	     type: "GET",
   	     data: data,
   	     dataType: 'script',
   	     cache: false

			});
		}

//			all_contacts = new Array;
//			for(var row in js_matrix){
//				for(var hash in row){
//					if(hash[0] == category_name){
//						var contact = new Array;
//						for(var x in row){
//							if(x[0] == "contact_id"){
//								contact[0] = (row[contact_id]);
//							}
//							if(x[0] == "first_name"){
//								contact[1] = (row[contact_name]);
//							}
//								all_contacts.push(contact);
//						}
//					}
//				}
//			}
//
//			for(var c in all_contacts){
//				name = c[0];
//				contact_id = c[1];
//				$( "#volunteers-list" ).html( '<li ui-data="'
//																			+ contact_id
//																			+ '"><span class="om-icon-only om-blue-icon ui-icon-plus" data-tooltip="Add this volunteer"></span>'
//																			+ name
//																			+ '</li>' );
//			}
//		});
//	});

	// Add ajax function to update @search_matrix.
	//$('#filter_checkboxes').delegate('input', 'click', function() {
	//var is_checked = $(this).is(":checked") ? "on" : "off";

	//$.ajax({
		//type: "GET",
		//data: ({"filter":is_checked}),
		//dataType: 'script',
		//cache: false
	//})
//});






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


// Temporarity deparacated for testing.
//function filter(column){
//	var val = $( '#' + column ).is(":checked") ? "on" : "off";
//	var data = {column:val}
//
//	$.ajax({
//		type: "GET",
//		data: data,
//		dataType: 'script',
//		cache: false
//	})
//}

function switch_user(){
    var val = $("#filter_checkboxes").find("#user_switch").is(":checked") ? "on" : "off";
    var data = {"user_switch":val}

    $.ajax({
        type: "GET",
        data: data,
        dataType: 'script',
        cache: false
    })
}
