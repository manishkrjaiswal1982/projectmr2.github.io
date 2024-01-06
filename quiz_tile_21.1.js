// JavaScript Document
function quizTileSetup(){
    
    if($("fieldset div[id^=radio]").length>0){
    $("fieldset div[id^=radio]").each(function(indx){
                                      
                $(this).prev().addClass("quizLabel activeLabel");
        if($(".q_option_"+(indx+1)).length>0){
            
            var nwWidth=$(".q_option_"+(indx+1)).width();
            var nwHeight=$(".q_option_"+(indx+1)).height();
            if($(".q_option_"+(indx+1)).attr("id").indexOf("shape")>-1){
              
                nwWidth=nwWidth-1;
                nwHeight=nwHeight-1;
                
            }
			/*previous code
                $(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).position().top*getScale()+"px", "left": $(".q_option_"+(indx+1)).position().left*getScale()+"px"});
				*/
			
			$(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).css('top'), "left": $(".q_option_"+(indx+1)).css('left')});
			
        }
                                      })
    
    $('input[type="radio"]').click(function(){
        $(".selQuizOpt").removeClass("selQuizOpt");
        $("input:radio:checked").parent().prev().addClass("selQuizOpt");
    })
		
		$('label').mousedown(function(){
        
		testId=setTimeout(function(){console.log("Mouse down");$("input:radio").blur();},200)
       
    })
		
    $('input[type="radio"]').focus(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
         $(this).parent().prev().find("label").addClass("focusQuizOpt");
    })
     $('input[type="radio"]').focusout(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        
       
    })
}
else{
   $("fieldset div[id^=check]").each(function(indx){
                                      
                $(this).prev().addClass("quizLabel activeLabel");
                 if($(".q_option_"+(indx+1)).length>0){
            
            var nwWidth=$(".q_option_"+(indx+1)).width();
            var nwHeight=$(".q_option_"+(indx+1)).height();
            if($(".q_option_"+(indx+1)).attr("id").indexOf("shape")>-1){
              
                nwWidth=nwWidth-1;
                nwHeight=nwHeight-1;
                
            }
					 /*Previous code
                $(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).position().top*getScale()+"px", "left": $(".q_option_"+(indx+1)).position().left*getScale()+"px"});
				*/
					 
				$(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).css('top'), "left": $(".q_option_"+(indx+1)).css('left')});
        }
                                      
                                      })
    
    $('input[type="checkbox"]').click(function(){
        $(".selQuizOpt").removeClass("selQuizOpt");
        $(".selQuizOpt").removeClass("activeLabel");
        $("input:checkbox").blur();
        $(this).parent().prev().blur();
        $("input:checkbox:checked").parent().prev().addClass("selQuizOpt");
        
    
    })
    
    $('input[type="checkbox"]').focus(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        $(this).parent().prev().find("label").addClass("focusQuizOpt");
    })
    $('input[type="checkbox"]').focusout(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        
       
    })
     
}
    
    
}

function getScale(){
   return 1; 
  /*  var div=$('#pageDIV').css('transform');
var values = div.split('(')[1];
values = values.split(')')[0];
values = values.split(',');
var a = values[0];
var b = values[1];

var scale = Math.sqrt(a*a + b*b);
    return 1/scale;*/
}