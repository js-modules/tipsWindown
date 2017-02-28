;(function (window,document,undefined,$) {
    $.leafTipsWindown = {
        init:function (option) {
            var opts = $.extend({},$.leafTipsWindown.defaults,option);
            var tipsWindown = this.template(opts);
            this.position(tipsWindown);
            this.resize(this,tipsWindown);
            this.events(tipsWindown,opts.callback);
            this.drag(tipsWindown,opts);
        },
        template:function (opts) {
            var tipsDom = $("#leaf-tipsWindown");
            var overlayDom = $("#leaf-overlay");
            if(tipsDom)tipsDom.remove();
            if(overlayDom)overlayDom.remove();
            var tipsWindown = $("<div class='leaf-tipsWindown'>"+
            "        <div class='tip-title'>"+
            "            <i class='iconfont icon-tip'></i>"+
            "            <span>"+opts.title+"</span>"+
            "            <a href='javascript:void(0)' class='close' id='close'><i class='iconfont icon-close'></i></a>"+
            "        </div>"+
            "        <div class='tip-content'>"+opts.content+"</div>"+
            "        <div class='tip-btn'>"+
            "            <a href='javascript:void(0);' id='sure'><i class='iconfont icon-sure'></i>"+opts.stext+"</a>"+
            "        </div>"+
            "    </div>");
            var overlay = $("<div class='leaf-overlay'></div>");
            $("body").append(tipsWindown);
            $("body").append(overlay);
            tipsWindown.prop("id","leaf-tipsWindown");
            overlay.prop("id","leaf-overlay");
            return tipsWindown;
        },
        position:function(tipsWindown){
            var left = ($(window).width() - tipsWindown.width())/2;
            var top = ($(window).height() - tipsWindown.height())/2;
            tipsWindown.css({
                left:left,
                top:top
            });
        },
        resize:function(that,tipsWindown){
            $(window).resize(function () {
                that.position(tipsWindown);
            });
        },
        events:function (tipsWindown,callback) {
            var top = tipsWindown.offset().top+15;
            function animate(){
                tipsWindown.animate({
                    top:-top
                },function () {
                    tipsWindown.remove();
                    $("#leaf-overlay").fadeOut("fast",function () {
                        $(this).remove();
                    });
                });
            }
            $("#close").click(function () {
                animate();
                callback && callback();
            });
            $("#sure").on("click",function () {
                animate();
                callback && callback();
            });
        },
        drag:function (tipsWindown,opts) {
            tipsWindown.on("mousedown",".tip-title",function (e) {
                tipsWindown.addClass("noSelect");
                var left = tipsWindown.offset().left,
                    top = tipsWindown.offset().top,
                    x = e.pageX,
                    y = e.pageY;
                $(document).on("mousemove",function (e) {
                    var newX = e.pageX,
                        newY = e.pageY,
                        nleft = newX - x + left,
                        ntop = newY - y + top,
                        maxleft = $(window).width() - tipsWindown.width();
                        maxtop = $(window).height() - tipsWindown.height();
                        if(nleft<0)nleft=0;
                        if(nleft>maxleft)nleft=maxleft;
                        if(ntop<0)ntop=0;
                        if(ntop>maxtop)ntop=maxtop;
                        tipsWindown.css({
                            left:nleft,
                            top:ntop,
                        });
                }).on("mouseup",function () {
                    $(this).off("mousemove");
                    $(this).off("mouseup");
                    tipsWindown.removeClass("noSelect");
                });
            });
        }
    };
    $.leafTipsWindown.defaults = {
        title:"提示",
        content:"请输入你的内容",
        stext:"确定"
    };
})(window,document,undefined,jQuery);