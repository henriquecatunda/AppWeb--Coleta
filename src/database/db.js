//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

// criaro o objeto de banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilixar o objeto de banco de dados, para nossas operações 

//db.serialize(() => {

    // com commandos SQL eu vou:

    //criar uma tabela 

  /*  db.run(`
    
        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT, 

            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            itens TEXT

        );
    
    `)


    // para inserir dados na tabela

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
    "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 ",
    "Papersider",
    "São vicente, Rua Exemplo",
    "Número - 000",
    "Ceará",
    "Crateús",
    "Papeis e Papelão"

]

    function afterInsertData(err){
        if(err){

            return console.log(err)
        }

        console.log("cadastrado com sucesso")
        console.log(this)

    }

    db.run( query, values, afterInsertData )

    // Para Consultar os dados da tabela

    db.all(` SELECT * FROM places `, function(err, rows){

        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)

    })
    // Deletar um dado da tabela 0

    /*db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
        
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")

    })*/
//})