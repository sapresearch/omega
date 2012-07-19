function new_customization(url){
    $('#select_customizations_field').hide();
    $.ajax({
        url: url,
        dataType: 'script',
        cache: false
    });
}

function edit_customization(){
    var option = $('#select_customizations option:selected')
    var edit_url = option.data('edit_url');
    $.ajax({
        url: edit_url,
        dataType: 'script',
        cache: false
    });
}

function existing_customizations(){
    $('#select_customizations_field').show();
    edit_customization();
}