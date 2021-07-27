const logger  = require('./logger');

const Kkc = Symbol('kafka-consumer');

class Consumer {
    constructor(kafka, groupId) {
        this[Kkc] = kafka.consumer({ groupId });
    }
    async subscribe(topic,callback) {
        try {
            await this[Kkc].connect();
            await this[Kkc].subscribe({ topic, fromBeginning: true });
            await this[Kkc].run({
                partitionsConsumedConcurrently: 5,
                retry: { retries: 3 },
                eachMessage: async ({ topic, partition, message }) => {
                    const isError =    await callback({ topic, partition, message })
                    if(isError){
                        this[Kkc].pause([{topic}])
                        setTimeout(() => this[Kkc].resume([{ topic }]),3000)
                    }
                },
            });
        } catch (e) {
            logger.info('Error %s', JSON.stringify(e));
        }
    }

}

module.exports = Consumer;