/*const { model, schema, Schema } = require("mongoose");
const constants = require("./constants");
const { USER_TYPES, DATABASES } = constants;

const RoomTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: [USER_TYPES.USER, USER_TYPES.AGENT],
    },
  },
  {
    timestamps: true,
  }
);

const RoomTypeSchema = model(DATABASES.PERSON, RoomTypeSchema);

module.exports = RoomTypeSchema;*/
