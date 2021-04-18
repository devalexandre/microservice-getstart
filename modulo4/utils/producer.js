const Kkp = Symbol('kfka-producer')


class Producer {
    constructor(kafka) {
        this[Kkp] = kafka.producer();
    }

    async send(topic,messages){
        try {
            await this[Kkp].connect();

            await this[Kkp].send({
                topic,
                messages
            }, (data) => {
                console.log("callback", data)
            })
        }catch (e) {
            console.log("deu ruim",e)
        }
    }
}

module.exports = Producer