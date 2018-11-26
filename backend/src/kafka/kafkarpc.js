var crypto = require('crypto');
var conn = require('./connection');

var TIMEOUT=8000; //time to wait for response in ms
var self;

exports = module.exports =  KafkaRPC;

function KafkaRPC(){
    self = this;
    this.connection = conn;
    this.requests = {}; //hash to store request in wait for response
    this.response_queue = false; //placeholder for the future queue
    this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function(topic_name, content, callback){

    self = this;
    //generate a unique correlation id for this call
    var correlationId = crypto.randomBytes(16).toString('hex');

    //create a timeout for what should happen if we don't get a response
    var tId = setTimeout(function(corr_id){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout');
        callback(new Error("timeout " + corr_id));
        //delete the entry from hash
        delete self.requests[corr_id];
    }, TIMEOUT, correlationId);

    //create a request entry to store in a hash
    var entry = {
        callback:callback,
        timeout: tId //the id for the timeout so we can clear it
    };

    //put the entry in the hash so we can match the response later
    self.requests[correlationId]=entry;

    //make sure we have a response topic
    self.setupResponseQueue(self.producer,topic_name,function(){
        console.log('in response');
        //put the request on a topic

        var payloads = [
            { topic: topic_name, messages: JSON.stringify({
                correlationId:correlationId,
                replyTo:'response_topic',
                data:content}),
                partition:0}
        ];
        console.log('in response1');
        console.log(self.producer.ready);
        self.producer.send(payloads, function(err, data){
            console.log('in response2');
            if(err)
                console.log(err);
            console.log(data);
        });
    });
};


KafkaRPC.prototype.setupResponseQueue = function(producer,topic_name, next){
    //don't mess around if we have a queue
    if(this.response_queue) return next();

    console.log('1');

    self = this;

    //subscribe to messages
    var consumer = self.connection.getConsumer('response_topic');
    consumer.on('message', function (message) {
        console.log('msg received');
        var data = JSON.parse(message.value);
        //get the correlationId
        var correlationId = data.correlationId;
        //is it a response to a pending request
        if(correlationId in self.requests){
            //retrieve the request entry
            var entry = self.requests[correlationId];
            //make sure we don't timeout by clearing it
            clearTimeout(entry.timeout);
            //delete the entry from hash
            delete self.requests[correlationId];
            //callback, no err
            entry.callback(null, data.data);
        }
    });
    self.response_queue = true;
    console.log('returning next');
    return next();
};