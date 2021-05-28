const Consumer = require('./consumer')
const Producer = require('./producer')

const kconsumer = Symbol('kconsumer')
const kproducer = Symbol('kproducer')
const kmessages = Symbol('kmessages')

class Broker{
    constructor(kafka, groupId) {
        this[kconsumer] = new Consumer(kafka,groupId)
        this[kproducer] = new Producer(kafka)
        this[kmessages] = []
    }

    async subscribe(topic,callback){
        return await this[kconsumer].subscribe(topic,callback)
    }

    insertQueue(message){
        this[kmessages].push(message)
    }

    getAllQueue(){
        return this[kmessages]
    }

    removeQueue(message){
        const index = this[kmessages].indexOf(message)
        if(index > -1){
            this[kmessages].splice(index,1)
        }
        return this[kmessages]
    }

      
    async emmit(topic){
        await this[kproducer].send(topic,this[kmessages])
        this[kmessages] = []
    }
}

module.exports = Broker