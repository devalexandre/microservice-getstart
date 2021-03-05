const mongoose = require('mongoose')

class Connection {
    constructor() {
      this.url = 'mongodb://192.168.1.8/curso'
    }

    connect(){
        mongoose.connect(this.url,{ useNewUrlParser: true , useUnifiedTopology: true})
        const db = mongoose.connection

        db.on('error', console.error.bind(console,'coonectio error'))

        db.on('open',()=>{
            console.log('Connected')
        })
    }

}

module.exports = new Connection()