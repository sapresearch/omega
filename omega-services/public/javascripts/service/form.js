function check_service_sections_count(){
    if(service_sections_count<=1)
        $('.delete_service_section').hide()
    else
        $('.delete_service_section').show()
}
function refresh_service_section_index(){
    $(".service_section_form .service_section_title").each(function(index){
        $(this).html("Section "+(index+1))
    })
}

function delete_service_section(element_id)
{
    service_sections_count--;
    $("#"+element_id).hide("slow", function(){
        $(this).remove();
        refresh_service_section_index()
    })
    check_service_sections_count()
}

// general transformation functions, not tested, not in use
function edit_to_show_body(part_id){
    var part_element = $("#"+part_id)
    var show_body_element = $(".show_body", part_element)
    var edit_body_element = $(".edit_body", part_element)
    $(".field", edit_body_element).each(function(){
        show_body_element.append(edit_to_show_field_html($(this)))
    })
}
function edit_to_show_field_html(field_element){
    var label_element = $("label", field_element);
    var value_field_element = $("#"+label_element.attr("for"));
    var value = value_field_element.val();

    return '<div class="field">\
                <span class="label"><strong>'+label_element.text()+'</strong></span>\
                <span class="value">'+value+'</span>\
            </div>'
}

function edit_service_basic_info(){
  $(".edit_part .update_links a").click();
  $('#service_basic_info').switchClass("show_part", "edit_part",0)
  $("#service_name").select();
}
function preview_service_basic_info(){
  // name
  var service_name = $('#service_name').val();
  if(is_empty_html(service_name))
    $('#service_name_preview').html(blank_sign('(blank)'))
  else
    $('#service_name_preview').html(service_name)

  // description
  var service_description = nl2br($('#service_description').val());
  if(is_empty_html(service_description))
    $('#service_description_preview').html(blank_sign('(blank)'))
  else
    $('#service_description_preview').html(service_description)

  // belongs to
  var super_service_name = $("#service_super_service_id option:selected").text();
  if(super_service_name=="None")
    $('#super_service_preview').html(blank_sign('(none)'))
  else
    $('#super_service_preview').html(super_service_name)

  $('#service_register_type_preview').html($('#service_register_type').val())
  $('#service_capacity_preview').html($('#service_capacity').val())
  $('#service_basic_info').switchClass("edit_part", "show_part",0)
}

function edit_service_section(){
  $(".edit_part .update_links a").click();
  check_service_sections_count();
  $('#service_section_info').switchClass("show_part", "edit_part",0)
}
function recurrence_interval(element)
{
  var str = ""
  var year = $(".year",element).val()
  var month = $(".month",element).val()
  var day = $(".day",element).val()
  var hour = $(".hour",element).val()
  var minute = $(".minute",element).val()

  if(year!='0')
    str += (year + (year=='1' ? " year " : " years ") )
  if(month!='0')
    str += (month + (month=='1' ? " month " : " months ") )
  if(day!='0')
    str += (day + (day=='1' ? " day " : " days ") )
  if(hour!='0')
    str += (hour + (hour=='1' ? " hour " : " hours ") )
  if(minute!='0')
    str += (minute + (minute=='1' ? " minute " : " minutes ") )

  return $.trim(str)
}
function preview_service_section(){
  var html = ""
  $('.service_section_form').each(function(i){
    html += '<div class="item show_service_section" id="show_service_section_'+i+'">'
    html += '<span class="item_title service_section_title">Section '+(i+1)+':</span>'
    html += '<div class="field">\
              <span class="label"><strong>Contact:</strong></span>\
              <span class="value">'+$(".contact option:selected", this).text()+'</span>\
            </div>'
    html += '<div class="field">\
              <span class="label"><strong>Location:</strong></span>\
              <span class="value">'+$(".location",this).val()+'</span>\
            </div>'
    html += '<div class="field">\
              <span class="label"><strong>Start at:</strong></span>\
              <span class="value">'+$(".start_at",this).val()+'</span>\
            </div>'
    html += '<div class="field">\
              <span class="label"><strong>End at:</strong></span>\
              <span class="value">'+$(".end_at",this).val()+'</span>\
            </div>'
    if($(".recurrence", this).is(":checked"))
    {
      html += '<div class="field">\
                <span class="label"><strong>Reoccur:</strong></span>\
                <span class="value">Every '+recurrence_interval(this)+'</span>\
              </div>'
      html += '<div class="field">\
              <span class="label"><strong>Until:</strong></span>\
              <span class="value">'+$(".recurrence_end_at",this).val()+'</span>\
            </div>'
    }
    html += '</div>'
  })
  $('#service_section_info .show_body').html(html);
  $('#service_section_info').switchClass("edit_part", "show_part",0)
}

function edit_service_customization_info(){
  $(".edit_part .update_links a").click();
  $("#service_customization_info .show_body").empty();
  $('#service_customization_info').switchClass("show_part", "edit_part",0)
}
function preview_service_customization_info(){
  var html = ""
  if(!is_empty_html($('#service_detail').html()))
  {
    html += '<div class="item" id="show_service_detail">'
    html += '<span class="item_title">Service Details'
    if($('#has_service_detail_template').is(':checked'))
      html += ' ( Set as template )'
    html += ':</span>'
    var service_detail_json = field_values_to_json("service_detail", false)
    $.each(service_detail_json,function(key, val){
        html += '<div class="field">'
        html += '<span class="label"><strong>'+key+':</strong></span>'
        html += '<span class="value">'+(is_empty_html(val) ? blank_sign('(blank)') : nl2br(val))+'</span>'
        html += '</div>'
    })
    html += '</div>'
  }

  if(!is_empty_html($('#service_registration').html()))
  {
    html += '<div class="item" id="show_service_registration_form">'
    html += '<span class="item_title">Registration Form'
    if($('#has_service_registration_template').is(':checked'))
      html += ' ( Set as template )'
    html += ':</span>'
    html += '<ul class="service_customization_form" >'
    html += $('#service_registration').html()
    html += '</ul>'
    html += '</div>'
  }

  $('#service_customization_info .show_body').html(html);
  preview_validations();
  $('#service_customization_info').switchClass("edit_part", "show_part",0)
}


function preview_validations(){
    $("#show_service_registration_form .service_customization_form li").each(function(){
        var label = $("label", this);
        if(label.attr("data-length")){
            var lengths = label.attr("data-length").split("-")
            var min = lengths[0];
            var max = lengths[1];
            $(this).append("<span class='constraint'><span class='bold'>Length:</span> "+min+" ~ "+max+"</span>");
        }
        if(label.attr("data-format")=="email")
            $(this).append("<span class='constraint'><span class='bold'>Format:</span> Email</span>");
        if(label.attr("data-format")=="number")
            $(this).append("<span class='constraint'><span class='bold'>Format:</span> Number</span>");
        if(label.attr("data-format")=="name")
            $(this).append("<span class='constraint'><span class='bold'>Format:</span> Name</span>");
    })
}


function init_text_editor(text_area_id){
    $("body").addClass("yui-skin-sam")
    var myEditor = new YAHOO.widget.Editor(text_area_id, {
        height: '300px',
        width: '522px',
        dompath: true, //Turns on the bar at the bottom
        animate: true //Animates the opening, closing and moving of Editor windows
    });
    myEditor.render();
}


