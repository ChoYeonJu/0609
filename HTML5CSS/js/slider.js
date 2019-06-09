$(document).ready(function(){
    $("#slider").imageSlides({
        speed: 500,
        namespace: "slider",
    });
});

(function($, window, i){
    $.fn.imageSlides = function(options){
        var settings = $.extend({
            "speed" : 500,
            "namespace" : "slider",
            //callback 함수
            "before" : $.noop,
            "after": $.noop
        }, options);
        
        return this.each(function(){
            i++;
            
            var $this = $(this),
                
                vendor,
                index = 0,
                $slide = $this.children(),
                length = $slide.size(),
                fadeTime = parseFloat(settings.speed),
                
                namespace  = settings.namespace,
                namespaceIdx = namespace + i,
                
                navClass = namespace + "_nav" + namespaceIdx + "_nav",
                
                visibleClass = namespaceIdx + "_on",
                slideClassPrefix = namespaceIdx + "_s",
                
                visible = {"float": "left",
                          "position":"relative",
                          "opacity" : 1, "z-index":2},
                hidden = {"float": "none",
                          "position":"absolute",
                          "opacity" : 0, "z-index":1},
                
                supportsTransitions = (function(){
                    var docBody = document.body || document.documentElement;
                    var styles = docBody.style;
                    var prop = "transition";
                    if(typeof styles[prop] === "string"){
                        return true;
                    }
                    
                    vendor = ["Moz", "Webkit","Khtml", "0", "ms"];
                    
                    prop = prop.charAt(0).toUpperCase() + prop.substr(1);
                    var i;
                    for ( i = 0; i < vendor.length; i++){
                        if(typeof styles[vendor[i] + prop] === "string") {
                            return true;
                        }
                    }
                    return false;
                })(),
                
                slideTo = function(idx){
                    settings.before(idx);
                    
                    if(supportsTransitions){
                        $slide
                        .removeClass(visibleClass)
                        .css(hidden)
                        .eq(idx)
                        .addClass(visibleClass)
                        .css(visible);
                        
                        index = idx;
                        setTimeout(function(){
                            settings.after(idx);
                        }, fadeTime);
                    } else{
                        $slide
                        .stop()
                        .fadeOut(fadeTime, function(){
                            $(this)
                            .removeClass(visibleClass)
                            .css(hidden)
                            .css("opacity",1)
                        })
                        .eq(idx)
                        .fadeIn(fadeTime, function(){
                            $(this)
                            .addClass(visibleClass)
                            .css(visible);
                            settings.after(idx);
                            index = idx;
                        });
                    }
                };
            
            $slide.each(function(i){
                this.id = slideClassPrefix  + i;
            });
            
            $slide.hide.css(hidden).eq(0).addClass(visibleClass).css(visible).show();
            
            if(supportsTransitions){
                $slide.show().css({
                    "-webkit-transition" : "opacity "
                    + fadeTime + "ms ease-in-out",
                    "-moz-transition" : "opacity "
                    + fadeTime + "ms ease-in-out",
                    "-o-transition" : "opacity "
                    + fadeTime + "ms ease-in-out",
                    "transition" : "opacity "
                    + fadeTime + "ms ease-in-out",
                });
            }
            
            if($slide.size() > 1){
                var navMarkup = 
                    "<a href ='#' class ='" + navClass + " prev'></a>"
                "<a href ='#' class ='" + navClass + " next'></a>";
                
                $this.after(navMarkup);
                
                var $trigger = $("." + namespaceIdx + "_nav"),
                    $prev = $trigger.filter(".prev");
                
                $trigger.bind("click", function(e){
                    e.preventDefault();
                    
                    var $visibleClass = $("." + visibleClass);
                    
                    var idx = $slide.index($visibleClass),
                        prevIdx = idx - 1,
                        nextIdx = idx + 1 < length ? index + 1 :
                    
                    slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
                });
            }
        });
    };
})(jQuery, this, 0);