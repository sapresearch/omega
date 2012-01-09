function switch_block_groups_requester(url){
    var type = $("#block_request_checkbox").is(":checked") ? "block" : "unblock";
    var data = {"type":type}

    $.ajax({
        url: url,
        type: "PUT",
        data: data,
        dataType: 'script',
        cache: false
    })
}