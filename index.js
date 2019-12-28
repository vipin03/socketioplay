var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var session_messages =[];
console.log('session messgaes at start '+session_messages);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('session messgaes at connection '+session_messages);
	io.emit('chat message', session_messages);
    socket.on('chat message', function(msg){
    insertInArray(msg,session_messages);
    console.log('session messgaes after insert abd before emmit '+session_messages);
    io.emit('chat message', session_messages);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function insertInArray(msg,session_messages)
{
	var obj={
		'name':msg.name,
		'msg':msg.message
	}
	session_messages.push(obj);
}
function initilizeMsg()
{

}