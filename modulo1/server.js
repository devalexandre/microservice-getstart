const cote = require( 'cote');
const CategorieService = new cote.Responder({name:'Categorie'})
const Connection = require('./schemas/connection')
const CategoryModel = require('./schemas/categories')
Connection.connect()


CategorieService.on('categorie.create',  async ({data},cb)=>{
    const { name } = data
    const res = new CategoryModel({name})
    await res.save()
    cb(res)
})

CategorieService.on('categorie.list',  async (req,cb)=>{
    const res = await CategoryModel.find({})
    cb(res)
})

CategorieService.on('categorie.update',  async ({id, data},cb)=>{
    const { name } = data
    const res = await CategoryModel.findByIdAndUpdate(id, {name})
    cb(res)
})

CategorieService.on('categorie.delete',  async ({id},cb)=>{
    const res = await CategoryModel.deleteOne({_id:id})
    cb(res)
})
