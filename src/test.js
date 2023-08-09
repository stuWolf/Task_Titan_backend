var MongoClient = require('mongodb').MongoClient, assert = require('assert');




MongoClient.connect("mongodb://172.16.0.110:27017/myproject?readConcern=majority").then(function(client){
  var db = client.db('myproject')
  var changeStreams =  db.collection('documents').watch()
  changeStreams.on('change', function(change){
    console.log(change)  
  })

})