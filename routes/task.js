const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/create', (req, res) => {

  let task = new Task();
  task.name = req.body.name;
  task.dueDate = req.body.dueDate;
  task.priority = req.body.priority;

  task.save()
    .then((taskCreated) => {
      return res.status(200).send({
        result: taskCreated
      });
    })
    .catch((err) => {
      return res.status(500).send({
        result: err
      });
    });

});

router.get('/', (req, res) => {

  Task.find({})
    .then(tasks => {
      return res.status(200).send({
        result: tasks,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err
      });
    });

});

router.get('/destroy/:id', (req, res) => {

  Task.findByIdAndRemove(req.params.id, (err, task) => {

    if (err) {
      return res.status(500).send({
        message: err
      });
    }

    return res.status(200).send({
      message: task
    });

  });

});

router.post('/update', (req, res) => {

  let id = req.body.id;

  Task.findById(id)
    .then((task) => {

      task.name = req.body.name;
      task.dueDate = req.body.dueDate;
      task.priority = req.body.priority;

      task.save()
        .then((taskUpdated) => {
          return res.status(200).send({
            result: taskUpdated
          });
        })
        .catch((err) => {
          return res.status(500).send({
            result: err
          });
        });

    })
    .catch((err) => {
      return res.status(500).send({
        result: err
      });
    });

});

module.exports = router;