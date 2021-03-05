const Knc = Symbol('Knc')
const CategorieModel = require('./schemas/categories')

class Server{
    constructor(nc) {
        this[Knc] =  nc
    }
    async start(){
        this[Knc].subscribe('categorie.create',async (req, reply)=>{
            const category = await CategorieModel.create(JSON.parse(req))
            this[Knc].publish(reply,JSON.stringify(category))
        })

        this[Knc].subscribe('categorie.list', async (req, reply) =>{
            const category = await CategorieModel.find({})
            this[Knc].publish(reply,JSON.stringify(category))
        })

        this[Knc].subscribe('categorie.update', async (req, reply) =>{
            const { id , data } = JSON.parse(req)
            const { name } = data

            const category = await CategorieModel.updateOne({_id:id},{name})
            this[Knc].publish(reply,JSON.stringify(category))
        })

        this[Knc].subscribe('categorie.delete', async (req, reply) =>{
            const { id } = JSON.parse(req)

            const category = await CategorieModel.deleteOne({_id:id})
            this[Knc].publish(reply,JSON.stringify(category))
        })

    }
}

module.exports = Server