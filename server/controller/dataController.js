const Data = require("../models/dataModel");

const getDatas = async (req, res) => {
    const datas = await Data.find({}).sort([["like", -1]]);
    res.json(datas);
};

const addData = async (req, res) => {
    const newData = await Data.create({
        title: req.body.title,
        rate: req.body.rate,
        genre: req.body.genre,
        like: 0,
    });
    const datas = await Data.find({}).sort([["like", -1]]);
    res.json(datas);
};

const deleteData = async (req, res) => {
    console.log("req");
    await Data.findByIdAndDelete(req.params.id);
    const datas = await Data.find({}).sort([["like", -1]]);
    res.json(datas);
};

const editData = async (req, res) => {
    const likedData = await Data.findById(req.params.id);
    const newLike = likedData.like + 1;
    await Data.findByIdAndUpdate(req.params.id, { like: newLike });
    res.json({ like: newLike });
};

module.exports = { getDatas, addData, deleteData, editData };
