function edit_service_basic_info(){
  $(".edit_part .update_links a").click();
  $('#service_basic_info').switchClass("show_part", "edit_part",0)
  $("#service_name").select();
}
function preview_service_basic_info(){
  $('#service_name_preview').html($('#service_name').val())
  $('#service_description_preview').html(nl2br($('#service_description').val()))
  $('#service_basic_info').switchClass("edit_part", "show_part",0)
}

function edit_service_section(){
  $(".edit_part .update_links a").click();
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
  $('#service_customization_info').switchClass("show_part", "edit_part",0)
}
function preview_service_customization_info(){
  var html = ""
  if(!is_empty_html($('#service_detail').html()))
  {
    html += '<div class="item" id="show_service_detail">'
    html += '<span class="item_title">Service Details'
    if($('#has_service_detail_template').is(':checked'))
      html += ' (Set as template)'
    html += ':</span>'
    var service_detail_json = field_values_to_json("service_detail", false)
    $.each(service_detail_json,function(key, val){
        html += '<div class="field">'
        html += '<span class="label"><strong>'+key+':</strong></span>'
        html += '<span class="value">'+(is_empty_html(val) ? '<span class="blank_sign">(blank)</span>' : nl2br(val))+'</span>'
        html += '</div>'
    })
    html += '</div>'
  }

  if(!is_empty_html($('#service_registration').html()))
  {
    html += '<div class="item" id="show_service_registration_form">'
    html += '<span class="item_title">Registration Form'
    if($('#has_service_registration_template').is(':checked'))
      html += ' (Set as template)'
    html += ':</span>'
    html += '<ul class="service_customization_form" >'
    html += $('#service_registration').html()
    html += '</ul>'
    html += '</div>'
  }

  $('#service_customization_info .show_body').html(html);
  $('#service_customization_info').switchClass("edit_part", "show_part",0)
}


