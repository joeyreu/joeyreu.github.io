/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function screenAdjust() {
    var x = document.getElementById("mynav");
    var y = document.getElementById("mybody");

    if (x.className === "mainnav") {
        x.className += " responsive";
        y.className += " responsive";
    } else {
        x.className = "mainnav";
        y.className = "";
    }
}

function clickDropdownItem(){
	var x = document.getElementById("mynav");
    var y = document.getElementById("mybody");
    if(x.className == "mainnav responsive"){
    	x.className = "mainnav";
        y.className = "";
    }
}


$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});



function scrollToAnchor(anchorID){
    var aTag = $("a[name='"+ anchorID +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},350,'swing');
}