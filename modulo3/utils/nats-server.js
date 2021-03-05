const { connect } = require('nats')
const Knc = Symbol('Knc')

class NatsServer{
    constructor({host = '127.0.0.1', port= 4222}) {
      this.url = `http://${host}:${port}`
      this[Knc] = null

    }

    async connected(){
        try{
            this[Knc]= await connect({url: this.url})
            console.log('conectado')
            return this[Knc]
        }catch (e) {
            console.log("ERROR", e)
        }
    }
}

module.exports = NatsServer
// ( async ()=>{
//     const nats = new NatsServer({host:'192.168.1.8'})
//
//     await nats.connected()
// })()
//
