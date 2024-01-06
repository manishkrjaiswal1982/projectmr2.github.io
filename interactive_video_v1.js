//Javascript Document
/* This contains the JS to apply css transition styles found in interactive_video css. 
Please add new transitions to this array and as cases in transitionMe(), and any associated class styles in css. */
var tTypes = ['fade', 'slide'];
//runTransition() is triggered from Lectora action and argument is passed from there.

var vidPlayState=true;

// gets the elements to transition and correct transition case e.g 'fade'. Runs transitionMe()
function runTransition(tNum) {
	for (var i = 0; i < tTypes.length; i++ ) {
		var transElem = $("."+tTypes[i]+tNum).toArray();
		//console.log(transElem);
		if (transElem.length >0) {
			var transitionType = tTypes[i];
			transitionMe(transElem, transitionType);
		}
	}
	
}
//executes transition on div
function transitionMe (transElem, transitionType){
	
	Array.prototype.forEach.call(transElem, function(elem) {
		//console.log(transitionType);
		switch (transitionType) {
			
			case 'fade':
			var isVis = elem.classList.contains('fadeIn') || (!(elem.classList.contains('startHidden')) && !(elem.classList.contains('fadeOut')));
			isVis ? elem.classList.add('fadeOut') : elem.classList.add('fadeIn');
			isVis ? elem.classList.remove('fadeIn') : elem.classList.remove('fadeOut');
			break;
			case 'slide':
			var isVis = elem.classList.contains('slideIn');
			isVis ? elem.classList.add('slideOut') : elem.classList.add('slideIn');
			isVis ? elem.classList.remove('slideIn') : elem.classList.remove('slideOut');
			break;
			//default: console.log('Transition ' + transitionType + ' case not listed');
		}
	});
}
var lastEventAtVidFinish;
var markerElems = [];
var showMarkers;
//gets video object and adds q markers
function qEvents (){
    $(".mejs__fullscreen-button > button").attr("disabled",true);
	if (!$("#marker0").length){
		$('.videoElem video')[0].onplay = function() {
				if (!$("#marker0").length){
				var vidObjName = document.getElementsByClassName("videoElem")[0].id;
				evTimes(eval(vidObjName).arrEvents);

				function evTimes(vidObj) {
					for (var k in vidObj) {
					  if (vidObj.hasOwnProperty(k)) {
						addMarker(k, vidObj[k].time);
						//console.log(evTimes);
					  }
					}
				}
					//ads marker to course
				function addMarker (mNum, qTime) {
					
					var qMarkPos = (qTime / ($("#"+vidObjName + "Media")[0].duration)) * 100 + "%";
					//console.log(qMarkPos);
					var qMarker = document.createElement("DIV");
					document.getElementById(vidObjName).appendChild(qMarker);
					qMarker.classList.add("q-marker");
					if (showMarkers === false) { qMarker.classList.add("hiddenQmarker"); }
					qMarker.id = "marker" + mNum;
					$("#marker"+mNum).css("left", "calc(" + qMarkPos + " - " + ($("#marker"+mNum).width() / 2) + "px)");
					$("#marker"+mNum).appendTo($(".videoElem").find($('.mejs__time-rail'))[0]);
					markerElems.push(qMarker);
				}
				//move the last marker to end of video if enabled, this is to work around lectora bug which doesn't play events too close to end
				if (lastEventAtVidFinish) {
					markerElems[markerElems.length - 1].style.left = "calc(100% - " + (markerElems[markerElems.length - 1].offsetWidth / 2) + "px)";
				}
			}
		}
	}
};

//attempts to prevent autocomplete for box questions
$(document).ready(function() {
  $(document).on('focus', ':input', function() {
    $(this).attr('autocomplete', 'off');
  });
});

// play video in parent window, fade blocker, remove event marker.
function playVid() {
	var windowTarget = !window.name.includes("Dlg") ? window : window.parent;
	var videoElem = windowTarget.document.getElementById((windowTarget.document.getElementsByClassName("videoElem")[0].id + "Media"));
	//console.log(videoElem);
	try {
		var blockers = windowTarget.$(".blocker")[0];
		blockers.classList.add('fadeOut');
		blockers.classList.remove('fadeIn');
	} catch(err) {
		//console.log('no blocker to fade');
	}
	if (videoElem.currentTime !== videoElem.duration || videoElem.currentTime !== 0){
        
       
        if(vidPlayState){
	videoElem.play();
        }
       
	}
}

function pauseVid() {
	var windowTarget = !window.name.includes("Dlg") ? window : window.parent;
	var videoElem = windowTarget.document.getElementById((windowTarget.document.getElementsByClassName("videoElem")[0].id + "Media"));
	//console.log(videoElem);
	
	if (videoElem.currentTime !== videoElem.duration || videoElem.currentTime !== 0){
        
         
        vidPlayState= !videoElem.paused;
	videoElem.pause();
         
	}
    
}
//gets last quiz question,a similar loop exists in rewind function - To do rewrite as object method or higher order
function lastQuiz() {
	var windowTarget = !window.name.includes("Dlg") ? window : window.parent;
	var vidObjName = windowTarget.document.getElementsByClassName("videoElem")[0].id;
	var evArr = windowTarget.eval(vidObjName).arrEvents;
	
			for(var i=evArr.length - 1, lastQ = "0"; i>=0; i--){
			if (windowTarget.$("#"+vidObjName + "Media")[0].currentTime < evArr[0].time) {
				lastQ = 0;
				break;
			} else if (windowTarget.$("#"+vidObjName + "Media")[0].currentTime >= evArr[i].time){
				lastQ = evArr[i].func;
				break;
			}
		}//console.log(lastQ);
window[lastQ]();
}

function rewindVid(btime) {

	var windowTarget = !window.name.includes("Dlg") ? window : window.parent;
	var vidObjName = windowTarget.document.getElementsByClassName("videoElem")[0].id;
	var evArr = windowTarget.eval(vidObjName).arrEvents;
	//rewinds video to either last question or by specified time in seconds
	if (btime === 'default') {
		for(var i=evArr.length - 1, lastQ = "0"; i>=0; i--){
			if (evArr.length !== 1){
				if (windowTarget.$("#"+vidObjName + "Media")[0].currentTime < evArr[1].time) {
					lastQ = -1;
					break;
				} else if (windowTarget.$("#"+vidObjName + "Media")[0].currentTime >= evArr[i].time){
					lastQ = evArr[i-1].time;
					break;
				}
			} else {
			lastQ = -1;
			}
		}

		windowTarget.$("#"+vidObjName + "Media")[0].setCurrentTime(lastQ + 1);
	} else {
		windowTarget.$("#"+vidObjName + "Media")[0].setCurrentTime(btime);
	}
	
}

// set lightbox close button to callback to parent. Unassigns events and sets click to callback and then exit.
function exitLB() {
	parent.eval(parent.$('.lightbox-close').attr('id')).onUp();
	CloseWnd(); // this is lectoras exit close function
};

function assignClose() {
	try {
		var lightboxClose = parent.$('.DLG_titleCloseBtn')
		lightboxClose[0].onclick = null;
		lightboxClose.click(function() {
			exitLB();
		});
        lightboxClose[0].addEventListener('keydown', function(e) { 
    if(e.keyCode==27){
		exitLB();
    }
		})
		} catch (err) {
			//console.log('not in lightbox');
		}
};
assignClose();