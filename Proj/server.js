const http = require('http')
const path = require('path')
let host = 'localhost'
const fs = require('fs')
let port = 8000

const tableData = []

http.createServer((request, response)=>{
    console.log(request.url)
    let staticpath = path.join(process.cwd(),'./home')
    response.setHeader('content-type', 'text/html')    

    const url = request.url
    let name = ''
    switch(url){
        case '/': name = 'auto.html';  break;
        case '/table': name = "Table.html"; break;
        case '/new': name = 'Add.html'; break;
        case '/login': getparam(request, response); return;
        case '/getTableData': response.end(JSON.stringify(tableData.map(i => ({FIO: i.FIO, login:i.login})))); return;
        case '/addUser': user_add(request,response); return;
        default: name = url
    }
    if (url.endsWith('.css')){
        response.setHeader('content-type', 'text/css');
    }
    else if (url.endsWith('.js')){
        response.setHeader('content-type', 'text/javascript');
    }
    const sait = fs.createReadStream(path.join(staticpath,name))
    sait.on('error',err=>{console.log(err.message)})
    sait.pipe(response)
}).listen(port, host, ()=>{console.log("Server online")})


const usermap = new Map();

function auth(body){
    if (usermap.has(body.key)) return true;
    else return false;
}

function generate_token(length){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}


function user_add(request, response){
    let data = []
    request.on('data', dat2a=>{
        data.push(dat2a)     
    })

    request.on('end', ()=>{
        console.log(request.headers.authorization);
        const user = JSON.parse(data.join());
        tableData.push(user);
        response.end()
    })
}



function getparam(request,response){
    console.log('Работает')
    let data = []
    request.on('data', dat2a=>{
        data.push(dat2a)     
    })
    request.on('end',()=>{
        const account = JSON.parse(data.join());
        const login = {login: 'vertol', password: '12345'};
        if ((account.login === login.login)&&(account.password === login.password)){
            response.statusCode = '200';
            const token = {id:generate_token(10)};
            usermap.set(token,account.login)
            response.end(JSON.stringify(token));
        }
        else{
            response.statusCode = '401';
            response.end();
        }
        console.log(account)
        
    })
}
