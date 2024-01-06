var updateTemplateTracking=null;
var hideCurrentSelected=false;
var helpShowinSession=true;
var lastVisitedGlb = null;
var lastVisitedGlbImg = null;
var lastVisitedGlbTxt = null;
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
var totalTab=$("div[class^='flipBtn']").length;

//rollover and rollout affect

$("div[class^='flipBtn']").mouseover(function(){
    var enableDisable = $(this).hasClass("enabletab");     
    if(enableDisable == true)
        {
            $(this).find("span").css("background-image", "url(bg_color3_20_20.png)"); 
                        
        }
    });
    
$("div[class^='flipBtn']").mousedown(function(){
    var enableDisable = $(this).hasClass("default");     
    if(enableDisable == false)
        {
                //$(this).find("span").css("background-image", "url(bg_color6_20_20.png)");
            
        }
    });
    
$("div[class^='flipBtn']").mouseout(function(){
    var enableDisable = $(this).hasClass("enabletab");    
    if(enableDisable == true)
        {
            
            
            $(this).find("span").css("background-image", "url(bg_color6_20_20.png)"); 
        }
    else
        {
            //$(this).find("span").css("background-image", "url(bg_color6_20_20.png)");
        }
    });
    

var acceptMouse=true;

$("div[class^='flipBtn']").on("mouseover",function(e){if(acceptMouse){if($(this).hasClass("default")){e.stopImmediatePropagation();return false;}else{acceptMouse=false;$('.'+$(this).attr("class").split(" ")[0]).mouseover();}}});
    
$("div[class^='flipBtn']").on("mouseout",function(e){acceptMouse=true;if($(this).hasClass("activetab")){e.stopImmediatePropagation();$(this).mouseover();return false;}});
    
function checkCompletion(){
	if(clickAnyToProceed){
		eval($(".TrackingObj").attr("id")).onUp();
			}else if($(".visitedtab").length+1==totalTab){		
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
	
    
    if(forcedNav){
    $("div[class^='flipBtn']").addClass("enabletab");
    $("div[class^='flipBtn']").addClass("visitedtab");    
    $("div[class^='flipBtn']").removeClass("default");    
    }else{

	$("div[class^='flipBtn']").addClass("enabletab");
    $("div[class^='flipBtn']").addClass("visitedtab");    
    $("div[class^='flipBtn']").removeClass("default"); 
	//$("div[class^='tabBtn']").addClass("visitedtab");
	}
	checkCompletion();
	//$("div[class*='newslink']").addClass("visitedlink")
	}
if(forcedNav){
	
$(".flipBtn1").addClass("enabletab");
$(".flipBtn1").removeClass("default");

}else{
	
    $("div[class^='flipBtn']").addClass("enabletab");
    $("div[class^='flipBtn']").removeClass("default");
	//$("div[class^='flipBtn']").addClass("visitedtab");
	}

//setTimeout(function(){$("div[class^='flipBtn']").each(function(){$(this).removeAttr("onmouseover");})},0)

$(".closeAllTab").on("click",function(e){
	//$("div[class^='flipContent']").not(".doNotHide").hide();
	//modify for mobile functionality
	$(".activetab").removeClass("activetab");
})


/*$("div[class*='flipBtn']").on("mouseover",function(){
	var tempoverclassname=$(this).attr("class")
	tempoverclassname=tempoverclassname.split(" ")[0]
	currenrtovertab=Number(tempoverclassname.slice(-1));
	
		$(".tabBG"+currenrtovertab).addClass('tabBGhover');
	})
$("div[class*='flipBtn']").on("mouseout",function(){
	
		$(".tabBGhover").removeClass('tabBGhover');
	})*/



$("div[class^='flipBtn']").on("click",function(e){
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
    $('.'+$(this).attr("class").split(" ")[0]).removeClass("default");

        if(lastVisitedGlb!=null)
            {  
                if(!$(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).hasClass("visitedtab"))
                    {                           
                        var addAria = btnLbl[Number((refclassName.split('flipBtn')[1])-1)-1]; 
                        addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                        lastVisitedGlb.find("button").attr("aria-label",addAria); 
                        lastVisitedGlb.find("button").attr("title",addAria);
                    }
                
                lastVisitedGlb.addClass("visitedtab");
                lastVisitedGlb.find("span").css("background-image", "url(bg_color6_20_20.png)");
            }
    
    lastVisited = $(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+0));
        
    lastVisitedTxt = $(".flipContent"+(Number(refclassName.split('flipBtn')[1])+0));   
    lastVisitedImg = $(".flipImage"+(Number(refclassName.split('flipBtn')[1])+0));
    lastVisitedGlb = lastVisited; 
    lastVisitedGlbImg = lastVisitedImg;
    lastVisitedGlbTxt = lastVisitedTxt;
	if(lastVisited.hasClass("enabletab")){
        
        if(!$(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).hasClass("visitedtab"))
            {
                
                var addAria = btnLbl[Number(refclassName.split('flipBtn')[1])-1];                
                addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).find("button").attr("aria-label",addAria); 
                $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).find("button").attr("title",addAria);

                var addAria = btnLbl[Number(refclassName.split('flipBtn')[1])];                
                addAria = addAria + " " + $('.navLabels table span')[1].innerHTML;
                $(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+1)).find("button").attr("aria-label",addAria); 
                $(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+1)).find("button").attr("title",addAria);
            }
    //alert("working")
        $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).addClass("activetab").find("button").attr("disabled",true);
        
        $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).removeClass("visitedtab");
        $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).removeClass("enabletab");
        $(".flipBtn"+(Number(refclassName.split('flipBtn')[1]))).find("span").css("background-image", "url(bg_color3_20_20.png)");
        
        
    }
        
    if(forcedNav)
       {
	$(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+1)).addClass("enabletab");
        }
    //$(".flipBtn"+(Number(refclassName.split('flipBtn')[1])-0)).addClass("visitedtab");
    $(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+1)).removeClass("default");
    $(".flipBtn"+(Number(refclassName.split('flipBtn')[1])+1)).find("button").removeAttr('disabled', true);
	$(this).on("mouseover",function(e){e.stopImmediatePropagation();return false;})
	$("div[class^='flipBtn']").not(this).on("click",function(e){e.stopImmediatePropagation();return false;})
	
	
	if(showAll){
		
		//$("div[class^='flipContent']").not(".doNotHide").hide();
		//$(".flipContent"+refclassName.split('flipBtn')[1]).show().addClass("doNotHide");
        
		}else{
			
			//$("div[class^='flipContent']").hide();
			$(".flipImage"+refclassName.split('flipBtn')[1]).show().addClass("flipImage");
            $(".flipImage"+refclassName.split('flipBtn')[1]).show().removeClass("flipImageBfr");
            $(".flipContent"+refclassName.split('flipBtn')[1]).removeClass("flipTxtBfr").addClass("flipTxtAftr");
			
            $(".vs_"+refclassName.split('flipBtn')[1]).css("visibility","visible")
            			
		}
	$(".tick"+refclassName.split('flipBtn')[1]).addClass("visitedTick")
	}else{
		e.stopImmediatePropagation();return false;
		
		}
	
	checkCompletion();
	})

if(autoplay){
if(forcedNav || $(".default").length<1){
	$(".flipBtn1").click();
	setTimeout(function(){$(".flipBtn1").mouseover()},0)
}else{

$(".default").first().click();
setTimeout(function(){$(".default").first().mouseover()},0)
}
}
//setTimeout(function(){$(".default").mouseover()},0)
});

function disBtn()
{
    var totalTab=$("div[class^='flipBtn']").length;
    for(i=1;i<=totalTab;i++)
        {
            if($(".flipBtn"+i).hasClass("default"))
                {
                    
                }
            else
                {                    
                    $(".flipBtn"+i).find("button").removeAttr('disabled');
					
                }
    
            
        }
    
}

function getBtnLbl()
{
    var totalTab=$("div[class^='flipBtn']").length;
    for(i=1;i<=totalTab;i++)
        {
            var addAria = $(".flipBtn"+i).find("button").attr("aria-label");
            btnLbl.push(addAria);
            
            
            
            var getEnableCls = $(".flipBtn"+i).hasClass("enabletab");
            var getVstCls = $(".flipBtn"+i).hasClass("visitedtab");
            
            if(getEnableCls == true && getVstCls == false)
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[1].innerHTML;
                    $(".flipBtn"+i).find("button").attr("aria-label",addAria);
                    $(".flipBtn"+i).find("button").attr("title",addAria);
                }
                    else if($(".flipBtn"+i).hasClass("default"))
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[0].innerHTML;
                    $(".flipBtn"+i).find("button").attr("aria-label",addAria);
                    $(".flipBtn"+i).find("button").attr("title",addAria);
                }
                    else
                {
                    var addAria = btnLbl[i-1];
                    addAria = addAria + " " + $('.navLabels table span')[3].innerHTML;
                    $(".flipBtn"+i).find("button").attr("aria-label",addAria);
                    $(".flipBtn"+i).find("button").attr("title",addAria);
                }
        }
}

function makeAccessible()
{
    var totalTab=$("div[class^='flipBtn']").length;
    
    for ( var i = 1; i <= totalTab; i++) 
    {
        $( "<div id='tabBtnCont' role='group' aria-label='flip card'></div>" ).insertBefore(".flipBtn"+i);
        var contVal = $('#tabBtnCont').attr("id","tabBtnCont"+i);
        contVal.append($(".flipBtn"+i));
        contVal.append($(".flipContent"+i));    
    }    
}













