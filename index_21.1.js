
var menuCreated=false;
var menuviewtoggle=false;
var menuWatch=0;
var testLevel=5;
var testCounter=0;
var myDialog;



function createMenu(){
    
    $(".instIcon").hide();
	$(".questStemInst").find('span').each(
			function(){
				var tempText=$(this).text();
				if(tempText.indexOf("(!)")>-1){
					$(this).text(tempText.replace('(!)',''))
                    $(this).parent('p').css({'margin-left':'34px'});
					$(this).parent('p').prepend($(".instIcon img").clone())
                    $(".questStemInst").find('img').css({'margin-left':'-34px'});
				}
                
               
		})

    
	testCounter=0;	
	menuWatch=setInterval(checkforIndexrelod,300);
	
	
	
	}

function setupMenu(forceCreate){
   if($("div[id^='toc']").length<1){
       return; 
    }
    
    
    if($(".menuText").length<1){
		menuCreated=false;
	}else{
        if(!forceCreate){
		menuCreated=true;
        }
		}
	
	if(menuCreated){
		return;
	}else{
	console.log("creating menu")
	var menuSeq=0;
	$("#pageDIV").append("<div class='indexblocker' style='visibility:hidden'></div>");
        
        
        
	
	if(getDevice()=="Phone"){
		$("div[id^='toc']").first().appendTo($("body"))
		
		
		$("div[id^='toc']").first().css("height",$("#pageDIV").height()+"px")
		
		}
	$("div[id^='toc']").first().attr("role","dialog")
		$("div[id^='toc']").first().attr("aria-label","Site map")
        $("div[id^='toc']").first().attr("aria-modal","true")
        $("div[id^='toc'] table").attr("role","presentation")
        $("div[id^='toc'] img").attr("alt","")
        $("div[id^='toc'] img").removeAttr("title")
        
       
	//$(".indexblocker").show();
	$("div[id^='entry']").each(function(){var refeletab=$(this).find("td");refeletab.last().addClass("menuText").insertBefore(refeletab.last().prev());refeletab.first().remove();})
	$("div[id^='entry']").each(function(){
		
		if($(this).attr("id")=="entry0"){return true;}
		if(eval($("div[id^='toc']").attr("id")).foldertree["c"][menuSeq].ptstat==0){
			
			$(this).addClass("disableMenuItem")
			
			
			}else{
				$(this).addClass("enableMenuItem")
				}
		
		$(this).on("click",function(e){if($(e.target).is('a') && $(this).hasClass("disableMenuItem")){e.stopPropagation();return false;}if($(this).hasClass("disableMenuItem")){e.stopPropagation();return false;}else{ window.location.href = $(this).find("a").last().attr("href")}})
		menuSeq++;
		
		
		})
	
	//if(getDevice()!="Phone"){
	//$(".blocker").on("click",function(e){e.stopPropagation();createMenu();
	//return false;})
	//}
	var selNode=eval($("div[id^='toc']").attr("id")).selNode
	if(selNode==null){
	$("#entry1").addClass("activeMenuItem")	
	}else{
	$("#entry"+eval($("div[id^='toc']").attr("id")).selNode.id).addClass("activeMenuItem")
	
	}
	//$("div[id^='toc']").css("visibility","visible")
	//menuLeftPos=$("div[id^='toc']").css("left")
	if($(".menuText").length>0){
	$(".pageNumberBox").clone().insertBefore("#entry1");
    $(".indexClose").insertBefore(".pageNumberBox");
        
	$("#foldertree .pageNumberBox").css("display","block")
	
	$("<ul></ul>").insertAfter($("#foldertree .pageNumberBox"));
    $("#foldertree>div[id^='entry']").each(function(indexnum){
        if(indexnum!=0){
        $("#foldertree ul").append("<li></li>")
        $("#foldertree  ul li").last().append($(this))}
    }
    )
     try{   
    $(".menuText").each(function(){$(this).children("a").attr("aria-label",$(this).children("a").html()+" "+$(this).children("a").attr("aria-label").substr(0,$(this).children("a").attr("aria-label").indexOf($(this).children("a").html())-1))})
     }catch(e){}
    
   
        
        
	//$("div[id^='toc']").css("visibility","visible");
		var navDialogEl=$("div[id^='toc']")[0]
		var dialogOverlay=$('.indexblocker')[0]
	myDialog = new Dialog(navDialogEl, dialogOverlay);
		myDialog.addEventListeners('.UIsitemapBtn>button', '.indexblocker,.indexClose');
	//flyinMenu($("div[id^='toc']"))
	//$( ".closeSitemap_link a" ).focus();
		$("div[id^='toc']").first().css("visibility","visible")
	}
	}	
	
	
	
}



function checkforIndexrelod(){
	
	if($(".menuText").length<1){
		//flyoutMenu($("div[id^='toc']"))
		setupMenu()
		clearInterval(menuWatch);
		}else if(testCounter>testLevel){
		clearInterval(menuWatch);
		}
	testCounter++;
	
	}

function createHelpDialog(){
	
	
	$("#pageDIV").append("<div id='helpDialog' class='helpDialog' role='dialog' aria-labeledby='helpTitleContainer' aria-live='polite' aria-describedby='helpContentContainer'><div id='helpTitleContainer'></div><div id='helpContentContainer' aria-live='polite'></div></div>");
	$(".helpTitle").appendTo("#helpTitleContainer");
	$(".helpContent").appendTo("#helpContentContainer");
	$(".closeHelpBtn").appendTo(".helpDialog");
    //Re-arrange help elements to list format as per accessibility recomendations
    $("#helpContentContainer").prepend("<ul></ul>")
    $("#helpContentContainer>div[id^='image']").each(function(indexnum){
        $("#helpContentContainer ul").append("<li></li>")
        $("#helpContentContainer ul li").last().append($(this).next()).prepend(this)
    })
    //End of re-arrangement code
	var navDialogEl=$(".helpDialog")[0]
	var dialogOverlay=$('.blocker_help')[0]
	helpDialog = new Dialog(navDialogEl, dialogOverlay);
		helpDialog.addEventListeners('.UIhelpBtn>button', '.closeHelpBtn');
	
    
    
    
    
}




