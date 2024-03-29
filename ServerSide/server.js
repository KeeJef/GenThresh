const io = require("socket.io")({
  cors: {
    origin: "http://localhost:8080",
  //origin: "https://genthresh.com",
  },
});
   server = io.listen(8000);
// server = io.listen(12982);
console.log("server started");

rooms = {}; //This is all being stored in memory which is bad
server.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("create", function (data) {
    if (rooms[data.groupID] == data.groupID) {
      ("Room Already Exists");
      return;
    }

    socket.join(data.groupID);
    console.log(
      "a new room was created with the name " +
        data.groupID +
        " by user " +
        data.username
    );

    var roomObject = {
      RoomName: data.groupID,
      threshold: data.threshold,
      numberOfSigners: data.numberOfSigners,
      members: [],
      signatureArray: [],
    };
    rooms[data.groupID] = roomObject;
    rooms[data.groupID].members.push({
      username: data.username,
      admin: true,
      signature: "",
      pubKey: data.pubKey,
      emoji: data.emoji,
      socketid: socket.id,
      memberIndex : 0,
    });
  });

  socket.on("join", function (data) {
    try {
      if (rooms[data.groupID] == undefined) {
        throw "Room does not exist";
      }
      if (
        rooms[data.groupID].members.length ==
        rooms[data.groupID].numberOfSigners
      ) {
        throw "Room is full";
      }
      socket.emit("roomJoinSuccess");

      socket.join(data.groupID);
      console.log(
        "a user joined the room " +
          data.groupID +
          " with the name " +
          data.username
      );

      rooms[data.groupID].members.push({
        username: data.username,
        pubKey: data.pubKey,
        emoji: data.emoji,
        socketid: socket.id,
        memberIndex : rooms[data.groupID].members.length,
      });

      server.sockets.in(data.groupID).emit("roomInfo", rooms[data.groupID]);
    } catch (error) {
      socket.emit("roomJoinFailed", error);
      return;
    }
  });

  socket.on("getUsers", function (data) {
    for (let index = 0; index < userArrays.length; index++) {
      const element = userArrays[index];

      if (element.RoomName == data.roomid) {
        server.sockets
          .in(data.roomid)
          .emit("getUsers", { userlist: element.members });
        return;
      }
    }
  });

  socket.on("sendMessage", function (data) {
    //process signature and public key
    rooms[data.groupID].signingStarted = true;
    if (data.adminStatus == true) {
      rooms[data.groupID].message = data.message;
    }

    var signerIndex

    for (let index = 0; index < rooms[data.groupID].members.length; index++) {
      const element = rooms[data.groupID].members[index];
      if (data.pubKey == element.pubKey) {
        signerIndex = element.memberIndex
        break
      }
      }

      rooms[data.groupID].signatureArray.push({
         signature: data.signature,
         publicKey: data.pubKey,
         signerIndex : signerIndex});

    server.sockets.in(data.groupID).emit("roomInfo", rooms[data.groupID]);
  });

  //Fix disconnect function

  socket.on("disconnect", function () {
    //remove user from roomsObject and if room is completely empty remove room from roomsObject
    //after removal occurs re-emit the userlist to the room

    for (const key in rooms) {
      const element = rooms[key];

      for (let index2 = 0; index2 < element.members.length; index2++) {
        const element2 = element.members[index2];

        if (element2.socketid == socket.id) {
          rooms[key].members.splice(index2, 1);
          console.log(
            "user " + element2.username + " was removed from room " + key
          );

          if (rooms[key].members.length == 0) {
            delete rooms[key];
            console.log("room " + key + " was deleted because it was empty");
            return;
          }

          server.sockets.in(key).emit("roomInfo", rooms[key]);
        }
      }
    }
  });
});
