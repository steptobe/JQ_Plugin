//*********  数字滚动效果  *********//
var NumbersAnimate = {
    Target: null,
    Numbers: 0,
    Duration: 500,
    LenMax: 3,
    lineHeight: 60, //span的高度
    spanWidth: 51, //span的宽度
    spanMargin: 78, //间隔,自己调
Animate: function() {
        var array = NumbersAnimate.Numbers.toString().split("");
        if (array.length == (NumbersAnimate.LenMax - 1)) {
            array.splice(0, 0, "0");
        } else {
            array = array;
        }
        //遍历数组
        for (var i = 0; i < array.length; i++) {
            var currentN = array[i];
            //数字append进容器
            var t = $("<span></span>");
            $(t).append("<span class=\"childNumber\">" + array[i] + "</span>");
            $(t).css("margin-left", (NumbersAnimate.spanWidth * i + NumbersAnimate.spanMargin) + "px");
            $(NumbersAnimate.Target).append(t);
            //生成滚动数字,根据当前数字大小来定
            for (var j = 0; j <= currentN; j++) {
                var tt;
                if (j == currentN) {
                    tt = $("<span class=\"main\"><span>" + j + "</span></span>");
                } else {
                    tt = $("<span class=\"childNumber\">" + j + "</span>");
                }
                $(t).append(tt);
                $(tt).css("top", (j + 1) * NumbersAnimate.lineHeight + "px");
            }
            $(t).animate({ top: -((parseInt(currentN) + 1) * NumbersAnimate.lineHeight) + "px" }, NumbersAnimate.Duration, function() {
                $(this).find(".childNumber").remove();
            });
        }
    },
    ChangeNumber: function(numbers) {
        var oldArray = NumbersAnimate.Numbers.toString().split("");
        var newArray = numbers.toString().split("");
        if (oldArray.length == (NumbersAnimate.LenMax - 1)) {
            oldArray.splice(0, 0, "0");
        }
        if (newArray.length == (NumbersAnimate.LenMax - 1)) {
            newArray.splice(0, 0, "0");
        }
        // console.log("old:" + oldArray);
        // console.log("new:" + newArray);
        for (var i = 0; i < newArray.length; i++) {
            // setTimeout(function() {
            var o = oldArray[i];
            var n = newArray[i];
            var c = $($(NumbersAnimate.Target).find(".main")[i]);

            var num = parseInt($(c).html());
            var maintop = parseInt($($(c).find("span")[0]).css("top"));;
            var top = parseInt($($(c).find("span")[0]).css("top"));

            if (o != n) {
                for (var j = 0; j <= n; j++) {
                    var nn = $("<span>" + j + "</span>");
                    if (j == n) {
                        nn = $("<span>" + n + "</span>");
                    } else {
                        nn = $("<span class=\"yy\">" + j + "</span>");
                    }
                    $(c).append(nn);
                    if (Math.abs(maintop) > 1000) {
                        $(nn).css("top", -(j + 1) * NumbersAnimate.lineHeight + top + "px");
                    } else{
                        $(nn).css("top", (j + 1) * NumbersAnimate.lineHeight  + top +"px");
                    }
                    
                }

                var top = parseInt($(c).css("top"));
                var Ctop = -((parseInt(n) + 1) * NumbersAnimate.lineHeight) + top + "px";
                if (Math.abs(maintop) > 1000) {
                  var Ctop =  ((parseInt(n) + 1) * NumbersAnimate.lineHeight) + top  + "px";;
                }

                $(c).animate({ top: Ctop }, NumbersAnimate.Duration, function() {

                    $($(this).find("span")[0]).remove();
                    $(".yy").remove();
                });
            } else {
                $(c.find("span")[0]).text(n);
            }

        }
        NumbersAnimate.Numbers = numbers;
    },

    RandomNum: function(m, a) {
        var Range = a - m;
        var Rand = Math.random();
        return (m + Math.round(Rand * Range));
    }
}

function scrollNum(className, className_dd, arr, LenMax) {
    var len = $(className).find(className_dd).length;
    for (var i = 0; i < len; i++) {
        var event = NumbersAnimate;
        // console.log(this_event);
        event.Target = className + ' ' + className_dd + i;
        event.Numbers = arr[i];
        event.LenMax = LenMax;
        // console.log(event.Target);
        event.Duration = 1000;
        event.Animate();
    }

}


function scrollNumChange(className, className_dd, m, n, LenMax) {
    var len = $(className).find(className_dd).length;
    for (var i = 0; i < len; i++) {
        var event = NumbersAnimate;
        event.Target = className + ' ' + className_dd + i;
        event.Duration = 1000;
        event.LenMax = LenMax;
        event.ChangeNumber(event.RandomNum(m, n));
    }

}