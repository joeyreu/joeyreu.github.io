// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
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

// Description: Hides dropdown menu after clicking dropdown menu item
//    Input: Null
//    Output: Null
function clickDropdownItem(){
	var x = document.getElementById("mynav");
    var y = document.getElementById("mybody");
    if(x.className == "mainnav responsive"){
    	x.className = "mainnav";
        y.className = "";
    }
}

// Description: Scrolls page to the anchor specified
//    Input: Anchor ID or name
//    Output: Null
function scrollToAnchor(anchorID){
    var aTag = $("a[name='"+ anchorID +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},350,'swing');
}
