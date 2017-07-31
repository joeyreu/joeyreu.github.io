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
  $('html,body').animate({scrollTop: aTag.offset().top},700,'swing');
}




var canvas = document.querySelector('canvas');
var homediv = $("#home-div").height();
canvas.width = window.innerWidth;
canvas.height = $("#home-div").height();

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 40;
var minRadius = 8;

var fireWorks = [];
var starArray = [];
var land = undefined;
var moon = undefined;
var origincount = 0;

var colorArray = [
 // "#0952BD",
  "#A5BFF0",
  "#118CD6",
  "#1AAEE8",
  "#F2E8C9"
];

var hue = 120;



// create firework
function Firework(sx, sy, tx, ty, origin, hidden, starthue) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;

  this.history = [];
  this.historyLength = 2;

  this.rotation = undefined;
  this.speed = Math.random()*5 + 5;
  this.brightness =  Math.random()*30 + 60;

  this.tradius = 5;
  this.hue = Math.random()*((hue + 30) - (hue - 30)) + hue - 30;

  this.origin = origin;
  this.angle = Math.random()*(Math.PI * 2);
  this.friction = 0.95;
	this.gravity = 2;
  this.alpha = 1;
	// set how fast the particle fades out
	this.decay = Math.random()*(0.04-0.025) + 0.025;
  this.hidden = hidden;

  this.starthue = starthue;

  if(this.hidden){
    this.hue = Math.random()*((hue + 200) - (hue - 200)) + hue - 200;
  }
  this.linew = 1;
  if(!this.origin){
    this.speed = Math.random()*5 + 7;
    this.linew = 2.5;
    this.brightness =  Math.random()*20 + 80;
    this.decay = Math.random()*(0.04-0.025) + 0.025;
  }

  if(this.starthue != false){
    this.hue = Math.random()*((this.starthue + 30) - (this.starthue - 30)) + this.starthue - 30;
  }

  this.draw = function() {
    c.beginPath();
    c.lineWidth = this.linew;
    if(!this.origin){
      this.linew *= 0.95;
      //this.brightness *= 0.99;
    }
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    c.moveTo( this.history[ this.history.length - 1][ 0 ],
               this.history[ this.history.length - 1][ 1 ] );
    c.lineTo( this.x, this.y );
    c.shadowColor = '#E3EAEF';
    c.shadowBlur = 50;
    c.strokeStyle = 'hsl(' + this.hue + ', 100%, ' + this.brightness + '%)';
    c.stroke();
    c.lineWidth = 1;


    if(origin && !hidden){
      c.beginPath();
      // draw the target for this firework with a pulsing circle
      c.arc( this.tx, this.ty, this.tradius, 0, Math.PI * 2 );
      c.stroke();
    }



  }

  this.update = function(){
    if(this.history.length >= this.historyLength){
      this.history.pop();
    }
    this.history.unshift([this.x, this.y]);

    if(origin){
      // Rotate us to face the target
      this.rotation = Math.atan2(this.ty - this.y, this.tx - this.x);

      // accelerate
      this.speed *=1.01;

      // Move towards the player
      this.x += Math.cos(this.rotation) * this.speed;
      this.y += Math.sin(this.rotation) * this.speed;
      // cycle the circle target indicator radius
      if( this.tradius < 8 ) {
        this.tradius += 0.3;
      } else {
        this.tradius = 1;
      }
    }else{
      // slow down the particle
      this.speed *= this.friction;
      // apply velocity
      this.x += Math.cos( this.angle ) * this.speed;
      this.y += Math.sin( this.angle ) * this.speed + this.gravity;
      // fade out the particle
      this.alpha -= this.decay;

      // // remove the particle once the alpha is low enough, based on the passed in index
      // if( this.alpha <= this.decay ) {
      //   particles.splice( index, 1 );
      // }


    }


    this.draw();

  }


}

// Star object (capital letter for objects)
function Star(x, y, dx, dy, radius){
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
    c.shadowColor = '#E3EAEF';
    c.shadowBlur = (Math.random() * 10) + 10;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.stroke();
    c.fill();
  }

  this.update = function(){
    if(this.x-this.radius < canvas.width){
      this.x += this.dx;
    }else{
      this.x = -this.radius*2;
    }

    if(this.y-this.radius < canvas.height){
      this.y += this.dy;
    }else{
      this.y = -this.radius*2;
    }
    this.draw();
  }

}


// Land
function Land(){
  this.x = canvas.width/2;
  this.y = canvas.height;
  this.radiusX = this.x*1.2;
  this.radiusY = this.y*0.23;
  this.color = '#112D03';

  this.draw = function(){
    c.beginPath();
    //ellipse x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise
    c.ellipse(this.x, this.y, this.radiusX, this.radiusY,0, Math.PI, true);
    c.strokeStyle=this.color;
    c.fillStyle=this.color;
    c.shadowColor = '#E3EAEF';
    c.shadowBlur = 20;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.stroke();
    c.fill();
  }

}


// Moon
function Moon(face){
  this.x = canvas.width/2;
  this.y = canvas.height;
  this.radius = 50;
  this.color = '#FEFCD7';
  this.dy = 1.5;

  this.face = face;
  this.img = new Image();
  this.img.src = 'res/lolface2.png'; //(window.location.origin + window.location.pathname)
  this.imgopacity = 0;
  this.donemove = false;

  if(this.face){
    this.x = canvas.width/4;
  }

  this.draw = function(){
    c.beginPath();
    //ellipse x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);

    c.strokeStyle=this.color;
    c.fillStyle=this.color;

    c.shadowColor = '#E3EAEF';
    c.shadowBlur = 50;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.stroke();
    c.fill();


    c.globalAlpha = this.imgopacity;
    c.drawImage(this.img, this.x-50,this.y-50);
    c.globalAlpha = 1;
  }

  this.update = function(){
    if(this.y+this.radius > innerHeight*1/3){
      this.y -= this.dy;

      if(this.y+this.radius < innerHeight*1/2){
        if(this.dy > 0.05){
          this.dy = this.dy*0.995;
        }
      }
      // this.x += 0.025;


    }else{
      if(this.imgopacity < 0.4){
        this.imgopacity += 0.001;
      }

    }

    this.draw();
  }

}




var maxfw = 10;
var mousedown = false;

//var moon2 = undefined;

// Init and Animation
function init() {
  starArray = [];

  var numStars = 50;
  if(canvas.width < 680){
    numStars = 40;
  }
  for(var i = 0; i < numStars; i ++){
    var radius = Math.random() * 1 + 1;
    var x = Math.random()*(canvas.width - radius*2) + radius;
    var y = Math.random()*(canvas.height - radius*2) + radius;
    var dx = Math.random()*0.1 + 0.05;
    var dy = Math.random()*0.05;

    starArray.push(new Star(x, y, dx, dy, radius))
  }

  land = new Land();

  if(moon == undefined){
    moon = new Moon(false);
  }else{
    moon.x = canvas.width/2;

    if(moon.y + moon.radius > innerHeight/3){
      // do nothing
      moon.dy = 1;
      if(moon.y + moon.radius < innerHeight*1/2){
        moon.dy = 0.5;
      }
    }else{
      moon.y = innerHeight/3 - moon.radius;
    }
  }

  //moon2 = new Moon(true);

  // initial random fireworks
  for(var i = 0; i < maxfw; i ++){
    var targx = Math.random()*(canvas.width-100) + 50;
    var targy = Math.random()*canvas.height/3 + 110;

    if(origincount <= maxfw){
      fireWorks.push(new Firework(canvas.width/2,canvas.height*9/10, targx, targy, true, true, false));
      origincount++;
    }


  }



}

var timer = 0;
var timout = 350;



function animate(){
  requestAnimationFrame(animate);
  if(mousedown){
    if(origincount <= maxfw){
      fireWorks.push(new Firework(canvas.width/2,canvas.height*9/10, mouse.x, mouse.y, true, false, false));
      origincount ++;
    }
  }


  hue += 0.5;
  c.clearRect(0,0,innerWidth, innerHeight);
  for(var i = 0; i < starArray.length; i ++){
    starArray[i].update();
  }
  moon.update();


  for(var i = 0; i < fireWorks.length; i ++){
    fireWorks[i].update();


    if(fireWorks[i].origin
       && fireWorks[i].x - fireWorks[i].tx < 10
       && fireWorks[i].x - fireWorks[i].tx > -10
       && fireWorks[i].y - fireWorks[i].ty < 10
       && fireWorks[i].y - fireWorks[i].ty > -10){

      var startx = fireWorks[i].x;
      var starty = fireWorks[i].y;
      var starthue = fireWorks[i].hue;

      fireWorks.splice(i, 1);
      origincount --;
      // explosion fireworks
      var numworks = Math.random()*15+25;
      for(var i = 0; i < numworks; i ++){
        fireWorks.push(new Firework(startx,starty, mouse.x, mouse.y, false, false, starthue));
      }
    }else if(fireWorks[i].alpha <= fireWorks[i].decay){
      fireWorks.splice(i, 1);
    }



  }

  if(timer > timout){
    var randnum = Math.random()*maxfw;
    // random fireworks
    for(var i = 0; i < maxfw; i ++){
      var targx = Math.random()*(canvas.width-100) + 50;
      var targy = Math.random()*canvas.height/3 + 110;

      if(origincount <= maxfw){
        fireWorks.push(new Firework(canvas.width/2,canvas.height*9/10, targx, targy, true, true, false));
        origincount++;
      }
    }
    timer = 0;
  }

  timer ++;


  land.draw();
}
init();
animate();




window.addEventListener('mousemove',
  function(event){
    //console.log('mousemoved');
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

window.addEventListener('resize',
  function(){
    if(canvas.width < 680 && window.innerWidth >=680){
      if(!$('#mynav').hasClass('initial')){
        $("#mynav").toggleClass('initial');
      }
      if($('#mynav').hasClass('show-items')){
        $("#mynav").toggleClass('show-items');
      }

    }
    canvas.width = window.innerWidth;
    canvas.height = $("#home-div").height();
    if(canvas.width <= 680){
      maxfw = 1;
    }else{
      maxfw = 10;
    }

    init();
});

window.addEventListener('click',
  function(event){
    // console.log('click');
    if(!mousedown){
      if(origincount <= maxfw){
        fireWorks.push(new Firework(canvas.width/2,canvas.height*9/10, mouse.x, mouse.y, true, false, false));
        origincount++;
      }
    }

});

window.addEventListener('mousedown',
  function(event){
    // console.log('mousedown');
    mousedown = true;

});


window.addEventListener('mouseup',
  function(event){
    mousedown = false;

});
