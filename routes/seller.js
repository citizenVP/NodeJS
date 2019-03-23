const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
  models.Seller.find({}).populate('Market')
      .then(sellers => {
        models.Market.find({})
          .then(markets => {
            console.log(sellers)
            res.render('sellers/index', {
              sellers,
              markets
            });
          });
      }).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  });
  
  router.post('/seller/create', (req, res) => {
    const {
      MarketName,
      FirstName,
      LastName,
      Phone,
      Adress
    } = req.body;
  
    models.Market.findOne({
      Name: MarketName
    }).then(Market => {
  
      models.Seller.create({
        Market: Market.id,
        FirstName,
        LastName,
        Phone,
        Adress
      }).then(seller => console.log(seller.id));
    });
    res.redirect('/seller');
  });
  
  router.get('/seller/delete/:id', (req, res) => {
    const id = req.params.id;
    models.Seller.remove({
      _id: id
    }).then(
      res.redirect('/seller')).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  
  })
  
  router.get('/seller/edit/:id', (req, res) => {
    const id = req.params.id;
    models.Market.find({})
      .then(markets => {
        models.Seller.findById(id).populate('Market').then(seller => {
          res.render('sellers/edit', {
            seller,
            markets
          });
        });
      }).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  });
  
  
  router.post('/seller/edit', (req, res) => {
    const id = req.body.id;
    const {
      FirstName,
      LastName,
      Phone,
      Adress
    } = req.body;
    const MarketName = req.body.MarketName
  
    models.Market.findOne({
      Name: MarketName
    }).then(Market => {
      models.Seller.findByIdAndUpdate({
        _id: id
      }, {
          Market: Market.id,
          FirstName,
          LastName,
          Phone,
          Adress
        }).then(seller => console.log(seller));
    })
    res.redirect('/seller');
  });

  module.exports = router;