const express = require('express');
const StudentsController = require("./controllers/StudentController");
const knex = require("knex");
var cors = require("cors");
const knexConfigFile = require("../knexfile");

const {response} = require("express");


const app = express();

app.database = knex(knexConfigFile.test);

    const StudentsControllerInstance = new StudentsController(app);

app.use(cors());
app.use(express.json());

app.get("/students/list/:searchQuery?", function (req, res) {
    return StudentsControllerInstance.listAction(req, res);
});

app.get("/students/find/:ra", function (req, res) {
    return StudentsControllerInstance.findAction(req, res);
});

app.post("/students/save", (req, res) => {
    return StudentsControllerInstance.saveAction(req, res);
});

app.put("/students/edit/:ra",  (req, res) => {
    return StudentsControllerInstance.editAction(req, res);
});

app.delete("/students/delete/:ra", (req, res) => {
    return StudentsControllerInstance.deleteAction(req, res);
});

app.listen(3000);
console.log('Server is running..');