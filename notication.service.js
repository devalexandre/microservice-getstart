const Kkc = Symbol('kafka-connect');
const Kbk = Symbol('kafka-broker');
const Kck = Symbol('kafka-clientId');
const { Kafka, logLevel } = require('kafkajs');

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
            console.log('Connected');
            return this[Kkc];
        } catch (e) {
            console.log('Deu ruim na conexao', e);
        }
    }
}

module.exports = KafkaConnect;