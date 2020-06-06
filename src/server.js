const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")


// configurar para publica 
server.use(express.static("public"))

// utilizando templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
} )

//  pagina inicial
// req: requisição
// res: resposta
server.get("/", (req,res) => {

     return  res.render("index.html")
    
})

server.get("/cadastrar-ponto", (req,res) => {

    // req.query: query Strings da nossa url
    console.log(req.query)

   return res.render("cadastrar-ponto.html")
    
})

server.get("/resultado-cidade", (req,res) => {


    // pegar os dados do banco de dados

    db.all(` SELECT * FROM places `, function(err, rows){

        if(err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("resultado-cidade.html", {places: rows, total})

    })

 })

server.listen(3000)

