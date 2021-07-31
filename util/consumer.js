const logger  = require('./logger');

class Consumer {
    constructor(kafka, groupId) {
        this.consumer = kafka.consumer({ groupId });
    }
    async subscribe(topic,callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning: true });
            await this.consumer.run({
           // partitionsConsumedConcurrently: 5,
            retry: { retries: 3 },
                eachMessage: async ({ topic, partition, message }) => {
                    try {
                        await callback({topic, partition, message})
                    } catch (e) {
                        logger.error('Consumer Error %s retry', e.message);
                        this.consumer.pause([{ topic, partitions: [partition] }])
                        setTimeout(() => {
                            this.consumer.resume([{ topic, partitions: [partition] }])
                        }, e.retryAfter * 1000)

                        throw e
                    }

                 }
            });
        } catch (e) {
            logger.error('Consumer Error %s', JSON.stringify(e));
        }
    }


}

module.exports = Consumer;