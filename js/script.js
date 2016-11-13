$(document).ready(function()
{
    var menu_parent = $(".menu-parent");
    var allWells = $('.menu-level-2-content');
    var animating = false;

    function move_menu(direction){
        var list = menu_parent.find('ul');
        var list_top = parseFloat(list.css('top').replace('px','')) || 0;
        var list_item_height = list.children('li').height();
        var list_height = list.height();
        var window_height = $(window).height();
        var item_on_screen = list_height / window_height;

        if(!animating){
            animating =true;
            if(direction=='up'){
                var a =  ((list_top - (list_item_height * (item_on_screen - 1))));
                var b =  parseInt('-'+(list_height- (list_item_height * item_on_screen)));

                if(a > b ) {
                    list.animate({
                        top: ((list_top -  list_item_height))+'px'
                    }, 100, function () {
                        animating = false;
                    });
                }else {
                    move_menu('down');
                    animating =false;
                }
            }else {
                var top = (list_top>0?0:(list_top +  list_item_height));
                list.animate({
                    top: top+'px'
                }, 100, function () {
                    animating = false;
                });
            }

        }

    }
    menu_parent.find('.next').click(function () {
        move_menu('up');
    });
    menu_parent.find('.prev ').click(function () {
        move_menu('down');
    });



    $('.menu-parent>ul').mousewheel(function(evt){
        //console.log(evt.deltaY); // print the distance you scrolled
        //console.log(evt.deltaY); // print the distance you scrolled
        if(evt.deltaY>0){
            move_menu('up');
        }else {
            move_menu('down');
        }
    });


    var navItems = $('.menu-level-2 li > a');
    var navListItems = $('.menu-level-2 li');

    var allWellsExceptFirst = $('.menu-level-2-content:not(:first)');

    //allWellsExceptFirst.hide();
    allWells.hide();
    navItems.click(function(e)
    {
        e.preventDefault();
        navListItems.removeClass('active');
        $(this).closest('li').addClass('active');

        allWells.hide();
        var target = $(this).attr('data-target-id');
        $('#' + target).show();
    });

    $('.hide-all-wells').click(function () {
        allWells.hide();
    });
});