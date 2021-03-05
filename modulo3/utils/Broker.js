const Knc = Symbol('Knc')

class Broker{

    constructor(nc) {
        this[Knc] = nc
    }

    async emit(action, data){
        await this[Knc].request(`${action}`, JSON.stringify(data))
    }

    async call(action, data){
        return await new Promise(resolve => {
            this[Knc].request(`${action}`, JSON.stringify(data),(res)=>{
                resolve(res)
            })
        })
    }
}

module.exports = Broker