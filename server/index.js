const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dataRouter = require("./routes/dataRoute");

require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(
    cors({
        origin: "https://favie.onrender.com/",
    })
);
app.use(express.json());

app.use("/data", dataRouter);

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, (err) => {
            if (err) {
                console.log(`Error : ${err}`);
            }
            console.log(`Server is running in ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
