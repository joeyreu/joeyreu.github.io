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








var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "rgba(0,200,200,0.5)"; //opacity 0.5
// //c.fillRect (X, Y, width, height);
// c.fillRect (300, 0, 325, 325);
//
//
// // Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(500,500);
// c.lineTo(400,200);
// c.strokeStyle = "#fa34a3";
// c.stroke();
//
//
// // arc / circle
// c.beginPath();
// c.arc(400, 200, 30, 0, Math.PI*2, false);
// //c.arc(100,75,50,0,2*Math.PI);
// c.strokeStyle = "blue";
// c.stroke();
//
//
// for(var i = 0; i < 30; i ++){
//   var x = Math.random()*window.innerWidth;
//   var y = Math.random()*window.innerHeight;
//   // arc / circle
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI*2, false);
//   //c.arc(100,75,50,0,2*Math.PI);
//   c.strokeStyle = "blue";
//   c.stroke();
// }
console.log(canvas);

var x = Math.random()*window.innerWidth;
var y = Math.random()*window.innerHeight;
var dx = (Math.random() - 0.5)*10;
var dy = (Math.random() - 0.5)*10;
var radius = 30;
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI*2, false);
  c.strokeStyle='blue';
  c.stroke();
  if(x+radius > innerWidth || x-radius < 0){
    dx = -dx;
  }
  if(y+radius > innerHeight || y-radius < 0){
    dy = -dy;
  }
  x += dx;
  y += dy;
}
animate();


// window.onload = draw;
//
// // Listeners
// window.addEventListener('resize', resizeCanvas, false);
//
// function resizeCanvas() {
//   var canvas = document.getElementById("mycanvas");
//   draw();
// }
//
// function draw() {
//   var canvas = document.getElementById("mycanvas");
//   var c = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   animate();
// }
//
// var canvas = document.getElementById("mycanvas");
// var c = canvas.getContext("2d");
// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI*2, false);
// c.strokeStyle='blue';
// c.stroke();
//
