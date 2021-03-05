module.exports = {
    response(res, data){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
    }
}