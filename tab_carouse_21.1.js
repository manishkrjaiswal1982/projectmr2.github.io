var ShowSceneNum=null;
var ShowSceneNumBYDot=null;
var initintropage=null;
var updateTemplateTracking=null;
var helpShowinSession=true;
var sceneTimeout=0;

if(typeof(autoPlayScene)=="undefined"){
	var autoPlayScene=false; //default Orientation
	}
if(typeof(autoPlayDelay)=="undefined"){
	var autoPlayDelay=4000; //default Orientation
	}
if(typeof(vernavdotOrientation)=="undefined"){
	var vernavdotOrientation=true; //default Orientation
	}

if(typeof(animationDelay)=="undefined"){
	var animationDelay=300; //default animation delay
	}

if(typeof(forcedNav)=="undefined"){
	forcedNav=false;
	}
	
if(typeof(vernavdotOrientationphone)=="undefined"){
	vernavdotOrientationphone=null; //default Orientation
	}
$(document).ready(function() {

if(getDevice()=="Phone" && vernavdotOrientationphone!=null){
vernavdotOrientation=vernavdotOrientationphone;

}

var lastclick=null;	
var tabIntervalID=0;
var animElemCount=1;
var totalAnimElement=0;
var currentScene=0;
var totalScene=1;
var maxVisited=0;
var autoPlay=true;
var addDots=true;
var completedinSession=false;


function checkCompletion(){
	if($(".visitedDot").length==(totalScene)){
		if(!completedinSession){
		
		completedinSession=true;
		
		eval($(".TrackingObj").attr("id")).onUp();
		
		}
		
		}
	
	}

updateTemplateTracking=function(){
if(typeof(showhelp) !="undefined"){
		if(showhelp){
		hideHelp();
		helpShowinSession=false;
		}
	}
	//completedinSession=true;
	maxVisited=totalScene;
	$(".navDot").removeClass("disableDot").removeAttr("disabled");
	$(".tabBtn_next").addClass("enabletab")
	$(".navDot").addClass("visitedDot")
	checkCompletion();
	//$("div[class*='newslink']").addClass("visitedlink")
	}

while($(".tabContent"+totalScene).length>0){
	totalScene++;
	
	}


totalScene--;	

if(addDots){
	var dotStr="";
    
	if(vernavdotOrientation){
		dotStr+="<button type='button' class='tabBtn_prev arrowtypeBtnprev arrowVerticalprev'></button>"
		}else{
	dotStr+="<button type='button' class='tabBtn_prev arrowtypeBtnprev arrowHorizontalprev'></button>"
	}
	for(i=1;i<=totalScene;i++){
		if(maxVisited>=i){
		dotStr+="<button type='button' class='navDot enableDot' id='navDot"+i+"' onClick='ShowSceneNumBYDot("+i+")'></button>";
		}else{
			dotStr+="<button type='button' class='navDot disableDot' id='navDot"+i+"' onClick='ShowSceneNumBYDot("+i+")' disabled></button>";
			}
		
		}
	if(vernavdotOrientation){
		dotStr+="<button type='button' class='tabBtn_next arrowtypeBtnnext arrowVerticalnext'></button>"
		}else{
	dotStr+="<button type='button' class='tabBtn_next arrowtypeBtnnext arrowHorizontalnext'></button>"
	}
	$("#pageDIV").append("<div class='navDotCont'><div class='alignDot'>"+dotStr+"</div></div>")
	//$(".navDotCont").append($(".tabBtn_next"));
	//$(".navDotCont").prepend($(".tabBtn_prev"))
	if($(".navPos").length){
		$(".navDotCont").attr("id",$(".navPos").attr('id'));
		}
	}


// wrap to list
(function addToList () {
	$('[class^="tabContent"]').wrapAll('<ul class="carousalContent" tabindex="-1"></ul>')
	for (i=1;i<=totalScene;i++){
		$('.tabContent'+i).wrapAll('<li tabindex="-1"></li>');
	}
    $("<div class='CarslideSeq'></div>").insertAfter($(".carousalContent"))
   $(".navPos,.carousalContent,.navDotCont").wrapAll('<div class="carousalContainer" role="region"></div>')
    
})();


if(navigator.appVersion.indexOf('MSIE 7')!=-1){
	$(".alignDot").css("background-color","#cccccc")
	}	
if(!vernavdotOrientation){
	//console.log(vernavdotOrientation)
	
$(".alignDot").css('height',"100%");
var halfway=($(".alignDot").height()-$(".navDot").height())/2
$(".alignDot").css('padding-top',halfway+"px");	
$(".alignDot").css('height',($(".alignDot").height()-halfway)+"px");
$(".alignDot").css('width',$(".alignDot").width()+0); //adding 2px to avoid issues due to decimal calculation


}else{
	$(".tabBtn_prev,.navDot,.tabBtn_next").addClass("verticalAlign")
	var contHeight=Number($(".alignDot").height())+0; //adding 2px to avoid issues due to decimal calculation
	//console.log("contHeight : "+contHeight)
	contTop=($(".alignDot").parent().height()-contHeight)/2;
	$(".alignDot").css('width',"100%");
	$(".alignDot").css('height',contHeight+"px");
	$(".alignDot").css('top',contTop+"px");
	}

//modify to handle device orientation based layout - 03-Feb-2017

window.addEventListener("resize", function() {setTimeout(ResetElemPos,100)}, false);
			
function ResetElemPos(){
		
		if(!vernavdotOrientation){
	$(".tabBtn_prev,.navDot,.tabBtn_next").removeClass("verticalAlign")
$(".alignDot").css('height',"100%");
var halfway=($(".alignDot").height()-$(".navDot").height())/2
$(".alignDot").css('padding-top',halfway+"px");	
$(".alignDot").css('height',($(".alignDot").height()-halfway)+"px");
$(".alignDot").css('width','');
$(".alignDot").css('top',"0px");
$(".tabBtn_next").removeClass("arrowVerticalnext").addClass("arrowHorizontalnext");//css('top',"0px");
$(".tabBtn_prev").removeClass("arrowVerticalprev").addClass("arrowHorizontalprev");//css('top',"0px");
var barwidth=0;
$(".tabBtn_prev,.tabBtn_next,.navDot").each(function(){
	barwidth += $(this).outerWidth( true )+0;//adding 2px to avoid issues due to decimal calculation
	})
$(".alignDot").css('width',(barwidth)+"px");


}else{
	$(".tabBtn_prev,.navDot,.tabBtn_next").addClass("verticalAlign")
	var contHeight=Number($(".alignDot").height())+0//adding 2px to avoid issues due to decimal calculation
	//console.log("contHeight : "+contHeight)
	contTop=($(".alignDot").parent().height()-contHeight)/2;
	$(".alignDot").css('width',"100%");
	$(".alignDot").css('height',contHeight+"px");
	$(".alignDot").css('top',contTop+"px");
	$(".tabBtn_next").removeClass("arrowHorizontalnext").addClass("arrowVerticalnext");//css('top',"0px");
	$(".tabBtn_prev").removeClass("arrowHorizontalprev").addClass("arrowVerticalprev");//css('top',"0px");
	
	}
		
		
		/*	
		var toppos=$(".menuPositionHint").css("top")
		$(".exContainer").css("top",toppos)
		$(".exContainer_right").css("top",toppos)
				
		toppos=Number($(".exContainer").css("top").split("px")[0])+Number($(".exContainer").height())+20
		
		$(".instText,.inst_icon").css("top",toppos+"px")
		
		if(getOrientation()=="landscape" && getDevice()=="Tablet"){
				
			for(i=5;i<=totalChapters;i++){
				$(".exContainer .menu_item"+i).appendTo($(".exContainer_right"))
				}
				
				
		}else if(getOrientation()=="portrait" && getDevice()=="Tablet"){
					
					
			$(".exContainer_right .EX_content").appendTo($(".exContainer"))
				
		}*/
}

//end of update



$(".alignDot").css('position',"relative")

//$(".navPos").hide();
if(autoPlay){
$(".navDotCont").show();
}
$("div[class^='tabContent']").hide();


var acceptMouse=true;
$("div[class^='tabBtn']").on("mouseover",function(e){if(acceptMouse){if(!$(this).hasClass("enabletab")){e.stopImmediatePropagation();return false;}else{acceptMouse=false;$(this).mouseover()}}})
$("div[class^='tabBtn']").on("mouseout",function(e){acceptMouse=true})
$("div[class^='tabBtn']").on("mousedown",function(e){e.stopImmediatePropagation();return false;})
$("div[class^='tabBtn']").on("mouseup",function(e){e.stopImmediatePropagation();return false;})

//if(forcedNav){
$(".tabBtn_next").addClass("enabletab")
$(".tabBtn_next").css("opacity",1)
/*}else{
	$("div[class^='tabBtn']").addClass("enabletab");
	$("div[class^='tabBtn']").addClass("visitedtab");
	}*/
if(!forcedNav){
	$(".navDot").removeClass("disableDot").addClass("enableDot").removeAttr("disabled");
}

$(".tabBtn_next").on("click",function(e){
	
	if($(this).hasClass("enabletab")){
		if(forcedNav){
		$(this).removeClass("enabletab")
		$(".tabBtn_next").css("opacity",.5)
		}
	if(!$(".tabBtn_prev").hasClass("enabletab")){
		if(currentScene>0){
					$(".tabBtn_prev").addClass("enabletab").mouseout();
		}
					}
		currentScene++;
	if(lastclick!=null){
		lastclick.mouseout();
		
		}
	lastclick=$(this);	
	$(this).on("mouseover",function(e){e.stopImmediatePropagation();return false;})
	
	maxVisited=maxVisited>currentScene?maxVisited:currentScene;
	ShowSceneNum(currentScene)
       
        
	}else{
		e.stopImmediatePropagation();return false;
		}
	})
$(".tabBtn_prev").on("click",function(e){
	
	if($(this).hasClass("enabletab")){
		/*if(forcedNav){
		$(this).removeClass("enabletab")
		}*/
		currentScene--;
	if(lastclick!=null){
		lastclick.mouseout();
		
		}
	lastclick=$(this);	
	$(this).on("mouseover",function(e){e.stopImmediatePropagation();return false;})
		ShowSceneNum(currentScene)
	}else{
		e.stopImmediatePropagation();return false;
		}
	})



ShowSceneNumBYDot=function(dotNum){
    
    console.log("clicked dot : "+dotNum)
	if($("#navDot"+dotNum).hasClass("disableDot") || $("#navDot"+dotNum).hasClass("activeDot")){
		return;
		}
	currentScene=dotNum-1;
	//console.log("currentScene")    
	if($(".tabBtn_next").hasClass("enabletab")){}else{$(".tabBtn_next").addClass("enabletab").removeAttr("disabled")}
	$(".tabBtn_next").click();
	
	
	
	
	}

ShowSceneNum=function(refSeq){
	if(typeof(showhelp) !="undefined"){
		if(showhelp){
			
		hideHelp();
		}
	}
	if($("#navDot"+refSeq).hasClass("disableDot")){
		return;
		}else{
		$(".activeDot").removeClass("activeDot").removeAttr("aria-current");
		$("#navDot"+refSeq).addClass("enableDot").addClass("activeDot").attr("aria-current","true");
		}
	$("#navDot"+refSeq).addClass("visitedDot")	
	$("#navDot"+refSeq)
	var contentRef=".tabContent"+currentScene;
	flyout();
	zoomout();
	$("div[class^='tabContent']").not(".nohide").fadeOut(50);
	
	for(divcnt=0;divcnt<=totalScene;divcnt++){
		if(divcnt<=refSeq){
			$("div[class^='tabContent"+divcnt+"'].nohide").fadeIn(50);
			//$("div[class^='tabContent"+divcnt+"'].nohide").removeClass("outfocus");
			}else{
		$("div[class^='tabContent"+divcnt+"'].nohide").fadeOut(50);
		//$("div[class^='tabContent"+divcnt+"'].nohide").addClass("outfocus");
			}
		
		}
	
	$(contentRef).fadeIn(50)
	
	startTabAnim(refSeq)
	checkCompletion();
	if(!forcedNav || maxVisited>refSeq){
	setNav(refSeq);
	}
	if(autoPlayScene){
		console.log("playing scene : "+currentScene)
	clearTimeout(sceneTimeout)
	sceneTimeout=setTimeout(function(){console.log('called');if(currentScene<totalScene){ShowSceneNumBYDot(currentScene+1)}},autoPlayDelay)
	}
     $(".CarslideSeq").attr("aria-live","polite");
     $(".CarslideSeq").html("Item "+currentScene+" of "+totalScene)
  // setTimeout(function(){ $(".carousalContent li:eq("+(currentScene-1)+")").focus();},1000)
	}


function setNav(refSeq){
	
	if(refSeq=="1"){
		$(".tabBtn_prev").removeClass("enabletab").attr("disabled",true).mouseout();
        
		$(".tabBtn_prev").css("opacity",1)
		//if(!$(".tabBtn_next").hasClass("enabletab")){
        //Updated on 6th Sep 2021 for having only 2 scenes/dots
					$(".tabBtn_next").addClass("enabletab").removeAttr("disabled").mouseout();
					$(".tabBtn_next").css("opacity",1)
					//}
		}else if(Number(refSeq)==totalScene){
            
			$(".tabBtn_next").removeClass("enabletab").attr("disabled",true).mouseout();
			$(".tabBtn_next").css("opacity",1)
			$(".tabBtn_prev").css("opacity",1)
            //Updated on 6th Sep 2021 for having only 2 scenes/dots
            $(".tabBtn_prev").addClass("enabletab").removeAttr("disabled").mouseout();            
			if(!$(".tabBtn_prev").hasClass("enabletab")){                
					$(".tabBtn_prev").addClass("enabletab").mouseout();
					$(".tabBtn_prev").css("opacity",1)
					}
			}else{
				//console.log("setting nav......................")
				if(!$(".tabBtn_next").hasClass("enabletab")){                    
					$(".tabBtn_next").addClass("enabletab").removeAttr("disabled").mouseout();
					$(".tabBtn_next").css("opacity",1)
					}
					
					$(".tabBtn_prev").addClass("enabletab").removeAttr("disabled").mouseout();
					$(".tabBtn_prev").css("opacity",1)
					
				
				}
	//console.log("nav dot : "+$("#navDot"+refSeq))
	$("#navDot"+(refSeq+1)).removeClass("disableDot").addClass("enableDot").removeAttr("disabled")
	}

function startTabAnim(refSeq){
	var cntRef='tabContent'+refSeq
	totalAnimElement=countUniqeClassNames(cntRef)-1//$("div[class^='"+cntRef+"']").length;
	var animType="appear"
	animElemCount=1;
	clearInterval(tabIntervalID);
	tabIntervalID=setInterval(function(){tabAnimation(refSeq)},animationDelay)
	}
function tabAnimation(refSeq){
	var elmname='tabContent'+refSeq
	//console.log("totalAnimElementtotalAnimElement : "+totalAnimElement+"totalAnimElement :: "+totalAnimElement)
	if(animElemCount>=totalAnimElement){
		//console.log("setting navigation....")
		setNav(refSeq);
		//$(".tabBtn"+(Number(refSeq)+1)).addClass("enabletab visitedtab");
		clearInterval(tabIntervalID);
		}
	anElemGrp=$("."+elmname+"_"+animElemCount)
	animElemCount++;
	
	
	anElemGrp.each(function(){
		anElem=$(this);
		
		
		
	var animType=anElem.attr("class").toLowerCase().split("__")
	if(animType.length>1){
		animType=animType[1]
		}else{
			animType="default"
			
			}
	
	
	switch(animType){
		case "slideup":
			var initTopPos=anElem.css("top").split("px")[0];
			var initHeight=anElem.css("height").split("px")[0];
			
			anElem.css("top",(Number(initTopPos)+Number(initHeight))+"px")
			anElem.css("height","0px")
			anElem.show();
			anElem.animate({top:initTopPos+'px',height:initHeight+'px'},300);
			break;
		case "slidedown":
			anElem.slideDown(300);
			break;
		case "slideleft":
			var initleftPos=anElem.css("left").split("px")[0];
			var initWidth=anElem.css("width").split("px")[0];
			anElem.css("left",(Number(initleftPos)+Number(initWidth))+"px")
			anElem.css("width","0px")
			anElem.show();
			anElem.animate({left:initleftPos+'px',width:initWidth+'px'},300);
			
			break;
		case "slideright":
			var initWidth=anElem.css("width").split("px")[0];
			anElem.css("width","0px")
			anElem.show();
			anElem.animate({width:initWidth+'px'},300);
			break;
		case "flyeffect":
			flyin(anElem);
			break;
		case "zoomeffect":
			zoomin(anElem);
			break;
		default:
			anElem.fadeIn();
		
		}
	})
	//$("."+elmname+"_"+animElemCount).show();
	
	
	}
function countUniqeClassNames(clsNameRef){
	var elemcalssRef=1;
	
	while($("div[class^='"+clsNameRef+"_"+elemcalssRef+"']").length>0){
		elemcalssRef++;
		
		}
		////console.log("Total Anim Element Length : "+elemcalssRef)
		return elemcalssRef;
	
	}
	//console.log("autoPlay : "+autoPlay)
	if(autoPlay){
		$("#navDot1").removeClass("disableDot").removeAttr("disabled");
	setTimeout(function(){$(".tabBtn_next").click();},100)
	}

initintropage=function(){
	$(".initContent").hide();
	$("#navDot1").removeClass("disableDot").removeAttr("disabled")
	setTimeout(function(){$(".tabBtn_next").click();},100)
	
	}
});

function flyout(){
	$(".flyoutReady").each(function(){
		
		$(this).animate({
    opacity: 0,
     top: 0
  }, 300, function() {
	  $(this).css("top",$(this).attr("initPos"))
    // Animation complete.
  });
	});
	$(".flyoutReady").removeClass("flyoutReady")
	}

function flyin(refDiv){
	$(refDiv).attr("initPos",$(refDiv).css("top"))
	refDiv.addClass("flyoutReady")
	refDiv.show();
	var inityPos=refDiv.css('top')
	//console.log("inityPos : "+inityPos)
	inityPos=inityPos.split("px")[0]
	refDiv.css('top',(Number(inityPos)+200)+'px')
	//console.log((Number(inityPos)+100)+'px')
	refDiv.css('opacity','0')
	refDiv.animate({
    opacity: 1,
     top: inityPos
  }, 300, function() {
    //console.log("Animation complete.")
  });
	
	
	}

function flyout(){
	$(".flyoutReady").each(function(){
		
		$(this).animate({
    opacity: 0,
     top: 0
  }, 300, function() {
	  $(this).css("top",$(this).attr("initPos"))
    // Animation complete.
  });
	});
	$(".flyoutReady").removeClass("flyoutReady")
	}

function zoomin(refDiv){
	//zoomout();
	//$(".zoomoutElm").removeClass("zoomoutElm").removeClass("zoominElm");
	
	refDiv.addClass("zoomElm")
	refDiv.addClass("animateElm")
	refDiv.show();
	setTimeout(function(){refDiv.addClass("zoominElm")},100);
	
	//refDiv.removeClass("zoomElm")
	//refDiv.removeClass("zoomElm")
	/*refDiv.addClass("zoomoutReady")
	refDiv.show();
	
	
	
	refDiv.css('opacity','0')
	refDiv.css('zoom','3')
	refDiv.animate({
    opacity: 1,
     scaleX: 1
  }, 3000, function() {
    //console.log("Animation complete.")
  });
	*/
	
	}

function zoomout(){
	//$(".zoominElm").removeClass("zoominElm");
	
	$(".zoominElm").removeClass("zoomElm").removeClass("zoominElm").addClass('zoomoutElm');
	
	/*
	$(".zoomoutReady").each(function(){
		
		$(this).animate({
    opacity: 0,
     zoom: 0.1
  }, 3000, function() {
	  $(this).css("zoom",'1')
    // Animation complete.
  });
	});
	$(".flyoutReady").removeClass("flyoutReady")*/
	}

