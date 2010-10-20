$(function() {
    var list = $('#services-intro').find('li');
    var i = 0;
    var end = list.length;

    window.setInterval(function() {
        highlight_step(i);
        (i==end) ? i=0 : i++;
    }, 3000);
    function highlight_step(i) {
        var step=i+1;
        var aclass = 'step-' + step + '-active';
        var rclass = 'step-' + step;
        $(list[i]).addClass('active').find('.step-nail').removeClass(rclass).addClass(aclass);
        window.setTimeout(function() {
      $(list[i]).removeClass('active').find('.step-nail').removeClass(aclass).addClass(rclass);

    }, 2000);
    }
});
