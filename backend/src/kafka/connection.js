var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        // if (!this.kafkaConsumerConnection) {

            const client = new kafka.Client("localhost:2181");
            /*client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
            this.kafkaConsumerConnection = new kafka.Consumer(client,[ { topic: topic_name, partition: 0 }]);
            client.on('ready', function () { console.log('client ready!') })
            client.on('error', function (err) { console.error(error)})
        // }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            const client = new kafka.Client("localhost:2181");
            /*client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(client);
            //this.kafkaConnection = new kafka.Producer(client);
            console.log('producer ready');
            client.on('ready', function () { console.log('Producer ready!') })
            client.on('error', function (err) { console.error(error)})
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;