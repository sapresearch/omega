$(function(){
	$('.tpickr').timepicker();
	$('.datepickr').datepicker({minDate: 0});

	/* jqueryui datepicker defaults */
   $('#volunteer_position_form').find(".datepickr").datepicker({ minDate: 0 });
});
