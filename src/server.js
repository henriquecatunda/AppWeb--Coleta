const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")


// configurar para publica 
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

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
   

   return res.render("cadastrar-ponto.html" )
    
})


// presevando dados de cadastro com o post
server.post("/savepoint", (req,res) => {

    // req.body: o corpo do nosso formulario
    //console.log(req.body)

    // inserir dados no BD

            const query = `
            
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            itens

        ) VALUES ( ?,?,?,?,?,?,?);


        `
        const values = [
            
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.itens
           
        ]

            function afterInsertData(err){
                if(err){

                    console.log(err)
                    return res.send("Erro no cadastro!")
                }

                console.log("cadastrado com sucesso")
                console.log(this)

                return res.render("cadastrar-ponto.html" , {saved: true})

            }

            db.run( query, values, afterInsertData )
            
})


server.get("/resultado-cidade", (req,res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia 
        return res.render("resultado-cidade.html", { total: 0})
    }
    // pegar os dados do banco de dados

    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows){

        if(err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("resultado-cidade.html", {places: rows, total})

    })

 })

server.listen(3000)

