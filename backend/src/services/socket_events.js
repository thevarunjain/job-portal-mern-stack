module.exports = function(i){
    i.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
          console.log(data);
        });
        socket.on('client_caller',function(data){
            console.log("t---------------------===========================");
            console.log(data);
        });
      });
      
      
}