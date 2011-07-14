function nested_menu(ul_element_id, options){
    var default_options={
        'width':"auto",
        'wrap':false,
        'height':"20px",
        "visible":false
    }
    for(var key in default_options){
        if(options[key]==null || options[key]==undefined)
            options[key]=default_options[key]
    }

    var main_list = $("#"+ul_element_id);
    var links = $("#"+ul_element_id+" a")
    var list_items = $("#"+ul_element_id+" li");
    var expandable_list_items = $("#"+ul_element_id+" li:has(ul)")
    var sub_lists = $("#"+ul_element_id+" ul");    

    expandable_list_items.each(function(){
        $('>a',this).append("<span style='float:right'>&nbsp;&nbsp;&#187;</span>")
    })   

    if(options['wrap']==false)
        main_list.css("white-space","nowrap")
    
    if(options['width']!="auto"){
        main_list.css("width",options['width'])
        sub_lists.css("width",options['width'])
        main_list.css("white-space","normal") //force wrap when width is set.
    }

    links.css("display","block")
    list_items.css("height",options['height']);
    list_items.css({"position":"relative"});
    sub_lists.css("position", "absolute")    
    sub_lists.each(function(){
        var parent_li = $(this).parent();
        var parent_li_width = parent_li.width();
        $(this).css("top", 0);
        $(this).css("left", parent_li_width)
    })
    
    list_items.each(function(){
        //var timer;
        $(this).hover(
            function(){
                //$('>ul',this).show()
                //$('>ul',this).show('slide', {direction:"left"}, 200);
                //
                //clearTimeout(timer);
                $(this).siblings("li:has(ul)").children("ul").stop(true,true).hide()
                $('>ul',this).animate({opacity:"show"}, 'normal');
            },
            function(){
                //clearTimeout(timer);
                //timer=setTimeout(function(){
                    $('>ul',this).hide();
		//}, 500);
            }
        )
    })

    if(!options["visible"])
        main_list.css("display", "none")
    
    sub_lists.css("display", "none");
}
