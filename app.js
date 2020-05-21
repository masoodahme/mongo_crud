//import express framework
const express=require("express");
//const bodyParser=require("body-parser");
//import mongodb
const mongoClient=require("mongodb");
const app=express();//calling top level function of express
//using body-parser as a middleware
//to get data from form we use  bodyparser
//app.use(bodyParser.urlencoded({extended:true}));
//url of db connection
mongoClient.connect('mongodb://localhost:27017/dbname',function(err,dbname){
      if(err)
      {
          console.log(err);
      }
      console.log("db connection success ");
      const  db=dbname.db("dbname");//setting the database name to constant dbname
      //giving collection name as usersdetails
     const db_collection= db.collection("usersdetails");
     db_collection.insertOne({"name":"masood ahmed"},function(err,user){
         if(err)
         {
             console.log(err);
         }
         console.log(`insertion successfully`+user.name);
     });
     
     //select the data from the collections
     db_collection.find().toArray().then(results => {
        console.log(results)
      }).catch(err=> console.log(err));
     
     db_collection.updateOne({"name":"masood ahmed"},{$set:{"name":"xyz"}},function(err,users){
         if(err)
         {
             console.log(err);
         }
         console.log(`user is updated`);
     });
     db_collection.find().toArray().then(results => {
        console.log(results)
      }).catch(err=> console.log(err));
     
    //  db_collection.deleteOne({"name":"xyz"},function(err,users){
    //      if(err) console.log(err);
    //      console.log(`${users.name} deleted`);
    //  });
      
});
//when user enter localhost:3000 this will invoke and send the hello world as a response
app.get("/",function(req,res){
    res.send("hello world");
});

//setting the server to listen in port 3000
app.listen(3000,()=>{
    console.log("server is listening");
})