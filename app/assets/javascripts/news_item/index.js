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

//under construction
function fetch_news(){
	var req = $.ajax({
	    url : 'http://ymqdomega2.dhcp.ymq.sap.corp:3001/groups/4fdf9b803ce7615efa000001/stories/10',
	    dataType : "jsonp",
	    timeout : 10000
	});
	
	req.success(function() {
	    console.log('Yes! Success!');
	});
	
	req.error(function() {
	    console.log('Oh noes!');
	});
	
	
	/*
	$.getJSON('http://ymqdomega2.dhcp.ymq.sap.corp:3001/groups/4fdf9b803ce7615efa000001/stories/10.json?callback=?', function(data) {
		alert(data)
		
	  var items = [];
	
	  $.each(data, function(key, val) {
	    items.push('<li id="' + key + '">' + val + '</li>');
	  });
	
	  $('<ul/>', {
	    'class': 'my-new-list',
	    html: items.join('')
	  }).appendTo('body');
	  
	}).success(function() { alert("second success"); })
.error(function(jqXHR, textStatus, errorThrown) {
        alert("error " + textStatus);
        alert("incoming Text " + jqXHR.responseText);
    })
.complete(function() { alert("complete"); });*/
}
