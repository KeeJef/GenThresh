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

            userObject = { name: data.namewanted, socketid: data.socketid }
            element.members.push(userObject);
            return
         }

      }



   });

   socket.on('create', function (room) {
      console.log("a new room was created with the name" + room)
      socket.join(room);

      if (userArrays.length <= 0) {
         var roomObject = { RoomName: room, members: [] };
         userArrays.push(roomObject)
      }

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index].RoomName;

         if (room == element) {//dont recreate already created rooms
            return
         } else {
            var roomObject = { RoomName: room, members: [] };
            userArrays.push(roomObject)
         }

      }

   });

   socket.on('getUsers', function (data) {

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];

         if (element.RoomName == data.roomid) {
            server.sockets.in(data.roomid).emit('getUsers', { userlist: element.members });
            return
         }

      }

   });

   socket.on('disconnect', function () {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         const membersArray = userArrays[index1].members;

         for (let index2 = 0; index2 < membersArray.length; index2++) {
            const element = membersArray[index2];

            if (element.socketid == socket.id) {
               userArrays[index1].members.splice(index2, 1);

               server.sockets.in(userArrays[index1].RoomName).emit('getUsers', { userlist: userArrays[index1].members });

            }


         }

      }

   });

   socket.on('msg', function (data) {
      //Send message to everyone
      server.sockets.in(data.roomid).emit('newmsg', data);
   })
});

