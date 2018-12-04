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


            socket.on('private_chat_handler',function(d){
                console.log(d);
                let room = d['thread'];
                socket.broadcast.to(room).emit('message_posted', d);

            });



          });


          
    },
    addChat : function(i)
    {
        console.log("tes");
    }
}