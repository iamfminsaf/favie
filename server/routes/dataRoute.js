const {
    getDatas,
    addData,
    deleteData,
    editData,
} = require("../controller/dataController");

const Router = require("express").Router();

Router.route("/").get(getDatas);
Router.route("/").post(addData);
Router.route("/:id").delete(deleteData);
Router.route("/:id").put(editData);

module.exports = Router;
