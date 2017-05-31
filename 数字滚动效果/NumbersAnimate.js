//*********  数字滚动效果  *********//
(function($) {
    $.fn.Animate = function(options) {
            //默认配置
            var defaults = {
                Target: null,
                Numbers: 0,
                Duration: 1000,
                LenMax: 3,
                lineHeight: 60, //span的高度
                spanWidth: 51, //span的宽度
                spanMargin: 78, //间隔,自己调
            };

            var settings = $.extend({}, defaults, options),
                index = 0;

            function Animate($this) {
                var array = settings.Numbers[index].toString().split("");
                if (array.length == (settings.LenMax - 1)) {
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
                    $(t).css("margin-left", (settings.spanWidth * i + settings.spanMargin) + "px");
                    $this.append(t);
                    //生成滚动数字,根据当前数字大小来定
                    for (var j = 0; j <= currentN; j++) {
                        var tt;
                        if (j == currentN) {
                            tt = $("<span class=\"main\"><span>" + j + "</span></span>");
                        } else {
                            tt = $("<span class=\"childNumber\">" + j + "</span>");
                        }
                        $(t).append(tt);
                        $(tt).css("top", (j + 1) * settings.lineHeight + "px");
                    }
                    $(t).animate({ top: -((parseInt(currentN) + 1) * settings.lineHeight) + "px" }, settings.Duration, function() {
                        $(this).find(".childNumber").remove();
                    });
                }
            }

            return this.each(function() {
                var $this = $(this);

                Animate($this);
                ++index;

            });

        },
    $.fn.ChangeNumber = function(options) {
        //默认配置
        var defaults = {
            Target: null,
            Duration: 500,
            LenMax: 3,
            lineHeight: 60, //span的高度
            m: 100,
            n: 900
        };

        var settings = $.extend({}, defaults, options);

        function ChangeNumber($this, numbers) {
            var oldArray = settings.Numbers.toString().split("");
            var newArray = numbers.toString().split("");
            if (oldArray.length == (settings.LenMax - 1)) {
                oldArray.splice(0, 0, "0");
            }
            if (newArray.length == (settings.LenMax - 1)) {
                newArray.splice(0, 0, "0");
            }
            // console.log("old:" + oldArray);
            // console.log("new:" + newArray);
            for (var i = 0; i < newArray.length; i++) {
                // setTimeout(function() {
                var o = oldArray[i];
                var n = newArray[i];
                var c = $($this.find(".main")[i]);

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
                            $(nn).css("top", -(j + 1) * settings.lineHeight + top + "px");
                        } else {
                            $(nn).css("top", (j + 1) * settings.lineHeight + top + "px");
                        }

                    }

                    var top = parseInt($(c).css("top"));
                    var Ctop = -((parseInt(n) + 1) * settings.lineHeight) + top + "px";
                    if (Math.abs(maintop) > 1000) {
                        var Ctop = ((parseInt(n) + 1) * settings.lineHeight) + top + "px";;
                    }

                    $(c).animate({ top: Ctop }, settings.Duration, function() {

                        $($(this).find("span")[0]).remove();
                        $(".yy").remove();
                    });
                } else {
                    $(c.find("span")[0]).text(n);
                }

            }
            settings.Numbers = numbers;
        }

        function RandomNum() {
            var Range = settings.n - settings.m;
            var Rand = Math.random();
            return (settings.m + Math.round(Rand * Range));
        }

        return this.each(function() {
            var $this = $(this);

            ChangeNumber($this, RandomNum());
        });

    }

})(jQuery);