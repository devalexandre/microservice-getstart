( async() =>{

    const topico = 'microservice-curso'

    const ConnectionKafka = require('./util/connect')
    const Broker = require('./util/broker')
    const Logger = require('./util/logger')

    const brokers = [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
    const clientId = 'ms-kafka'


    const Kafka = new ConnectionKafka(
        brokers,
        clientId)

    const connect = Kafka.connect()
    const broker = new Broker(connect,clientId)
    let retry = 0;

    await broker.subscribe(topico,async ({topic, partition, message }) =>{
            //
            //
            // Logger.info("retrying ... %d",retry)
            // retry++
            // throw Error('model not fould')

    Logger.info("message ... %s",message.value.toString())

    })

    broker.insertQueue({key:'message1', value:'Message Broker'})
    await broker.emmit(topico)


})()