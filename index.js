const app = require('express')();
const path = require("path");
const mongoose = require("mongoose");
const Aqmpoint = require("./Aqmpoint");
const aqmData = require("./out3.json");


mongoose.connect("mongodb://localhost:27017/airquality", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs");
const User = require("./models/User");
const userData = [{ email: "admin@example.com" }, { email: "user@example.com" }];

//
(async () => {
  await Aqmpoint.deleteMany();
  await User.deleteMany();
  
  const createdUser = await User.insertMany(userData);

  aqmData.map(i => i.user =createdUser[Math.floor(Math.random() * createdUser.length)]._id)
  //TODO map over all the aqmData and asign each row a random user id from created user
 
  const createdPoints = await Aqmpoint.insertMany(aqmData);
  //TODO save the enriched apqData to DB
})()

//
app.get("/:userId?", async (req, res) => {
    const query = req.params.userId ? {user: req.params.userId} : {}
        const allpoints = await Aqmpoint.find(query).populate("user");
        let users = await User.find()
	res.render("index", { allpoints, users });
});
     
console.log('hallo from backend');
app.listen(3000)