const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
  models.Merchandise.find({})
      .then(merchandises => {
        res.render('merchandise/index', {
          merchandises
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
      Category,
      Title,
      Producer,
      Price
    } = req.body;
    console.log(Category,
      Title,
      Producer,
      Price)
      models.Merchandise.create({
      Category,
      Title,
      Producer,
      Price
    }).then(merchandise => console.log(merchandise.id));
  
    res.redirect('/merchandise');
  });
  
  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    models.Merchandise.remove({
      _id: id
    }).then(
      res.redirect('/merchandise')).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  
  })
  
  router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    models.Merchandise.findById(id).then(merchandise => {
      res.render('merchandise/edit', {
        merchandise
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
      Category,
      Title,
      Producer,
      Price
    } = req.body;
    models.Merchandise.findByIdAndUpdate({
      _id: id
    }, {
        Category,
        Title,
        Producer,
        Price
      }).then(client => console.log(client));
  
    res.redirect('/merchandise');
  });
  
  module.exports = router;