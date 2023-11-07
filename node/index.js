const express = require('express')
const mySql = require('mysql');

const app = express()

const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}


app.get('/', (req, res) => {
    const connection = mySql.createConnection(config);

    connection.query("INSERT people(name) VALUES('Bruno Sonego')");

    connection.query("SELECT name FROM people", (error, result) => {
        connection.end();
        
        if(error) {
            console.error(error)
            res.send("Erro ao realizar consulta")
        }
        
        const title = '<h1>Full Cycle Rocks!!</h1>'

        const list = `<ul>${result?.map(({name}) => `<li>${name}</li>`) ?? ''}</ul>`

        res.send(title + list)
    });
})

app.listen(port, () => {
    console.log('Running in port ', port)
})