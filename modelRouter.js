var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var body = require ("body-parser");


// var router = express.Router();

// Require all models
var vetStatus = require("./vetModel.js");

var PORT = 3000;

// Initialize Express
var app = express();

//set handlebars
var exphbs = require ("express-handlebars");
app.engine("handlebars", exphbs ({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
// Make public a static folder
app.use(express.static("public"));
// parse data handlebars
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });


app.get("/", function(req, res) {
  res.send('hello world');
  vetStatus.find({}, null, {sort: {created: -1}}, function(err, data) {
    if(data.length === 0) {
      res.send();
    }
  });
});

    


// //Route for getting all Articles from the db
app.get("/petstatus",function (req,res){
  //look for each article in the Articles collection
    db.NYTArticle.find({}, null, {sort: {created: -1}})
    .then (function (dbArticle){
  //render them in json format and send them back to the client 
        res.json(dbArticle)
    }).catch (function (err){
        res.json(err)
    });
});


// app.get("/articles/:id",function (req,res){
//   db.NYTArticle.findone({_id:req.params.id})
//   .populate ("note")
//   .then(function (Articles){
//     res.json(Articles);
//   }
//   .catch(function (err){
//     res.json(err);
//   })
// );
// });

// app.post("/articles/:id", function (req,res){
//     Note
//     .create(req.body)
//     .then (function(note){
//       return Article.findOneAndUpdate({_id:req.params.id},{note:note._id},{new:true});
//     })
//     .then(function (Articles){
//       res.json(Articles);
//     })
//     .catch (function (err){
//       res.json(err);
//     })
// });

// app.post("/article/:id",function (req,res){
//   Note.findOneAndRemove({_id:req.params.id},{note:note._id},{new:true});
// })
// .then(function (note){
//   return Article.findOneAndUpdate({_id:req.params.id},{note:note._id},{new:true});
// })
// .then (function (Article){
//   res.json(Article);
// }).catch(function (err){
//   res.json(err)
// });


app.listen (PORT, function (){
  console.log("App running on port " + PORT + "!");
});