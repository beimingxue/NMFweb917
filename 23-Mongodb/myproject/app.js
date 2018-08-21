const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://localhost:27017';


const dbName = 'myproject';


MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  //如果没有创建，返回db对象
  const db = client.db(dbName);


//插入
  //如果没有创建，返回集合
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([{content:'aaa'},{content:'bbb'}],function(err,result){
     if(!err){
     	console.log(result);
     }else{
     	console.log('insert error:::',err);
     }
     client.close();
  });
  
});
