function matrix(table_element_id, x_array, y_array, options){
    options = $.extend({
        // default options here
    },options)

    var html = "<table id='"+table_element_id+"'>"
    html += "<tr class='matrix_col_tr' ><td id='top_left_td'></td>"
    for(var j=0; j<x_array.length; j++)
        html += "<td id='matrix_col_td_"+j+"' class='matrix_col_td'>"+x_array[j]+"</td>";
    html +="</tr>"
    for(var i=0; i<y_array.length; i++){
        var parity = (i%2==0 ? "even" : "odd")
        html += "<tr id='matrix_row_tr_"+i+"' class='"+parity+"' >"
        html += "<td id='matrix_row_td_"+i+"' class='matrix_row_td'>"+y_array[i]+"</td>"
        for(var j=0; j<x_array.length; j++){
            html += "<td class='matrix_cell_td' id='matrix_cell_td_"+i+"_"+j+"'>"
            html += "<label for='"+table_element_id+"_checkbox_"+i+"_"+j+"'></label>"
            html += "<input id='"+table_element_id+"_checkbox_"+i+"_"+j+"' type='checkbox' />"
            html += "</td>";
        }
        html += "</tr>"
    }
    html += "</table>"
    return html;
}



