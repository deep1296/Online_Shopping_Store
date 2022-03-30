const express = require("express");

const router = express.Router();

const User = require("../models/user.model");



router.get("", async (req, res) => {
    try {
        if (req.query.email) {
            const items = await User.findOne({ email: req.query.email }).lean().exec();
            return res.status(200).send(items);
        }
        else {
            const user = await User.find().lean().exec();

                    return res.status(201).send(user);
        }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router