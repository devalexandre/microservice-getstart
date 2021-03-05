const cote = require( 'cote');
const CategorieService = new cote.Responder({name:'Categorie'})
const CategoryModel = require('./schemas/categories')



CategorieService.on('categorie.create',  async ({data},cb)=>{
    const { name } = data
    const res = await CategoryModel.create({name})
    cb(res)
})

CategorieService.on('categorie.list',  async (req,cb)=>{
    const res = await CategoryModel.find({})
    cb(res)
})

CategorieService.on('categorie.update',  async ({id, data},cb)=>{
    const { name } = data
    const res = await CategoryModel.updateOne({_id: id}, {name})
    cb(res)
})

CategorieService.on('categorie.delete',  async ({id},cb)=>{
    const res = await CategoryModel.deleteOne({_id:id})
    cb(res)
})
