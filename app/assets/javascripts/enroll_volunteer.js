$(document).ready(function() {

    $('.tpickr').timepicker();
    $('.datepickr').datepicker({minDate: 0});
    
    $('#search_volunteer').hide();
    $('#create_volunteer').hide();

   
    $('#enroll_volunteer_search_the_database').click(function() {

       $('#search_volunteer').show();
       $('#create_volunteer').hide();

       
      
	  
	  
	  });
	  
	  $('#enroll_volunteer_enter_volunteer_information').click(function() {

       $('#search_volunteer').hide();
       $('#create_volunteer').show();

       
      
	  
	  
	  });
		   
      email = document.getElementById('email').value;
       
	   $('#search').click(function() {
 		
	   $.ajax({
        type: "GET",
        url: "/volunteering/records/volunteer_lookup",
        data: "email=" + email,
        success: function(html) {
            $("#volunteer_application").html(html);
        }
		
    	})

		});
	
	
	
})

