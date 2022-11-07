let express = require('express');
let app = express();
// const port = 3000
// installed npm i nedb (this gives you the .db file)
// reference module
const DataStore = require("nedb")
// line 8-9 is boilerplate for using nedb
const db = new DataStore("gallery.db")
db.loadDatabase()
// use express.json lets us read the json (parse json back to its original form)
app.use(express.json({
    limit: "50mb"
}))

app.use("/", express.static("public"))

// making a post request so we want our app to "listen" for this post request
app.post("/submit", (req, res) => {
    // console.log(req)
    // boilerplate (req.body is the "body" of your request)
    db.insert(req.body)
    res.send("display")
})

app.get("/gallery", (req, res) => {
    // https://github.com/louischatriot/nedb#finding-documents
    db.find({}, function (err, docs) {
        // console.log(docs)
        let obj = { data: docs }
        res.json(obj)
    })
})

// app.listen(port, function () {
//     console.log("listening on port 3000")
// })

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});
