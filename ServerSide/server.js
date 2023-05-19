const io = require("socket.io")(
   {
      cors: {
        origin: "http://localhost:8080"
      }
    }
);
server = io.listen(8000);
console.log('server started');

rooms = {}; //This is all being stored in memory which is bad
server.on('connection', function (socket) {
   
   console.log('A user connected');

   socket.on('create', function (roomID) {

      if (rooms[roomID] == roomID) {
         "Room Already Exists"
         return
      }

      console.log("a new room was created with the name " + roomID)
      socket.join(roomID);

      var roomObject = { RoomName: roomID, members: [] };
      rooms[roomID]=roomObject

   });

   socket.on('join', function (data) {
      console.log("User Joined Room " + data.groupID + " with name " + data.username);

      try {
         socket.join(data.groupID);
         server.sockets.in(data.groupID).emit('test', { userlist: "test" });
         //this is working, work from this point
      } catch (error) {
         socket.emit("roomJoinFailed", error);
         return
      }

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];
         element.existingroom = false

         if (element.RoomName == data.roomname) {

            userObject = {name: data.namewanted, socketid: data.socketid, readyStatus: false, isLeader: data.isLeader, publicKey:data.publicKey, signers:data.signersNumber, threshold:data.thresholdNumber, roomFullStatus: false }
            element.members.push(userObject);
            return
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

   socket.on('readyUp', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

          for (let index = 0; index < room.members.length; index++) {

            if (room.members[index].socketid == socket.id) {
               userArrays[index1].members[index].readyStatus = true
               server.sockets.in(data.roomname).emit('getUsers', { userlist: userArrays[index1].members }); //dont fire get users in existing group
               return
            }
            
          }

         }
         

      }

   });

   socket.on('roomFull', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

          for (let index = 0; index < room.members.length; index++) {

            room.members[index].roomFullStatus = true

            }
         
            server.sockets.in(data.roomname).emit('getUsers', { userlist: userArrays[index1].members });
            
          }

         }

   });


   socket.on('disconnect', function () {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         const membersArray = userArrays[index1].members;

         for (let index2 = 0; index2 < membersArray.length; index2++) {
            const element = membersArray[index2];

            if (element.socketid == socket.id) {
               console.log("Removed User " + userArrays[index1].members[index2].name)
               userArrays[index1].members.splice(index2, 1);

               if (userArrays[index1].members.length == 0) {
                  console.log("Removed Empty Room " + userArrays[index1].RoomName)
                  userArrays.splice(index1, 1)
                  return
               }

               if (userArrays[index1].existingroom == true) {
                  server.sockets.in(userArrays[index1].RoomName).emit('getLoadedUsers', { userlist: userArrays[index1].members });
               }else{
                  server.sockets.in(userArrays[index1].RoomName).emit('getUsers', { userlist: userArrays[index1].members });
               }

               

            }


         }

      }

   });

   socket.on('msg', function (data) {
      //Send message to everyone
      server.sockets.in(data.roomid).emit('newmsg',{msg: data.message, publicKey: data.publicKey, signature: data.signature, leaderstatus:data.leaderstatus, arrayPosition: data.arrayPosition});
   })
});

