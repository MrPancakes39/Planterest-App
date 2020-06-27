const express = require("express");
const monk = require("monk");
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = monk(process.env.MONGO_URI || "localhost/database");
const helpReqs = db.get("helpReqs");

const filter = new Filter();

app.listen(port, () => console.log(`listening at port ${port}`));
app.use(express.static("public"));

app.get("/.well-known/security.txt", (req, res) => {
    res.sendFile(__dirname + "/docs/security.txt");
});

app.get("/security.txt", (req, res) => {
    res.sendFile(__dirname + "/docs/security.txt");
});



function isValidReq(req) {
    let fn = req["first_name"] && req["first_name"].toString().trim() !== "";
    let fn2 = req["first_name"].toString().trim().length <= 20;
    let fn3 = !(filter.isProfane(req["first_name"].toString().trim()));
    let ln = req["last_name"] && req["last_name"].toString().trim() !== "";
    let ln2 = req["last_name"].toString().trim().length <= 20;
    let ln3 = !(filter.isProfane(req["last_name"].toString().trim()));
    let nds = req["needs"] && req["needs"].toString().trim() !== "";
    let nds2 = req["needs"].toString().trim().length <= 140;
    let nds3 = !(filter.isProfane(req["needs"].toString().trim()));
    let num = req["number"] && req["number"].toString().trim() !== "";
    let num2 = req["number"].replace(" ", "").match(/^[0-9]*$/gm);
    return (fn && ln && nds && num) && (fn2 && ln2 && nds2 && num2) && (fn3 && ln3 && nds3);
}

app.get("/help-request", (req, res) => {
    helpReqs
        .find()
        .then(reqs => {
            res.json(reqs);
        });
});

app.use(rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 1
}));

app.post("/help-request", (req, res) => {
    if (isValidReq(req.body)) {
        const helpReq = {
            first_name: req.body["first_name"].toString().trim(),
            last_name: req.body["last_name"].toString().trim(),
            needs: req.body["needs"].toString().trim(),
            number: req.body["number"].toString().trim()
        };
        helpReqs
            .insert(helpReq)
            .then(insertedReq => {
                console.log(insertedReq);
                res.json({
                    message: "successful"
                });
            });
    } else {
        res.status(422);
        res.json({
            message: "Hey! You're Help Request isn't Valid, Fix It!"
        });
    }
});