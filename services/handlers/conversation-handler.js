const connection = new require('../kafka/Connection')
const conversation = require('../controllers/conversation.controller')
const config = require('../config')

exports.initConversationHandler = () => {
    const consumer = connection.getConsumer(config.topic.conversation);
    const producer = connection.getProducer();
    consumer.on('message', (message) => {
        const data = JSON.parse(message.value);
        if (data.data.service === "CONVERSATION_FETCH") {
            conversation.fetch(data.data).then((res) => {
                const payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, (err, data) => {});
                return;
            });
        } else if (data.data.service === "CONVERSATION_CREATE") {
            conversation.create(data.data).then((res) => {
                const payloads = [{
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }];
                producer.send(payloads, (err, data) => {});
                return;
            });
        } else {
            producer.send(payloads, (err, data) => {});
            return;
        }
    });
}