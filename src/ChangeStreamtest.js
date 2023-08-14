var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// the loading time from the server is very long. Ideally we would 
// * load/fetch on login, copy in to local memory
// * monitor and detect a change in each collection counting number of documents is not enough because status of existing ccan change
// * update the change
// * if we revisit a page, don't run fetch but get info from local memory

MongoClient.connect("mongodb://172.16.0.110:27017/myproject?readConcern=majority").then(function(client){
  var db = client.db('myproject')
  var changeStreams =  db.collection('documents').watch()
  changeStreams.on('change', function(change){
    console.log(change)  
  })

})