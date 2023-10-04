const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));




/* Not Using Database 
const uri = "mongodb+srv://spdpdp:msmsmmsd@cluster0.ejosyev.mongodb.net/TaskDB?retryWrites=true&w=majority";
mongoose.connect(uri).then((con) => {
    if (con) {
        console.log(" db Connected");
    } else
         console.log("Not Connected");
})


const userSchema = new mongoose.Schema({
    title: String,
    from: String,
    taskdescription: String,
    date: Date,
    complete : String


});

var task = new mongoose.model('task', userSchema);

*/

app.get("/", (req, res) => {
    res.render("index",{ name: "Login" });
});

app.get("/assign", (req, res) => {
    res.sendFile(__dirname + "/public/compose.html");
});
 var count = 1;
io.on('connection', function (socket) {
    console.log(count + ' window connected');
    
    socket.on('disconnect', () => {
          count--;
         console.log(count+ ' Remaining Connection');
        
     })
    
    socket.on('message', (msg) => {
        socket.broadcast.emit("mess", msg);
    })
    
    count++;
});


app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/public/signin.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
});

app.get("/logout", (req, res) => {
    res.render("index",{ name: "Login" });
});

app.post("/compose",  (req, res) => {
    res.redirect("/");
});



app.post("/signin",  (req, res) => {
    var name = req.body.email;
    var pass = req.body.password;

    if (name == "Manager" && pass == 123) {
        res.render("index", { name: name });
    } else {
        res.render("index", { name: "Login" });
    }
});


http.listen(3000, function () {
    console.log("server on 3000");

})
