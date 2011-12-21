$(function() {

    $("ul.thumb li").hover(function() {

        $(this).css({'z-index' : '10'});
        /*Add a higher z-index value so this image stays on top*/
        $(this).find('img')
                .animate({
                             marginTop: '-110px', /* The next 4 lines will vertically align this image */
                             marginLeft: '-110px',
                             top: '50%',
                             left: '50%',
                             width: '180px', /* Set new width */
                             height: '180px', /* Set new height */
                             padding: '10px'
                         }, 200).addClass('box-shadow-dark');
        /* this value of "200" is the speed of how fast/slow this hover animates */

    }, function() {
        $(this).css({'z-index' : '0'});
        /* Set z-index back to 0 */
        $(this).find('img')
                .animate({
                             marginTop: '0', /* Set alignment back to default */
                             marginLeft: '0',
                             top: '0',
                             left: '0',
                             width: '100px', /* Set width back to default */
                             height: '100px', /* Set height back to default */
                             padding: '5px'
                         }, 400).removeClass('box-shadow-dark');
    });
});
