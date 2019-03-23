const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', (req, res) => {
  models.Market.find().then(markets=>{
      res.render('markets/index', {
        markets
      });  
    }).catch(err => {
      res.status(200).json({
        err: err
      });
    });
       
  });
  
  router.post('/create', (req, res) => {
    const {
      Name,
      Phone,
      Adress
    } = req.body;
  
    models.Market.create({
      Name,
      Phone,
      Adress
    }).then(arket => console.log(arket.id));
  
    res.redirect('/market');
  });
  
  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    models.Market.remove({
      _id: id
    }).then(
      res.redirect('/market')).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  
  })
  
  router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    models.Market.findById(id).then(market => {
      res.render('markets/edit', {
        market
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
      Name,
      Phone,
      Adress
    } = req.body;
    models.Market.findByIdAndUpdate({
      _id: id
    }, {
        Name,
        Phone,
        Adress
      }).then(market => console.log(market));
  
    res.redirect('/market');
  });
  module.exports = router;