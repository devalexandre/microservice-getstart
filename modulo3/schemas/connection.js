const mongoose = require('mongoose');

class Connection{
    constructor(){
        this.url ='mongodb://192.168.1.3:27017/curso';

    }
   connect(){
    let status = false;

    mongoose.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;

    //db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("Connected Mongodb")
     status = true;
    });
    return status
   }
   close(){
    mongoose.connection.close()
   }
}





module.exports = new Connection()