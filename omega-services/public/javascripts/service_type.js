$(document).ready(function() {

			$("#arrow1").show();
			$("#arrow2").hide();
			$("#arrow3").hide();
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").hide();
			
			service_preview(1);
		    document.forms[0]["templates[service_type]"].value = "1";

    $('#services li').hover(function() {

		$(this).addClass('mouse_enter');
		if ($.browser.msie) {
		}
		else {
		
			$(this).siblings().stop(true).animate({
				opacity: '0.5'
			}, 1000);
		}
	    var index = $("#services li").index(this);
		if (index == 0) {
			$("#arrow1").show();
			$("#arrow2").hide();
			$("#arrow3").hide();			
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").hide();
		}
		
		else if (index == 1) {
			$("#arrow1").hide();
			$("#arrow2").show();
			$("#arrow3").hide();			
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").hide();

			
		}
		
		else if (index == 2) {
			$("#arrow1").hide();
			$("#arrow2").hide();
			$("#arrow3").show();	
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").hide();
		}
		
		else if (index == 3) {
			$("#arrow1").hide();
			$("#arrow2").hide();
			$("#arrow3").hide();
			$("#arrow4").show();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").hide();
			
		}
		
		else if (index == 4) {
			$("#arrow1").hide();
			$("#arrow2").hide();
			$("#arrow3").hide();
			$("#arrow4").hide();
			$("#arrow5").show();
			$("#arrow6").hide();
			$("#arrow7").hide();
			
		}
		
		else if (index == 5) {
			$("#arrow1").hide();
			$("#arrow2").hide();
			$("#arrow3").hide();
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").show();
			$("#arrow7").hide();
			
		}
		
		else if (index == 6) {
			$("#arrow1").hide();
			$("#arrow2").hide();
			$("#arrow3").hide();
			$("#arrow4").hide();
			$("#arrow5").hide();
			$("#arrow6").hide();
			$("#arrow7").show();
			
		}
		

		service_preview(this.id);
		
		document.forms[0]["templates[service_type]"].value = this.id;

		
    }, function() {
		
		if ($.browser.msie) {
		}
		else {
		
			$(this).siblings().stop(true).animate({
				opacity: '1.5'
			}, 1000);
		}
	    $(this).removeClass('mouse_enter');	

    }	
	);
	
	
});

function service_preview(value) {
	
    $.ajax({
        type: "GET",
        url: "/services/types/service_preview",
        data: "id=" + value,
        success: function(html) {
            $("#service_preview").html(html);
        }
    });


}

