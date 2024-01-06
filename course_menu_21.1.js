
function createMenuAlign() {
    
$( "<div><ul id='menuCont'></ul></div>" ).insertBefore( ".menuItem1" );
$list = $('#menuCont');
var countChapt = $("div[class^='menuItem']").length;

for ( var i = 1; i <= countChapt; i++) 
{
    $list.append($(".menuItem"+i))
}
$("div[class^='menuItem']").wrap("<li class='seq'></li>")

for(i=1 ;i<=countChapt; i++)
{        
$('.menuItem'+i).append($(".menuTick"+i)[0]);
$('.menuTick'+i).css({'bottom' : 0 + 'px'});
$('.menuTick'+i).css({'right' : 3 + 'px'});
$('.menuTick'+i).css('border', 'none');
$('.menuTick'+i)[0].style.top = "initial";
$('.menuTick'+i)[0].style.left = "initial";    
    

if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 
    $('.menuTick'+i)[0].style.setProperty('height', '35px', 'important');
}
 
/*$("div[class^='menuItem']").mouseover(function(){
    var enableDisable = $(this).children().is(":disabled");     
    if(enableDisable == false)
        {
                $(this).find("span").css("background-image", "url(bg_color6_20_20.png)");
            
        }
    });
    
$("div[class^='menuItem']").mouseout(function(){
    var enableDisable = $(this).children().is(":disabled");    
    if(enableDisable == false)
        {
                $(this).find("span").css("background-image", "url(bg_color6_20_20.png)");
            
        }
    });*/
 
 
}
}




