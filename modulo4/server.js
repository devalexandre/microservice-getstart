( async() =>{

    const topico = 'microservice-curso'
    const topico_reply = 'reply'

    const ConnectionKafka = require('./utils/connect')
    const Broker = require('./utils/broker')

    const brokers = [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
    const clientId = 'ms-kafka'

    const Kafka = new ConnectionKafka(
        brokers,
        clientId)

    const connect = Kafka.connect()
    const broker = new Broker(connect,clientId)

    await broker.subscribe(topico,async ({topic, partition, message }) =>{
        console.log({value:message.value.toString()})
        broker.insertQueue({key:'reply', value:'Message Broker reply '})
        await broker.emmit(topico_reply)
    })

    broker.insertQueue({key:'message', value:'Message Broker reply test '})
    await broker.emmit(topico)

})()
