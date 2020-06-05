const express = require("express")
const server = express()

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

   return res.render("cadastrar-ponto.html")
    
})

server.get("/resultado-cidade", (req,res) => {

    return res.render("resultado-cidade.html")
     
 })

server.listen(3000)

