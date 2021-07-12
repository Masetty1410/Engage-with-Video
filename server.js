const { Socket } = require('dgram');
const express = require("express");
const peer = require("peer");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.use(express.static(path.join(__dirname, "/public")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+"/public/startpage.html"))
})
app.use("/peer", peer.ExpressPeerServer(app, { proxied: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
    res.render("room", { roomID: req.params.room });
    
});
// when the connection is on the following actions take place
io.on("connection", (socket) => {
    //when the indidvidual users join the room
    socket.on("join-room", (roomID, userID,userName) => {
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("user-connected", userID,userName);
           
        socket.on('screen-share', stream => {
        io.to(roomId).emit('screenShare', stream, userName)
      })
  //for chat section
        socket.on('message', message => {
            io.to(roomID).emit('createMessage', message,userName);
        })

        socket.on('raise-hand', () => {
            io.to(roomID).emit('handrise', userName)
        }); 

        socket.on('lower-hand', () => {
            io.to(roomID).emit('lowerhand', userName)
        }); 


        //when the user disconnects

        socket.on("disconnect", () => {
            //broadcast because we want our infomation to be shared with others except to us

            socket.broadcast.to(roomID).emit("user-disconnected", userID,userName);

        });   
      
        })
    })

const PORT = process.env.PORT || 5000;

server.listen(PORT);