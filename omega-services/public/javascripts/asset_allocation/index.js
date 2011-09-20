function get_origin(ui_helper){
    var class_names = ui_helper.attr("class").split(" ")
    var origin_element = $("."+class_names[0])[0]
    return origin_element
}