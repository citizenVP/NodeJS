const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', async (req, res) => {
    try {
      const orders = await models.Order.find({})
        .populate('Market').populate('Seller')
        .populate('Client').populate('Merchandise');
      const markets = await models.Market.find({});
      const sellers = await models.Seller.find({});
      const clients = await models.Client.find({});
      const merchandises = await models.Merchandise.find({});
  
      res.render('orders/index', {
        orders,
        sellers,
        markets,
        clients,
        merchandises
      });
  
    } catch (error) {
      res.status(200).json({
        err: err
      });
    }
  });
  
  router.post('/order/create', async (req, res) => {
    const seller = await models.Seller.findOne({ LastName: req.body.seller });
    const market = await models.Market.findOne({ Name: req.body.market });
    const client = await models.Client.findOne({ LastName: req.body.client });
    const merchandise = await models.Merchandise.findOne({ Title: req.body.merchandise });
    const { count, price } = req.body;
  
    models.Order.create({
      Seller: seller,
      Market: market._id,
      Client: client._id,
      Merchandise: merchandise._id,
      Count: count,
      Price: price
  
    }).then(order => console.log(order.id));
    res.redirect('/order');
  });
  
  router.get('/order/delete/:id', (req, res) => {
    const id = req.params.id;
    models.Order.remove({
      _id: id
    }).then(
      res.redirect('/order')).catch(err => {
        res.status(200).json({
          err: err
        });
      });
  
  })
  
  router.get('/order/edit/:id', async (req, res) => {
    const id = req.params.id;
  
    const sellers = await models.Seller.find({});
    const markets = await models.Market.find({});
    const clients = await models.Client.find({});
    const merchandises = await models.Merchandise.find({});
  
    models.Order.findById(id).then(order => {
      res.render('orders/edit', {
        order,
        sellers,
        markets,
        clients,
        merchandises
      });
    }).catch(err => {
      res.status(200).json({
        err: err
      });
    });
  });
  
  router.post('/order/edit', async (req, res) => {
    const id = req.body.id;
    const seller = await models.Seller.findOne({ LastName: req.body.seller });
    const market = await models.Market.findOne({ Name: req.body.market });
    const client = await models.Client.findOne({ LastName: req.body.client });
    const merchandise = await models.Merchandise.findOne({ Title: req.body.merchandise });
    const { count, price } = req.body;
  
    models.Order.findByIdAndUpdate({
      _id: id
    }, {
        Seller: seller,
        Market: market._id,
        Client: client._id,
        Merchandise: merchandise._id,
        Count: count,
        Price: price
      }).then(order => console.log(order));
  
    res.redirect('/order');
  });
  module.exports = router;