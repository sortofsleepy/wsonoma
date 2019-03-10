
const Home = require('./routes/home')
const Math = require("./routes/math")
const Game = require('./routes/game')
const express = require('express');
const utils = require('./utils');
const path = require("path")

const app = express();
const args = utils.processArgs();


app.get('/', Home);
app.get("/math",Math);
app.get("/math/:n1/:method/:n2",Math);
app.get("/game",Game);
app.use("/",express.static(path.join(process.cwd(),'public')))

app.listen(args.port,() => {
    console.log("App listing on port " + args.port);
});