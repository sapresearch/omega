function l(msg) {
    if (window.console) {
        console.log(msg)
    }

}
$(function() {
    $('#fb_elements li').draggable({
        appendTo: "body",
        helper: "clone"


    });


    /**
     * add toggle functionality to the control boxes on the left
     */
    $('.widget_control').addClass('icon_minus').click(function() {

        $(this).toggleClass(function() {
            if ($(this).is('.icon_minus')) {

                return 'icon_plus';
            } else {
                return 'icon_minus';
            }

        })
    }).toggle(function() {

        $(this).siblings('.widget_content').hide()
    }
            , function() {
        $(this).siblings('.widget_content').show()
    }
            );

    $('#custom_form .ui_element_minus').live('click', function() {

        $(this).parent('li').remove();
        $('#fb_element_options').empty();
    });
    $('#custom_form').droppable({
        accept: '#fb_elements li',
        drop: function(event, ui) {
            //determine which ui element is dropped

            // ui.draggable.children()[0] = span element which has the element info
            // get all classes of the element to determin which ui em is dropped
            var t = ui.draggable.children().eq(0).attr('class').split(" ");
            //@u = ui em

            var u;
            // $.each() looks more convenient break wont work
            var reg_exp = /ui_em/;
            for (var i in t) {
                if (reg_exp.test(t[i])) {
                    u = t[i].replace('ui_em_', '');
                    break;
                }
            }
            reg_exp = null;
            var uid = generate_uid(u);
            //store data to the ui element 

            $('<li class="corners">' + build_new_form_em(u, uid) + '</li>').data('uid', uid).appendTo(this);


        }

    }).sortable();
    $('#custom_form .ui_icon_edit_app').live('click', function() {
        var e = $(this).parent('li.corners');
        var d = e.data('uid');
        build_cf_em_config(d);
    });

});


//generate uique id for the cf element
function generate_uid(em) {
    return (Math.floor(Math.random() * 10001) + '_' + em);
}

// cf prefix for custom form

function build_new_form_em(the_new_em, uid) {

    var em = typeof(the_new_em) == 'undefined' ? 'element not recognized' : the_new_em;
    var cf_em;


    switch (em) {
        case "textarea":
            cf_em = '<textarea name="' + uid + '"></textarea>'
            break;
        case 'input':
            cf_em = '<input type="text" />'
    }

    var s = '<label for="' + uid + '" class="cf_label">your label</label>';
    s += '<div class="cf_div">' + cf_em + '</div>';
    s += '<div class="cf_explanation" id="expl_' + uid + '"></div>';
    s += '<div class="ui_icon right ui_icon_edit_app"></div>';
    s += '<div class="ui_icon right ui_element_minus"></div>';
    s += '<div class="ui_icon right ui_icon_move"></div>';
    s += '<div class="clear"></div>';
    return s;
}

function build_cf_em_config(id) {
    //determine which element we want to configure
    $('#fb_element_options').empty();
    var html_em = id.replace(/[0-9].*_/, '');
    var opt;
    switch (html_em) {
        case 'textarea':

            label_builder(id);

            explanation_builder(id);


            break;
        case 'input':
            label_builder(id);


            var select = '<select>';
            select += '<option value="none">none</option>';
            select += '<option value="email">email</option>';
            select += ' <option value="url">url</option>';
            select += '<option value="number">number</option>';

            select += '</select>';
            $('#fb_element_options').append('<div>Validation' + select + '</div>');
            explanation_builder(id);

    }

}

function label_builder(id) {
    var label = '<div>Label <input type="text" id="label_opt_' + id + '"/></div>';

    $('#fb_element_options').append(label);

    $("#label_opt_" + id).keyup(function() {
        $('label[for=' + id + ']').text($(this).val())
    });
}

function explanation_builder(id) {

    var expl_text_area = '<div>Describtion <textarea id="expl_opt_' + id + '"></textarea></div>';
    $('#fb_element_options').append(expl_text_area);

    $("#expl_opt_" + id).keyup(function() {
        $('#expl_' + id).text($(this).val())
    });
}