jQuery.showFlash = function(msg, n) {
    var msg_div = $('#notification-flash-wrapper');
    msg_div.find('div').html(msg);
    msg_div.css('top', ($(window).height() / 2) + 'px');
    if (n === 'ajax') {

        msg_div.fadeIn('fast');
    } else if (n === undefined) {

        msg_div.fadeIn('fast').delay(2000).fadeOut();
    }

    $(window).resize(function() {
        msg_div.css('top', ($(window).height() / 2) - (msg_div.height() / 2) + 'px');
    });
};

/* jquery plugin - default settings */
$.fn.tipsy.defaults = {
    delayIn: 0,      // delay before showing tooltip (ms)
    delayOut: 0,     // delay before hiding tooltip (ms)
    fade: false,     // fade tooltips in/out?
    fallback: '',    // fallback text to use when no tooltip text
    gravity: 's',    // gravity
    html: false,     // is tooltip content HTML?
    live: false,     // use live event support?
    offset: 0,       // pixel offset of tooltip from element
    opacity: 0.8,    // opacity of tooltip
    title: function() {
        return this.getAttribute('data-tooltip')
    },  // attribute/callback containing tooltip text
    trigger: 'hover' // how tooltip is triggered - hover | focus | manual
};


/* dom ready! here we go */

jQuery(function($) {
    jQuery.ajaxSetup({ dataFilter: function(data, type) {
        return (!data || jQuery.trim(data) == '') ? '{}' : data;
    } });

    /* jrails adapter for jquery ajax support in rails */

    var csrf_token = $('meta[name=csrf-token]').attr('content'),csrf_param = $('meta[name=csrf-param]').attr('content'),
            flash_session_key = $('meta[name=flash-session-key]').attr('content'),
            flash_session_cookie = $('meta[name=flash-session-cookie]').attr('content');

    $.fn.extend({
        /**
         * Triggers a custom event on an element and returns the event result
         * this is used to get around not being able to ensure callbacks are placed
         * at the end of the chain.
         *
         * TODO: deprecate with jQuery 1.4.2 release, in favor of subscribing to our
         *       own events and placing ourselves at the end of the chain.
         */
        triggerAndReturn: function (name, data) {
            var event = new $.Event(name);
            this.trigger(event, data);

            return event.result !== false;
        },

        /**
         * Handles execution of remote calls firing overridable events along the way
         */
        callRemote: function () {
            var el = this,
                    method = el.attr('method') || el.attr('data-method') || 'GET',
                    url = el.attr('action') || el.attr('href'),
                    dataType = el.attr('data-type') || 'script';
            cache = el.attr('data-cache') || null;

            if (url === undefined) {
                throw "No URL specified for remote call (action or href must be present).";
            } else {
                if (el.triggerAndReturn('ajax:before')) {
                    var data = el.is('form') ? el.serializeArray() : [];
                    $.ajax({
                        url: url,
                        data: data,
                        dataType: dataType,
                        cache: cache,
                        type: method.toUpperCase(),
                        beforeSend: function (xhr) {
                            el.trigger('ajax:loading', xhr);
                        },
                        success: function (data, status, xhr) {
                            if (xhr.status == 201) {
                                el.trigger('rails:created', data);

                                return;
                            }
                            el.trigger('ajax:success', [data, status, xhr]);
                        },
                        complete: function (xhr) {
                            el.trigger('ajax:complete', xhr);
                        },
                        error: function (xhr, status, error) {
                            data = jQuery.httpData(xhr, this.dataType, this);
                            el.trigger('ajax:failure', [data, xhr, status, error]);
                        }
                    });
                }

                el.trigger('ajax:after');
            }
        }
    });

    /**
     *  confirmation handler
     */
    $('a[data-confirm],input[data-confirm]').live('click', function () {
        var el = $(this);
        if (el.triggerAndReturn('confirm')) {
            if (!confirm(el.attr('data-confirm'))) {
                return false;
            }
        }
    });


    /**
     * remote handlers
     */
    var remote_form = function (e) {
        $(this).closest('form').callRemote();
        e.preventDefault();
    };
    $('form[data-remote]').live('submit', remote_form);
    $('form[data-remote] input[type=submit]').live('click', remote_form);

    $('a[data-remote],input[data-remote]').live('click', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-method]:not([data-remote])').live('click', function (e) {
        var link = $(this),
                href = link.attr('href'),
                method = link.attr('data-method'),
                form = $('<form method="post" action="' + href + '"></form>'),
                metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

        if (csrf_param != null && csrf_token != null) {
            metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
        }

        form.hide()
                .append(metadata_input)
                .appendTo('body');

        e.preventDefault();
        form.submit();
    });

    /**
     * disable-with handlers
     */
    var disable_with_input_selector = 'input[data-disable-with]';
    var disable_with_form_selector = 'form[data-remote]:has(' + disable_with_input_selector + ')';

    $(disable_with_form_selector).live('ajax:before', function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.data('enable-with', input.val())
                    .attr('value', input.attr('data-disable-with'))
                    .attr('disabled', 'disabled');
        });
    });

    $(disable_with_form_selector).live('ajax:complete', function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.removeAttr('disabled')
                    .val(input.data('enable-with'));
        });
    });


    /* End jRails */


    /* Nested attribues support for rails*/
    $('form a[data-new-nested]').live('click', function () {
        var association = $(this).attr('data-new-nested');
        var template = $('#' + association + '_fields_template').html();
        var new_id = new Date().getTime();
        var content = template.replace(/_ID_/g, new_id);
        var fields = $(content).insertBefore($(this));
        fields.siblings('input[name*=_template]').remove();
        return false;
    });

    // Use live('click') to fire for new nested fields' remove link
    $('form a[data-remove-nested]').live('click', function() {
        // There is a hidden input called _destroy for each nested item, set it to true to tell rails to destroy
        var _destroy_field = $(this).prev('input[name*=_destroy]').val('true');

        $(this).parent().hide();
        return false;
    });
    /* End Nested attribues */

    /* Applicationwide - tooltip */
    $('span[data-tooltip]').tipsy({live:true});
    $('a[data-tooltip]').tipsy();
    $('form').find('input[data-tooltip],textarea[data-tooltip] ').tipsy({gravity: 'w',
        trigger : 'focus'
    });
    /* bind default beahvior for ajax calls */
    $('#notification-flash-wrapper').bind("ajaxSend",
                                         function() {
                                             $.showFlash('Loading', 'ajax')
                                         }).bind("ajaxComplete",
                                                function() {
                                                    $(this).fadeOut();
                                                }).bind("ajaxError", function(e, xhr, settings, exception) {
        $.showFlash('Error :' + xhr.responseText)

    });

    /* menu */

    $("ul#topnav li").hover(function() { //Hover over event on list item

        $(this).find("div").slideDown('fast'); //Show the subnav
    }, function() { //on hover out...

        $(this).find("div").slideUp('fast'); //Hide the subnav
    });

    /* jquerui datepicker defaults */
    $.datepicker.setDefaults({showAnim: '' });
    /* visual highlight methods */
    $('input[type=text],fieldset input[type=password],textarea').live('focus',
                                                                     function() {
                                                                         $(this).addClass('inputActive');
                                                                     }).live('blur', function() {
        $(this).removeClass('inputActive');
    });

    $('fieldset input,fieldset select').live('focus',
                                            function() {
                                                $(this).closest('fieldset').addClass('fieldset_active')
                                            }).live('blur', function() {
        $(this).closest('fieldset').removeClass('fieldset_active');
    });


    $('[data-link-to]').click(function() {
        location.href = $(this).attr('data-link-to');
    });

    /* jquery selector caching */
    var trigger = $('#trigger');
    var loginWrapper = $('#loginWrapper');


    loginWrapper.dialog({
        modal : true,
        autoOpen: false,
        title: 'Login'
    });
    trigger.click(function() {
        loginWrapper.dialog('open');
        $('#session_username').focus();
    });


    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("drop_down"))
            $(".drop_down dd ul").hide();
    });

    $('#right').find('div.sidebar-menu-content li:last-child').addClass('menu-li-last-divider');

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

    $('input[type=file]').liveUpload();
});


