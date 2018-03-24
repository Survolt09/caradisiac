// UserController.js
const elasticsearch = require ('elasticsearch');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models =  require ('./models.json');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
module.exports = router;


var client = new elasticsearch.Client( {
  hosts: ['localhost:9200']
});

////////////////////////////////////////////////////////
//      Functions for getting the Cluster status      //
////////////////////////////////////////////////////////

function ping(){
  client.ping({
  requestTimeout: 300000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
}


function deleteIndex(){
  client.indices.delete({index: 'cars'},function(err,resp,status) {
  console.log("delete",resp);
  });
}

//////////////////////////////////////////////////////
//                  Populate functions              //
//////////////////////////////////////////////////////
function createIndex (){
  return new Promise((resolve,reject)=>{
    client.indices.create({
      index: 'cars'
    },function(err,resp,status) {
      if(err) {
        console.log(err);
        return reject()
      }
      else {
        console.log("create",resp);
        return resolve();
      }
    })
  })
}

function importData(){
  return new Promise((resolve,reject)=>{
    models.Models.forEach(model =>{
      model.volume = parseInt(model.volume)
        var myBody = [{ index: {_index: 'cars', _type: 'car', _id: model.uuid } },model];
        client.bulk({
          index: 'cars',
          type: 'car',
          body: myBody
        })
      },(err)=>{
        return reject (err);
      });
      return resolve();
  })
  return reject();
}


deleteIndex();



///////////////////////////////////////////////////
//                 API Routes                    //
///////////////////////////////////////////////////
router.post('/populate', function (req, res) {
  createIndex().then(()=>{
    importData().then(()=>{
      res.send("Succefully create index and populate")
    }).catch((err)=>res.send("Unsuccesully import data " + err))
  }).catch((err)=>res.send("Unsuccesully create index " + err))
})

router.get('/suv', function (req, res) {
  client.search({
   index: 'cars',
   type: 'car',
   body:
   {
     size: 10,
     "sort": [
       { "volume":   { "order": "desc"}}
     ]
   }
 },(error, response,status)=> {
    if (error){
      console.log("search error: "+error)
    }
    else {
      res.send(response.hits.hits)
    }
  })
});

//////////////////////////////////////////////////

module.exports = router;
