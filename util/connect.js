const Kkc = Symbol('kafka-connect');
const Kbk = Symbol('kafka-broker');
const Kck = Symbol('kafka-clientId');
const { Kafka, logLevel } = require('kafkajs');
const logger  = require('./logger');

class KafkaConnect {
    constructor(brokers, clientId) {
        this[Kbk] = brokers;
        this[Kck] = clientId;
    }

    connect() {
        try {
            this[Kkc] = new Kafka({
                clientId: this[Kck],
                brokers: this[Kbk],
            });

            this[Kkc].logger().setLogLevel(logLevel.NOTHING);
            logger.info('Connected in kafka');
            return this[Kkc];
        } catch (e) {
            logger.error('Error %s', e);
        }
    }
}

module.exports = KafkaConnect;