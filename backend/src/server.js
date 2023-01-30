const express = require('express');
var cors = require("cors");
let database = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get("/students/list", function(req, res) {
    setTimeout(function() {
        res.send(database);
    }, 2000);

});

app.get("/students/find/:ra", function(req, res) {
    const studentFound = database.find(function(student) {
        return student.ra == req.params.ra;
    })
    res.send(studentFound);
});

app.post("/students/save", (req, res) => {
    database.push({
        nome: req.body.name,
        ra: req.body.ra,
        email: req.body.email,
        cpf: req.body.cpf,
    });
    res.send({ result: true, message: "Estudante cadastradado com sucesso!" });
});

app.put("/students/edit/:ra", (req, res) => {
    database = database.filter((student) => {
        return student.ra != req.params.ra;
    });
    database.push({
        nome: req.body.name,
        ra: req.body.ra,
        email: req.body.email,
        cpf: req.body.cpf,
    });
    res.send({
        result: true,
        message: "O ALUNO FOI ATUALIZADO COM SUCESSO",
    });
});

app.delete("/students/delete/:ra", (req, res) => {
    database = database.filter(function(student) {
        return student.ra != req.params.ra;
    });
    console.log(database);
    res.send({
        result: true,
        message: `O usuário #${req.params.ra} foi excluído com sucesso!`
    });
});

app.listen(3000);
console.log('Server is running..');