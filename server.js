// configurando o servidor
const express = require("express");
const server = express();

// configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'))


// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server
})







// configurar a apresentação da página
server.get("/", function(req, res){ //req = requisições e res = respostas
    // return res.send("ok,cheguei aqui com nodemon")
    return res.render("index.html")
})


//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o servidor")
})


