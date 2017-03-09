$(function(){
    var move_width, this_text;
    $(".find_nav_list").css("left",move_width+"px");
    $(".find_nav_list li").each(function(){
        /** 随着点击变换的bottom-border **/
        if($(this).find("a").text() == this_text){
            $(".sideline").css({left:$(this).position().left});
            $(".sideline").css({width:$(this).outerWidth()});//获得外部width
            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName( this_text );
            return false
        }
        else{
            $(".sideline").css({left:0});
            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        }
        /** end **/
    });
    var nav_w=$(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);
    $(".find_nav_list li").on('click', function(){
        nav_w=$(this).width();
        $(".sideline").stop(true);
        $(".sideline").animate({left:$(this).position().left},300);
        $(".sideline").animate({width:nav_w});
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        //一半width
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        
        var fnl_l;
        var fl_w=$(".find_nav_list").width();
        var flb_w=$(".find_nav_left").width();
        //这个元素相对于父元素left移动
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        //flb_w虚拟宽度，fl_w实际宽度
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate({
            "left" : fnl_l
        }, 300);
        move_width=fnl_l;
        var c_nav=$(this).find("a").text();
        navName(c_nav);
    });
    $(".find_nav_list").on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(".find_nav_list").on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if(ty_left + x2 - x1>=0){
            $(this).css("left", 0);
        }else if(ty_left + x2 - x1<=flb_w-fl_w){
            $(this).css("left", flb_w-fl_w);
        }else{
            $(this).css("left", ty_left + x2 - x1);
        }
        if(Math.abs(y2-y1)>0){
            e.preventDefault();
        }
    });
});
function navName(c_nav) {
    switch (c_nav) {
        case "资讯":
             this_text = "资讯";
            break;
        case "分析":
             this_text = "分析";
            break;
        case "黄页":
             this_text = "黄页";
            break;
        case "技术":
             this_text = "技术";
            break;
        case "项目":
             this_text = "项目";
            break;
        case "股市":
             this_text = "股市";
            break;
        case "原创":
             this_text = "原创";
            break;
        case "经济":
             this_text = "经济";
            break;
        case "评论":
             this_text = "评论";
            break;
    }
}