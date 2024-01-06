var updateTemplateTracking=null;
var clickAnyToProceed=false;
var totalHotspot=0;
var completedinSession=false;


	
function initHotspot(){

if(typeof(clickAnyToProceed)=="undefined"){
	clickAnyToProceed=false;
	}
    
totalHotspot=$("div[class^='hotspot_btn']").length;
 
$("div[class^='hotspot_btn']").on("click",function(e){
    
	$(this).addClass("visitedHotspot");
    checkCompletion();
	}
	)
}

updateTemplateTracking=function(){
	
	//checkCompletion();
	//$("div[class*='newslink']").addClass("visitedlink")
	}

function checkCompletion(){
	if(clickAnyToProceed){
		eval($(".TrackingObj").attr("id")).onUp();
			}else if($(".visitedHotspot").length==totalHotspot){
		
		if(!completedinSession){
			completedinSession=true;
			
		eval($(".TrackingObj").attr("id")).onUp();
		}
		
		}
	
	}


	
