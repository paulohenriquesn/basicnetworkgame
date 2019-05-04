var socket = io.connect("localhost:80");

var player_props = {
  x: 0,
  y: 0
};

let player;

socket.on("update",(data)=>{
  ellipse(data[0],data[1],data[2],data[3]);
});

//CHAT AREA

socket.on("chatupdate",(data)=>{
  $("#listChat").append("<li style='list-style:none;'>" + data[0] + ": " + data[1] + "</li>");
});

$("#sendMessage").click(()=>{
  var message = $("#chatMessage").val();
  var name = $("#chatMessageUser").val();
    socket.emit("chat",[name,message]);
     $('.hover_bkgr_fricc').hide();
});

//

socket.on("clear",(data)=>{
  if(data[0] == true){
      background(51);
  }
});

 $('.popupCloseButton').click(function(){
     $('.hover_bkgr_fricc').hide();
 });

var canvas;

function setup()
{
  canvas = createCanvas(windowWidth/2, windowHeight/2);
     canvas.parent('game');
  background(51);
  player = new Jitter();

}

function windowResized() {
  resizeCanvas(windowWidth/2, windowHeight/2);
  background(51);
  player.display();
  player.move();
}

function draw()
{
  player.display();
  player.move();
}

var move = false;

function UpdateMove()
{
  if(move)
  {
    if(keyCode == 84 || keyCode == 13){
      $('.hover_bkgr_fricc').show();

    }
    if (keyCode === UP_ARROW) {
      player_props.y = player_props.y - 0.3;
    } else if (keyCode === DOWN_ARROW) {
     player_props.y = player_props.y + 0.3;
    }
    if (keyCode === LEFT_ARROW) {
      player_props.x = player_props.x - 0.5;
    } else if (keyCode === RIGHT_ARROW) {
      player_props.x = player_props.x + 0.5;
    }
  }
}

function keyPressed() {
  move = true;
  UpdateMove();
}

function keyReleased()
{
  move = false;
  UpdateMove();
}

class Jitter {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  move() {
    this.x += player_props.x;
    this.y += player_props.y;
  }

  display() {
    var data = [this.x,this.y, 50, 50];
    socket.emit("game",data);
  }
}
