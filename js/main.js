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

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 40;
var minRadius = 8;

var colorArray = [
  '#30BFBF',
  '#008080',
  '#6CDAE7',
  '#02A4D3',
  '#4997D0',
];

window.addEventListener('mousemove',
  function(event){
    console.log('mousemoved');
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});


// Circle object (capital letter for objects)
function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.strokeStyle=this.color;
    c.fillStyle=this.color;
    c.stroke();
    c.fill();
  }

  this.update = function() {
    if(this.x+this.radius > innerWidth || this.x-this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y+this.radius > innerHeight || this.y-this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;


    // interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50
      && this.radius < 40){
      this.radius += 1;
    }else if(this.radius > this.minRadius){
      this.radius -=1;
    }

    this.draw();
  };

}

var circleArray = [];
var numCircles = 800;
if(canvas.width < 680){
  numCircles = 200;
}
for(var i = 0; i < numCircles; i ++){
  var radius = Math.random() * 3 + 1;
  var x = Math.random()*(window.innerWidth - radius*2) + radius;
  var y = Math.random()*(window.innerHeight - radius*2) + radius;
  var dx = (Math.random() - 0.5)*2;
  var dy = (Math.random() - 0.5)*2;

  circleArray.push(new Circle(x, y, dx, dy, radius))
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  for(var i = 0; i < circleArray.length; i ++){
    circleArray[i].update();
  }
}
animate();


// window.onload = draw;
//

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
