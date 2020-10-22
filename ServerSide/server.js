io = require("socket.io"),
   server = io.listen(8000);

users = [];
server.on('connection', function (socket) {
   console.log('A user connected');

   socket.on('setUsername', function (data) {
      console.log(data);

      if (users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', { username: data });
      }
   });

   socket.on('create', function (room) {
      console.log("a new room was created with the name" + room)
      socket.join(room);
      
   });

   socket.on('msg', function (data) {
      //Send message to everyone
      server.sockets.in(data.roomid).emit('newmsg', data);
   })
});

