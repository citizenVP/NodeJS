const express = require('express');
const router = express.Router();

const models = require('../models');

router.post('/', async (req, res) => {
    const search = req.body.search;
    const tag = req.body.tag;
  
    if (tag == 'sellers') {
      const seller = await models.Seller.find().populate('Market');
      const markets = await models.Market.find();
      var sellers=[];
      for (let index = 0; index < seller.length; index++) {
        var temp = seller[index];
  
        if (temp.Market.Name == search ||
          temp.FirstName == search ||
          temp.LastName == search ||
          temp.Phone == search ||
          temp.Adress == search) {
          sellers.push(temp);
        }
      }
  
      res.render('sellers/index', {
        sellers,
        markets
      });
    } else if (tag == 'clients') {
      const client = await Client.find();
      var clients=[];
      for (let index = 0; index < client.length; index++) {
        var temp = client[index];
  
        if (
          temp.FirstName == search ||
          temp.LastName == search ||
          temp.Phone == search ||
          temp.Adress == search) {
          data.push(temp);
        }
      }
      res.render('clients/index', {
        clients
      });
    } else if (tag == 'markets') {
      const market = await Market.find();
      var markets=[];
  
      for (let index = 0; index < market.length; index++) {
        var temp = market[index];
  
        if (temp.Name == search ||
          temp.Adress == search ||
          temp.Phone == search) {
            markets.push(temp);
        }
      }
      console.log(markets);
      res.render('markets/index', {
        markets
      });
  
    } else if (tag == 'orders') {
  
      const markets = await models.Market.find({});
      const sellers = await models.Seller.find({});
      const clients = await models.Client.find({});
      const merchandises = await models.Merchandise.find({});
  
      const order = await models.Order.find({})
        .populate('Market').populate('Seller')
        .populate('Client').populate('Merchandise');
  
      var orders = [];
  
      for (let index = 0; index < order.length; index++) {
        var temp = order[index];
  
        if (temp.Market.Name == search ||
          temp.Seller.LastName == search ||
          temp.Client.LastName == search ||
          temp.Merchandise.Title == search) {
          orders.push(temp);
        }
      }
  
      res.render('orders/index', {
        orders,
        sellers,
        markets,
        clients,
        merchandises
      });
  
    } else if (tag == 'merchandises') {
      const merchandise = await models.Merchandise.find();
      var merchandises=[];
      for (let index = 0; index < merchandise.length; index++) {
        var temp = merchandise[index];
  
        if (
          temp.Category == search ||
          temp.Title == search ||
          temp.Producer == search ||
          temp.Price == search) {
          merchandises.push(temp);
        }
      }
  
      res.render('merchandise/index', {
        merchandises
      });
    } else {
      const markets = await models.Market.find();
      const sellers = await models.Seller.find().populate('Market');
      const clients = await models.Client.find();
      const merchandises = await models.Merchandise.find();
      const orders = await models.Order.find()
        .populate('Market').populate('Seller')
        .populate('Client').populate('Merchandise');
  
      var data = [];
  
      for (let index = 0; index < markets.length; index++) {
        var temp = markets[index];
  
        if (temp.Name == search ||
          temp.Adress == search ||
          temp.Phone == search) {
          data.push(temp);
        }
      }
  
      for (let index = 0; index < sellers.length; index++) {
        var temp = sellers[index];
  
        if (temp.Market.Name == search ||
          temp.Market.Adress == search ||
          temp.Market.Phone == search ||
          temp.FirstName == search ||
          temp.LastName == search ||
          temp.Phone == search ||
          temp.Adress == search) {
          data.push(temp);
        }
      }
  
      for (let index = 0; index < clients.length; index++) {
        var temp = clients[index];
  
        if (
          temp.FirstName == search ||
          temp.LastName == search ||
          temp.Phone == search ||
          temp.Adress == search) {
          data.push(temp);
        }
      }
  
      for (let index = 0; index < merchandises.length; index++) {
        var temp = merchandises[index];
  
        if (
          temp.Category == search ||
          temp.Title == search ||
          temp.Producer == search ||
          temp.Price == search) {
          data.push(temp);
        }
      }
  
      for (let index = 0; index < orders.length; index++) {
        var temp = orders[index];
  
        if (temp.Market.Name == search ||
          temp.Market.Phone == search ||
          temp.Market.Adress == search ||
          temp.Seller.FirstName == search ||
          temp.Seller.LastName == search ||
          temp.Seller.Phone == search ||
          temp.Seller.Adress == search ||
          temp.Client.FirstName == search ||
          temp.Client.LastName == search ||
          temp.Client.Phone == search ||
          temp.Client.Adress == search ||
          temp.Merchandise.Title == search||
          temp.Merchandise.Producer == search||
          temp.Merchandise.Price == search
          ) {data.push(temp);}
      }
  
      if(data.length===0){
        res.end(JSON.stringify("Nothing found"));
      }else{
        res.end(JSON.stringify(data));
      }
    
    }
  })
  module.exports = router;