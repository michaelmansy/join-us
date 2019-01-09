var express = require("express");


var faker = require("faker");

var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'mansy',
    database: 'join_us'
});



app.get("/", function(req,res){
    //find count of users in DB 
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q,function(err,results){
       if(err) throw err;
       var count = results[0].count;
       res.render("home", {data:count});
    });
});

app.post("/register", function(req,res){
    var person = {
        email: req.body.email
    };
    
    connection.query('INSERT INTO users SET ?', person, function(err,result){
       if(err) throw err;
       res.redirect("/");
    });
});


// starting the server
app.listen(8080, function(req,res){
    console.log("server running on port 8080");
});



// express w faker w mysql awel 7aga
// ejs 3shan ne3mel el html page w yeb2a fi data fel html
// body-parser 3shan neb3at el data men el html fel register post



