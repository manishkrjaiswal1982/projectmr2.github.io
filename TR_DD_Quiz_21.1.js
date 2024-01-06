// JavaScript Document
/*
	- description: Quiz class to automate the basic quiz functionalities for Multiple choice type questions (Radio Buttons)
 	- Uses: incluse this js on the quiz page and create object of it using  "new TR_DP_quiz()" on the page show event
  	- Requirment : 
		- All elements of the quize need to be initialized before creating the new object
		- JQuery library is required for this.
	- Created on : Nov 24 2015
*/

/* cunstructor method to build references to the lectora quize elements.
	- Submit Button [Mendetory]
	- Reset Button [optional]
	- Show Answer Button [optional]
	- Retry Button [optional]
*/

var list;
var myDP;
function TR_DP_quiz(){
	
	this.SubmitBtn=$(".submit");
	this.ShowAnsBtn=$(".showans");
	this.SubmitBtn.myEvent="assignSubmitEvent"
	this.ShowAnsBtn.myEvent="assignShowAnsEvent"
	this.QuestionProcessed=false;
	this.init();
	}

TR_DP_quiz.prototype.init=function(){
	var ObjRef=this;
	
		$("#pageDIV>fieldset").addClass("DDfieldset");
		$(".DDfieldset").css("display","block");
		$(".DDfieldset fieldset").addClass("firstChildFieldSet");
		list=$(".DDfieldset");
		$(".firstChildFieldSet").each(function(indx){
		$(this).appendTo($(list[indx]))
		})
		$(".DDfieldset div[id^='text']").each(function(){
		
		$(this).insertBefore($(this).parent().next())
		
		})	
		
		$(".DDfieldset").first().addClass("firstQuizfieldset");	

		$("<div id='dndContainer' class='dndContainer'></div>").insertBefore($(".firstQuizfieldset"))
		$(".DDfieldset").appendTo("#dndContainer")
    $("#dndContainer legend").each(function(index){$(this).attr("aria-label",VarDD_q_txt.getValue()+" "+(index+1))})
	ObjRef.assignEvents();
	}

/* Method to set the button state
	- Parameters:
		-btnRef : JQuery Reference to the target button
		-bstate : True/False to enable/disable the button
*/	
TR_DP_quiz.prototype.setButton=function(btnRef,bstate){
	
	if(btnRef.get(0)){
		eval(btnRef.attr("id")).setDisabled(!bstate);
		if(bstate){
			btnRef.removeClass("disabled17")
			}else{
				btnRef.addClass("disabled17")
				
				}
		
		
		}
	}

/* Method to assign events to the buttons and set initial state of the button
	
*/	
TR_DP_quiz.prototype.assignEvents=function(){
	var ObjRef=this;
	this.assignInputEvents();
	
	
	setTimeout(function(){
		var all_Checked=ObjRef.checkAllSelected();
	if(all_Checked){
		console.log("enabling button")
		eval($(".enableSubmit_trg").attr("id")).onUp();
		}
	else{
		
		eval($(".disableSubmit_trg").attr("id")).onUp();
		}
	if($("select:disabled").length > 0){
		
		eval($(".disableSubmit_trg").attr("id")).onUp();
		
		//ObjRef.showAnswer();
		}
	},500)
	
	
	}
/* Method to assign events to the input elements (radio buttons) to set button status on intraction
	
*/	
TR_DP_quiz.prototype.assignInputEvents=function(){	
	var ObjRef=this;
	console.log("seting option")
	$('.dndContainer Select').each(function(){
		
		$(this).children('option').eq(0).prop('selected', true);
		
		})
	$('.dndContainer Select').change(function(){
		var all_Checked=ObjRef.checkAllSelected();
		
		
		if(all_Checked){
					eval($(".enableSubmit_trg").attr("id")).onUp();
		}else{
			
			eval($(".disableSubmit_trg").attr("id")).onUp();
			}
		})
	
	
}

/* Assign method to the retry event
	
*/


/* Assign method to the reset event
	
*/


/* Assign method to the show answer event
	
*/
TR_DP_quiz.prototype.showincorrect=function(ans_str){
    $(".dndContainer select").attr("disabled","true");
    var temparr=ans_str.split(", ")
    for(i=0;i<temparr.length;i++){
        
    $(".dndContainer select:eq("+(temparr[i]-1)+")").removeAttr("disabled")
   
        }
   setTimeout(function(){ $("select:eq("+(temparr[0]-1)+")").focus();},300)
}

/* Show Answer function to show the correct answer of the quiz
	
*/
TR_DP_quiz.prototype.showAnswer=function(){
	
	
	var ObjRef=this;
	if(ObjRef.QuestionProcessed==true){
			return;
			}
	ObjRef.QuestionProcessed=true;
	var headObj= document.head || document.getElementsByTagName("head")[0];// copy and store the entire head element including scripts to a object
	var pageText=$(headObj).html();// assign the HTML code to "pageText" variable
	
	
	var SelectObj= $(".dndContainer select");
	var variableList=[];
	var correctAnsArr=[];
	for(var i=0;i<SelectObj.length;i++){
		var SelectCodeStr=$($(".dndContainer select")[i]).attr("onChange").split(".set(val)")[0]
		variableList.push(SelectCodeStr.substring(SelectCodeStr.lastIndexOf(";")+1,SelectCodeStr.length))
		
		}
		
	for(i=0;i<variableList.length;i++){
		var SelectCodeStr=$($(".dndContainer select")[i]).attr("onChange").split(".set(val)")[0]
		//console.log(variableList)
		var searchStartIndex=pageText.indexOf(variableList[i]+".isCorr(")
		var start_pos = pageText.indexOf("\\u",searchStartIndex);
	var end_pos = pageText.indexOf("'",start_pos);
	var answer_text = pageText.substring(start_pos,end_pos)
	var r = /\\u([\d\w]{4})/gi;
	answer_text = answer_text.replace(r, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16)); } );
	answer_text = unescape(answer_text);
	correctAnsArr[i]=answer_text;
		}
	
	
	
	//code to find the encrypted string for correct answer in the script
	
	
	//code to extract and unscape the encrypted answer text
	var corrtextArr=[];
	
	//code to highlight the correct options on the screen
	$(".dndContainer select").each(function(index){
		
		console.log($(this))
		
		if($(this).val()==correctAnsArr[index]){
            $(this).parent().parent().parent().find("label").prepend("<div class='dd_cor_ico'><img src='dd_tick.png'></div>")
		//$(this).parent().parent().parent().addClass("correctAnswerStyle")
		
		//$(this).parent().parent().parent().parent().addClass("correctAnswerStyle")
		
	
		}else{
            $(this).parent().parent().parent().find("label").prepend("<div class='dd_incor_ico'><img src='dd_cross.png'></div>")
        }
		
		/*$(this).val(correctAnsArr[index]);
        setTimeout(setcorrectText,10*index+500,$(this).attr("id"))*///code to add correct answer.
        
		
		//$("#pageDIV .DDfieldset div[id^='text']").attr("tabindex","1000")
	//Disable all intraction elements after show answer
	

})



	$(".dndContainer select").attr("disabled","true");
}

function setcorrectText(refElem){
    
//$("#"+refElem).parent().parent().next().children("label").children("p").append("<br><span>Correct answer is "+$("#"+refElem).val()+"</span>")
}

/* Assign method to the submit event
	- checks if more attempts are available else show the correct answers.
*/

/* Method to check if more attempts are left
	- returns true if the checkboxes are active else return false
	
*/


TR_DP_quiz.prototype.checkAllSelected=function(){
	var all_Checked=true;
	
		$('.dndContainer Select').each(function(){
			
			
			if(this.selectedIndex<1){
				all_Checked=false;
				
				return false;
				}
			
			})
	
	return all_Checked;
	}

