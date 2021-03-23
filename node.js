const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
const express = require("express");
const { read } = require("fs");
const http = require("http");
const socketio = require("socket.io");


const app = express();
const server = http.Server(app);
const io = socketio(server);

server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/public/index.html");
})


var connections = 0;
var clients = new Array();
io.on('connection', function(socket) 
{
    connections++;
    if(connections > 2)
    {
        socket.disconnect();
        connections--;
    }
    else
    {
        clients.push(socket.id);


        socket.on("blackNkingNcapture", function(boardChanges)
        {
            io.emit("blackNkingNcapture", boardChanges);
        });
        socket.on("blackNkingCaptureLeft", function(boardChanges)
        {
            io.emit("blackNkingCaptureLeft", boardChanges);
        });
        socket.on("blackNkingCaptureRight", function(boardChanges)
        {
            io.emit("blackNkingCaptureRight", boardChanges);
        });
        socket.on("blackKingNcapture", function(boardChanges)
        {
            io.emit("blackKingNcapture", boardChanges);
        });
        socket.on("blackKingCaptureUpLeft", function(boardChanges)
        {
            io.emit("blackKingCaptureUpLeft", boardChanges);
        });
        socket.on("blackKingCaptureUpRight", function(boardChanges)
        {
            io.emit("blackKingCaptureUpRight", boardChanges);
        });
        socket.on("blackKingCaptureDownRight", function(boardChanges)
        {
            io.emit("blackKingCaptureDownRight", boardChanges);
        });
        socket.on("blackKingCaptureDownLeft", function(boardChanges)
        {
            io.emit("blackKingCaptureDownLeft", boardChanges);
        });
        socket.on("redNkingNcapture", function(boardChanges)
        {
            io.emit("redNkingNcapture", boardChanges);
        });
        socket.on("redNkingCaptureLeft", function(boardChanges)
        {
            io.emit("redNkingCaptureLeft", boardChanges);
        });
        socket.on("redNkingCaptureRight", function(boardChanges)
        {
            io.emit("redNkingCaptureRight", boardChanges);
        });
        socket.on("redKingNcapture", function(boardChanges)
        {
            io.emit("redKingNcapture", boardChanges);
        });
        socket.on("redKingCaptureUpLeft", function(boardChanges)
        {
            io.emit("redKingCaptureUpLeft", boardChanges);
        });
        socket.on("redKingCaptureUpRight", function(boardChanges)
        {
            io.emit("redKingCaptureUpRight", boardChanges);
        });
        socket.on("redKingCaptureDownRight", function(boardChanges)
        {
            io.emit("redkKingCaptureDownRight", boardChanges);
        });
        socket.on("redKingCaptureDownLeft", function(boardChanges)
        {
            io.emit("redKingCaptureDownLeft", boardChanges);
        });






        //Write my other listeners
        if(clients.length == 2)
            io.emit("assignPlayers", clients);

        //closes all connections, if one of the 2 clients disconnect
        socket.on("disconnect", function()
        {
            try //2 sockets can be disconnected
            {
                getConnectedSockets().forEach(function(s)
                {
                    s.disconnect(true);      
                }); 
            
                while(!clients.isEmpty())
                {
                    clients.pop();
                }
            } 
            catch (error) //only one socket to disconnect
            {
                connections--;
                clients.pop();   
            }
            
        });
        
        
    }
    // a client waiting for a second client can only stay connected for 10 minutes
    // or a client in a game can only stay connected for 10 minutes
    setTimeout(function(){
        socket.disconnect();
        connections--;
    }, 600000);
});

