const express = require('express');
const knex = require("knex");
var cors = require("cors");
let database = require("./database");
const knexConfigFile = require("../knexfile");
const {response} = require("express");


const app = express();

app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get("/students/list/:searchQuery?", function (req, res) {

    let query = app.database("students");


    let result = database;
    let search = req.params.searchQuery;

    if (search) {
        query.where("ra", search)
            .orWhere("nome","like", `%${search}%`)
            .orWhere("cpf", search);



        // search = search.toLowerCase();
        // result = result.filter((student) => {
        //     return student.ra == search || student.nome.toLocaleLowerCase().indexOf(search) != -1 || student.cpf == search;
        // })
    }

    return query
        .select()
        .then((data) => {
            console.log(data);
            res.send(data);
        });
});

app.get("/students/find/:ra", function (req, res) {
    return app.database("students")
        .select()
        .where({ra: req.params.ra})
        .first()
        .then((response) => {
            res.send(response);
        });
});

app.post("/students/save", async (req, res) => {

    if(req.body.name == ""){
        return res.status(400).send({
            result: false,
            message: "O nome é um campo obrigatório!",
        });
    } else if(req.body.email == ""){
        return res.status(400).send({
            result: false,
            message: "O Email é um campo obrigatório!",
        });
    } else if(req.body.cpf == ""){
        return res.status(400).send({
            result: false,
            message: "O CPF é um campo obrigatório!",
        });
    } else if(req.body.ra == ""){
        return res.status(400).send({
            result: false,
            message: "O RA é um campo obrigatório!",
        });
    }

    if(parseInt(req.body.ra) != req.body.ra){
        return res.status(400).send({
            result: false,
            message: "O RA deve ser um número inteiro!",
        });
    }else if (parseInt(req.body.cpf) != req.body.cpf){
        return res.status(400).send({
            result: false,
            message: "O CPF deve ser um número inteiro!",
        });
    }

    const userExists = await app.database("students")
        .select()
        .where({
            ra: req.body.ra
        })
        .first();

    if(userExists){
        return res.status(400).send({
            result: false,
            message: "Desculpe, mas já existe um estudante cadastrado com esse RA",
        });
    }

    return app.database("students")
        .insert({
            nome: req.body.name,
            ra: req.body.ra,
            email: req.body.email,
            cpf: req.body.cpf,
        })
        .then((response) => {
            if (response) {
                res.send({result: true, message: "Estudante cadastradado com sucesso!"});
            } else {
                res.status(500).send({result: true, message: "Não foi possível cadastrar o estudante!"});
            }
        });
});

app.put("/students/edit/:ra", async (req, res) => {

    if(req.body.name == ""){
        return res.status(400).send({
            result: false,
            message: "O nome é um campo obrigatório!",
        });
    } else if(req.body.email == ""){
        return res.status(400).send({
            result: false,
            message: "O Email é um campo obrigatório!",
        });
    }

    const userFound = await app.database("students").select()
        .where({ra: req.params.ra})
        .first()

    if (!userFound) {
        return res.status(400).send({
            result: false,
            message: "O estudante informado não existe!"
        })
    }
    const studantUpdate = await app.database("students")
        .update({
            email: req.body.email,
            nome: req.body.name
        })
        .where({
            ra: req.params.ra
        })
    if (studantUpdate) {
        res.send({
            result: true,
            message: `O usuário #${req.params.ra} foi atualizado com sucesso!`,
        });
    } else {
        res.status(500).send({
            result: false,
            message: `Desculpa, mas não conseguimos atualizar o estudante.`,
        });
    }
});

app.delete("/students/delete/:ra", (req, res) => {

    return app.database("students")
        .where({ra: req.params.ra})
        .del()
        .then((response) => {
            if (response) {
                res.send({
                    result: true,
                    message: `O usuário #${req.params.ra} foi excluído com sucesso!`
                });
            } else {
                res.send({
                    result: false,
                    message: "Não foi possível excluir o estudante."
                });
            }

        });

});

app.listen(3000);
console.log('Server is running..');