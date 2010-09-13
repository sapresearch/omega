/**
 * @author I823626
 */


jQuery.showFlash = function(msg) {
    var msg_div = $('#notification-flash-wrapper');
    msg_div.find('div').html(msg);
    msg_div.fadeIn('fast').delay(2000).fadeOut('fast');
};


/*********** dom ready ! here we go ****************/

$(function() {

    /************** jrails adapter **********************/

    var csrf_token = $('meta[name=csrf-token]').attr('content'),
            csrf_param = $('meta[name=csrf-param]').attr('content');

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


    /*****************************   End jRails *************************/


  /*******************************  Nested attribues   *******************/
    	$('form a[data-new-nested]').live('click',function () {
		var association = $(this).attr('data-new-nested');
		var template    = $('#' + association + '_fields_template').html();
		var new_id      = new Date().getTime();
		var content     = template.replace(/_ID_/g, new_id);

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
 /*****************************En d Nested attribues   *******************/     

    $("#notification-flash-wrapper").bind("ajaxSend",
                                         function() {
                                             $(this).find('div').html('loading').end().fadeIn();
                                         }).bind("ajaxComplete", function() {
        $(this).fadeOut();
    });

    /**
     * menu
     */


    $("ul#topnav li").hover(function() { //Hover over event on list item

        $(this).find("div").slideDown('fast'); //Show the subnav
    }, function() { //on hover out...

        $(this).find("div").slideUp('fast'); //Hide the subnav
    });


    $("a[rel^='test']").click(function() {
        $('body').append($('<div>')[0].id)
    });


    $.datepicker.setDefaults({showAnim: '' });
    /**
     * visual highlight methods
     */
    $('fieldset input[type=text],fieldset input[type=password],textarea').focus(
                                                                               function() {
                                                                                   $(this).addClass('inputActive');
                                                                               }).blur(function() {
        $(this).removeClass('inputActive');
    });

    $('fieldset input,fieldset select').live('focus',
                                            function() {
                                                $(this).closest('fieldset').addClass('fieldset_active')
                                            }).live('blur', function() {
        $(this).closest('fieldset').removeClass('fieldset_active');
    });


    var search = $("#search");

    search.hover(function() {
        $(this).addClass("searchHover")
    }, function() {
        $(this).removeClass("searchHover")
    });
    $("#searchInput").focus(
                           function() {

                               search.addClass("searchActive")
                           }).blur(function() {
        search.removeClass("searchActive")
    });


    $('[data-link-to]').click(function() {
        location.href = $(this).attr('data-link-to');
    });


    var trigger = $('#trigger');
    var loginWrapper = $('#loginWrapper');
    var loginPanel = $('#loginPanel');

    loginWrapper.dialog({
        modal : true,
        autoOpen: false,
        title: 'Login'
    });
    trigger.click(function() {
        loginWrapper.dialog('open')
    });


    /**
     * customized drop_down
     */
    $(".drop_down dt a").live('click', function() {
        $(".drop_down dd ul").toggle();
    });
    $(".drop_down dd ul li a").live('click', function() {

        $(".drop_down dd ul").hide();

    });
    function getSelectedValue(id) {
        return id;
    }

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("drop_down"))
            $(".drop_down dd ul").hide();
    });


    $('.search_wrapper_l').hover(
                                function() {
                                    $(this).addClass('search_wrapper_hover');
                                },
                                function() {
                                    $(this).removeClass('search_wrapper_hover').find('input').blur();

                                }).find('input').focus(
                                                      function() {

                                                          $(this).val('').parent().removeClass('search_wrapper_hover').addClass('search_wrapper_focus');
                                                      }).blur(function() {
        $(this).val('Search..').parent().removeClass('search_wrapper_focus');
    });


});


