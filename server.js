// configurando o servidor
const express = require("express");
const server = express();

// configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'));

// habilitar body do formulário
server.use(express.urlencoded({extended:true}));

// configurar conexão com banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

// configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server,
    noCache: true, // boolean ou booleano aceita 2 valores, verdadeiro ou falso
})

// configurar a apresentação da página
server.get("/", function(req, res){ //req = requisições e res = respostas
    // return res.send("ok,cheguei aqui com nodemon")
    
    db.query("Select * from doadores", function(err, result){
        if(err) return res.send("Erro de banco de dados")

        const doadores= result.rows
        return res.render("index.html", {doadores})
    }) 
})

server.post("/", function(req, res){
    // pegar dados do formulário.
    const nome = req.body.nome
    const email = req.body.email
    const sangue = req.body.sangue

    // Se o nome igual a vazio
    // OU o email igual a vazio
    // OU o sangue for igual a vazio
    if(nome == "" || email == "" || sangue == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    // coloco valores dentro do banco de dados
    const query = `
                   INSERT INTO doadores ("nome", "email", "sangue") 
                   VALUES ($1, $2, $3 )`

    const values = [nome, email, sangue]

    db.query(query, values, function(err) {
        // fluxo de erro
        if(err) return res.send("Erro no banco de dados");

        // fluxo ideal
        return res.redirect("/")
    } )    
})

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o servidor")
})


