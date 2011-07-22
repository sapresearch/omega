function set_width(jquery_ul_element, link_padding_left, link_padding_right){
    if($(">li>a", jquery_ul_element).length==0)
        return;
    var max_width = 0
    $(">li>a", jquery_ul_element).each(function(){
        var width = $(">.original_list_link", this).outerWidth(true)
        if($(">.expansion_mark", this))
            width += $(">.expansion_mark", this).outerWidth(true)
        if(width>max_width)
            max_width = width
    })
    jquery_ul_element.css("width", max_width + link_padding_left + link_padding_right)
}

function nested_menu(ul_element_id, options){
    var default_options={
        'width':"auto",
        'wrap':false,
        'height':20,
        'link_padding_left':15,
        'link_padding_right':15,
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

    list_items.each(function(){
        var html = "<span class='original_list_link' style='float:left'>"+$('>a',this).html()+"</span>"
        $('>a',this).html(html)
    })

    expandable_list_items.each(function(){
        $('>a',this).append("<span class='expansion_mark' style='float:right'>&nbsp;&nbsp;&#187;</span>")
    })
    
    links.css("padding-left", options["link_padding_left"])
    links.css("padding-right", options["link_padding_right"])

    if(options['wrap']==false)
        main_list.css("white-space","nowrap")

    if(options['width']!="auto"){
        main_list.css("width",options['width'])
        sub_lists.css("width",options['width'])
        main_list.css("white-space","normal") //force wrap when width is set.
    }else{
        set_width(main_list,options["link_padding_left"],options["link_padding_right"])
        sub_lists.each(function(){
            set_width($(this),options["link_padding_left"],options["link_padding_right"])
        })
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
