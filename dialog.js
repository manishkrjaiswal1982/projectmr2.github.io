var readableElem=null;
var firstReadableEle=null;
function Dialog(dialogEl, overlayEl) {

	this.dialogEl = dialogEl;
	this.overlayEl = overlayEl;
	this.focusedElBeforeOpen;

	var focusableEls = this.dialogEl.querySelectorAll('a[href]:not([tabIndex="-1"]), area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];
  this.initialCall=true;
	this.close(); // Reset
     this.initialCall=false;
}


Dialog.prototype.open = function() {

	var Dialog = this;
    
var focusableEls = this.dialogEl.querySelectorAll('a[href]:not([tabIndex="-1"]), area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
   //console.log("elements : "+focusableEls);
	this.focusableEls = Array.prototype.slice.call(focusableEls);
    this.firstFocusableEl=null;
     for (var index = 0; index < focusableEls.length; index++) {
         if($(focusableEls[index]).css("visibility")!="hidden"){
            if(this.firstFocusableEl==null){
                this.firstFocusableEl=focusableEls[index];
                }
            this.lastFocusableEl=focusableEls[index];
            }
      
        };

$(this.dialogEl).show();
    // var titleElem=$(this.dialogEl).find("h2") ;
    var titleElem=$(this.dialogEl).find(".dialogTitle") ;
    
     var firstReadableEle=null;
    for(var i=0;i<titleElem.length;i++){
         
      if($(titleElem[i]).css("visibility")!="hidden"){  
      this.dialogEl.setAttribute('aria-labelledby', titleElem[i].id);
          break;
      }
    }
    readableElem=$(this.dialogEl).find(".dialogContent") ;
   // console.log("readable elem : "+readableElem)
    var firstReadableEle=null
    for(var i=0;i<readableElem.length;i++){
       // console.log("readable element"+$(readableElem[i])+ ":"+$(readableElem[i]).css("visibility"))
      if($(readableElem[i]).css("visibility")=="visible"){ 
           this.dialogEl.setAttribute('aria-describedby', readableElem[i].id);
       firstReadableEle= readableElem[i];
          //console.log("readable elem : "+readableElem[i].innerHTML)
          break;
      }
    }
    
   
   
	//this.firstFocusableEl = this.focusableEls[0];
	//this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];
    
	this.dialogEl.removeAttribute('aria-hidden');
	this.overlayEl.removeAttribute('aria-hidden');
  //$(this.dialogEl).find( "div" ).css("visibility","visible")
    $(this.overlayEl).css("visibility","visible")
	this.focusedElBeforeOpen = document.activeElement;

	this.dialogEl.addEventListener('keydown', function(e) {
		Dialog._handleKeyDown(e);
	});

	this.overlayEl.addEventListener('click', function() {
		Dialog.close();
	});

    $("div[id^='toc'] img").attr("alt","")
    $("div[id^='toc'] img").removeAttr("title")
    
   var glossaryTitleref=$(this.dialogEl).find('div[class^="glossaryTitle"]')
    //console.log(glossaryTitleref)
    if(glossaryTitleref.length>0){
        $(glossaryTitleref).attr("tabindex","-1")
        glossaryTitleref[0].focus();
        focusonBlur=this.firstFocusableEl;
        glossaryTitleref[0].focusout=function(){
            
           focusonBlur.focus(); 
        }
        
    }else{
       // console.log("this.firstFocusableEl : "+this.firstFocusableEl)
        if(firstReadableEle!=null){
           $(firstReadableEle).attr("tabindex","-1");
            // $(firstReadableEle)[0].focus();
           }else{
	//this.firstFocusableEl.focus();
           }
        this.firstFocusableEl.focus();
        }
};

Dialog.prototype.close = function() {

	this.dialogEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);
$(this.dialogEl).hide();
  // $(this.dialogEl).find( "div" ).css("visibility","hidden")
    $(this.overlayEl).css("visibility","hidden")
    //console.log("callback")
    if(!this.initialCall){
    $(".lightboxexitCallback button").click();
    }
   /*  $(".UIhelpBtn button").mouseout();
    eval($(".UIHelpBtnActiveGfx").attr("id")).actionHide();*/
 /*
  console.log("check : "+$(this.focusedElBeforeOpen).parent().hasClass("UIhelpBtn"))
  
    if($(this.focusedElBeforeOpen).parent().hasClass("UIhelpBtn")){
     console.log("check1 : "+eval($(".UIhelpBtn").attr("id")))        
          
              
        eval($(".UIhelpBtn").attr("id")).actionShow();
    setTimeout(function(){$(".UIhelpBtn button")[0].focus();},500)
              
    }else{*/

	if ( this.focusedElBeforeOpen ) {
		this.focusedElBeforeOpen.focus();
	}
   // }
   
};


Dialog.prototype._handleKeyDown = function(e) {

	var Dialog = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		//console.log("going backward"+Dialog.firstFocusableEl.innerHTML+document.activeElement.innerHTML)
	
		if ( document.activeElement.innerHTML == Dialog.firstFocusableEl.innerHTML ) {
			e.preventDefault();
			Dialog.lastFocusableEl.focus();
			//console.log("Dialog.lastFocusableEl : "+Dialog.lastFocusableEl.innerHTML)
		}
	}
	function handleForwardTab() {
		if ( document.activeElement === Dialog.lastFocusableEl ) {
			e.preventDefault();
			Dialog.firstFocusableEl.focus();
		}
	}

	switch(e.keyCode) {
	case KEY_TAB:
		if ( Dialog.focusableEls.length === 1 ) {
			e.preventDefault();
			break;
		} 
		if ( e.shiftKey ) {
			handleBackwardTab();
		} else {
			handleForwardTab();
		}
		break;
	case KEY_ESC:
		 $("#"+Dialog.overlayEl.id).css("visibility","hidden");
        $("#"+Dialog.overlayEl.id).attr('aria-hidden',true);	
		Dialog.close();
			
       
		break;
	default:
		break;
	}


};


Dialog.prototype.addEventListeners = function(openDialogSel, closeDialogSel) {

	var Dialog = this;

	var openDialogEls = document.querySelectorAll(openDialogSel);
	for ( var i = 0; i < openDialogEls.length; i++ ) {
		openDialogEls[i].addEventListener('click', function() { 
			Dialog.open();
		});
	}

	var closeDialogEls = document.querySelectorAll(closeDialogSel);
	for ( var i = 0; i < closeDialogEls.length; i++ ) {
		closeDialogEls[i].addEventListener('click', function() {
			Dialog.close();
		});
	}

};


var pageDialogEl=null;
function createPageLightbox(){
	
	
	$("#pageDIV").append("<div id='pageDialog' class='pageDialog' role='dialog' aria-modal='true'></div></div>");
    $(".pageDialogOverlay").appendTo("#pageDialog");
	$(".lightboxContent").appendTo("#pageDialog");
    
	var pgDialogEl=$("#pageDialog")[0]
	var pgdialogOverlay=$('.pageDialogOverlay')[0]
	pageDialogEl = new Dialog(pgDialogEl, pgdialogOverlay);
        
   
	pageDialogEl.addEventListeners('.launchLightbox','.closeLightbox');
     // glossaryDialogEl.addEventListeners(".bullet_content .poplink"+i,'.closeGlossBtn'+i);  
        
   
	
}

