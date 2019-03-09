
const Home = require('./routes/home')
const Math = require("./routes/math")
const Game = require('./routes/game')
const express = require('express');
const utils = require('./utils');
const path = require("path")

const app = express();
const args = utils.processArgs();

app.use(express.static(path.join(process.cwd(),'public')))

// setup routes
app.get('/', Home);
app.get("/math/:n1/:meth/:n2",Math);
app.get("/math",Math);
app.get("/game",Game);

app.listen(args.port,() => {
    console.log("App listing on port " + args.port);
});