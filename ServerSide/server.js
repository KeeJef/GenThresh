io = require("socket.io"),
   server = io.listen(8000);

userArrays = []; //This is all being stored in memory which is bad
server.on('connection', function (socket) {
   console.log('A user connected');

   socket.on('setUsername', function (data) {
      console.log(data);

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];
         
         if (element.RoomName == data.roomname) {
            element.members.push(data.namewanted);
            return
         }

      }

      

   });

   socket.on('create', function (room) {
      console.log("a new room was created with the name" + room)
      socket.join(room);
      var roomObject = {RoomName:room, members:[]}; 
      userArrays.push(roomObject)
   });

   socket.on('getUsers', function (data) {

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];
         
         if (element.RoomName == data.roomid) {
            server.sockets.in(data.roomid).emit('getUsers',{userlist: element.members});
            return
         }

      }
      
   });

   socket.on('msg', function (data) {
      //Send message to everyone
      server.sockets.in(data.roomid).emit('newmsg', data);
   })
});

