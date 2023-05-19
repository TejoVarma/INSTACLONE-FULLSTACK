require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
mongoose.connect(process.env.DB_URL + process.env.DB_NAME)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Error while connecting..."))

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})