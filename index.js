const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const config = require("./config.json");

const app = express();

if(config.database === "") {
    return console.log(chalk.bgRed("Please provide a database URL!"))
} else if(config.port === "") {
    return console.log(chalk.bgRed("Please provide a port!"));
}


app.use(express.static(__dirname + "public/"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/v1", require("./routes/v1"));

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection
    .on("connected", () => {
        console.log(`${chalk.greenBright("[ Connected ]")} To MongoDB`);
    })
    .on("error", (err) => {
        console.log(err);
    })
    .on("disconnected", () => {
        console.log(`${chalk.red("[ Disconnected ]")} From MongoDB`);
    })
    .on("reconnected", () => {
        console.log(`${chalk.yellowBright("[ Reconnected ]")} To MongoDB`);
    })
    .on("timeout", () => {
        console.log(`${chalk.red("[ Timeout ]")} MongoDB Connection`);
    })
    .on("close", () => {
        console.log(`${chalk.red("[ Closed ]")} MongoDB Connection`);
    });

app.listen(config.port, () => {
    console.log(chalk.redBright(`

    ██████╗ ███████╗██████╗       ██████╗ ██████╗ ███████╗███╗   ███╗
    ██╔════╝ ██╔════╝██╔══██╗      ██╔══██╗██╔══██╗██╔════╝████╗ ████║
    ██║  ███╗█████╗  ██████╔╝█████╗██████╔╝██████╔╝█████╗  ██╔████╔██║
    ██║   ██║██╔══╝  ██╔══██╗╚════╝██╔═══╝ ██╔══██╗██╔══╝  ██║╚██╔╝██║
    ╚██████╔╝██║     ██████╔╝      ██║     ██║  ██║███████╗██║ ╚═╝ ██║
     ╚═════╝ ╚═╝     ╚═════╝       ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝
                                                                      

                            Grind Free Bot - Premium
    `))
    console.log(`${chalk.yellowBright("[ INFO ]")} Running on http://127.0.0.1:${config.port} !`)
})
