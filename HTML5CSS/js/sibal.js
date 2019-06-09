$(document).ready(function(){
    //alert('시발');
    
    $(".accordion > ul > li > a").on("click",function(){
        
        var element = $(this).parent("li");
        
        if(element.hasClass("open")){
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp();
        }else{
            element.addClass("open");
            element.children("ul").slideDown();
            element.siblings("li").children("ul").slideUp();
            element.siblings("li").removeClass("open");
            
           // element.siblings("li").find("li").removeClass("open");
          //  element.siblings("li").find("ul").slideUp();
        }
    });
    
    $(".accordion ul ul").hide();
    
    $(".open").children("ul").slideDown();
});