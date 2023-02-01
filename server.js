if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view-engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))
  )
  .catch((error) => console.log(error));


app.use("/", router);
