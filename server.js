require("dotenv").config();

const express = require("express");
const app = express();

require("./db")

const config = require("./config")
config(app)


const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)


const errorHandling = require("./error-handling")
errorHandling(app)


// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
