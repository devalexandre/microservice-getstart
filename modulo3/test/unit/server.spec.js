const Server = require('../../server')
const PubSub = require('pubsub-js')
const sinon = require('sinon')
const CategorieModel = require('../../schemas/categories')
const mkcreate = require('../moks/insert.json')
const mkfind = require('../moks/find.json')
const mkupdate = require('../moks/update.json')
const mkdelete = require('../moks/delete.json')

const { expect , assert } = require('chai')

describe('Teste Service Categories', ()=>{

    afterEach(() => {
        sinon.restore()
    })

    it('Teste categorie.list', (done)=>{
        sinon.stub(CategorieModel,'find').resolves(mkfind)

        sinon.stub(PubSub,'subscribe')
            .withArgs('categorie.list')
            .yields('res','reply')



        const server =  new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.find.calledOnce)

        done()
    })

    it('Teste categorie.update', (done)=>{
        const _data = JSON.stringify({id:'assjdhskdhskdhsq87687',name: "Alexandre"})
        sinon.stub(PubSub,'subscribe').yields(_data,'reply')
        sinon.stub(CategorieModel,'updateOne').resolves(mkupdate)


        const server =  new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.updateOne.calledOnce)

        done()
    })

    it('Teste categorie.delete', (done)=>{
        const _data = JSON.stringify({id: "suasoasoasa98s7as979"})
        sinon.stub(PubSub,'subscribe').yields(_data,'reply')
        sinon.stub(CategorieModel,'deleteOne').resolves(mkdelete)


        const server =  new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.deleteOne.calledOnce)

        done()
    })

    it('Teste categorie.create', (done)=>{
        const _data = JSON.stringify({name: "Alexandre"})
        sinon.stub(PubSub,'subscribe').yields(_data,'reply')
        sinon.stub(CategorieModel,'create').resolves(mkcreate)


        const server =  new Server(PubSub)
        const start = sinon.spy(server,'start')

        server.start()

        assert.isTrue(start.called)
        assert.isTrue(CategorieModel.create.calledOnce)

        done()
    })
})