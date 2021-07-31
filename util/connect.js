const { Kafka, logLevel } = require('kafkajs');
const logger  = require('./logger');

class KafkaConnect {
    constructor(brokers, clientId) {
        this.brokers = brokers;
        this.clientId = clientId;
    }

    connect() {
        try {
            const kafka  = new Kafka({
                clientId: this.clientId,
                brokers: this.brokers,
            });

            kafka.logger().setLogLevel(logLevel.NOTHING);
            logger.info('Connected in kafka');
            return kafka;
        } catch (e) {
            logger.error('Connect Error %s', JSON.stringify(e));
        }
    }
}

module.exports = KafkaConnect;