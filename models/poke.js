const mongoose = require("mongoose");
const Joi = require("joi");

const pokeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  count: { type: Number, required: true, min: 0 },
});

const Poke = mongoose.model("Poke", pokeSchema);

function validatePoke(poke) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    count: Joi.number().min(0).required(),
  });

  return schema.validate(poke);
}

module.exports.Poke = Poke;
module.exports.pokeSchema = pokeSchema;
module.exports.validate = validatePoke;
