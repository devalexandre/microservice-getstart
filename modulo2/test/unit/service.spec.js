const cote = require('cote');
const client = new cote.Requester({ name: 'Broker' });
const sinon = require('sinon');
const CategoryModel = require('../../schemas/categories')
const  {  expect, assert } = require('chai');

//moks
const mkInert = require('../moks/insert.json')
const mkUpdate = require('../moks/update.json')
const mkDelete = require('../moks/delete.json')
const mkFind = require('../moks/find.json')

describe("Teste CategorieService ", ()=>{
    beforeEach(() => {
        require('../../server');
    })
    afterEach(() => sinon.restore())

    it("Teste Categoria Service 'categorie.create' event", async () =>{
        sinon.stub(CategoryModel,'create')
            .resolves(mkInert)

       const categories = await new  Promise(resolve =>{
            client.send({type:'categorie.create',data:{name: "Alexandre"}},(value =>{
                resolve(value)
            }))
        })
       
        expect(categories).to.eql(mkInert);
   
    });

    it("Teste Categoria Service 'categorie.list' event ", async ()=>{
        sinon.stub(CategoryModel, 'find')
            .resolves(mkFind)

        const categories = await new Promise(resolve => {
            client.send({type: 'categorie.list'}, (res=>{
                resolve(res)
            }))
        })

        assert.isArray(categories)
        expect(categories).to.eql(mkFind)
    })

    it("Teste Categoria Service 'categorie.update' event ", async ()=>{
        sinon.stub(CategoryModel, 'updateOne')
            .resolves(mkUpdate)

        const categories = await new Promise(resolve => {
            client.send({type: 'categorie.update', data:{name: 'Alexandre'}}, (res=>{
                resolve(res)
            }))
        })
        expect(categories).to.eql(mkUpdate)
    })

    it("Teste Categoria Service 'categorie.delete' event ", async ()=>{
        sinon.stub(CategoryModel, 'deleteOne')
            .resolves(mkDelete)

        const categories = await new Promise(resolve => {
            client.send({type: 'categorie.delete', id: '6036f327c47efe30e5cd7aa2'}, (res=>{
                resolve(res)
            }))
        })

        expect(categories).to.eql(mkDelete)
    })
});
