( async ()=>{
    const polka = require('polka')
    const { json } = require('@polka/parse')
    const NatsServer = require('./utils/nats-server')
    const Broker = require('./utils/Broker')
    const { response } = require('./utils/response')

    const nats = new NatsServer({host: '192.168.1.8'})

    const nc  = await nats.connected()

    const broker = new Broker(nc)

    const PORT = 3000

    polka()
        .use(json())
        .get('/',async (req, res)=>{
            const data = await broker.call('categorie.list')
            response(res, data)
        })
        .post('/',async (req, res)=>{
            const data = await broker.call('categorie.create', req.body)
            response(res, data)
        })
        .put('/:id',async (req, res)=>{
            const request = { id: req.params.id , data: req.body}

            const data = await broker.call('categorie.update', request)
            response(res, data)
        })
        .delete('/:id',async (req, res)=>{
            const request = { id: req.params.id }

            const data = await broker.call('categorie.delete', request)
            response(res, data)
        })
        .listen(PORT, ()=>{
            console.log(`http://locahost:${PORT}`)
        })
})()