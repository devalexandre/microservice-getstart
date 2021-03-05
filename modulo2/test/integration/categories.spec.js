const sinon = require('sinon')
const  {  assert } = require('chai');

const CategorieModel = require('../../schemas/categories');

describe("Teste CategorieModel ", ()=>{
    beforeEach(() => {
       sinon.stub(CategorieModel.prototype,'save')
    })
   
        it("TEST Categories save", async () =>{
            const  _doc  =   new CategorieModel({ name : "Brasileira"})
           await  _doc.save()
            assert(_doc.isNew)
        
        })


})
