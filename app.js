var express = require("express");


var faker = require("faker");

var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// mysql://b0e9b6a595bc08:318785a3@us-cdbr-iron-east-01.cleardb.net/heroku_098628afe48ce0a?reconnect=true

//mysql connection
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b0e9b6a595bc08',
    password: '318785a3',
    database: 'heroku_098628afe48ce0a'
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
app.listen(process.env.PORT,process.env.IP, function(){
    console.log('Mailing List Launched!')
});







