var express = require("express")
var multer = require("multer");
var body_parser = require("body-parser");
var cors = require("cors");
var keys = require('./keys.json')
var app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

var Upload = multer({ storage: storage });

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("uploads"));

app.get("/", function (req, res) { return res.redirect('https://wiresdev.ga')});

app.post("/upload", Upload.single("file"), function (req, res) {
    if(keys.includes(req.headers['key'])){
        res.json({
            success: true,
            file: {
                url: 'https://i.wiresdev.ga/' + req.file.originalname
            }
        })
        console.log("Yay uploaded "+req.file.originalname)
    } else{
        res.sendStatus(401).send('Error: Unauthorized')
    }
});

app.listen(3854, function () {
    console.log("App started on port 3000");
});
