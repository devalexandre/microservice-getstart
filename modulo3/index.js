(async () =>{
    const NatsServer = require('./utils/nats-server')
    const Server = require('./server')
    const MongoCnnect = require('./schemas/connection')
    MongoCnnect.connect()

    const nats = new NatsServer({host:'192.168.1.8'})
    const nc = await nats.connected()


    const server = new Server(nc)
    await server.start()

})()