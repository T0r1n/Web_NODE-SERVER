const { Console } = require('console');
const http = require('http')
const path = require('path')
const fs = require('fs');
const { MIMEType } = require('util');
console.log("Хочу пиццы)");

let host = 'localhost'
let port = 8000
http.createServer((request,response)=>{
    console.log(request.url);
    const staticpath = path.join(process.cwd(),'/static');
    console.log(process.cwd(),staticpath)
    response.setHeader("content-type",'text/html');
    const url = request.url
    let name

    switch(url){
        case "/": name = "new.html";break
        case "/getparam": response.end(JSON.stringify({
            x:15,
            y:10,
            color:["pink","black","green","white","orange","blue"]
        }));return
        case "/getkus":getFile("phtml.html",staticpath).pipe(response);return
        default: name = url
    }
    const put = fs.createReadStream(path.join(staticpath,name))
    put.on('error',err=>(console.log(err.massage)))
    console.log(put)
    put.pipe(response)
}).listen(port,host,()=>(console.log("Онлайн")))

function getFile(name,staticpath){
    const put = fs.createReadStream(path.join(staticpath,name))
    put.on('error',err=>{console.log(err.massage)})
    return put
}