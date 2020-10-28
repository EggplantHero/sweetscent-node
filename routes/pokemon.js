const auth = require("../middleware/auth");
const { Poke, validate } = require("../models/poke.js");
const { User } = require("../models/user.js");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);
  const pokes = currentUser.pokes;

  res.send(pokes);
});

router.get("/:id", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const poke = currentUser.pokes.find((p) => p.id === req.params.id);
  if (!poke) {
    res.status(404).send("The Pokemon with the given ID was not found.");
  }
  res.send(poke);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let poke = new Poke({
    name: req.body.name,
    count: req.body.count,
  });
  const currentUser = await User.findById(req.user._id);
  currentUser.pokes.push(poke);
  currentUser.save();
  res.send(poke);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const currentUser = await User.findById(req.user._id);
  const { pokes } = currentUser;
  const poke = pokes.id(req.params.id);

  if (!poke)
    return res.status(404).send("The Pokemon with the given ID was not found.");

  let index = pokes.indexOf(poke);

  if (index !== -1) {
    pokes[index] = {
      name: req.body.name,
      count: req.body.count,
    };
  }

  currentUser.save();

  res.send(poke);
});

router.delete("/:id", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const poke = currentUser.pokes.id(req.params.id);
  poke.remove();
  currentUser.save();

  if (!poke) {
    return res.status(404).send("The Pokemon with the given ID was not found.");
  }

  res.send(poke);
});

module.exports = router;
