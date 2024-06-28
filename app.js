const express = require("express");
const path = require("path");

const app = express();

const {engine} = require("express-handlebars");
const homeRouter = require("./routes/home");
const mathHelpers = require("./helpers/hbs/math");
const equalHelper = require("./helpers/hbs/equals");

app.engine("hbs", engine());
app.engine("hbs", engine({helpers:{
    ValorDiferente: equalHelper.valorDiferente,
    ValorIgual: equalHelper.valorIgual,
    },
}));

app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter); 

app.use("/", function (req, res, next) {
    res.status(404).render("404", {layout: false});
})

app.listen(5000);
