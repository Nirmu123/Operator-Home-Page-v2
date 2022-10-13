const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { response } = require("express");
const pgp = require("pg-promise")();
const PORT = 3000;

const app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

//var templateList = null;
//app.locals.templateList = templateList;

app.use(bodyParser.text());

app.use("/css", express.static("css"));
app.use("/static", express.static("static"));
app.use("/script", express.static("script"));

//const connString = "postgresql://postgres:air2020@localhost:5432/rnaipl";
const db = pgp('postgresql://postgres:air2020@localhost:5432/rnaipl');

app.get("/templateList", function(req, res) {
    db.any("SELECT chklst_id,chklst_name,station_name,total_no_instruction FROM chklst_hdr WHERE status_code = 90;")
    .then((data) => {
        templateList=data;
        res.render("templateList", templateList);
    }).catch(error => res.send(error));
});

app.post("/templateList", function(req, res) {
    let data = req.body;
    console.log(data);
});


app.listen(PORT, () => {
    console.log("Server is running");
});
