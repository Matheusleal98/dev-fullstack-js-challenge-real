const express = require("express");
const StudentsController = require("../controllers/StudentController");
module.exports = (app) => {
    const router = express.Router();
    const StudentsControllerInstance = new StudentsController(app);
    router.get("/list/:searchQuery?", function (req, res) {
        return StudentsControllerInstance.listAction(req, res);
    });

    router.get("/find/:ra", function (req, res) {
        return StudentsControllerInstance.findAction(req, res);
    });

    router.post("/save", (req, res) => {
        return StudentsControllerInstance.createAction(req, res);
    });

    router.put("/edit/:ra",  (req, res) => {
        return StudentsControllerInstance.editAction(req, res);
    });

    router.delete("/delete/:ra", (req, res) => {
        return StudentsControllerInstance.deleteAction(req, res);
    });

    return router;
}