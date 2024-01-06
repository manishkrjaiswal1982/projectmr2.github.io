// JavaScript Document

//initCustomPageLoad is created to trigger any JS code/function after lectora page load event

var preloadinterval=0;
function initCustomPageLoad(){
	
	$(".rotationOverlay").insertAfter("#fixDIV");
	alignAssessmentProgBar();
	setSingleMediaplaymode();
	if(win.name.indexOf("Trivantis_Dlg_") ==-1){
	
		if(getTitleMgrHandle()!=null&& window.parent!=window){
			$("#pageDIV").hide();
	setTimeout(function(){parent.document.getElementsByTagName( 'frameset' )[ 0 ].rows="0,*";$("#pageDIV").fadeIn(500);},500)
	}
}
else{
	preloadinterval=setInterval(tryRemovePreloader,100);
}
}

function tryRemovePreloader(){
	
	if(win.name.indexOf("Trivantis_Dlg_") >-1){
try{
	parent.document.getElementById('pre_cont').remove();
	clearInterval(preloadinterval);
	}catch(e){};
}
}

function createPreloderElement(contElm){
    if(is.isMobile.anyPhone()){
    var div = document.createElement('div');
	div.setAttribute("id", "pre_cont");
	div.setAttribute("class", "loader");
    }
    else{
	var div = document.createElement('div');
	div.setAttribute("id", "pre_cont");
	div.setAttribute("class", "lds-roller");
	contElm.appendChild(div);
	
	for(i=0;i<7;i++){
		
		var div = document.createElement('div');
	
	document.getElementById("pre_cont").appendChild(div);
	}
}
    
    
}

//window.addEventListener("resize", setupOrientation);
//window.addEventListener("orientationchange", setupOrientation);

function setupOrientation(){
    try{
      createMenuAlign();
    }catch(err){
			
		}
    try{
      quizTileSetup();
    }catch(err){
			
		}
    
    try{
        
    
    if(is.isMobile.anyPhone()!=null){
		
		if((getOrientation() == "landscape") && !phoneLandscapeFlg){
               
        $(".rotationOverlay").show();
        
    
        }else{
        
        $(".rotationOverlay").hide();
  
        }
	}else if(is.isMobile.any()!=null){
		
		if((getOrientation() == "portrait") && !tabletPortraitFlg){
               
        $(".rotationOverlay").show();
        
    
        }else{
        
        $(".rotationOverlay").hide();
  
        }
		
		
		
	}
   
    }catch(e){console.log("error handling orientation.")}
    
}


var glossaryPath = "glossary.json"

// fetches json data for glossary and clicks launchLightbox when done.
var keyNameGlos = [];
function launchGlossary(key){
	fetch(glossaryPath)
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			$('.glossaryContent.glossarydialogTitle span:first').html(data.glossaryData[key].title)
			$('.glossaryContent.glossarydialogContent span:first').html(data.glossaryData[key].desc);
			
			//console.log(data.definitions[key]);
		})
		.then(function (data) {
			$('.launchGlossary').click()
		})
}

// creates glossary lightbox
var pageDialogEl=null;
function createPageGlossary(){
	
	
	$("#pageDIV").append("<div id='glossaryDialog' class='glossaryDialog' role='dialog' aria-modal='true'></div></div>");
    $(".glossaryDialogOverlay").appendTo("#glossaryDialog");
	$(".glossaryContent").appendTo("#glossaryDialog");
    
	var glosDialogEl=$("#glossaryDialog")[0]
	var glosdialogOverlay=$('.glossaryDialogOverlay')[0]
	glosDialogEl = new Dialog(glosDialogEl, glosdialogOverlay);
        
   
	glosDialogEl.addEventListeners('.launchGlossary','.closeGlossary');
     // glossaryDialogEl.addEventListeners(".bullet_content .poplink"+i,'.closeGlossBtn'+i);  
        
   
	
}

//sorting of glossary data by tite
function compare( a, b ) {
  if ( a.title.toUpperCase() < b.title.toUpperCase() ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

var glosFont = []

function glossaryTable(glosTable) {
	
	fetch(glossaryPath)
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
				//Adds array
			var glossary = new Array();
			glossary.push(data.glossaryColumns);
			glossary.push(data.glossaryData);
			//console.log(glossary);
			
			//Creates a HTML Table element.
			var table = document.createElement("TABLE");
			try {
				glosTable.find('span').css('font-family') ? glosFont.push(table.style.fontFamily = glosTable.find('span').css('font-family')) : table.style.fontFamily = glosFont[0];
				glosTable.find('span').css('fontSize') ? glosFont.push(table.style.fontSize = glosTable.find('span').css('fontSize')) : table.style.fontSize = glosFont[1];
			} catch(err) {
				console.log('Default font not set (glossary)');
			}
		
			var columnCount = glossary[0].length;
	 
			//Adds TH row
			var row = table.insertRow(-1);
			for (var i = 0; i < columnCount; i++) {
				var headerCell = document.createElement("TH");
                headerCell.scope="col";
				headerCell.innerHTML = glossary[0][i];                
				row.appendChild(headerCell);
			}
	 
			//Adds each row
		glossaryArr=Object.values(glossary[1])
        var glossaryRows=glossaryArr.length;
		glossaryArr.sort(compare);
			for (var i = 0; i < glossaryRows; i++) {
				row = table.insertRow(-1);
				var keyName = row.insertCell(-1);
				keyName.innerHTML = glossaryArr[i].title;
				var keyValue = row.insertCell(-1);
				keyValue.innerHTML = glossaryArr[i].desc;
			}
			
		glosTable.html(table);
		})

}

//Create feedback readable
function makeFeedAccessible()
{    
var totalCount=$("div[class^='fdckCont']").length;
for ( var i = 1; i <= totalCount; i++) {    
    var newDiv="<div tabindex='-1' id='feedbackCont"+i+"' aria-live='polite' style='visibility:hidden'></div>";
    $(newDiv).insertBefore( '.fdckCont'+i );  
    $('#feedbackCont'+i).append($('.feedback'+i))
    
}
    
    
//Updated here as per a360 feedback
 
$('input[type=checkbox]').attr('role', 'checkbox');
$('input[type=checkbox]').attr('aria-checked', 'false');
$(' input[type=checkbox]').click(function(){
    	
	//alert("CheckBox checked "+checkBoxChecked);
	if($(this).prop("checked") == false)
		{
           $(this).attr('aria-checked', 'false');
		}
	else if($(this).prop("checked") == true)
        {            
           $(this).attr('aria-checked', 'true');		
        }
});


$('input[type=radio]').attr('role', 'radio');
$('input[type=radio]').attr('aria-checked', 'false');
$('input[type=radio]').change(function (){
$('input[type=radio]').attr('aria-checked', 'false');
$(this).attr('aria-checked', 'true');
});
    
//Closed
    
}

//Create Top menu Navigation as List items
function createMenuNavList() {
    
$( "<nav aria-label='Menu'><ul id='navMenuList'></ul></nav>" ).insertBefore( ".NavMenu1" );
$Navlist = $('#navMenuList');
var countNavList = $("div[class^='NavMenu']").length;
for ( var i = 1; i <= countNavList; i++) 
{
    $Navlist.append($(".NavMenu"+i))
}
    
$("div[class^='NavMenu']").wrap("<li class='seq'></li>")

}

//change aria slelcted attribute on help page
function changeAriaSel()
{
    var totalTab=$(".HelpMenu_cont a").length;
    for ( var i = 1; i < 5; i++) {  
        if($('#tabBtns'+i).hasClass("helpActivelink"))
           {
               $('#tabBtns'+i).attr("aria-selected","true");
               $('#tabBtns'+i).attr("tabindex","0");
               $('#helpTabPanelCont'+i).css("visibility","visible");
        
        }
else
    {
        $('#tabBtns'+i).attr("aria-selected","false");
        $('#tabBtns'+i).attr("tabindex","-1");
        $('#helpTabPanelCont'+i).css("visibility","hidden");
        }
}
    

}

//align the instruction icon for quizzes with the Instruction text
function alignInstText()
{
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
    
}


//var px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;



function calcZooming(){
	if(is.Mac){
		 var newPx_ratio = document.documentElement.clientWidth / window.innerWidth;
    
        console.log("zoom : "+newPx_ratio);
        return newPx_ratio;
		
	}else{
    var newPx_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    
        console.log("zoom : "+newPx_ratio);
        return newPx_ratio;
		}
    
}


//Media play/pause sync. To enable only one media item to play at a time.
function setSingleMediaplaymode(){
$("audio, video:not([loop])").on("play",function(e){
    currentMedia=this.id;
	console.log("Playing : "+this)
	currentPlayElm=$(this)[0];
	$("audio, video:not([loop])").each(function(index){
	if(this.id!=currentMedia){
        this.pause()
    }
	}) 
	
})
}

//Align assessment progress bar
function alignAssessmentProgBar(){
    
    try{
	var tdwidthar = [];
tableTR = $('.chapter_score_tb tr').length-1;
for (i=1;i<=tableTR;i++)
    {
        tdwidth = $('.chapter_score_tb tr').eq(i).find("td:nth-child(2)").find('span').width();
        tdwidthar.push(tdwidth);
        
  
    }

setProgLeft = Math.max.apply(Math,tdwidthar);

setProgLeft = document.getElementsByClassName("chapter_score_tb")[0].offsetLeft + $('.chapter_score_tb th:nth-child(1)').outerWidth() + setProgLeft + 40;

setProgTop = document.getElementsByClassName("chapter_score_tb")[0].offsetTop + $('.chapter_score_tb tr').eq(0).height();

tableHR = 0;
tableHRHgt = 0;
tableTR = $('.chapter_score_tb tr').length-1;
for (i=1;i<=tableTR;i++)
    {
        tableHR =  setProgTop + tableHRHgt + $('.chapter_score_tb tr').eq(i).height()/2 - 2;
        tableHRHgt = tableHRHgt + $('.chapter_score_tb tr').eq(i).height();
        $('.prog'+i).css({'top' : tableHR + 'px'});
        $('.prog'+i).css({'left' : setProgLeft + 'px'});
  
    }
	}catch(e){};
    

}

function alignInstText()
{
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

//Code to change corousel nav band color
$(".navPos").find("path").addClass("changeShapeClr");
//Code ends here
//Code to change text color 
$("div").find('span').each(
   function(){
if($(this).css("color") == "rgb(250, 100, 0)")
{
$(this).addClass("changeTextClr")
}  
})
//Code ends here
    
//Code to change hyperlink color 
$("div").find('span').each(
   function(){
if($(this).css("color") == "rgb(0, 93, 162)")
{
$(this).addClass("changeLinkClr")
}  
})
}    


$(document).ready(function() {
    setTimeout(function(){
    $("div[class^='tabBtn']").mouseover(function(){
    var getClsName = $(this).attr('class').split(/\s+/)[0];
    getClsName = getClsName[getClsName.length -1];

    var enableDisable = $(this).hasClass("default");     
    if(enableDisable == false)
        {            
            $('.tabBG'+getClsName).find("svg").addClass("tabBorder");                        
        }
    else
        {            
            $('.tabBG'+getClsName).find("svg").css("border", "3px solid #d0d0d0");
        }
    });
        
    $("div[class^='tabBtn']").mouseout(function(){        
    var getClsName = $(this).attr('class').split(/\s+/)[0];
    getClsName = getClsName[getClsName.length -1];    
    $('.tabBG'+getClsName).find("svg").removeClass("tabBorder");
    $('.tabBG'+getClsName).find("svg").css("border", "3px solid #d0d0d0");
    });
        
    },100)
})
//Code ends here