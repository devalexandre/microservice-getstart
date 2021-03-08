const Server = require('../../server')
const PubSub = require('pubsub-js')
const sinon = require('sinon')
const CategorieModel = require('../../schemas/categories')

// moks
const mkcreate = require('../moks/insert.json')
const mkfind= require('../moks/find.json')
const mkupdate = require('../moks/update.json')
const mkdelete = require('../moks/delete.json')

const { assert , expect} = require("chai")

describe('Test Service Categories',()=>{

    afterEach(() =>{
        sinon.restore()
    })

    it("test categorie.list",(done)=>{
        sinon.stub(CategorieModel,'find').resolves(mkfind)

        sinon.stub(PubSub,'subscribe')
            .withArgs('categorie.list')
            .yields('res','reply')

        const server = new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.find.calledOnce)
        done()
    })

    it("Test categorie.create",(done)=>{
        const _data = JSON.stringify({name:"Alexandre"})
        sinon.stub(CategorieModel,"create").resolves(mkcreate)

        sinon.stub(PubSub,'subscribe')
            .withArgs('categorie.create')
            .yields(_data,'reply')

        const server = new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.create.calledOnce)
        done()
    })

    it("Test categorie.update",(done)=>{
        const _data = JSON.stringify({id:"sasaosasoas897a98s7a9",data: {name: "Alexandre"}})
        sinon.stub(CategorieModel,"updateOne").resolves(mkupdate)

        sinon.stub(PubSub,'subscribe')
            .withArgs('categorie.update')
            .yields(_data,'reply')

        const server = new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.updateOne.calledOnce)
        done()
    })

    it("Test categorie.delete",(done)=>{
        const _data = JSON.stringify({id:"sasaosasoas897a98s7a9"})
        sinon.stub(CategorieModel,"deleteOne").resolves(mkdelete)

        sinon.stub(PubSub,'subscribe')
            .withArgs('categorie.delete')
            .yields(_data,'reply')

        const server = new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.deleteOne.calledOnce)
        done()
    })
})