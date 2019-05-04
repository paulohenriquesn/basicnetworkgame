const express = require('express');
const app = express();

var timeRequest = 3;
var timeToRequest = 0;

var server = app.listen(80,()=>{
  console.log('Server Initialized on port 80');
});

app.use(express.static('public'));

const io = require('socket.io')(server);

io.on("connection",(socket)=>{
  socket.on("chat",(data)=>{io.emit("chatupdate",data)});
  socket.on("game",(data)=>{
    io.emit("update",data);
    timeToRequest +=1;
    if(timeToRequest>=50)
    {
      timeRequest-=1;
      if(timeRequest<=0){
        io.emit("clear",[true]);
        timeRequest = 3;
        timeToRequest = 0;
      }
    }
  });
});
