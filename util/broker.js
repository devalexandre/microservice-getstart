const Consumer = require('./consumer')
const Producer = require('./producer')

class Broker{
    constructor(kafka, groupId) {
        this.consumer = new Consumer(kafka,groupId)
        this.producer = new Producer(kafka)
        this.messages = []
    }

    async subscribe(topic,callback){
        return await this.consumer.subscribe(topic,callback)
    }

    insertQueue(message){
        this.messages.push(message)
    }

    getAllQueue(){
        return this.messages
    }

    removeQueue(message){
        const index = this.messages.indexOf(message)
        if(index > -1){
            this.messages.splice(index,1)
        }
        return this.messages
    }


    async emmit(topic){
        await this.producer.send(topic,this.messages)
        this.messages = []
    }
}

module.exports = Broker