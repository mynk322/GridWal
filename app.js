var express = require("express");
var app = express();
var request = require("request");
const path = require('path');

app.use(express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");

app.get("/", function(req, res) {

    res.render("temp.ejs");
});
app.get("/results", function(req, res) {

    var query = (req.query.search);
    if (query == null)
        query = "ocean";
    var url = "https://pixabay.com/api/?key=13153674-80071c4a62992b203b9a7e050&q=" + query + "&image_type=all&pretty=true"
    request(url, function(error, responce, body) {
        if (!error) {
            var data = JSON.parse(body);
            res.render("search.ejs", { data: data });
        }

    });
});
app.listen(3000, function() {
    console.log("App running!");
});