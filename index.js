const app = require('express')();
const path = require("path");
const mongoose = require("mongoose");
const Aqmpoint = require("./Aqmpoint");


mongoose.connect("mongodb://localhost:27017/airquality", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs");

app.get("/", async (req, res) => {
        const allpoints = await Aqmpoint.find();
	res.render("index", { people: allpoints });
});
     
console.log('hallo from backend');
app.listen(3000)