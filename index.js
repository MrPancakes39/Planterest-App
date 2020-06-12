const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening at port ${port}`));
app.use(express.static("public"));

app.get("/.well-known/security.txt", (req, res) => {
    res.sendFile(__dirname + "/docs/security.txt");
});

app.get("/security.txt", (req, res) => {
    res.sendFile(__dirname + "/docs/security.txt");
});