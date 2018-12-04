const mongoose = require('mongoose');
const Thread = require('../models/conversation.model')

module.exports = {
    init : function(i)
    {
        console.log(i.sockets.adapter.rooms);

        i.on('connection', function (socket) {
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
              console.log(data);
            });
            socket.on('client_caller',function(data){
                console.log("t---------------------===========================");
                console.log(data);
            });

            //private_chat_handler


            socket.on('create_room',function(d){
                console.log(d);
                console.log(d['data'])
                let strid = d['data'];
                socket.join(strid,function(){
                    console.log("Room with "+strid + " created" );
                    var room = i.sockets.adapter.rooms[strid];

                    console.log(room);
                });
            });


            socket.on('private_chat_handler',async (d) => {
                console.log(d);
                let room = d['thread'];
                socket.broadcast.to(room).emit('message_posted', d);
                console.log(mongoose);
                // PUSH INTO A THREAD
                const threadId = d['thread'];
                const senderId = d['senderID'];
                const messagesend = d['payload'];
                const thread = await Thread.findById(threadId).exec()
                const message = {
                  sender: senderId,
                  body: messagesend
                }
                console.log(message);
                thread.history.push(message)
                await thread.save();
                // END OF PUSH


            });



          });


          
    },
    addChat : function(i)
    {
        console.log("tes");
    }
}