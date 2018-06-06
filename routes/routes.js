var express = require("express"); // call express
var taskSchema = require("../models/taskModel");
var mongoose = require("mongoose");
var router = express.Router(); // get an instance of the express Router
module.exports = function (io) {
    router.use(function (req, res, next) {
        // do logging
        console.log("Something is happening.");
        return next(); // make sure we go to the next routes and don't stop here
    });
    router
        .route("/tasks")
        .post(function (req, res, next) {
            var taskModel = new taskSchema();
            taskModel.task = req.body.task;
            taskModel.save(function (err) {
                if (err) {
                    res.send(err);
                }


            });
            io.sockets.emit('payload');
        });
    router
        .route("/tasks")
        .get(function (req, res) {

            var taskModel = new taskSchema();
            taskSchema.find((err, tasks) => {
                if (err) {
                    res.send(err);
                }
                res.send(tasks);
            });
        });
    router
        .route("/tasks/:id")
        .delete(function (req, res) {
            taskSchema.findByIdAndRemove(req.params.id, (err, tasks) => {
                if (err) {
                    console.log(req.params.id);
                    return res.status(500).send(err)


                };
                const response = {
                    message: "Todo successfully deleted",
                    id: req.params.id
                };
                io.sockets.emit('payload');
                console.log('payloadevent');
                return res.status(200).send(response);
            });
        });
    return router;
};
