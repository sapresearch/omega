function search_accordion(){

    $( "#accordion" ).accordion({
         //active: index,
         //event: "mouseover",
         //animated: 'bounceslide',
         autoHeight: false,
         clearStyle: true,
         navigation: false,
         collapsible: true
    });

    $(".service_leaf").hover(
        function(){
            if(!$(this).hasClass("ui-state-active"))
                $(this).removeClass("service_leaf")
        },
        function(){
            $(this).addClass("service_leaf")
        }
    )
}

delete_list = function(){
	var old_volunteers_list = document.getElementById("volunteers-list");
	volunteers = old_volunteers_list.getElementsByTagName("li");
	old_volunteer_count = volunteers.length;
	for(j=1; j <= old_volunteer_count; j++){
		(volunteers[0].parentNode).removeChild(volunteers[0]);
	}
}

move_element = function(name, contact_id, position_id){
	element_to_remove = document.getElementById(name);

	var right_data = document.getElementById("records_to_add");
	var count = right_data.getElementsByTagName("input").length
	if(count > 3){
		var index_number_of_last_element = (count/3) - 1;
	}
	else var index_number_of_last_element = 0;

	var position_id_input = document.createElement("input");
	position_id_input.setAttribute("value", position_id);
	position_id_input.setAttribute("id", "records_" + index_number_of_last_element + "_position_id");	
	position_id_input.setAttribute("name", "records[" + index_number_of_last_element + "][position_id]");	
	position_id_input.setAttribute("type", "hidden");	

	var contact_id_input = document.createElement("input");
	contact_id_input.setAttribute("value", contact_id);
	contact_id_input.setAttribute("id", "records_" + index_number_of_last_element + "_contact_id");
	contact_id_input.setAttribute("name", "records[" + index_number_of_last_element + "][contact_id]");
	contact_id_input.setAttribute("type", "hidden");

	var status_input = document.createElement("input");
	status_input.setAttribute("value", "accepted");
	status_input.setAttribute("id", "records_" + index_number_of_last_element + "_status_accepted");	
	status_input.setAttribute("name", "records[" + index_number_of_last_element + "][status]");	
	status_input.setAttribute("type", "radio");	
	status_input.setAttribute("checked");	

	var para = document.createElement("p");
	para.setAttribute("onclick", "delete this;");
	para.innerHTML = name;
	para.appendChild(contact_id_input);
	para.appendChild(position_id_input);
	para.appendChild(status_input);

	span = document.createElement("span");
	span.setAttribute("data-tooltip", "Click to remove this contact");
	span.appendChild(para);
	right_data.appendChild(span);
}

delete_this = function(){
	alert(this);
	delete this;
}

generate_element = function(name, tag, position_id){
	delete_list();
	var volunteers_list = document.getElementById("volunteers-list");
	document.getElementById("result-header").innerHTML = 'Results:';
	names = name.split(",,");
	
	names.splice([names.length - 1], 1);
	for(i=0; i < names.length; i++){
		names[i].replace(/,,/, "");
		name_contact = names[i].split(",");
		var n = name_contact[0];
		var contact_id = name_contact[1];
		var volunteer = document.createElement("a");
		volunteer.setAttribute("href", "#");
		var function_args = "'" + n + "', '" + contact_id + "', '" + position_id + "'";
		volunteer.setAttribute("onclick", "move_element(" + function_args + ")");
		volunteer.setAttribute("id", n);
		var text = document.createTextNode(n);
		volunteer.appendChild(text);

		var lineItem = document.createElement("li");

		// editing
		var para = document.createElement("p");
		para.appendChild(volunteer);
		//
		lineItem.appendChild(para);
		volunteers_list.appendChild(lineItem);
	}
}
