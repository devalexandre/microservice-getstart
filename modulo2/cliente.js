const cote = require('cote')
const client = new cote.Requester({name:'Cliente'})
const polka = require('polka')
const { json } = require('@polka/parse')
const { response } = require('./utils/response')

const PORT = 3000

polka()
.use(json())
    .get('/', ( req,res)=>{
        client.send({type:'categorie.list'}, (_response) =>
            response(res,_response)
        )
    })
    .post('/', ( req,res)=>{
        client.send({type:'categorie.create', data: req.body}, (_response) =>
            response(res,_response)
        )
    })
    .put('/:id', ( req,res)=>{
        client.send({type:'categorie.update',id: req.params.id,  data: req.body}, (_response) =>
            response(res,_response)
        )
    })
    .delete('/:id', ( req,res)=>{
        client.send({type:'categorie.delete', id: req.params.id}, (_response) =>
            response(res,_response)
        )
    })
.listen(PORT, err =>{
    if(err) throw  err
    console.log(`http://localhost:${PORT}`)
})