	$(document).ready(function() {
		div_height();
		$('#skills div.draggable').draggable({containment: 'table#skills', snap: '.droppable_skills', snapMode: 'inner' });
		$('#interests div.draggable').draggable({containment: 'table#interests', snap: '.droppable_interests', snapMode: 'inner' });
		// Droppables to add tags.
		$("#droppable_skills").droppable({
			drop: function(event, ui) {
				if("other" == ui.draggable.attr('id')) {
					add_tag($( this ), ui.draggable, "#contact_skill_ids");
				}
			}
		});
		$("#droppable_interests").droppable({
			drop: function(event, ui) {
				if("other" == ui.draggable.attr('id')) {
					add_tag($( this ), ui.draggable, "#contact_interest_ids");
				}
			}
		});

		// Droppables to remove tags.
		$("#other_skills").droppable({
			drop: function(event, ui) {
				if("own" == ui.draggable.attr('id')) {
					remove_tag($( this ), ui.draggable, "#contact_skill_ids");
				}
			}
		});
		$("#other_interests").droppable({
			drop: function(event, ui) {
				if("own" == ui.draggable.attr('id')) {
					remove_tag($( this ), ui.draggable, "#contact_interest_ids");
				}
			}
		});
	});

	add_tag = function(self, dragged, input_id){
		var tag_id = dragged.attr('ui-data');
		var old_val = $(input_id).attr( 'value' ).replace(']', '');
		$(input_id).val(old_val + ", " + tag_id + "]");
		div_height();
		switch_css(dragged);
	}

	remove_tag = function(self, dragged, input_id){
		var tag_id = dragged.attr('ui-data');
		var old_val = $(input_id).attr( 'value' ).replace(']', '').replace('[', '').replace(' ', '').split(',');
		var index = -1;
		for(i=0; i < old_val.length; i++){
			var needle = RegExp(tag_id);
			var haystack = old_val[i].replace(" ", "");
			if(needle.test(haystack)){
				index = i;
			}
		}
		if(index != -1){ old_val.splice(index,1); }
		$(input_id).val(old_val.join(', '));

		var val = $(input_id).val;
		div_height();
		switch_css(dragged);
	}
		
	switch_css = function(dragged){
		if(dragged.attr( 'id' ) == "own"){
			dragged.css('background-color', 'green');
			dragged.css('color', 'white');
			dragged.attr( 'id', 'other');
		}
		else{
			dragged.css('background-color', 'lightBlue');
			dragged.css('color', 'black');
			dragged.attr( 'id', 'own');
		}
	}
	
	div_height = function(){
		var skills = $('#contact_skill_ids').attr( 'value' ).split(',').length;
		var interests = $('#contact_interest_ids').attr( 'value' ).split(',').length;

		// For add droppables.
		var longer = skills > interests ? skills : interests;
		var height = 36 * Math.ceil((longer + 1) / 3);
		$('#droppable_interests').css('height', height);
		$('#droppable_skills').css('height', height);

		//For other droppables.
		var inter = $('#other_interests').find( 'div' ).length;
		var own_inter = $('#droppable_interests').find( 'div' ).length;
		var i_count = inter - (interests - own_inter);
		//alert('i_count = (interests - own_inter) - other inter ' + i_count + ' ' + interests + ' ' + own_inter + ' ' + inter);
		
		var ski = $('#other_skills').find( 'div' ).length;
		var own_ski = $('#droppable_skills').find( 'div' ).length;
		var s_count = ski - (skills - own_ski);
		//alert('ski and own_ski and s_count ' + ski + ' ' + own_ski + ' ' + s_count);

		var count = i_count > s_count ? i_count : s_count;
		var height = 36 * Math.ceil((count + 1) / 3);
		$('#other_skills').css('height', height);
		$('#other_interests').css('height', height);
	}
