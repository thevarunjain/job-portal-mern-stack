const connection = new require('../kafka/Connection')
const save = require('../controllers/application.controller')
const config = require('../config')

exports.initSaveHandler = () => {
    const consumer = connection.getConsumer(config.topic.save);
    const producer = connection.getProducer();
    consumer.on('message', (message) => {
        const data = JSON.parse(message.value);
        if (data.data.service === "SAVE_JOB") {
            save.save(data.data).then((res) => {
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
        } else if (data.data.service === "BOOKING_CREATE") {
            booking.create(data.data).then((res) => {
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

