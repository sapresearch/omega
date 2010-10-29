/**
 *
 * plugin from http://www.fluidbyte.net/jquery-filter-plugin
 */

jQuery.fn.extend({
    highlight: function(search, insensitive, hls_class){
      var regex = new RegExp("(<[^>]*>)|("+ search.replace(/([-.*+?^${}()|[\]\/\\])/i,"\\$1") +")", insensitive ? "i" : "g");
      return this.html(this.html().replace(regex, function(a, b, c){
        return (a.charAt(0) == "<") ? a : "<span class=\""+ hls_class +"\">" + c + "</span>";
      }));
    }
});

// Unwrap function

jQuery.fn.extend({
  unwrap: function(){
    return this.each(function(){ $(this.childNodes).insertBefore(this); }).remove();
  }
});

// jFilter function

jQuery.fn.jfilter = function(o) {

  // Defaults
  var o = jQuery.extend( {
  	list: '#filterable',
	speed: '100',
	highlight: 'highlight'
  },o);

  return this.each(function(){
    $(this).keyup(function(){
		$('.'+o.highlight).unwrap();
		var filter = $(this).val();
	    $(o.list+' li').each(function () {
	        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
	            $(this).fadeOut(o.speed);
	        } else {
	            $(this).show();
				$(this).highlight(filter, 1, o.highlight);
	        }
	    });
	});
  });
};


$(function() {

    $('#user-list,#member-list,#sidebar-member-list').jScrollPane({showArrows: true});
    

    $('#user-filter').jfilter({
    list: '#user-list',
    speed: 100,
    highlight: 'highlight' // Class name with no "."
});


    /* jqueryui autocomplete for groups */
$('#sidebar-search-input').autocomplete({
        source : '/groups/autocomplete',
        minLength: 3,
        select: function(event, ui) {
            
            return false;
        }
    }).focus(function(){
    $(this).val('')
});

    $('#groups-list').find('li').mouseenter(
                             function() {
                                 $(this).find('div.item-list-actions-wrapper').fadeIn('fast')
                             }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').fadeOut('fast')
    });
});
