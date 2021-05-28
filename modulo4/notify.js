( async() =>{

    const topico = 'reply'


    const ConnectionKafka = require('./utils/connect')
    const Broker = require('./utils/broker')

    const brokers = [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
    const clientId = 'ms-kafka-replay'


    const Kafka = new ConnectionKafka(
        brokers,
        clientId)

    const connect = Kafka.connect()
    const broker = new Broker(connect,clientId)

    await broker.subscribe(topico,async ({topic, partition, message }) =>{
        console.log("Notify")
        console.log({value:message.value.toString()})
    })


})()
