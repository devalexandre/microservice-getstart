const logger  = require('./logger');

class Producer {
    constructor(kafka) {
        this.producer = kafka.producer();
    }

    async send(topic,messages){
        try {
            await this.producer.connect();
            await this.producer.send({
                topic,
                messages
            })

        }catch (e) {
            logger.error('Producer Error %s', JSON.stringify(e));

        }
    }
}

module.exports = Producer