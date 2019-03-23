const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', function(req, res) {
  models.Client.find({})
      .then(clients => {
        res.render('clients/index', {
          clients
        });
      })
      .catch(err => {
        res.status(200).json({
          err: err
        });
      });
  });
  
  router.post('/create', (req, res) => {
    const {
      FirstName,
      LastName,
      Phone,
      Adress
    } = req.body;
  
    models.Client.create({
      FirstName,
      LastName,
      Phone,
      Adress
    }).then(client => console.log(client.id));
  
    res.redirect('/client');
  });
  
  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    models.Client.remove({
      _id: id
    }).then(
      res.redirect('/client')).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  
  })
  
  router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    models.Client.findById(id).then(client => {
      res.render('clients/edit', {
        client
      });
    }).catch(err => {
      res.status(200).json({
        err: err
      });
    });
  });
  
  router.post('/edit', (req, res) => {
    const id = req.body.id;
    const {
      FirstName,
      LastName,
      Phone,
      Adress
    } = req.body;
    models.Client.findByIdAndUpdate({
      _id: id
    }, {
        FirstName,
        LastName,
        Phone,
        Adress
      }).then(client => console.log(client));
  
    res.redirect('/client');
  });
  module.exports = router;