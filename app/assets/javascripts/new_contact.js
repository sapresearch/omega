var csrf_token = $('meta[name=csrf-token]').attr('content'),csrf_param = $('meta[name=csrf-param]').attr('content'),
            flash_session_key = $('meta[name=flash-session-key]').attr('content'),
            flash_session_cookie = $('meta[name=flash-session-cookie]').attr('content');

    $.fn.extend({
        liveUpload: function() {
            var uploadifyScriptData = {};
            uploadifyScriptData['uploadify'] = true;
            uploadifyScriptData[flash_session_key] = flash_session_cookie;
            uploadifyScriptData[csrf_param] = encodeURIComponent(encodeURIComponent(csrf_token));
            uploadifyScriptData['_accept'] = 'application/json';

            return $(this).each(function() {
                var input = $(this);

                if (input.data('liveUploaded')) return; // continue
                else input.data('liveUploaded', true);


                var id = input.attr('id'),
                        name = input.attr('name');

                input.attr('name', null);

                var newInput = $(document.createElement('input'))
                        .attr('id', id + '_upload')
                        .attr('type', 'hidden')
                        .attr('name', name)
                        .css('display', 'none');
                var displayInput = $(document.createElement('input'))
                        .attr('id', id + '_display')
                        .attr('type', 'text')
                        .attr('disabled', 'true')
                        .css('display', 'none');

                input.uploadify({
                    auto        : true,
                    uploader    : '/uploadify/uploadify.swf',
                    script      : '/uploads',
                    cancelImg   : '/uploadify/cancel.png',
                    buttonImg   : '/images/browse.png',
                    buttonText  : 'Upload',
                    folder      : '/public/uploads',

                    scriptData  : uploadifyScriptData,
                    onComplete  : function(event, queue, file, response, data) {
                        var result = $.parseJSON(response);
                        var upload = result.upload;

                        input.after(newInput).after(displayInput);
                        newInput.val(upload.id);
                        displayInput.val(upload.upload_file_name);
                        displayInput.show();
                    },
                    onError: function(event, queue, file, error) {
                        alert("onError");
                    }
                });
            });
        }
    });
