$(function(){
	$('#news_item_list_link').click(function(){
		show_news_item_list();
	});
	$('#news_item_source_list_link').click(function(){
		show_news_item_source_list();
	});
	$('#news_item_settings_link').click(function(){
		show_news_item_settings();
	});
});

$.fn.extend({
    add_keywords_deletion_effect: function(){
        $(this).hover(
			function(){
				$(".delete_keyword", this).css("visibility","visible")
			},
			function(){
				$(".delete_keyword", this).css("visibility","hidden")
			}
		);
    }
});

function show_news_item_list(){
	if($('#news_item_menu div#news_item_list_link').hasClass('inactive')){
		$('#news_management_content div.show').removeClass('show').addClass('hide');
		$('#news_management_content div#news_item_list_area').removeClass('hide').addClass('show');
		$('#news_item_menu div.active').removeClass('active').addClass('inactive');
		$('#news_item_menu div#news_item_list_link').removeClass('inactive').addClass('active');
	}
}
function show_news_item_source_list(){
	if($('#news_item_menu div#news_item_source_list_link').hasClass('inactive')){
		$('#news_management_content div.show').removeClass('show').addClass('hide');
		$('#news_management_content div#news_item_source_list_area').removeClass('hide').addClass('show');
		$('#news_item_menu div.active').removeClass('active').addClass('inactive');
		$('#news_item_menu div#news_item_source_list_link').removeClass('inactive').addClass('active');
	}
}
function show_news_item_settings(){
	if($('#news_item_menu div#news_item_settings_link').hasClass('inactive')){
		$('#news_management_content div.show').removeClass('show').addClass('hide');
		$('#news_management_content div#news_item_settings_area').removeClass('hide').addClass('show');
		$('#news_item_menu div.active').removeClass('active').addClass('inactive');
		$('#news_item_menu div#news_item_settings_link').removeClass('inactive').addClass('active');
	}
}

// not using
function add_keywords_deletion_effect(){
	$(".keyword").each(function(index, element){
		$(this).hover(
			function(){
				$(".delete_keyword", this).css("visibility","visible")
			},
			function(){
				$(".delete_keyword", this).css("visibility","hidden")
			}
		);
	});
}
