var updateTemplateTracking=null;
var hideCurrentSelected=false;
var helpShowinSession=true;
var lastVisitedGlb = null;
var btnLbl = [];

$(document).ready(function() {
if(typeof(forcedNav)=="undefined"){
	forcedNav=false;
	}
if(typeof(autoplay)=="undefined"){
	autoplay=true;
	}
if(typeof(showAll)=="undefined"){
	showAll=false;
	}
if(typeof(clickAnyToProceed)=="undefined"){
	clickAnyToProceed=false;
	}	
	
var lastclick=null;	
var completedinSession=false;
var totalTab=$("div[class^='tabBtn']").length;
$("div[class^='tabContent']").hide();
//$("div[class^='vs_']").hide();


//rollover and rollout affect

$("div[class^='tabBtn']").mouseover(function(){
    var enableDisable = $(this).hasClass("default");     
    if(enableDisable == false)
        {
            $(this).find("span").css("background-image", "url(bg_color3_20_20.png)"); 
                        
        }
    });
    
$("div[class^='tabBtn']").mousedown(function(){
    var enableDisable = $(this).hasClass("default");     
    if(enableDisable == false)
        {
                $(this).find("span").css("background-image", "url(bg_color3_20_20.png)");
            
        }
    });

$("div[class^='tabBtn']").mouseout(function(){
    var enableDisable = $(this).hasClass("default");     
    if(enableDisable == true)
        {
                //$(this).find("span").css("background-image", "url(bg_color2_20_20.png)");
            
        }
    });
    
$("div[class^='tabBtn']").mouseout(function(){
    var enableDisable = $(this).hasClass("activetab");
    var disableTab = $(this).hasClass("default"); 
    if(enableDisable == true)
        {
            
            
            $(this).find("span").css("background-image", "url(bg_color3_20_20.png)"); 
        }
    else if(disableTab == true)
        {
            $(this).find("span").css("background-image", "url(bg_color2_20_20.png)");
        }
    
    else
        {
            $(this).find("span").css("background-image", "url(bg_color6_20_20.png)");
        }
    });
    
var acceptMouse=true;

    $("div[class^='tabBtn']").on("mouseover",function(e){if(acceptMouse){if($(this).hasClass("default")){e.stopImmediatePropagation();return false;}else{acceptMouse=false;$('.'+$(this).attr("class").split(" ")[0]).mouseover();}}});
    
$("div[class^='tabBtn']").on("mouseout",function(e){acceptMouse=true;if($(this).hasClass("activetab")){e.stopImmediatePropagation();$(this).mouseover();return false;}});
    
$("div[class^='tabBtn']").on("mousedown",function(e){e.stopImmediatePropagation();return false;})
$("div[class^='tabBtn']").on("mouseup",function(e){e.stopImmediatePropagation();return false;})
//$("div[class^='tabBtn']").on("click",function(e){if($(this).hasClass("enabletab") && !$(this).hasClass("activetab")){alert("clicked");$(this).click();}else{e.stopImmediatePropagation();return false;}})


function checkCompletion(){
    
	if(clickAnyToProceed){
        
		eval($(".TrackingObj").attr("id")).onUp();
			}else if($(".visitedtab").length==totalTab){
		
		if(!completedinSession){
			completedinSession=true;
			$("div[class^='instText']").hide();
            
		eval($(".TrackingObj").attr("id")).onUp();
            
		}
		
		}
	
	}
updateTemplateTracking=function(){
	if(typeof(showhelp) !="undefined"){
		if(showhelp){
		hideHelp();
		
		}
		helpShowinSession=false;
	}
	//completedinSession=true;
	$("div[class^='tick']").addClass("visitedTick")
	//need to update here
    if(forcedNav){
    //$("div[class^='tabBtn']").removeClass("visitedtab");
    $("div[class^='tabBtn']").addClass("enabletab");
    $("div[class^='tabBtn']").addClass("visitedtab");    
    $("div[class^='tabBtn']").removeClass("default");
    }else{

	$("div[class^='tabBtn']").addClass("enabletab");
    $("div[class^='tabBtn']").addClass("visitedtab");    
    $("div[class^='tabBtn']").removeClass("default");
	//$("div[class^='tabBtn']").addClass("visitedtab");
	}
     $("div[class^='tabBtn'] button").attr('disabled', false);
	checkCompletion();
	//$("div[class*='newslink']").addClass("visitedlink")
	}
if(forcedNav){
//$("div[class^='tabBtn']").find("button").attr('disabled', 'disabled');   
    
$(".tabBtn1").addClass("enabletab")
$(".tabBtn1").removeClass("default");

    
}else{

	$("div[class^='tabBtn']").addClass("enabletab");
    $("div[class^='tabBtn']").removeClass("default");
	//$("div[class^='tabBtn']").addClass("visitedtab");
	}

//setTimeout(function(){$("div[class^='tabBtn']").each(function(){$(this).removeAttr("onmouseover");})},0)

$(".closeAllTab").on("click",function(e){
	$("div[class^='tabContent']").not(".doNotHide").hide();
	//modify for mobile functionality
    $(".activetab").addClass("visitedtab");
	$(".activetab").removeClass("activetab");
})


$("div[class*='tabBtn']").on("mouseover",function(){
	var tempoverclassname=$(this).attr("class")
	tempoverclassname=tempoverclassname.split(" ")[0]
	currenrtovertab=Number(tempoverclassname.slice(-1));
    $(".tabBG"+currenrtovertab).addClass('tabBGhover');
	})
$("div[class*='tabBtn']").on("mouseout",function(){
	
		$(".tabBGhover").removeClass('tabBGhover');
	})



$("div[class^='tabBtn']").on("click",function(e){
	if(typeof(showhelp) !="undefined"){
		if(showhelp){
			
		hideHelp();
		}
	}
	
	
	if($(this).hasClass("enabletab") & !($(this).hasClass("activetab"))){
            
	if(lastclick!=null){
		lastclick.mouseout();
		
		}
	lastclick=$(this);	

	var refclassName=$(this).attr('class').split(/\s+/)[0];
	//console.log("refclassName : "+refclassName)
	$(".activetab").mouseout();

	
	if(hideCurrentSelected){
	$(".activetab").show();
	$(this).hide();
	}
	$(".activetab").removeClass("activetab");
//	$("span").removeClass();
	//$('.'+$(this).attr("class").split(" ")[0]).mouseover();
	//$('.'+$(this).attr("class").split(" ")[0]).addClass("activetab");
    $('.'+$(this).attr("class").split(" ")[0]).removeClass("default");
     
        
        if(lastVisitedGlb!=null)
            {  
                if(!$(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).hasClass("visitedtab"))
                    {                
                var addAria = btnLbl[Number((refclassName.split('tabBtn')[1])-1)-1]; 
                
                addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                lastVisitedGlb.find("button").attr("aria-label",addAria); 
                lastVisitedGlb.find("button").attr("title",addAria);
                    }
                //updated here
                lastVisitedGlb.addClass("visitedtab");
                lastVisitedGlb.find("span").css("background-image", "url(bg_color6_20_20.png)");
            }
        
        lastVisited = $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+0));
        lastVisited.addClass("visitedtab");
        lastVisitedGlb = lastVisited;                    
        if(lastVisited.hasClass("enabletab")){
        
    
        $(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).addClass("activetab");        
            if($(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).hasClass("visitedtab"))
            {
                
                var addAria = btnLbl[Number(refclassName.split('tabBtn')[1])-1];                
                addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).find("button").attr("aria-label",addAria); 
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).find("button").attr("title",addAria);

                /*var addAria = btnLbl[Number(refclassName.split('tabBtn')[1])];                
                addAria = addAria + " " + $('.navLabels table span')[1].innerHTML;
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).find("button").attr("aria-label",addAria); 
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).find("button").attr("title",addAria);*/
            }
            
            if(($(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).hasClass("visitedtab")==false)&&($(".tabBtn"+(Number(refclassName.split('tabBtn')[1]))).hasClass("enabletab")))
            {
                
                var addAria = btnLbl[Number(refclassName.split('tabBtn')[1])];                
                addAria = addAria + " " + $('.navLabels table span')[1].innerHTML;
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).find("button").attr("aria-label",addAria); 
                $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).find("button").attr("title",addAria);
            }
            
    }
        
        
	$(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).addClass("enabletab");
    //$(".tabBtn"+(Number(refclassName.split('tabBtn')[1])-0)).addClass("visitedtab");
    $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).removeClass("default");
    $(".tabBtn"+(Number(refclassName.split('tabBtn')[1])+1)).find("button").removeAttr('disabled', true);
	$(this).on("mouseover",function(e){e.stopImmediatePropagation();return false;})
	$("div[class^='tabBtn']").not(this).on("click",function(e){e.stopImmediatePropagation();return false;})
	
    	
	if(showAll){
		
		$("div[class^='tabContent']").not(".doNotHide").hide();
		$(".tabContent"+refclassName.split('tabBtn')[1]).show().addClass("doNotHide")
		}else{
			
			$("div[class^='tabContent']").hide();
			$(".tabContent"+refclassName.split('tabBtn')[1]).show()
            
            
			$(".vs_"+refclassName.split('tabBtn')[1]).css("visibility","visible")
			
		}
	$(".tick"+refclassName.split('tabBtn')[1]).addClass("visitedTick")
	}else{
		e.stopImmediatePropagation();return false;
		
		}
	
	checkCompletion();
	}) 


if(autoplay){
if(forcedNav || $(".default").length<1){
	$(".tabBtn1").click();
	setTimeout(function(){$(".tabBtn1").mouseover()},0)
}else{

$(".default").first().click();
setTimeout(function(){$(".default").first().mouseover()},0)
}
}
//setTimeout(function(){$(".default").mouseover()},0)
});

function disBtn()
{
   
    $("div[class^='tabBtn'].default button").attr('disabled', true);
    
}

function getBtnLbl()
{
    var totalTab=$("div[class^='tabBtn']").length;
    for(i=1;i<=totalTab;i++)
        {
            var addAria = $(".tabBtn"+i).find("button").attr("aria-label");
            btnLbl.push(addAria);
            
            
            
            var getEnableCls = $(".tabBtn"+i).hasClass("enabletab");
            var getVstCls = $(".tabBtn"+i).hasClass("visitedtab");
            
            if(getEnableCls == true && getVstCls == false)
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[1].innerHTML;
                    $(".tabBtn"+i).find("button").attr("aria-label",addAria);
                    $(".tabBtn"+i).find("button").attr("title",addAria);
                }
                    else if($(".tabBtn"+i).hasClass("default"))
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[0].innerHTML;
                    $(".tabBtn"+i).find("button").attr("aria-label",addAria);
                    $(".tabBtn"+i).find("button").attr("title",addAria);
                }
                    else
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                    $(".tabBtn"+i).find("button").attr("aria-label",addAria);
                    $(".tabBtn"+i).find("button").attr("title",addAria);
                }
        }
}


function makeAccessible()
{
    $( '<div id="tabBtnCont" role="tablist" aria-label="Sample Tabs">' ).insertBefore( ".tabBtn1" );

    $list = $('#tabBtnCont');
    var totalTab=$("div[class^='tabBtn']").length;
    for ( var i = 1; i <= totalTab; i++) {
    $list.append($(".tabBtn"+i));
          
    
    var newDiv="<div tabindex='-1' id='tabContContainer"+i+"' role='tabpanel' aria-live='polite' aria-labelledby='tab-"+i+"'></div>";
    $(newDiv).insertBefore( '.tabContent'+i );  
    $('#tabContContainer'+i).append($('.tabContent'+i))
    
}
    
}

