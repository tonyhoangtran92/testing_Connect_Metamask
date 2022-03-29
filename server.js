var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var server = require("http").Server(app);
//var io = require("socket.io");
//app.io = io;
server.listen(3001);

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/verifyHash", function (req, res) {
    if (!req.body.random || !req.body.hash) {
        res.send("Failed");
    } else {
        let account = web3.eth.accounts.recover(req.body.random, req.body.hash);
        res.send(account);
    }
})


