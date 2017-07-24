// Toggle between adding and removing the "show-items" class to topnav when the
// user clicks on the icon
function screenAdjust() {
  var x = document.getElementById("mynav");
  var y = document.getElementById("mybody");
  $("#mynav").toggleClass('show-items');
  $("#mybody").toggleClass('show-items');
  if($('#mynav').hasClass('initial')){
    $("#mynav").toggleClass('initial');
  }
}

// Description: Hides dropdown menu after clicking dropdown menu item
//    Input: Null
//    Output: Null
function clickDropdownItem(){
	var x = document.getElementById("mynav");
  var y = document.getElementById("mybody");
  if($('#mynav').hasClass('show-items')){
    //$(".right-items").toggleClass('hide');
    //$(".right-items").toggleClass('right-items');
    //$("#mybody").toggleClass('show-items');
    $("#mynav").toggleClass('show-items');
    $("#mybody").toggleClass('show-items');
  }
}

// Description: Scrolls page to the anchor specified
//    Input: Anchor ID or name
//    Output: Null
function scrollToAnchor(anchorID){
  var aTag = $("a[name='"+ anchorID +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},350,'swing');
}
