const connection = new require('../kafka/Connection')
const search = require('../controllers/search.controller')
const config = require('../config')

exports.initSearchHandler = () => {
    const consumer = connection.getConsumer(config.topic.search);
    const producer = connection.getProducer();
    consumer.on('message', (message) => {
        const data = JSON.parse(message.value);
        if (data.data.service === "GET_FILTERED_JOBS") {
            search.getFilteredJobs(data.data).then((res) => {
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