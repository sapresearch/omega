// Highlight function

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
		//$('.'+o.highlight).unwrap();

		var filter = $(this).val();
        var reg = new RegExp(filter, "i");
	    $(o.list+' li').each(function () {
	        if ($(this).text().search(reg) < 0) {
	            $(this).hide();
	        } else {
	            $(this).show();
				//$(this).highlight(filter, 1, o.highlight);
	        }
	    });
	});
  });
};